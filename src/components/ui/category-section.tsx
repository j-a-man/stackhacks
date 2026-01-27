"use client";

import { motion } from "framer-motion";
import { LinkItem, Category } from "@/types";
import { LinkCard } from "@/components/ui/link-card";

interface CategorySectionProps {
    title: Category;
    links: LinkItem[];
    delay?: number;
}

export function CategorySection({ title, links, delay = 0 }: CategorySectionProps) {
    if (links.length === 0) return null;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="space-y-4"
        >
            <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold tracking-tight text-foreground">{title}</h2>
                <div className="h-px flex-1 bg-linear-to-r from-border to-transparent" />
            </div>

            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
                {links.map((link) => (
                    <LinkCard key={link.id} link={link} />
                ))}
            </div>
        </motion.section>
    );
}
