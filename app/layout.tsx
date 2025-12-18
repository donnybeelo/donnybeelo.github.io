import "./global.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Fira_Mono } from "next/font/google";
import { Navbar } from "./components/nav";
import Footer from "./components/footer";
import { baseUrl } from "@/app/sitemap";
import AnimationLayer from "./animationLayer";

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: {
		default: "Daniel Elia",
		template: "%s - Daniel Elia",
	},
	description: "This is my portfolio.",
	icons: {
		icon: "/icons/favicon.png",
	},
	openGraph: {
		title: "Daniel Elia",
		description:
			"I'm a developer based in Birmingham with a passion for making simple, effective and beautiful user experiences.",
		url: baseUrl,
		siteName: "donnybeelo",
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

const momo = localFont({
	src: "../public/fonts/MomoTrustSans.ttf",
	variable: "--fontMomo",
	display: "swap",
});

const momoDisplay = localFont({
	src: "../public/fonts/MomoTrustDisplay.ttf",
	variable: "--fontMomoDisplay",
	display: "swap",
});

const firaMono = Fira_Mono({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--fontFiraMono",
	display: "swap",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${momo.variable} ${firaMono.variable} ${momoDisplay.variable} text-black bg-white dark:text-white dark:bg-black`}
		>
			<head>
				<meta name="google-site-verification" content="cAMk5v21nH2-yXJt3nPCjjdPSWECBoZm75aAK8tvQIo" />
			</head>
			<body className="fontMomo antialiased max-w-3xl mt-8 mx-auto">
				<main className="flex-auto min-w-0 mt-6 flex flex-col mx-6">
					<Navbar />
					<AnimationLayer>{children}</AnimationLayer>
					<Footer />
				</main>
			</body>
		</html>
	);
}
