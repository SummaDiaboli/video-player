import "./globals.css"
import { Inter } from "next/font/google"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
config.autoAddCss = false

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "Media Player",
    description: "A general media player",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-gray-900/90 text-white`}>
                {children}
            </body>
        </html>
    )
}
