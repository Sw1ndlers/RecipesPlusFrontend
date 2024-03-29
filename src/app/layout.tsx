import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "@assets/globals.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://recipesplus.up.railway.app/"),
	title: "Recipes Plus",
	description: "Recipe search engine",
	openGraph: {
		type: "website",
		url: "https://recipesplus.up.railway.app/",
		title: "Recipes Plus",
		description: "Recipe search engine",
	},
};

export const viewport: Viewport = {
	themeColor: "#000000",
};

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="size-auto">
			<body className={`${inter.className} flex flex-col bg-dark-8`}>
				{/* <Header /> */}

				{children}
			</body>
		</html>
	);
}
