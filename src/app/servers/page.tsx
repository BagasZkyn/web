
import type { ServerInfo } from '@/types';
import { ServerListClient } from '@/components/servers/ServerListClient';

async function getServers(): Promise<ServerInfo[]> {
  try {
    // The open.mp API returns an object where keys are "ip:port"
    // and values are server details.
    const response = await fetch('https://api.open.mp/servers', { next: { revalidate: 60 } }); // Revalidate every 60 seconds
    if (!response.ok) {
      console.error("Failed to fetch servers, status:", response.status);
      return [];
    }
    const data: Record<string, any> = await response.json();
    
    const serverList = Object.values(data).map((s: any): ServerInfo | null => {
      if (!s.ip || typeof s.ip !== 'string') {
        // Invalid or missing IP field from API
        return null;
      }
      const [ipAddress, portStr] = s.ip.split(':');
      const port = parseInt(portStr);

      if (!ipAddress || isNaN(port)) {
        // Failed to parse IP and port
        return null; 
      }
      return {
        id: s.ip, // Use "ip:port" as unique ID from the original API key
        name: s.hn || 'Unnamed Server',
        ip: ipAddress,
        port: port,
        players: s.pc || 0,
        maxPlayers: s.pm || 0,
        mode: s.gm || 'Unknown',
        isOnline: true, // Servers from this API are considered online
        countryFlag: s.la || '', // Will be processed into emoji by client component
      };
    }).filter(Boolean) as ServerInfo[]; // Filter out any null entries from mapping

    return serverList.slice(0, 200); // Limit to 200 servers for display initially
  } catch (error) {
    console.error("Error fetching or processing server data:", error);
    return [];
  }
}

export default async function ServersPage() {
  const initialServers = await getServers();

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
      <ServerListClient initialServers={initialServers} />
    </div>
  );
}

