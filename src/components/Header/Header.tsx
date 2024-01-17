"use client";

import { Button } from "@/components/Elements/Button";
import { TextLink } from "@/components/Elements/TextLink";
import { SearchBar } from "@/components/Header/SearchBar";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { useRouter } from "next/navigation";
import { IconUser } from "@tabler/icons-react";

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

function MobileMenu({ toggleMenu }: { toggleMenu: () => void }) {
	function Section({ text, href }: { text: string; href: string }) {
		return (
			<Link
				href={href}
				className="flex h-12 w-full cursor-pointer flex-col justify-center p-6 text-dark-2 "
			>
				{text}
				<span className="mt-2 w-full border-b border-dark-5"></span>
			</Link>
		);
	}

	return (
		<div className="absolute top-16 z-10 flex h-[calc(100vh-64px)] w-screen flex-col bg-dark-8">
			<div className="mx-4 mb-4 mt-4 flex flex-col items-center">
				<SearchBar fullWidth={true} callback={toggleMenu} />
			</div>

			<Section text="Comfort Foods" href="/comfort-foods" />

			<div className="mt-auto flex w-full flex-col gap-4 border-t border-dark-5 p-6 text-left">
				<TextLink text={"About"} />
				<TextLink text={"Contact"} />
			</div>
		</div>
	);
}

const headerWhitelist = ["recipe", "search", "profile"];

function validatePath(currentPath: string) {
	currentPath = currentPath.split("/")[1];

	for (const item of headerWhitelist) {
		if (currentPath.includes(item) || currentPath == "") {
			return true;
		}
	}
	return false;
}

function ProfileButton() {
	return (
		<>
			<a
				className="
                    cursor-pointer rounded-md border 
                    border-dark-5 bg-dark-6 px-2 py-1 
                    text-dark-0
                "
                aria-label="Profile"
				href="/profile"
			>
				<IconUser color="white" size={24} stroke={1} />
			</a>
		</>
	);
}

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const query = searchParams?.get("q") || "";

	function toggleMenu() {
		setMobileMenuOpen(!mobileMenuOpen);
	}

	useEffect(() => {
		if (mobileMenuOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
	}, [mobileMenuOpen]);

    if (!validatePath(pathname)) return <></>;

	return (
		<>
			<div className="sticky flex h-16 items-center justify-between border-b border-dark-5 bg-dark-8 px-4">
				{/* Mobile Menu Button */}
				<HeaderSection
					align="left"
					className={`flex md:hidden mobile-opened-${mobileMenuOpen} `}
				>
					<HamburgerMenu
						menuOpen={mobileMenuOpen}
						toggleMenu={toggleMenu}
					/>
				</HeaderSection>

				{/* Logo */}
				<HeaderSection
					align="left"
					className="justify-center md:justify-start"
				>
					<Logo />
				</HeaderSection>

				{/* Search Bar */}
				<HeaderSection align="center" className="hidden md:flex">
					<SearchBar currentValue={query} key={query} />
				</HeaderSection>

				{/* Login Button + About */}
				<HeaderSection>
					<div className="flex h-full flex-grow items-center justify-end gap-4">
						<div className="hidden gap-4 md:flex">
							<TextLink text={"About"} />
							<TextLink text={"Contact"} />
						</div>

						<ProfileButton />
					</div>
				</HeaderSection>
			</div>

			{mobileMenuOpen && <MobileMenu toggleMenu={toggleMenu} />}
		</>
	);
}
