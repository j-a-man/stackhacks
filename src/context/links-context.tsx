"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { LinkItem } from "@/types";

interface LinksContextType {
    links: LinkItem[];
    addLink: (link: LinkItem) => void;
    updateLink: (link: LinkItem) => void;
    deleteLink: (id: string) => void;
    incrementClicks: (id: string) => void;
    resetLinks: (initialLinks: LinkItem[]) => void;
}

const LinksContext = createContext<LinksContextType | undefined>(undefined);

export function LinksProvider({ children }: { children: React.ReactNode }) {
    const [links, setLinks] = useState<LinkItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Load from API on mount
    useEffect(() => {
        fetch("/api/links")
            .then(res => res.json())
            .then(data => {
                setLinks(data);
                setLoading(false);
            });
    }, []);

    const saveToApi = async (updatedLinks: LinkItem[]) => {
        setLinks(updatedLinks);
        await fetch("/api/links", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedLinks),
        });
    };

    const addLink = (link: LinkItem) => {
        saveToApi([...links, link]);
    };

    const updateLink = (updatedLink: LinkItem) => {
        saveToApi(links.map(l => l.id === updatedLink.id ? updatedLink : l));
    };

    const deleteLink = (id: string) => {
        saveToApi(links.filter(l => l.id !== id));
    };

    const incrementClicks = (id: string) => {
        const updated = links.map(l => l.id === id ? { ...l, clicks: (l.clicks || 0) + 1 } : l);
        saveToApi(updated);
    };

    const resetLinks = (initialData: LinkItem[]) => {
        saveToApi(initialData);
    };

    return (
        <LinksContext.Provider value={{ links, addLink, updateLink, deleteLink, incrementClicks, resetLinks }}>
            {!loading && children}
        </LinksContext.Provider>
    );
}

export function useLinks() {
    const context = useContext(LinksContext);
    if (context === undefined) {
        throw new Error("useLinks must be used within a LinksProvider");
    }
    return context;
}
