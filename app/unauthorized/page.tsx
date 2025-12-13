'use client';

import { useRouter } from 'next/navigation';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function UnauthorizedPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                        <ShieldAlert className="w-8 h-8 text-destructive" />
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="text-2xl font-bold">
                            Access Denied
                        </CardTitle>
                        <CardDescription className="text-base">
                            You don't have permission to access this page
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="text-center space-y-4">
                    <p className="text-sm text-muted-foreground">
                        This page is restricted to authorized users only. If you believe this is an error, please contact your administrator.
                    </p>
                </CardContent>

                <CardFooter className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button
                        variant="outline"
                        onClick={() => router.back()}
                        className="w-full sm:w-auto"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </Button>
                    <Button
                        onClick={() => router.push('/')}
                        className="w-full sm:w-auto"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Go Home
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}