import { LinkItem } from "@/types";

export const initialLinks: LinkItem[] = [
    {
        id: "1",
        title: "Project Teams",
        url: "https://docs.google.com/forms/d/1Usv1bTCmXlVacEkYjwUCDVdYKe9SLtQPpRhQcMLY3rE/edit",
        description: "Apply to join a StackHacks Project Team!",
        category: "Join Us",
        icon: "Users",
        clicks: 0,
        featured: true
    },
    {
        id: "2",
        title: "VP of Marketing Application",
        url: "https://docs.google.com/forms/d/1ii-rgx3H_djOGeMlLeT27tF9Xgpb8TgNhKxjP7W_64M/edit",
        description: "Apply to be our VP of Marketing!",
        category: "Join Us",
        icon: "Megaphone",
        clicks: 0,
        featured: true
    },
    {
        id: "3",
        title: "Instagram",
        url: "https://www.instagram.com/stackhacksbu/",
        category: "Social",
        icon: "Instagram",
        clicks: 220
    },
    {
        id: "4",
        title: "GitHub",
        url: "https://github.com/stackhacksbu",
        description: "See what was built in previous years.",
        category: "Resources",
        icon: "Github",
        clicks: 57
    }
];
