
'use server';
import type { ServerInfo } from '@/types';

function mapApiDataToServerInfo(apiKey: string, data: any): ServerInfo | null {
  if (!data || typeof data.hn !== 'string') { // Check for hostname as a proxy for valid server data
    // The API returns an empty object or object with just 'ip' if server not found by IP:Port
    // or if the server is down/unresponsive to the query.
    console.log("Incomplete data from API for:", apiKey, data);
    return null;
  }

  // ip might not be in the response for specific server query if it resolves differently
  // Use apiKey (which is the queried ip:port) if data.ip is missing
  const [ipAddress, portStr] = apiKey.split(':');
  const port = parseInt(portStr);

  if (!ipAddress || isNaN(port)) {
     console.error("Failed to parse IP and port from apiKey:", apiKey);
    return null; 
  }

  return {
    id: apiKey, // Use queried ip:port as unique ID
    name: data.hn || 'Unnamed Server',
    ip: ipAddress, // Use from apiKey
    port: port,     // Use from apiKey
    players: data.pc ?? 0, // Use ?? for null/undefined checks
    maxPlayers: data.pm ?? 0,
    mode: data.gm || 'Unknown',
    isOnline: data.ol !== undefined ? data.ol : true, // Check for 'ol' field, default to true if fetched
    countryFlag: data.la || '', // Language code, to be processed into emoji by client
  };
}

export async function fetchServerByIp(ipPort: string): Promise<ServerInfo | null> {
  try {
    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+$/.test(ipPort)) {
      console.error("Invalid IP:Port format for fetchServerByIp:", ipPort);
      return null;
    }
    const response = await fetch(`https://api.open.mp/server/${ipPort}`, { 
      next: { revalidate: 10 } // Short revalidate for specific lookups
    });
    
    if (!response.ok) {
      // API returns 200 OK with empty body or minimal JSON if server not found/offline,
      // rather than a 404 for the /server/{ip:port} endpoint if IP:port format is valid.
      // True 404 might mean malformed request to the API gateway, not specific server.
      // So, we check the content of the JSON.
      console.log(`Response not OK for server ${ipPort}, status: ${response.status}. Attempting to parse body.`);
      // Try to parse body anyway, as open.mp might return error details in JSON.
      // For now, we assume non-200 for specific server means it's effectively not found or error state.
      // The mapApiDataToServerInfo will handle empty/invalid data.
    }
    
    const data = await response.json();

    // If server is offline or doesn't exist, 'hn' (hostname) might be missing.
    if (!data || !data.hn) {
        console.log(`Server ${ipPort} not found or offline (no hostname in response).`);
        return null;
    }

    return mapApiDataToServerInfo(ipPort, data);
  } catch (error) {
    console.error(`Error fetching server ${ipPort}:`, error);
    return null;
  }
}
