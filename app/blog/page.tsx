import type { Metadata } from "next";

export const metadata: Metadata = { robots: { index: false } };

// ponytail: temporary stub — replace with the real blog feed
export default function Page() {
	return <meta httpEquiv="refresh" content="0; url=/articles" />;
}
