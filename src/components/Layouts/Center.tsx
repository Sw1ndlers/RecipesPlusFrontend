export function HeaderCenterLayout({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={`flex h-[calc(100vh-64px)] flex-col items-center justify-center ${className}`}
		>
			{children}
		</div>
	);
}

export function CenterLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			{children}
		</div>
	);
}
