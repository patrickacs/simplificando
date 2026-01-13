'use client';

import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import PageTransition from '@/components/transitions/PageTransition';

interface TemplateWrapperProps {
    children: React.ReactNode;
}

export default function TemplateWrapper({ children }: TemplateWrapperProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait" initial={false}>
            <PageTransition key={pathname}>
                {children}
            </PageTransition>
        </AnimatePresence>
    );
}
