import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Users, Wifi, MapPin, ServerIcon } from 'lucide-react'; // Using ServerIcon as 'Server' is a component
import type { ServerInfo } from '@/types';
import { Badge } from '@/components/ui/badge';

const MOCK_SERVERS: ServerInfo[] = [
  { id: '1', name: 'Grand Roleplay | Los Santos', ip: '123.45.67.89', port: 7777, players: 450, maxPlayers: 1000, mode: 'Roleplay', isOnline: true, countryFlag: '🇺🇸' },
  { id: '2', name: 'NextLevel Gaming Freeroam', ip: '98.76.54.32', port: 7777, players: 120, maxPlayers: 500, mode: 'Freeroam/Stunts', isOnline: true, countryFlag: '🇬🇧' },
  { id: '3', name: 'WarZone TDM Arena', ip: '11.22.33.44', port: 8888, players: 75, maxPlayers: 100, mode: 'Team Deathmatch', isOnline: true, countryFlag: '🇩🇪' },
  { id: '4', name: 'Drift Kings Paradise', ip: '55.66.77.88', port: 7777, players: 30, maxPlayers: 50, mode: 'Drift/Racing', isOnline: false, countryFlag: '🇯🇵' },
  { id: '5', name: 'San Fierro Cops & Robbers', ip: '12.34.56.78', port: 1234, players: 250, maxPlayers: 300, mode: 'Cops & Robbers', isOnline: true, countryFlag: '🇨🇦' },
];

export default function ServersPage() {
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
            {MOCK_SERVERS.map((server) => (
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
            ))}
          </TableBody>
          <TableCaption>List of popular SA-MP servers. More coming soon!</TableCaption>
        </Table>
      </div>
    </div>
  );
}
