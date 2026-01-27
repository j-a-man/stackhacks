"use client";

import { LinksProvider } from "@/context/links-context";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <LinksProvider>
            {children}
        </LinksProvider>
    );
}
