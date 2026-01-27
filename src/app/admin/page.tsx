"use client";

import { useState } from "react";
import { useLinks } from "@/context/links-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { LinkItem, Category } from "@/types";
import { initialLinks } from "@/data/links";
import Link from "next/link";
import { Trash2, Edit, Plus, ChevronLeft, Save, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminPage() {
    const { links, addLink, updateLink, deleteLink, resetLinks } = useLinks();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    // Simple auth
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "stackhacks") {
            setIsAuthenticated(true);
        } else {
            alert("Incorrect password");
        }
    };

    const categories: Category[] = ["Events", "Resources", "Social", "Join Us", "Other"];

    const EMPTY_LINK: LinkItem = {
        id: "",
        title: "",
        url: "",
        description: "",
        category: "Other",
        icon: "Link",
        clicks: 0
    };

    const [formData, setFormData] = useState<LinkItem>(EMPTY_LINK);

    const startEdit = (link: LinkItem) => {
        setEditingLink(link);
        setFormData(link);
        setIsAdding(false);
    };

    const startAdd = () => {
        setFormData({ ...EMPTY_LINK, id: crypto.randomUUID() }); // Basic UUID if uuid package not avail, but crypto works in modern browsers
        setIsAdding(true);
        setEditingLink(null);
    };

    const handleSave = () => {
        if (!formData.title || !formData.url) {
            alert("Title and URL are required");
            return;
        }

        if (isAdding) {
            addLink({ ...formData, id: crypto.randomUUID() });
        } else {
            updateLink(formData);
        }

        setEditingLink(null);
        setIsAdding(false);
    };

    const handleCancel = () => {
        setEditingLink(null);
        setIsAdding(false);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <AnimatedBackground />
                <Card className="w-full max-w-md bg-black/50 backdrop-blur-md border-white/10">
                    <CardHeader>
                        <CardTitle className="text-center">Admin Access</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <Input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit" className="w-full">Login</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-8">
            <AnimatedBackground />

            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="outline" size="icon">
                                <ChevronLeft size={20} />
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold">Manage Links</h1>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => resetLinks(initialLinks)}>
                            Reset Data
                        </Button>
                        <Button onClick={startAdd}>
                            <Plus size={16} className="mr-2" /> Add Link
                        </Button>
                    </div>
                </div>

                {/* Edit/Add Form Overlay */}
                {(isAdding || editingLink) && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <Card className="w-full max-w-lg bg-card border-white/20">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>{isAdding ? "Add New Link" : "Edit Link"}</CardTitle>
                                <Button variant="ghost" size="icon" onClick={handleCancel}>
                                    <X size={20} />
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Title</label>
                                    <Input
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Link Title"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">URL</label>
                                    <Input
                                        value={formData.url}
                                        onChange={e => setFormData({ ...formData, url: e.target.value })}
                                        placeholder="https://..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Description</label>
                                    <Input
                                        value={formData.description || ""}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Optional description"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Category</label>
                                        <select
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                            value={formData.category}
                                            onChange={e => setFormData({ ...formData, category: e.target.value as Category })}
                                        >
                                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Icon Name</label>
                                        <Input
                                            value={formData.icon || ""}
                                            onChange={e => setFormData({ ...formData, icon: e.target.value })}
                                            placeholder="e.g. Github, ExternalLink"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={formData.featured || false}
                                        onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <label htmlFor="featured" className="text-sm font-medium">Featured Link</label>
                                </div>
                                <div className="flex justify-end gap-2 pt-4">
                                    <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                                    <Button onClick={handleSave}>
                                        <Save size={16} className="mr-2" /> Save Link
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Link List */}
                <div className="grid gap-4">
                    {links.map((link) => (
                        <Card key={link.id} className="bg-card/50 hover:bg-card/80 transition-colors">
                            <CardContent className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-4 overflow-hidden">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-primary/20 text-primary">
                                        {/* Just generic or actual icon if willing to render dynamic here too */}
                                        <span className="text-xs font-bold">{link.clicks}</span>
                                    </div>
                                    <div className="grid gap-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold truncate">{link.title}</h3>
                                            {link.featured && <Badge>Featured</Badge>}
                                            <Badge variant="secondary" className="text-[10px]">{link.category}</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground truncate">{link.url}</p>
                                    </div>
                                </div>

                                <div className="flex gap-2 shrink-0">
                                    <Button variant="ghost" size="icon" onClick={() => startEdit(link)}>
                                        <Edit size={18} />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => deleteLink(link.id)}>
                                        <Trash2 size={18} />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {links.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            No links yet. Add one to get started.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
