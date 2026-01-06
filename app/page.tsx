import Typer from "./components/typer";
import bauhaus from "@/public/bauhaus.svg";

export default function Page() {
	return (
		<div className="h-[calc(100vh-22rem)] md:h-[calc(100vh-17rem)] flex flex-col justify-center items-start relative">
			<p className="mb-2 text-5xl font-semibold tracking-tighter">
				Daniel Elia
			</p>
			<Typer>
				I'm a developer based in Birmingham with a passion for making simple,
				effective and beautiful user experiences.
			</Typer>
			<img
				src={bauhaus.src}
				className="absolute right-0 -translate-y-5 h-[calc(100vh-22rem)] md:h-[calc(100vh-17rem)] grayscale dark:invert select-none pointer-events-none animate-[float_6s_ease-in-out_infinite,opacity-pulse_7.7s_ease-in-out_infinite]"
			/>
			<style>{`
				@keyframes float {
					0%, 100% {
						transform: translateY(0);
					}
					50% {
						transform: translateY(1rem);
					}
				}
				@keyframes opacity-pulse {
					0%, 100% {
						opacity: 0.08;
					}
					50% {
						opacity: 0.05;
					}
				}
				@keyframes float {
					0%, 100% {
						transform: translateY(0);
					}
					50% {
						transform: translateY(1rem);
					}
				}
			`}</style>
		</div>
	);
}
