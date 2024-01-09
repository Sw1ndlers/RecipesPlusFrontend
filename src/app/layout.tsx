import { Inter } from "next/font/google";
import "@assets/globals.css";

import Header from "@components/Header";
import { Metadata } from "next";
import { useEffect } from "react";

export const metadata: Metadata = {
	title: "Recipes Plus",
	description: "Recipe search engine",
    icons: {
        icon: "../assets/icon.png",
    }
};

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
