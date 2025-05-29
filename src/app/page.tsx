import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Server, Smartphone, Users, Newspaper, Download, Info } from 'lucide-react';
import type { NewsArticle } from '@/types';

const MOCK_NEWS: NewsArticle[] = [
  {
    id: '1',
    title: 'SA-MP 0.3.DL R2 Update Released!',
    date: 'August 15, 2024',
    summary: 'A new update for SA-MP 0.3.DL R2 is now available, bringing critical bug fixes and performance improvements. Download now!',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'code computer',
    slug: 'samp-03dl-r2-update',
  },
  {
    id: '2',
    title: 'Community Spotlight: Top Servers of July',
    date: 'August 5, 2024',
    summary: 'Check out our monthly roundup of the most popular and innovative SA-MP servers. See if your favorite made the list!',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'gaming community',
    slug: 'community-spotlight-july',
  },
];

const features = [
  {
    icon: Server,
    title: 'Vast Server Universe',
    description: 'Explore thousands of unique servers with diverse game modes, from roleplay to deathmatch.',
  },
  {
    icon: Smartphone,
    title: 'Cross-Platform Play',
    description: 'Enjoy SA-MP on both desktop and Android devices. The fun never stops, wherever you are.',
  },
  {
    icon: Users,
    title: 'Vibrant Community',
    description: 'Join a passionate global community of players, scripters, and server owners.',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary to-blue-700 text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Welcome to SA-MP Hub
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto">
            Your central place for San Andreas Multiplayer. Find servers, download clients, get the latest news, and connect with the community.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/downloads">
                Download Client <Download className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground/10">
              <Link href="/servers">
                Browse Servers <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Why SA-MP?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News Preview Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Latest News</h2>
            <Button asChild variant="link" className="text-primary hover:text-accent">
              <Link href="/news">
                View All News <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_NEWS.slice(0, 2).map((article) => (
              <Card key={article.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                {article.imageUrl && (
                  <div className="aspect-video relative">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      layout="fill"
                      objectFit="cover"
                      data-ai-hint={article.imageHint}
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{article.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{article.date}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{article.summary}</p>
                   <Button asChild variant="outline">
                     <Link href={`/news/${article.slug}`}>Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                   </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action (About) */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Info className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-foreground">
            Curious About SA-MP?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn more about the history, goals, and vibrant community behind San Andreas Multiplayer.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90">
            <Link href="/about">
              Discover SA-MP <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
