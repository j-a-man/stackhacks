import Link from "next/link";
import { Terminal } from "lucide-react";

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                    <div className="flex h-8 w-8 items-center justify-center rounded overflow-hidden border border-white/10">
                        <img src="/stackhacks_image.webp" alt="S" className="h-full w-full object-cover" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-foreground">StackHacks</span>
                </Link>
            </div>
        </header>
    );
}
