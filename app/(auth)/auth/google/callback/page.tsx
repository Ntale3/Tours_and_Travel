'use client';
import { useEffect } from 'react';
import { handleGoogleCallback } from '@/store/auth.store';
import { Loader2 } from 'lucide-react';

export default function GoogleCallbackPage() {
    useEffect(() => {
    handleGoogleCallback();
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="text-center">
                <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-orange-500" />
                <p className="text-lg text-foreground">Completing Google sign-in...</p>
            </div>
        </div>
    );
}