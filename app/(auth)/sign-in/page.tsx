'use client'

import {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Google from "@/public/google.svg"
import { Button } from "@/components/ui/button"
import {Card,CardContent,CardDescription,CardFooter,CardTitle,CardHeader,CardAction} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useObservable } from '@legendapp/state/react';
import {login, auth$, googleAuth} from "@/store/auth.store";
import { fetchDestinations } from '@/store/destinations.store'
import { redirect} from 'next/navigation'

export default function SignIn(){
    const auth = useObservable(auth$);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {isLoading,isAuthenticated,errors,error}=auth.get();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await fetchDestinations()
        await login({email, password});

        setPassword('')
        setEmail('')

    }

    if(password.length > 1 || email.length > 0){
        auth.errors?.set(null)
        auth.error?.set(null)
    }

    if(isAuthenticated){
    console.log(isAuthenticated)
        redirect('/')
    }



    return(
        <div className="flex max-h-screen min-h-[100svh] flex-col justify-center items-center overflow-y-auto bg-linear-to-tr from-mineshaft-600 via-mineshaft-800 to-bunker-700 px-6">

            <div className="flex items-center space-x-2 py-8">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="text-sidebar-foreground text-3xl font-bold">Foxico</span>
            </div>

            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to Your Fixico account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">
                            <Link href={"/sign-up"} className='text-orange-500 hover:text-orange-400'>Sign Up</Link>
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            {error && (
                                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                                    {error}
                                </div>
                            )}

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <div>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />
                                    {errors?.email && <p className='text-sm text-destructive mt-1'>{errors?.email}</p>}
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline hover:text-orange-500"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="************"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                                {errors?.password && <p className='text-sm text-destructive mt-1'>{errors?.password}</p>}
                            </div>

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Logging in...' : 'Login'}
                            </Button>
                        </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button variant="outline" className="w-full" disabled={isLoading} onClick={googleAuth}>
                                <Image src={Google} alt="Google" width={20} height={20} />
                        <span>Login with Google</span>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}