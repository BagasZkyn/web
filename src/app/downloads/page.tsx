import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Monitor, Smartphone, HelpCircle, ListChecks } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface DownloadItem {
  platform: string;
  icon: React.ElementType;
  title: string;
  version: string;
  description: string;
  downloadLink: string;
  requirements?: string[];
  image?: string;
  imageHint?: string;
}

const downloadItems: DownloadItem[] = [
  {
    platform: 'Desktop',
    icon: Monitor,
    title: 'SA-MP Windows Client',
    version: '0.3.DL R2',
    description: 'The official SA-MP client for Windows. Requires GTA: San Andreas v1.0 US.',
    downloadLink: '#', // Placeholder
    requirements: ['Windows 7 or newer', 'GTA: San Andreas v1.0 US Hoodlum (No-CD)'],
    image: 'https://placehold.co/300x200.png',
    imageHint: 'windows computer',
  },
  {
    platform: 'Desktop',
    icon: Monitor, // Could use Terminal icon for Linux
    title: 'SA-MP Linux Client (Server)',
    version: '0.3.DL R1 (Server)',
    description: 'Linux server package. For playing, use Wine with the Windows client.',
    downloadLink: '#', // Placeholder
    requirements: ['Linux Distribution', 'Basic server knowledge'],
    image: 'https://placehold.co/300x200.png',
    imageHint: 'linux terminal',
  },
  {
    platform: 'Mobile',
    icon: Smartphone,
    title: 'SA-MP Android Client',
    version: '2.0 Lite',
    description: 'Play SA-MP on the go with the unofficial Android client. Requires game data.',
    downloadLink: '#', // Placeholder
    requirements: ['Android 5.0+', 'GTA: San Andreas game files'],
    image: 'https://placehold.co/300x200.png',
    imageHint: 'android phone',
  },
];

export default function DownloadsPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Download SA-MP
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Get the latest SA-MP clients for your preferred platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {downloadItems.map((item) => (
          <Card key={item.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
            {item.image && (
              <div className="relative h-48 w-full">
                 <Image src={item.image} alt={item.title} layout="fill" objectFit="cover" className="rounded-t-lg" data-ai-hint={item.imageHint}/>
              </div>
            )}
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <item.icon className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl font-semibold">{item.title}</CardTitle>
              </div>
              <CardDescription className="text-sm text-muted-foreground">Version: {item.version}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-foreground/80 mb-4">{item.description}</p>
              {item.requirements && item.requirements.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-1 flex items-center"><ListChecks className="h-4 w-4 mr-2 text-primary"/>Requirements:</h4>
                  <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                    {item.requirements.map(req => <li key={req}>{req}</li>)}
                  </ul>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href={item.downloadLink}>
                  <Download className="mr-2 h-5 w-5" /> Download
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 p-6 bg-secondary/30 rounded-lg shadow">
        <div className="flex items-start">
            <HelpCircle className="h-8 w-8 text-accent mr-4 shrink-0 mt-1" />
            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Important Notes</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Ensure you have a legitimate copy of Grand Theft Auto: San Andreas. SA-MP is a multiplayer modification and does not include the base game.</li>
                <li>For the Windows client, it is highly recommended to use GTA: San Andreas v1.0 US version. Other versions may not be compatible.</li>
                <li>The Android client is an unofficial project. Use at your own discretion and follow their installation guides carefully.</li>
                <li>Always download SA-MP clients from official or trusted sources to avoid malware.</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
}
