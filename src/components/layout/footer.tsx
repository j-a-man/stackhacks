import { Github, Instagram, Mail, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-background/50 py-12 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center gap-6">
                    <div className="flex items-center gap-6">
                        <a href="https://github.com/stackhacksbu" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary hover:scale-110 transform duration-200">
                            <Github size={24} />
                            <span className="sr-only">GitHub</span>
                        </a>
                        <a href="https://www.instagram.com/stackhacksbu/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary hover:scale-110 transform duration-200">
                            <Instagram size={24} />
                            <span className="sr-only">Instagram</span>
                        </a>
                        <a href="https://linkedin.com/company/stackhacks" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary hover:scale-110 transform duration-200">
                            <Linkedin size={24} />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                        <a href="mailto:stackhacks@binghamton.edu" className="text-muted-foreground transition-colors hover:text-primary hover:scale-110 transform duration-200">
                            <Mail size={24} />
                            <span className="sr-only">Email</span>
                        </a>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                            &copy; {new Date().getFullYear()} StackHacks at Binghamton University. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
