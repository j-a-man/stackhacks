export type Category = "Events" | "Resources" | "Social" | "Join Us" | "Other";

export interface LinkItem {
    id: string;
    title: string;
    url: string;
    description?: string;
    icon?: string; // We'll map string names to Lucide icons
    category: Category;
    clicks: number;
    featured?: boolean;
}

export interface CategoryGroup {
    name: Category;
    links: LinkItem[];
}
