
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Users, Wifi, MapPin, ServerIcon } from 'lucide-react';
import type { ServerInfo } from '@/types';
import { Badge } from '@/components/ui/badge';

function getCountryFlagEmoji(langCode: string): string {
  if (!langCode) return '🏳️'; // Default flag if langCode is empty
  const code = langCode.toLowerCase().slice(0, 2);
  switch (code) {
    case 'en': return '🇬🇧';
    case 'us': return '🇺🇸';
    case 'de': return '🇩🇪';
    case 'ru': return '🇷🇺';
    case 'pl': return '🇵🇱';
    case 'pt': return '🇵🇹';
    case 'br': return '🇧🇷';
    case 'es': return '🇪🇸';
    case 'it': return '🇮🇹';
    case 'fr': return '🇫🇷';
    case 'nl': return '🇳🇱';
    case 'id': return '🇮🇩';
    case 'ro': return '🇷🇴';
    case 'hu': return '🇭🇺';
    case 'lt': return '🇱🇹';
    case 'cz': return '🇨🇿';
    case 'ar': return '🇸🇦';
    case 'ua': return '🇺🇦';
    case 'th': return '🇹🇭';
    case 'bg': return '🇧🇬';
    case 'tr': return '🇹🇷';
    case 'vi': return '🇻🇳';
    case 'hr': return '🇭🇷';
    case 'jp': return '🇯🇵';
    case 'cn': return '🇨🇳';
    case 'ca': return '🇨🇦';
    default: return langCode.toUpperCase() || '🏳️';
  }
}

async function getServers(): Promise<ServerInfo[]> {
  try {
    const response = await fetch('https://api.open.mp/servers', { next: { revalidate: 60 } }); // Revalidate every 60 seconds
    if (!response.ok) {
      console.error("Failed to fetch servers, status:", response.status);
      return [];
    }
    const data: Record<string, any> = await response.json();
    
    const serverList = Object.values(data).map((s: any): ServerInfo | null => {
      if (!s.ip || typeof s.ip !== 'string') {
        return null;
      }
      const [ipAddress, portStr] = s.ip.split(':');
      const port = parseInt(portStr);

      if (!ipAddress || isNaN(port)) {
        return null; 
      }
      return {
        id: s.ip, // Use "ip:port" as unique ID
        name: s.hn || 'Unnamed Server',
        ip: ipAddress,
        port: port,
        players: s.pc || 0,
        maxPlayers: s.pm || 0,
        mode: s.gm || 'Unknown',
        isOnline: true, // Servers from this API are considered online
        countryFlag: getCountryFlagEmoji(s.la || ''),
      };
    }).filter(Boolean) as ServerInfo[]; // Filter out any null entries

    return serverList.slice(0, 100); // Limit to 100 servers for display
  } catch (error) {
    console.error("Error fetching or processing server data:", error);
    return [];
  }
}

export default async function ServersPage() {
  const servers = await getServers();

  let captionText = "List of SA-MP servers.";
  if (servers.length === 0) {
    captionText = "No servers found or API is currently unavailable. Please try again later.";
  } else if (servers.length < 100 && servers.length > 0) {
    captionText = `Displaying ${servers.length} servers. Data refreshes periodically.`;
  } else if (servers.length === 100) {
    captionText = "Displaying the top 100 servers. Data refreshes periodically.";
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          SA-MP Server Browser
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Find your next adventure. Explore a wide variety of SA-MP servers.
        </p>
      </div>

      {/* Search and Filter Section - Placeholder functionality */}
      <div className="mb-8 p-6 bg-card rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="space-y-2">
            <label htmlFor="server-search" className="text-sm font-medium text-foreground/80">Search Servers</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="server-search" type="text" placeholder="Search by name, IP, or mode..." className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="gamemode-filter" className="text-sm font-medium text-foreground/80">Filter by Gamemode</label>
            <Select>
              <SelectTrigger id="gamemode-filter">
                <SelectValue placeholder="All Gamemodes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Gamemodes</SelectItem>
                <SelectItem value="roleplay">Roleplay</SelectItem>
                <SelectItem value="freeroam">Freeroam</SelectItem>
                <SelectItem value="tdm">Deathmatch</SelectItem>
                <SelectItem value="racing">Racing/Drift</SelectItem>
                <SelectItem value="cnr">Cops &amp; Robbers</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full md:w-auto bg-primary hover:bg-primary/90">
            <Filter className="mr-2 h-5 w-5" /> Apply Filters
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Note: Search and filter functionality is currently a visual placeholder.
        </p>
      </div>

      {/* Server List Table */}
      <div className="bg-card rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center"><Wifi className="inline-block h-5 w-5 text-muted-foreground" /></TableHead>
              <TableHead><ServerIcon className="inline-block h-5 w-5 mr-1 text-muted-foreground"/> Server Name</TableHead>
              <TableHead><MapPin className="inline-block h-5 w-5 mr-1 text-muted-foreground"/> IP Address</TableHead>
              <TableHead className="text-center"><Users className="inline-block h-5 w-5 mr-1 text-muted-foreground"/> Players</TableHead>
              <TableHead>Gamemode</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {servers.length > 0 ? (
              servers.map((server) => (
                <TableRow key={server.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="text-center">
                    <Badge variant={server.isOnline ? "default" : "destructive"} className={server.isOnline ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
                      {server.isOnline ? 'Online' : 'Offline'}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {server.countryFlag && <span className="mr-2">{server.countryFlag}</span>}
                    {server.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{server.ip}:{server.port}</TableCell>
                  <TableCell className="text-center text-muted-foreground">{server.players}/{server.maxPlayers}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{server.mode}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      Connect
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No servers to display.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableCaption>{captionText}</TableCaption>
        </Table>
      </div>
    </div>
  );
}
