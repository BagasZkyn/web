import { Gamepad2 } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <Gamepad2 className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
      <span className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
        SA-MP Hub
      </span>
    </Link>
  );
}
