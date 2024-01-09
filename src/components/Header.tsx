"use client";

import { IconMenu2, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { SearchBar } from "@components/input/SearchBar";
import { Link } from "@components/input/Link";
import { Button } from "@components/input/Button";
import { Logo } from "./Logo";
import { useSearchParams } from "next/navigation";

function HeaderSection({
	align = "center",
	className = "",
	children,
}: {
	align?: string;
	className?: string;
	children: any;
}) {
	return (
		<div
			className={`flex flex-grow items-center justify-${align} size-full
                ${className}`}
		>
			{children}
		</div>
	);
}

function HamburgerMenu({
	menuOpen,
	toggleMenu,
}: {
	menuOpen: boolean;
	toggleMenu: () => void;
}) {
	return (
		<div>
			<IconMenu2
				color="white"
				onClick={toggleMenu}
				className={`${menuOpen ? "hidden" : ""} `}
			/>

			<IconX
				color="white"
				onClick={toggleMenu}
				className={`${menuOpen ? "" : "hidden"} `}
			/>
		</div>
	);
}

function MobileMenu() {
	function Section({ text, href }: { text: string; href: string }) {
		return (
			<a
				href={href}
				className="flex h-12 w-full cursor-pointer flex-col justify-center p-6 text-dark-2 "
			>
				{text}
				<span className="mt-2 w-full border-b border-dark-5"></span>
			</a>
		);
	}

	return (
		<div className="absolute top-16 flex h-[calc(100vh-64px)] w-screen flex-col bg-dark-8">
			<div className="mx-4 mb-4 mt-4 flex flex-col items-center">
				<SearchBar className="w-full" fullWidth={true} />
			</div>

			<Section text="Comfort Foods" href="/comfort-foods" />

			<div className="mt-auto flex w-full flex-col gap-4 border-t border-dark-5 p-6 text-left">
				<Link text={"About"} />
				<Link text={"Contact"} />
			</div>
		</div>
	);
}

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false);
    const searchParams = useSearchParams();

	const query = searchParams?.get("q");
    const currentValue = query ? query : "";

	function toggleMenu() {
		setMenuOpen(!menuOpen);
	}

	useEffect(() => {
		if (menuOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
	}, [menuOpen]);

	return (
		<>
			<div className="sticky flex h-16 items-center justify-between border-b border-dark-5 bg-dark-8 px-4">
				{/* Mobile Menu Button */}
				<HeaderSection
					align="left"
					className={`flex md:hidden mobile-opened-${menuOpen} `}
				>
					<HamburgerMenu
						menuOpen={menuOpen}
						toggleMenu={toggleMenu}
					/>
				</HeaderSection>

				{/* Logo */}
				<HeaderSection
					align="left"
					className="justify-center md:justify-start "
				>
					<Logo />
				</HeaderSection>

				{/* Search Bar */}
				<HeaderSection align="center" className="hidden md:flex">
					<SearchBar currentValue={currentValue} />
				</HeaderSection>

				{/* Login Button + About */}
				<HeaderSection>
					<div className="flex h-full flex-grow items-center justify-end gap-4">
						<div className="hidden gap-4 md:flex">
							<Link text={"About"} />
							<Link text={"Contact"} />
						</div>

						<Button text={"Login"} />
					</div>
				</HeaderSection>
			</div>

			{menuOpen && <MobileMenu />}
		</>
	);
}
