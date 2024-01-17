"use client";

import { useUserData } from "@/functions/Hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function SidebarButton({ text = "Button", href = "/" }) {
	let [selected, setSelected] = useState(false);
	const pathname = usePathname();

	// Infinite loop if no useEffect
	useEffect(() => {
		if (pathname == href) {
			setSelected(true);
		}
	}, []);

	return (
		<a
			href={href}
			className={`
                flex w-full 
                cursor-pointer rounded-md px-4 
                py-2 text-dark-0

                ${
					selected &&
					`border border-dark-5 bg-dark-6 hover:brightness-95`
				}

                ${selected == false && `hover:bg-dark-6 `}
            `}
		>
			{text}
		</a>
	);
}

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
	return <div className="flex flex-grow flex-col gap-4">{children}</div>;
}

export function LoadingPage() {
	return (
		<>
			<div className="flex h-[calc(100vh-64px)] flex-row gap-12 px-5 py-10">
				<div className="flex h-[500px] w-60 flex-col gap-4">
					<p className="ml-3 text-lg font-bold text-dark-0">
						Settings
					</p>
				</div>
				<div className="flex flex-grow flex-col gap-4"></div>
			</div>
		</>
	);
}
