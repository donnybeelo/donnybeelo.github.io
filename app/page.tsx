"use client";

import Typer from "./components/typer";
import bauhaus from "@/public/bauhaus.svg";
import bauhausDark from "@/public/bauhaus-dark.svg";
import { ShinyButton } from "./components/shinyButton";
import { useState } from "react";

export default function Page() {
	const [done, setDone] = useState(false);
	
	return (
		<div className="h-[calc(100vh-22rem)] md:h-[calc(100vh-17rem)] flex flex-col justify-center items-start relative">
			<p className="mb-2 text-5xl font-semibold tracking-tighter fontMomoDisplay">
				Daniel Elia
			</p>
			<Typer action={() => setDone(true)}>
				I'm a developer based in Birmingham with a passion for making simple,
				effective and beautiful user experiences.
			</Typer>
			<ShinyButton name="about me" className={`aboutButton opacity-${done ? "100" : "0"}`} path="/about"></ShinyButton>
			{[
				{ src: bauhaus.src, visibility: "dark:invisible visible" },
				{ src: bauhausDark.src, visibility: "invisible dark:visible" },
			].map(({ src, visibility }) => (
				<img
					key={src}
					src={src}
					className={`${visibility} absolute -z-10 inset-x-0 md:left-auto md:right-0 mx-auto h-[calc(100vh-22rem)] md:h-[calc(100vh-17rem)] grayscale select-none pointer-events-none animate-[float_6s_ease-in-out_infinite,opacity-pulse_7.7s_ease-in-out_infinite,fadeIn_3.85s_ease-in]`}
				/>
			))}
		</div>
	);
}
