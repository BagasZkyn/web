export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} SA-MP Hub. All rights reserved.</p>
        <p className="mt-1">
          SA-MP Hub is a fan-made website and is not affiliated with the official SA-MP team.
        </p>
      </div>
    </footer>
  );
}
