import { LinkItem } from "@/types";

export const initialLinks: LinkItem[] = [
    {
        id: "1",
        title: "StackHacks 2024 Registration",
        url: "https://stackhacks.io/register",
        description: "Sign up now for Binghamton's largest hackathon!",
        category: "Events",
        icon: "Rocket",
        clicks: 124,
        featured: true
    },
    {
        id: "2",
        title: "Join our Discord",
        url: "https://discord.gg/stackhacks",
        description: "Connect with over 1000+ student developers.",
        category: "Social",
        icon: "MessageCircle",
        clicks: 85
    },
    {
        id: "3",
        title: "Sponsorship Deck",
        url: "https://stackhacks.io/sponsor",
        description: "Interested in sponsoring? Check out our prospectus.",
        category: "Resources",
        icon: "FileText",
        clicks: 42
    },
    {
        id: "4",
        title: "Volunteer Application",
        url: "https://forms.google.com/...",
        category: "Join Us",
        icon: "Heart",
        clicks: 15
    },
    {
        id: "5",
        title: "Instagram",
        url: "https://instagram.com/stackhacks",
        category: "Social",
        icon: "Instagram",
        clicks: 220
    },
    {
        id: "6",
        title: "Past Projects Gallery",
        url: "https://stackhacks.io/gallery",
        description: "See what was built in previous years.",
        category: "Resources",
        icon: "Image",
        clicks: 56
    }
];
