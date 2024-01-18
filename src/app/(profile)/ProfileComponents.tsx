"use client";

import { usePathname } from "next/navigation";
import { SidebarButton } from "./SidebarButton";
import { useEffect } from "react";


export function ProfileSidebar() {
	return (
		<div className="flex h-[500px] w-60 flex-col gap-4">
			<p className="ml-3 text-lg font-bold text-dark-0">Settings</p>

			<SidebarButton text="Account" href="/profile" />
			<SidebarButton text="Favorites" href="/profile/favorites" />
			<SidebarButton text="Settings" href="/profile/settings" />
		</div>
	);
}

export function ProfileContent({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-grow flex-col gap-4 bg-red-500">
			{children}
		</div>
	);
}

export function ProfileLoadingPage() {
	return (
		// <>
		// 	<div className="flex h-[calc(100vh-64px)] w-[calc(100vw-240px)] flex-row gap-12 px-5 py-10">
		// 		<div className="flex h-[500px] w-60 flex-col gap-4">
		// 			<p className="ml-3 text-lg font-bold text-dark-0">
						
		// 			</p>
		// 		</div>
		// 		<div className="flex flex-grow flex-col gap-4"></div>
		// 	</div>
		// </>
        <></>
	);
}
