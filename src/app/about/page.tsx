import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, History, Target, VenetianMask, Sparkles, Puzzle } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          About SA-MP
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover the story, mission, and vibrant community behind San Andreas Multiplayer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <Image 
            src="https://placehold.co/600x400.png" 
            alt="SA-MP Gameplay Screenshot" 
            width={600} 
            height={400} 
            className="rounded-lg shadow-xl"
            data-ai-hint="gaming multiplayer" 
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-primary flex items-center">
            <VenetianMask className="h-8 w-8 mr-3" /> What is SA-MP?
          </h2>
          <p className="text-lg text-foreground/80">
            San Andreas Multiplayer (SA-MP) is a free Massively Multiplayer Online game mod for the PC version of Rockstar Games' Grand Theft Auto: San Andreas. 
            It allows users to play GTA: San Andreas with hundreds of other players over the internet or LAN.
          </p>
          <p className="text-lg text-foreground/80">
            In SA-MP, you can engage in a variety of activities, from structured game modes like roleplay, racing, and deathmatch, to unique, custom-scripted scenarios created by the community. The possibilities are virtually limitless!
          </p>
        </div>
      </div>

      <div className="space-y-16">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-primary flex items-center">
              <History className="h-7 w-7 mr-3" /> Our History
            </CardTitle>
          </CardHeader>
          <CardContent className="text-foreground/80 space-y-3 text-base">
            <p>
              SA-MP began its journey in the mid-2000s, born from the desire to bring a true multiplayer experience to the beloved world of San Andreas. 
              It quickly grew from a small project into a massive community, driven by dedicated developers and passionate players.
            </p>
            <p>
              Over the years, SA-MP has seen numerous updates, each enhancing stability, adding new features, and expanding the capabilities for server scripters. 
              It has stood the test of time, remaining a popular choice for multiplayer GTA action even with newer titles available.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-primary flex items-center">
              <Target className="h-7 w-7 mr-3" /> Our Mission & Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="text-foreground/80 space-y-3 text-base">
            <p>
              The core mission of SA-MP has always been to provide a stable, flexible, and engaging multiplayer platform for GTA: San Andreas. 
              Key goals include:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-2">
              <li><Puzzle className="inline h-5 w-5 mr-1 text-accent" />Empowering scripters with powerful tools to create unique game modes.</li>
              <li><Sparkles className="inline h-5 w-5 mr-1 text-accent" />Fostering a creative and collaborative community environment.</li>
              <li>Maintaining compatibility and performance for a wide range of PC setups.</li>
              <li>Offering a free and accessible multiplayer experience for all GTA: San Andreas owners.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-primary flex items-center">
              <Users className="h-7 w-7 mr-3" /> The SA-MP Community
            </CardTitle>
          </CardHeader>
          <CardContent className="text-foreground/80 space-y-3 text-base">
            <p>
              The heart of SA-MP is its community. Players, server owners, scripters, mappers, and content creators all contribute to making SA-MP what it is today.
              From bustling roleplay cities to intense gang wars, the community drives the innovation and diversity of experiences available.
            </p>
            <p>
              Forums, Discord servers, and community websites (like SA-MP Hub!) serve as gathering places for players to share ideas, find servers, and collaborate on projects. 
              It's a testament to the enduring appeal of San Andreas and the creativity of its fans.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
