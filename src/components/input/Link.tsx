export function Link({ text = "Link", href = "/" }) {
	return (
		<a href={href} className="text-dark-0 hover:underline ">
			{text}
		</a>
	);
}
