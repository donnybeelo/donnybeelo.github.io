"use client";

import Typer from "./components/typer";
import bauhaus from "@/public/bauhaus.svg";
import bauhausDark from "@/public/bauhaus-dark.svg";
import { ShinyButton } from "./components/shinyButton";
import { useEffect, useState } from "react";

const TAGLINES = [
	"who builds things properly when the existing option almost works.",
	"with a habit of fixing things nobody asked me to fix.",
	"who once spent a week getting Solitaire working properly on Linux.",
	"who reimplemented a whole file-sharing protocol so a toggle would feel native.",
	"who taught an AI to generate a convincing campfire, then argued with it about the kindling.",
	"who thinks a good bug report starts with 'this annoys me every single day'.",
	"who'd rather fork something and fix it than wait for someone else to.",
	"who reverse-engineered a 20-year-old Windows game just to keep playing Solitaire on Linux.",
	"who built a voice app for radio theatre with a latency budget tighter than most video calls.",
	"who registers his own programs as default browsers, just to fix one annoying click.",
	"who automated over 24,000 package recipes so nobody else had to write them by hand.",
	"who ported BBC iPlayer to Electron so a games console remote would work with it.",
	"who'd rather write a GNOME extension than change a habit.",
	"who deploys genomics research infrastructure one week and a fireplace simulator the next.",
	"who's fixed things in Vala, Go, Rust and TypeScript, usually because one of them annoyed me first.",
];

export default function Page() {
	const [done, setDone] = useState(false);
	const [tagline, setTagline] = useState<string | null>(null);

	useEffect(() => {
		setTagline(TAGLINES[Math.floor(Math.random() * TAGLINES.length)]);
	}, []);

	return (
		<div className="h-[calc(100vh-22rem)] md:h-[calc(100vh-17rem)] flex flex-col justify-center items-start relative">
			<h1 className="mb-2 text-5xl font-semibold tracking-tighter fontMomoDisplay">
				Daniel Elia
			</h1>
			<div className={`grid w-full transition-[grid-template-rows] duration-300 ${tagline ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
				<div className="overflow-hidden">
					{tagline && (
						<Typer action={() => setDone(true)}>
							{"I'm a software engineer " + tagline}
						</Typer>
					)}
				</div>
			</div>
			<ShinyButton name="about me" className={`aboutButton ${done ? "opacity-100" : "opacity-0 h-0! p-0! my-6!"}`} path="/about"></ShinyButton>
			{done && [
				{ src: bauhaus.src, visibility: "dark:invisible visible" },
				{ src: bauhausDark.src, visibility: "invisible dark:visible" },
			].map(({ src, visibility }) => (
				<img
					key={src}
					src={src}
					className={`${visibility} absolute -z-10 inset-x-0 md:left-auto md:right-0 mx-auto h-[calc(100vh-22rem)] max-h-140 md:h-[calc(100vh-17rem)] grayscale select-none pointer-events-none animate-[float_6s_ease-in-out_infinite,opacity-pulse_7.7s_ease-in-out_infinite,fadeIn_3.85s_ease-in]`}
				/>
			))}
		</div>
	);
}
