"use client";

import { motion } from "framer-motion";
import { LinkItem } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as Icons from "lucide-react";
import { ExternalLink } from "lucide-react";
import { useLinks } from "@/context/links-context";

interface LinkCardProps {
    link: LinkItem;
}

export function LinkCard({ link }: LinkCardProps) {
    const { incrementClicks } = useLinks();

    // Dynamically resolve icon
    const IconComponent = link.icon && (Icons as any)[link.icon]
        ? (Icons as any)[link.icon]
        : ExternalLink;

    const handleClick = () => {
        incrementClicks(link.id);
    };

    return (
        <motion.a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClick}
        >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80 hover:shadow-[0_0_30px_-5px_var(--primary)] hover:shadow-primary/20">
                <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <IconComponent size={24} />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold tracking-tight text-foreground truncate group-hover:text-primary transition-colors">
                                {link.title}
                            </h3>
                            {link.featured && (
                                <Badge variant="secondary" className="text-[10px] h-5 px-1.5 uppercase tracking-wider">
                                    Featured
                                </Badge>
                            )}
                        </div>
                        {link.description && (
                            <p className="text-sm text-muted-foreground truncate group-hover:text-muted-foreground/80 transition-colors">
                                {link.description}
                            </p>
                        )}
                    </div>

                    <div className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                        <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary" />
                    </div>
                </CardContent>
            </Card>
        </motion.a>
    );
}
