
"use client";

import type { ServerInfo } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Wifi, MapPin, ServerIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useMemo, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { fetchServerByIp } from '@/app/servers/actions';

function getCountryFlagEmoji(langCode: string): string {
  if (!langCode) return '🏳️';
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
    case 'sv': return '🇸🇪';
    case 'el': return '🇬🇷';
    case 'he': return '🇮🇱';
    case 'ko': return '🇰🇷';
    case 'sr': return '🇷🇸';
    default: return langCode.toUpperCase().length === 2 && /^[A-Z]{2}$/.test(langCode.toUpperCase()) ? langCode.toUpperCase().split('').map(char => String.fromCodePoint(char.charCodeAt(0) + 127397)).join('') : '🏳️';
  }
}

interface ServerListClientProps {
  initialServers: ServerInfo[];
}

const ITEMS_PER_PAGE = 20;

export function ServerListClient({ initialServers }: ServerListClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [gamemodeFilter, setGamemodeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [processedServers, setProcessedServers] = useState<ServerInfo[]>([]);
  const [specificServerResult, setSpecificServerResult] = useState<ServerInfo | 'loading' | 'notfound' | 'error' | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setProcessedServers(
      initialServers.map(server => ({
        ...server,
        countryFlag: getCountryFlagEmoji(server.countryFlag || ''),
      }))
    );
  }, [initialServers]);

  useEffect(() => {
    const ipPortPattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+$/;
    if (ipPortPattern.test(debouncedSearchTerm)) {
      setSpecificServerResult('loading');
      setCurrentPage(1); // Reset page for specific IP search
      fetchServerByIp(debouncedSearchTerm).then(server => {
        if (server) {
          const serverWithProcessedFlag = {
            ...server,
            countryFlag: getCountryFlagEmoji(server.countryFlag || ''),
          };
          setSpecificServerResult(serverWithProcessedFlag);
        } else {
          setSpecificServerResult('notfound');
        }
      }).catch(() => {
        setSpecificServerResult('error');
      });
    } else {
      setSpecificServerResult(null); 
    }
  }, [debouncedSearchTerm]);

  // Reset current page when filters or sort order change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, gamemodeFilter, sortBy]);

  const filteredAndSortedServers = useMemo(() => {
    if (specificServerResult && typeof specificServerResult === 'object' && specificServerResult !== null) {
      return [specificServerResult];
    }
    if (specificServerResult === 'loading' || specificServerResult === 'error' || specificServerResult === 'notfound') {
      return [];
    }

    let servers = [...processedServers];
    const lowerSearchTerm = searchTerm.toLowerCase();

    if (searchTerm && !/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+$/.test(searchTerm)) {
      servers = servers.filter(server =>
        server.name.toLowerCase().includes(lowerSearchTerm) ||
        server.ip.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    if (gamemodeFilter !== 'all') {
      servers = servers.filter(server => server.mode.toLowerCase().includes(gamemodeFilter.toLowerCase()));
    }

    if (sortBy === 'mostPlayers') {
      servers.sort((a, b) => b.players - a.players);
    } else if (sortBy === 'fewestPlayers') {
      servers.sort((a, b) => a.players - b.players);
    } else if (sortBy === 'nameAZ') {
      servers.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'nameZA') {
      servers.sort((a, b) => b.name.localeCompare(a.name));
    }
    // If sortBy is 'default', original API order (or processedServers order) is maintained
    return servers;
  }, [processedServers, searchTerm, gamemodeFilter, sortBy, specificServerResult]);
  
  const totalPages = Math.ceil(filteredAndSortedServers.length / ITEMS_PER_PAGE);

  // Adjust current page if it becomes out of bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0 && currentPage !== 1) { // If no results, go to page 1
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);


  const paginatedServers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredAndSortedServers.slice(startIndex, endIndex);
  }, [filteredAndSortedServers, currentPage]);

  const uniqueGamemodes = useMemo(() => {
    const modes = new Set(initialServers.map(s => s.mode.trim()).filter(m => m));
    return Array.from(modes).sort((a,b) => a.localeCompare(b));
  }, [initialServers]);

  const tableCaption = useMemo(() => {
    if (specificServerResult === 'loading') return `Mencari detail untuk ${debouncedSearchTerm}...`;
    if (specificServerResult === 'notfound') return `Server ${debouncedSearchTerm} tidak ditemukan. Coba pencarian umum atau periksa kembali IP:Port.`;
    if (specificServerResult === 'error') return `Gagal mengambil detail untuk ${debouncedSearchTerm}.`;
    if (typeof specificServerResult === 'object' && specificServerResult !== null) return `Menampilkan detail untuk server ${specificServerResult.ip}:${specificServerResult.port}.`;
    
    if (initialServers.length === 0) return "Tidak ada server yang ditemukan atau API tidak tersedia. Silakan coba lagi nanti.";
    
    const totalFilteredCount = filteredAndSortedServers.length;
    if (totalFilteredCount === 0) {
      if (searchTerm || gamemodeFilter !== 'all') return "Tidak ada server yang cocok dengan kriteria pencarian/filter Anda.";
      return "Tidak ada server untuk ditampilkan.";
    }

    const startNum = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endNum = Math.min(currentPage * ITEMS_PER_PAGE, totalFilteredCount);
    
    let captionText = `Menampilkan server ${startNum}-${endNum} dari ${totalFilteredCount}`;
    if (totalFilteredCount !== initialServers.length && !searchTerm.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+$/) && gamemodeFilter !=='all' && sortBy !== 'default') {
      captionText += ` (hasil filter dari ${initialServers.length} total server yang diambil).`;
    } else if (totalFilteredCount !== initialServers.length && searchTerm && !searchTerm.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+$/)){
       captionText += ` (hasil pencarian dari ${initialServers.length} total server yang diambil).`;
    } else {
      captionText += ` server.`;
    }
    captionText += " Data diperbarui secara berkala.";
    return captionText;
  }, [specificServerResult, debouncedSearchTerm, initialServers.length, filteredAndSortedServers.length, currentPage, searchTerm, gamemodeFilter, sortBy]);


  const showPagination = totalPages > 1 && !(specificServerResult && typeof specificServerResult === 'object');

  return (
    <>
      <div className="mb-8 p-6 bg-card rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 items-end">
          <div className="space-y-1">
            <Label htmlFor="server-search" className="text-sm font-medium text-foreground/80">Cari Server</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="server-search"
                type="text"
                placeholder="Cari berdasarkan nama atau IP:Port..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="gamemode-filter" className="text-sm font-medium text-foreground/80">Filter Gamemode</Label>
            <Select 
              value={gamemodeFilter} 
              onValueChange={setGamemodeFilter} 
              disabled={!!(specificServerResult && typeof specificServerResult === 'object')}
            >
              <SelectTrigger id="gamemode-filter">
                <SelectValue placeholder="Semua Gamemode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Gamemode</SelectItem>
                {uniqueGamemodes.map(mode => (
                  <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                ))}
                {uniqueGamemodes.length === 0 && ( // Fallback if API fails or returns no modes
                  <>
                    <SelectItem value="Roleplay">Roleplay</SelectItem>
                    <SelectItem value="Freeroam">Freeroam</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="sort-by" className="text-sm font-medium text-foreground/80">Urutkan Berdasarkan</Label>
            <Select 
              value={sortBy} 
              onValueChange={setSortBy} 
              disabled={!!(specificServerResult && typeof specificServerResult === 'object')}
            >
              <SelectTrigger id="sort-by">
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="mostPlayers">Pemain Terbanyak</SelectItem>
                <SelectItem value="fewestPlayers">Pemain Paling Sedikit</SelectItem>
                <SelectItem value="nameAZ">Nama Server (A-Z)</SelectItem>
                <SelectItem value="nameZA">Nama Server (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center"><Wifi className="inline-block h-5 w-5 text-muted-foreground" /></TableHead>
              <TableHead><ServerIcon className="inline-block h-5 w-5 mr-1 text-muted-foreground" /> Nama Server</TableHead>
              <TableHead><MapPin className="inline-block h-5 w-5 mr-1 text-muted-foreground" /> Alamat IP</TableHead>
              <TableHead className="text-center"><Users className="inline-block h-5 w-5 mr-1 text-muted-foreground" /> Pemain</TableHead>
              <TableHead>Gamemode</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedServers.length > 0 ? (
              paginatedServers.map((server) => (
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
                      <a href={`samp://${server.ip}:${server.port}`} onClick={(e) => {
                        alert(`Mencoba menghubungkan ke samp://${server.ip}:${server.port}. Pastikan Anda telah menginstal SA-MP dan mengkonfigurasinya untuk menangani tautan samp://.`);
                      }}>
                        Hubungkan
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  {(() => {
                    if (specificServerResult === 'loading') return `Mencari detail untuk ${debouncedSearchTerm}...`;
                    if (specificServerResult === 'notfound') return `Server ${debouncedSearchTerm} tidak ditemukan. Coba pencarian umum.`;
                    if (specificServerResult === 'error') return `Gagal mengambil detail untuk ${debouncedSearchTerm}.`;
                    if (initialServers.length === 0 && specificServerResult === null) return "Tidak ada server yang ditemukan atau API tidak tersedia.";
                    if (specificServerResult === null && (searchTerm || gamemodeFilter !== 'all')) return "Tidak ada server yang cocok dengan kriteria Anda.";
                    return "Memuat data server..."; 
                  })()}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableCaption>{tableCaption}</TableCaption>
        </Table>
      </div>
      
      {showPagination && (
        <div className="flex items-center justify-between mt-6 p-4 border-t border-border">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Sebelumnya
          </Button>
          <span className="text-sm text-muted-foreground">
            Halaman {currentPage} dari {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
          >
            Berikutnya
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
}
