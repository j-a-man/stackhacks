"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CategorySection } from "@/components/ui/category-section";
import { LinkCard } from "@/components/ui/link-card";
import { Input } from "@/components/ui/input";
import { initialLinks } from "@/data/links";
import { LinkItem, Category } from "@/types";
import { useLinks } from "@/context/links-context";

// Wrapper component to handle the context or fallback
function HomeContent() {
  const { links } = useLinks();
  const [searchQuery, setSearchQuery] = useState("");

  // Group links by category
  const groupedLinks = useMemo(() => {
    // Filter by search
    const filtered = links.filter(link =>
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Grouping
    const groups: Record<string, LinkItem[]> = {};
    const categories: Category[] = ["Events", "Resources", "Social", "Join Us", "Other"];

    categories.forEach(cat => {
      groups[cat] = filtered.filter(l => l.category === cat);
    });

    // Handle any links with categories not in the main list
    const otherLinks = filtered.filter(l => !categories.includes(l.category));
    if (otherLinks.length > 0) {
      groups["Other"] = [...(groups["Other"] || []), ...otherLinks];
    }

    return groups;
  }, [links, searchQuery]);

  const categories: Category[] = ["Events", "Resources", "Social", "Join Us", "Other"];

  return (
    <>
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12 max-w-2xl">
        <div className="space-y-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <div className="flex justify-center mb-6">
              <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-2xl overflow-hidden border-2 border-primary/20 bg-black/40 backdrop-blur-md shadow-[0_0_30px_-5px_var(--primary)] shadow-primary/30">
                <img
                  src="/stackhacks_image.webp"
                  alt="StackHacks Logo"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              @stackhacks
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-linear-to-r from-primary via-secondary to-primary bg-size-[200%_auto] animate-gradient">
              StackHacks Links
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              All of StackHacks's links in one place.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search links..."
              className="pl-10 bg-background/50 backdrop-blur-sm border-white/10 focus:border-primary/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>

          {/* Featured Links */}
          {links.filter(l => l.featured).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="space-y-4"
            >
              {links.filter(l => l.featured).map((link) => (
                <LinkCard key={link.id} link={link} />
              ))}
            </motion.div>
          )}

          {/* Categories */}
          <div className="space-y-8">
            {categories.map((category, index) => (
              groupedLinks[category] && groupedLinks[category].length > 0 && (
                <CategorySection
                  key={category}
                  title={category}
                  links={groupedLinks[category]}
                  delay={0.2 + index * 0.1}
                />
              )
            ))}

            {/* Show message if no results */}
            {Object.values(groupedLinks).every(g => g.length === 0) && (
              <div className="text-center py-12 text-muted-foreground">
                <p>No links found matching &quot;{searchQuery}&quot;</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen relative flex flex-col">
      <AnimatedBackground />
      <Header />
      <HomeContent />
      <Footer />
    </div>
  );
}
