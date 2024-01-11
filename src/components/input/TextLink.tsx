import Link from "next/link";

export function TextLink({ text = "Link", href = "/" }) {
	return (
		<Link href={href} className="text-dark-0 hover:underline ">
			{text}
		</Link>
	);
}
