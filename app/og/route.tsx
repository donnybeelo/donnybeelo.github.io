import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export async function GET(request: Request) {
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

	const url = new URL(request.url);
	const title = url.searchParams.get("title") || "Daniel Elia's Portfolio";
	const image = await fetch(new URL("og_bg.jpg", url.origin)).then((res) =>
		res.arrayBuffer()
	);

	return new ImageResponse(
		(
			<img
				src={image as any}
				style={{
					fontFamily: '"DM Sans"',
				}}
				tw="flex w-full h-full items-center justify-end blur-sm"
			>
				<div tw="flex md:flex-col py-12 px-4 md:items-left justify-between p-8 bg-[rgba(220,200,192,0.9)] rounded-lg m-10">
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
			</img>
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
