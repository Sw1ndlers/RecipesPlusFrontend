import { IconCookie } from "@tabler/icons-react";
import Link from "next/link";

export function Logo({ useText = true }) {
	return (
		<Link href="/" className="flex size-min cursor-pointer items-center">
			<div>
				<IconCookie size={40} color="white" />
			</div>
			{useText && (
				<p className="ml-2 w-min text-xl font-semibold text-white">
					Recipes+
				</p>
			)}
		</Link>
	);
}
