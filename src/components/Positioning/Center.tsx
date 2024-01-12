export default function CenterLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center text-center">
			{children}
		</div>
	);
}
