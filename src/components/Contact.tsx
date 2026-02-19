"use client";
import React from "react";
import { ContactCard } from "@/components/ui/contact-card";
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';

export default function Contact() {
    return (
        <section id="contact" className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center pt-24 md:pt-32 pb-16">
            <div className="w-full flex-grow flex items-center justify-center">
                <ContactCard
                    title="Let's Create"
                    description="Ready to start your project? Reach out to me directly."
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
                />
            </div>
        </section>
    );
}
