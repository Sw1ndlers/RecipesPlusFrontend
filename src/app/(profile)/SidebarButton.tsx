"use client";

import { usePathname } from "next/navigation";

export function SidebarButton({ text = "Button", href = "/" }) {
	const pathname = usePathname();
	let selected = pathname == href;

	return (
		<a
			href={href}
			className={`
                flex w-full 
                cursor-pointer rounded-md px-4 
                py-2 text-dark-0 box-border
                border

                ${
					selected &&
					`border-dark-5 bg-dark-6 hover:brightness-95`
				}

                ${selected == false && `hover:bg-dark-6 border-transparent`}
            `}
		>
			{text}
		</a>
	);
}
