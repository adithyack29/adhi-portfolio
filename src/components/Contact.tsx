"use client";
import React, { useState } from "react";
import { ContactCard } from "@/components/ui/contact-card";
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) setStatus("success");
            else setStatus("error");
        } catch {
            setStatus("error");
        }
    }

    return (
        <section id="contact" className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center pt-32 pb-16">
            <div className="w-full flex-grow flex items-center justify-center">
                <ContactCard
                    title="Let's Create"
                    description="Ready to start your project? Fill out the form below and I'll get back to you within 24 hours."
                    contactInfo={[
                        {
                            icon: MailIcon,
                            label: 'Email',
                            value: 'adithyakannur80@gmail.com',
                        },
                        {
                            icon: PhoneIcon,
                            label: 'Phone',
                            value: '+91 6363936971',
                        },
                        {
                            icon: MapPinIcon,
                            label: 'Location',
                            value: 'Bengaluru , India',
                            className: 'col-span-2',
                        }
                    ]}
                    className="border-none bg-black rounded-none flex-grow"
                >
                    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-4 py-8 md:py-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="name" className="text-white">Name</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="bg-zinc-900/50 border-white/10 text-white placeholder:text-gray-500"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email" className="text-white">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="bg-zinc-900/50 border-white/10 text-white placeholder:text-gray-500"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="projectType" className="text-white">Project Type</Label>
                            <select
                                id="projectType"
                                name="projectType"
                                required
                                className="flex h-10 w-full rounded-md border border-white/10 bg-zinc-900/50 px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                            >
                                <option value="Ad">AI Video Ad</option>
                                <option value="Reel">Reel / Short Form</option>
                                <option value="Website">Web Development</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="message" className="text-white">Message</Label>
                            <Textarea
                                id="message"
                                name="message"
                                required
                                rows={6}
                                className="bg-zinc-900/50 border-white/10 text-white placeholder:text-gray-500"
                                placeholder="Tell me about your project..."
                            />
                        </div>
                        <Button
                            className="w-full bg-white text-black hover:bg-gray-200 py-6 text-lg font-bold"
                            type="submit"
                            disabled={status === "loading"}
                        >
                            {status === "loading" ? "Sending..." : "Send Message"}
                        </Button>

                        {status === "success" && (
                            <p className="text-green-500 text-center font-bold mt-2 text-sm">Message Sent Successfully!</p>
                        )}
                        {status === "error" && (
                            <p className="text-red-500 text-center font-bold mt-2 text-sm">Something went wrong.</p>
                        )}
                    </form>
                </ContactCard>
            </div>
        </section>
    );
}
