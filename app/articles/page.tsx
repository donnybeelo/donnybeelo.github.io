import { Articles } from "app/components/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Articles",
	description: "My collection of opinion pieces.",
};

export default function Page() {
	return (
		<section>
			<h1 className="font-semibold text-2xl tracking-tighter">Articles</h1>
			<p className="mb-8">
				My thoughts and opinions that I feel passionate about enough to write an
				article about, most likely software related.
			</p>
			<Articles />
		</section>
	);
}
