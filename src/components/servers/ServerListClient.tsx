
"use client";

import type { ServerInfo } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Wifi, MapPin, ServerIcon, ArrowUpDown } from 'lucide-react';
import React, { useState, useMemo, useEffect } from 'react';

function getCountryFlagEmoji(langCode: string): string {
  if (!langCode) return '🏳️';
  const code = langCode.toLowerCase().slice(0, 2);
  // More comprehensive list based on common SA-MP server languages
  switch (code) {
    case 'en': return '🇬🇧'; // English (UK often used for generic English)
    case 'us': return '🇺🇸'; // English (US)
    case 'de': return '🇩🇪'; // German
    case 'ru': return '🇷🇺'; // Russian
    case 'pl': return '🇵🇱'; // Polish
    case 'pt': return '🇵🇹'; // Portuguese (Portugal)
    case 'br': return '🇧🇷'; // Portuguese (Brazil)
    case 'es': return '🇪🇸'; // Spanish
    case 'it': return '🇮🇹'; // Italian
    case 'fr': return '🇫🇷'; // French
    case 'nl': return '🇳🇱'; // Dutch
    case 'id': return '🇮🇩'; // Indonesian
    case 'ro': return '🇷🇴'; // Romanian
    case 'hu': return '🇭🇺'; // Hungarian
    case 'lt': return '🇱🇹'; // Lithuanian
    case 'cz': return '🇨🇿'; // Czech
    case 'ar': return '🇸🇦'; // Arabic (Saudi Arabia often used as generic)
    case 'ua': return '🇺🇦'; // Ukrainian
    case 'th': return '🇹🇭'; // Thai
    case 'bg': return '🇧🇬'; // Bulgarian
    case 'tr': return '🇹🇷'; // Turkish
    case 'vi': return '🇻🇳'; // Vietnamese
    case 'hr': return '🇭🇷'; // Croatian
    case 'jp': return '🇯🇵'; // Japanese
    case 'cn': return '🇨🇳'; // Chinese
    case 'ca': return '🇨🇦'; // English/French (Canada)
    case 'sv': return '🇸🇪'; // Swedish
    case 'el': return '🇬🇷'; // Greek
    case 'he': return '🇮🇱'; // Hebrew
    case 'ko': return '🇰🇷'; // Korean
    case 'sr': return '🇷🇸'; // Serbian
    default: return langCode.toUpperCase().length === 2 ? langCode.toUpperCase() : '🏳️'; // Attempt to use 2-letter code or default
  }
}


interface ServerListClientProps {
  initialServers: ServerInfo[];
}

export function ServerListClient({ initialServers }: ServerListClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [gamemodeFilter, setGamemodeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [processedServers, setProcessedServers] = useState<ServerInfo[]>([]);

  useEffect(() => {
    // Process country flags once when initialServers change
    setProcessedServers(
      initialServers.map(server => ({
        ...server,
        countryFlag: getCountryFlagEmoji(server.countryFlag || ''), // countryFlag from API is lang code
      }))
    );
  }, [initialServers]);

  const filteredAndSortedServers = useMemo(() => {
    let servers = [...processedServers];

    // Apply search term
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      servers = servers.filter(server =>
        server.name.toLowerCase().includes(lowerSearchTerm) ||
        server.ip.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Apply gamemode filter
    if (gamemodeFilter !== 'all') {
      servers = servers.filter(server => server.mode.toLowerCase().includes(gamemodeFilter.toLowerCase()));
    }

    // Apply sorting
    if (sortBy === 'mostPlayers') {
      servers.sort((a, b) => b.players - a.players);
    } else if (sortBy === 'fewestPlayers') {
      servers.sort((a, b) => a.players - b.players);
    } else if (sortBy === 'nameAZ') {
      servers.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'nameZA') {
      servers.sort((a, b) => b.name.localeCompare(a.name));
    }
    // 'default' sort is the initial order from API (or after processing)

    return servers;
  }, [processedServers, searchTerm, gamemodeFilter, sortBy]);

  const uniqueGamemodes = useMemo(() => {
    const modes = new Set(initialServers.map(s => s.mode.trim()).filter(m => m));
    return Array.from(modes).sort((a,b) => a.localeCompare(b));
  }, [initialServers]);


  let captionText = "List of SA-MP servers.";
  if (initialServers.length === 0) {
    captionText = "No servers found or API is currently unavailable. Please try again later.";
  } else if (filteredAndSortedServers.length === 0 && initialServers.length > 0) {
    captionText = "No servers match your current search/filter criteria.";
  } else {
    captionText = `Displaying ${filteredAndSortedServers.length} of ${initialServers.length} fetched servers. Data refreshes periodically.`;
  }
  if (initialServers.length >= 200 && filteredAndSortedServers.length === initialServers.length && searchTerm === '' && gamemodeFilter === 'all') {
      captionText = `Displaying the first ${initialServers.length} servers from the API. Refine your search or use filters to see more specific results. Data refreshes periodically.`;
  }


  return (
    <>
      {/* Search and Filter Section */}
      <div className="mb-8 p-6 bg-card rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 items-end">
          <div className="space-y-1">
            <Label htmlFor="server-search" className="text-sm font-medium text-foreground/80">Search Servers</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="server-search"
                type="text"
                placeholder="Search by name or IP..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="gamemode-filter" className="text-sm font-medium text-foreground/80">Filter by Gamemode</Label>
            <Select value={gamemodeFilter} onValueChange={setGamemodeFilter}>
              <SelectTrigger id="gamemode-filter">
                <SelectValue placeholder="All Gamemodes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Gamemodes</SelectItem>
                {uniqueGamemodes.map(mode => (
                  <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                ))}
                {/* Fallback options if uniqueGamemodes is empty or for common modes */}
                {uniqueGamemodes.length === 0 && (
                  <>
                    <SelectItem value="Roleplay">Roleplay</SelectItem>
                    <SelectItem value="Freeroam">Freeroam</SelectItem>
                    <SelectItem value="DM">Deathmatch</SelectItem>
                    <SelectItem value="Race">Racing/Drift</SelectItem>
                    <SelectItem value="Cops and Robbers">Cops & Robbers</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="sort-by" className="text-sm font-medium text-foreground/80">Sort By</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sort-by">
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="mostPlayers">Most Players</SelectItem>
                <SelectItem value="fewestPlayers">Fewest Players</SelectItem>
                <SelectItem value="nameAZ">Server Name (A-Z)</SelectItem>
                <SelectItem value="nameZA">Server Name (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Server List Table */}
      <div className="bg-card rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center"><Wifi className="inline-block h-5 w-5 text-muted-foreground" /></TableHead>
              <TableHead><ServerIcon className="inline-block h-5 w-5 mr-1 text-muted-foreground" /> Server Name</TableHead>
              <TableHead><MapPin className="inline-block h-5 w-5 mr-1 text-muted-foreground" /> IP Address</TableHead>
              <TableHead className="text-center"><Users className="inline-block h-5 w-5 mr-1 text-muted-foreground" /> Players</TableHead>
              <TableHead>Gamemode</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedServers.length > 0 ? (
              filteredAndSortedServers.map((server) => (
                <TableRow key={server.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="text-center">
                    <Badge variant={server.isOnline ? "default" : "destructive"} className={server.isOnline ? "bg-green-500 hover:bg-green-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"}>
                      {server.isOnline ? 'Online' : 'Offline'}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {server.countryFlag && <span className="mr-2 text-lg">{server.countryFlag}</span>}
                    {server.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{server.ip}:{server.port}</TableCell>
                  <TableCell className="text-center text-muted-foreground">{server.players}/{server.maxPlayers}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{server.mode}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      {/* For actual connection: <a href={`samp://${server.ip}:${server.port}`}>Connect</a> */}
                      <a href={`samp://${server.ip}:${server.port}`} onClick={(e) => {
                        // Basic alert, in a real app you'd want a more robust way to handle samp:// links
                        // or inform user if they don't have SA-MP installed.
                        alert(`Attempting to connect to samp://${server.ip}:${server.port}. Ensure you have SA-MP installed and configured to handle samp:// links.`);
                      }}>
                        Connect
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  {initialServers.length > 0 ? "No servers match your criteria." : "Fetching server data or no servers available..."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableCaption>{captionText}</TableCaption>
        </Table>
      </div>
    </>
  );
}
