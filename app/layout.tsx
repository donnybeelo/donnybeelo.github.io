import "./global.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "./components/nav";
import Footer from "./components/footer";
import { baseUrl } from "@/src/sitemap";

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: {
		default: "Daniel Elia",
		template: "%s | Daniel Elia",
	},
	description: "This is my portfolio.",
	icons: {
		icon: "/favicon.png",
	},
	openGraph: {
		title: "Daniel Elia",
		description: "The official Daniel Elia portfolio.",
		url: baseUrl,
		siteName: "Daniel Elia",
		locale: "en_GB",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

const cx: (...classes: (string | undefined | null | false)[]) => string = (
	...classes
) => classes.filter(Boolean).join(" ");

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={cx(
				"text-black bg-white dark:text-white dark:bg-black",
				geistSans.variable,
				geistMono.variable
			)}
		>
			<body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
				<main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
					<Navbar />
					{children}
					<Footer />
				</main>
			</body>
		</html>
	);
}
