import Typer from "./components/typer";
import bauhaus from "@/public/bauhaus.svg";
import bauhausDark from "@/public/bauhaus-dark.svg";

export default function Page() {
	return (
		<div className="h-[calc(100vh-22rem)] md:h-[calc(100vh-17rem)] flex flex-col justify-center items-start relative">
			<p className="mb-2 text-5xl font-semibold tracking-tighter fontMomoDisplay">
				Daniel Elia
			</p>
			<Typer>
				I'm a developer based in Birmingham with a passion for making simple,
				effective and beautiful user experiences.
			</Typer>
			{[
				{ src: bauhaus.src, visibility: "dark:invisible visible" },
				{ src: bauhausDark.src, visibility: "invisible dark:visible" },
			].map(({ src, visibility }) => (
				<img
					key={src}
					src={src}
					className={`${visibility} absolute inset-x-0 md:left-auto md:right-0 mx-auto h-[calc(100vh-22rem)] md:h-[calc(100vh-17rem)] grayscale select-none pointer-events-none animate-[float_6s_ease-in-out_infinite,opacity-pulse_7.7s_ease-in-out_infinite,fadeIn_3.85s_ease-in]`}
				/>
			))}
			<style>{`
				@keyframes float {
					0%, 100% {
						transform: translateY(0.5rem);
					}
					50% {
						transform: translateY(2.5rem);
					}
				}
				@keyframes opacity-pulse {
					0%, 100% {
						opacity: 0.03;
					}
					50% {
						opacity: 0.06;
					}
				}
				@keyframes fadeIn {
					0% {
						opacity: 0;
					}
					100% {
						opacity: 0.06;
					}
				}
			`}</style>
		</div>
	);
}
