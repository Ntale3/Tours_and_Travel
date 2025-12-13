"use client"
import { Button } from "@/components/ui/button"
import Google from "@/public/google.svg"
import {Card,CardContent,CardDescription,CardFooter,CardTitle,CardHeader,CardAction} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import React, { useState } from "react"
import {redirect} from "next/navigation"
import {auth$, register,googleAuth} from "@/store/auth.store"
import { useObservable } from "@legendapp/state/react"
import { fetchDestinations } from "@/store/destinations.store"

export default function SignUp(){
     const auth = useObservable(auth$);
    const {isLoading,isAuthenticated,errors,error}=auth.get();


    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
        password_confirmation: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData(prev => ({ ...prev, [id]: value }))
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await register(formData)
        await fetchDestinations()
        setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
        password_confirmation: ""
        })
    }

    if(formData.email.length>=1 ||
    formData.first_name.length >=1 ||
    formData.last_name.length>=1 ||
    formData.phone_number.length>=1 ||
    formData.password.length>=1 ||
    formData.password_confirmation.length>=1){
    auth$.error.set(null)
    auth$.errors.set(null)
    }

    if(isAuthenticated){
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

            <Card className="w-full max-w-sm py-4">
                <CardHeader>
                    <CardTitle>Create Account</CardTitle>
                    <CardDescription>
                        Enter Valid Information to create account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">

                            {error&& (
                                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <Label htmlFor="first_name">FirstName</Label>
                                <div className="flex flex-col">
                                    <Input
                                        id="first_name"
                                        type="text"
                                        placeholder="first name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors?.first_name && (
                                        <p className="text-sm text-destructive mt-1">{errors.first_name}</p>
                                    )}
                                </div>

                                <Label htmlFor="last_name">LastName</Label>
                                <div className="flex flex-col">
                                    <Input
                                        id="last_name"
                                        type="text"
                                        placeholder="last name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors?.last_name && (
                                        <p className="text-sm text-destructive mt-1">{errors.last_name}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="flex flex-col">
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors?.email && (
                                        <p className="text-sm text-destructive mt-1">{errors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <Label htmlFor="phone_number">Phone</Label>
                                <div className="flex flex-col">
                                    <Input
                                        id="phone_number"
                                        type="tel"
                                        placeholder="+256 700 000000"
                                        value={formData.phone_number}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors?.phone_number && (
                                        <p className="text-sm text-destructive mt-1">{errors.phone_number}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <div className="flex flex-col">
                                    <Input
                                        id="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors?.password && (
                                        <p className="text-sm text-destructive mt-1">{errors.password}</p>
                                    )}
                                </div>

                                <div className="flex items-center">
                                    <Label htmlFor="password_confirmation">Confirm</Label>
                                </div>
                                <div className="flex flex-col">
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={formData.password_confirmation}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors?.password_confirmation && (
                                        <p className="text-sm text-destructive mt-1">{errors.password_confirmation}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-2">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Creating Account..." : "SignUp"}
                            </Button>

                            <Button type="button" variant="outline" className="w-full" onClick={googleAuth}>
                                <Image src={Google} alt="Google" width={20} height={20} />
                                <span>Login with Google</span>
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <div className="flex items-center">
                        <p>Have an Account ?</p>
                        <CardAction>
                            <Button variant="link">
                                <Link href={"/sign-in"} className="hover:underline text-orange-500 hover:text-orange-400">Sign In</Link>
                            </Button>
                        </CardAction>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}