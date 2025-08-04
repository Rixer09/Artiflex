import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container flex items-center justify-between py-6">
        <div className="flex items-center space-x-2">
          <Zap className="h-6 w-6 text-primary" />
          <p className="text-sm font-medium font-headline">Artiflex</p>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Artiflex Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
