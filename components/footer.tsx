import Image from "next/image"
import ThemeSelector from "./theme-selector"

export default function Footer() {
    return (
        <footer className="bg-[#0D0923] py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <div className="flex flex-col items-center">
                            <Image
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NS-Isotipo_blanco-g1yVsmA9mL5ufhgw3XyHqT5gIIX6ie.png"
                                alt="Nightly Software Icon"
                                width={50}
                                height={50}
                                className="h-12 w-auto mb-2"
                            />
                            <div className="flex items-center gap-3 mt-2">
                                <div className="h-[1px] w-10 bg-[#7D5683]/50"></div>
                                <p className="text-[#DADFFE]/70 text-sm">De noche, creamos el mañana</p>
                                <div className="h-[1px] w-10 bg-[#7D5683]/50"></div>
                            </div>
                            {/* Social Media Links */}
                            <div className="flex justify-start gap-6 mt-8">
                                <a href="https://www.instagram.com/nightlysoftware/" className="text-[#DADFFE] hover:text-[#B5C7FF] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"/></svg>
                                    <span className="sr-only">Instagram</span>
                                </a>
                                <a href="https://www.facebook.com/nightlysoftware" className="text-[#DADFFE] hover:text-[#B5C7FF] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02"/></svg>
                                    <span className="sr-only">Facebook</span>
                                </a>
                                <a href="https://x.com/NightlySoftware" className="text-[#DADFFE] hover:text-[#B5C7FF] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.2 4.2 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.52 8.52 0 0 1-5.33 1.84q-.51 0-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23"/></svg>
                                    <span className="sr-only">Twitter</span>
                                </a>
                                <a href="https://www.linkedin.com/company/nightlysoftware/" className="text-[#DADFFE] hover:text-[#B5C7FF] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"/></svg>
                                    <span className="sr-only">LinkedIn</span>
                                </a>
                                <a href="https://github.com/NightlySoftware" className="text-[#DADFFE] hover:text-[#B5C7FF] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg>
                                    <span className="sr-only">GitHub</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-6">
                        <div className="flex gap-6">
                            <a href="#" className="text-[#DADFFE] hover:text-[#B5C7FF] transition-colors">
                                Términos
                            </a>
                            <a href="#" className="text-[#DADFFE] hover:text-[#B5C7FF] transition-colors">
                                Privacidad
                            </a>
                            <a href="#" className="text-[#DADFFE] hover:text-[#B5C7FF] transition-colors">
                                Contacto
                            </a>
                        </div>
                        <ThemeSelector />
                    </div>
                </div>
                <div className="border-t border-[#7D5683]/20 mt-8 pt-8 text-center text-[#DADFFE]/50 text-sm">
                    &copy; {new Date().getFullYear()} Nightly Software. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}
