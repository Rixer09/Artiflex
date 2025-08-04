'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/hooks/use-user';
import { useRouter } from 'next/navigation';
import { User, Briefcase } from 'lucide-react';

export default function LoginPage() {
  const { setUserRole } = useUser();
  const router = useRouter();

  const handleRoleSelection = (role: 'customer' | 'creator') => {
    setUserRole(role);
    router.push('/');
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-150px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Welcome to Artiflex</CardTitle>
          <CardDescription>First, let's get to know you. Are you here to shop or to create?</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
          <Button variant="outline" className="h-24 flex-col" onClick={() => handleRoleSelection('customer')}>
            <User className="h-8 w-8 mb-2" />
            <span>I'm a Customer</span>
          </Button>
          <Button variant="outline" className="h-24 flex-col" onClick={() => handleRoleSelection('creator')}>
            <Briefcase className="h-8 w-8 mb-2" />
            <span>I'm a Creator</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
