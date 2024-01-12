import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/Header/Header";
import "@assets/globals.css";

export const metadata: Metadata = {
	title: "Recipes Plus",
	description: "Recipe search engine",
    icons: {
        icon: "../assets/icon.png",
    }
};

export const viewport: Viewport = {
    themeColor: "#000000",
}

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="size-auto">
			<body
				className={`${inter.className} flex flex-col bg-dark-8`}
			>
				<Header />

				{children}
			</body>
		</html>
	);
}
