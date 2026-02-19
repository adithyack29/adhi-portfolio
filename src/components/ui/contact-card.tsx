import React from 'react';
import { cn } from '@/lib/utils';
import {
    LucideIcon,
    PlusIcon,
} from 'lucide-react';

type ContactInfoProps = React.ComponentProps<'div'> & {
    icon: LucideIcon;
    label: string;
    value: string;
};

type ContactCardProps = React.ComponentProps<'div'> & {
    // Content props
    title?: string;
    description?: string;
    contactInfo?: ContactInfoProps[];
    formSectionClassName?: string;
};

export function ContactCard({
    title = 'Contact With Us',
    description = 'If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.',
    contactInfo,
    className,
    formSectionClassName,
    children,
    ...props
}: ContactCardProps) {
    return (
        <div
            className={cn(
                'border relative grid h-full w-full shadow md:grid-cols-2 lg:grid-cols-3',
                className,
            )}
            {...props}
        >
            <div className="flex flex-col justify-center lg:col-span-2 p-10 md:p-20">
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold md:text-5xl lg:text-7xl">
                        {title}
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
                        {description}
                    </p>
                    <div className="flex flex-col gap-6 mt-8">
                        {contactInfo?.map((info, index) => (
                            <ContactInfo key={index} {...info} />
                        ))}
                    </div>
                </div>
            </div>
            <div
                className={cn(
                    'flex h-full w-full items-center justify-center p-10 md:p-20 border-t md:col-span-1 md:border-t-0 md:border-l border-white/10',
                    formSectionClassName,
                )}
            >
                {children}
            </div>
        </div>
    );
}

function ContactInfo({
    icon: Icon,
    label,
    value,
    className,
    ...props
}: ContactInfoProps) {
    return (
        <div className={cn('flex items-center gap-3 py-3', className)} {...props}>
            <div className="bg-muted/40 rounded-lg p-3">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <p className="font-medium">{label}</p>
                <p className="text-muted-foreground text-xs">{value}</p>
            </div>
        </div>
    );
}
