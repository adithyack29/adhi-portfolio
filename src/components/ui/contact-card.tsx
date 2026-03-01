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

type ContactCardProps = Omit<React.ComponentProps<'div'>, 'title'> & {
    // Content props
    title?: React.ReactNode;
    description?: React.ReactNode;
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
            {children && (
                <div
                    className={cn(
                        'flex h-full w-full items-center justify-center p-10 md:p-20 border-t md:col-span-1 md:border-t-0 md:border-l border-white/10',
                        formSectionClassName,
                    )}
                >
                    {children}
                </div>
            )}
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
        <div className={cn('flex items-center gap-4 py-3', className)} {...props}>
            <div className="bg-muted/40 rounded-lg p-4">
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <p className="text-xl font-medium">{label}</p>
                <p className="text-muted-foreground text-base">{value}</p>
            </div>
        </div>
    );
}
