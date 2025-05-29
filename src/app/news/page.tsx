import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CalendarDays } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { NewsArticle } from '@/types';

const MOCK_NEWS_ARTICLES: NewsArticle[] = [
  {
    id: '1',
    title: 'SA-MP 0.3.DL R2 Update Released!',
    date: 'August 15, 2024',
    summary: 'A new update for SA-MP 0.3.DL R2 is now available, bringing critical bug fixes and performance improvements. Download now from our downloads page!',
    imageUrl: 'https://placehold.co/600x300.png',
    imageHint: 'update software',
    slug: 'samp-03dl-r2-update',
  },
  {
    id: '2',
    title: 'Community Spotlight: Top Servers of July 2024',
    date: 'August 5, 2024',
    summary: 'Check out our monthly roundup of the most popular and innovative SA-MP servers. See if your favorite made the list and discover new places to play!',
    imageUrl: 'https://placehold.co/600x300.png',
    imageHint: 'gaming community',
    slug: 'community-spotlight-july-2024',
  },
  {
    id: '3',
    title: 'New Scripting Features Announced for Upcoming SA-MP Version',
    date: 'July 28, 2024',
    summary: 'The SA-MP team has teased new scripting functions and capabilities that will be available in the next major release. Get ready for even more creative freedom!',
    imageUrl: 'https://placehold.co/600x300.png',
    imageHint: 'code programming',
    slug: 'new-scripting-features-teased',
  },
  {
    id: '4',
    title: 'SA-MP Mobile: Android Client Reaches New Milestone',
    date: 'July 20, 2024',
    summary: 'The unofficial SA-MP Android client has received a significant update, improving compatibility and performance on a wider range of devices.',
    imageUrl: 'https://placehold.co/600x300.png',
    imageHint: 'mobile gaming',
    slug: 'samp-android-milestone',
  },
];

export default function NewsPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          News &amp; Updates
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Stay informed with the latest announcements and developments in the SA-MP world.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_NEWS_ARTICLES.map((article) => (
          <Card key={article.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            {article.imageUrl && (
              <div className="relative h-48 w-full">
                 <Image 
                    src={article.imageUrl} 
                    alt={article.title} 
                    layout="fill" 
                    objectFit="cover" 
                    className="rounded-t-lg"
                    data-ai-hint={article.imageHint}
                 />
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl font-semibold hover:text-primary transition-colors">
                <Link href={`/news/${article.slug}`}>{article.title}</Link>
              </CardTitle>
              <CardDescription className="flex items-center text-sm">
                <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                {article.date}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-foreground/80 line-clamp-3">{article.summary}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/news/${article.slug}`}>
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

// You would typically create a dynamic route [slug]/page.tsx for individual news articles
// For example, src/app/news/[slug]/page.tsx
// This is a simplified version showing only the list.
