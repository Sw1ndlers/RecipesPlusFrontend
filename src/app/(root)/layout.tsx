"use client";

import Header from "@/components/Header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col">
			<Header />
			{children}
		</div>
	);
}
