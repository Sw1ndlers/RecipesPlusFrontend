export function RawText({
	className,
	text,
}: {
	className: string;
	text: string;
}) {
	return (
		<p className={className} dangerouslySetInnerHTML={{ __html: text }}></p>
	);
}
