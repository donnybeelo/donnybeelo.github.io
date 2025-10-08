import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export async function GET() {
	const [font, monoFont] = await Promise.all([
		fetch(
			new URL(
				"https://api.fontsource.org/v1/fonts/dm-sans/latin-400-normal.ttf"
			)
		).then((res) => res.arrayBuffer()),
		fetch(
			new URL(
				"https://api.fontsource.org/v1/fonts/roboto-mono/latin-400-normal.ttf"
			)
		).then((res) => res.arrayBuffer()),
	]);

	const title = "Daniel Elia's Portfolio";

	return new ImageResponse(
		(
			<div tw="flex w-full h-full items-center justify-center bg-[rgba(220,200,192,0.9)]">
				<div tw="flex md:flex-col py-12 px-4 md:items-start justify-between p-8 bg-white rounded-lg m-10">
					<h1 tw="flex flex-col text-5xl font-bold tracking-tight text-left">
						{title}
					</h1>
					<p
						style={{ fontFamily: '"Roboto Mono"' }}
						tw="mt-4 md:mt-0 text-2xl font-semibold text-left"
					>
						donnybeelo.github.io
					</p>
				</div>
			</div>
		),
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: "DM Sans",
					data: font,
					style: "normal",
				},
				{
					name: "Roboto Mono",
					data: monoFont,
					style: "normal",
				},
			],
		}
	);
}
