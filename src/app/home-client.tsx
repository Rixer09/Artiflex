'use client';

import { useUser } from '@/hooks/use-user';
import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomeClient({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user.role) {
      router.push('/login');
    }
  }, [user, router]);

  return (
    <div className="container py-8 md:py-12">
      {children}
      {user.role === 'creator' && (
        <section className="text-center mt-16">
          <h2 className="text-3xl font-headline mb-4">Have an Idea?</h2>
          <p className="max-w-xl mx-auto text-foreground/80 mb-6">
            Bring your vision to life. Use our AI-powered tools to create and
            sell your own unique products.
          </p>
          <Link href="/create">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Start Your Creative Journey
            </Button>
          </Link>
        </section>
      )}
    </div>
  );
}
