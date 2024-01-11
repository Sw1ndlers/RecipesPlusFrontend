import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

function SearchIcon({ onSubmit }: { onSubmit: any }) {
	return (
		<div
			className="mx-1 flex size-10 items-center justify-center"
			onClick={onSubmit}
		>
			<IconSearch className="size-5 cursor-pointer text-dark-3 " />
		</div>
	);
}

export function SearchBar({
	currentValue = "",
	fullWidth = false,
	callback = () => {},
}) {
	const [query, setQuery] = useState(currentValue);
	const router = useRouter();

	function onSubmit(e: React.MouseEvent | React.KeyboardEvent) {
		e.preventDefault();

		if (query === "") return;
		router.push(`/search?q=${query}`);
	}

	function onEnter(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
            callback();
			onSubmit(e);
		}
	}

	return (
		<div
			className={`
                flex h-11 items-center justify-center 
                rounded-md border 
                border-dark-5 bg-dark-7 
                shadow-md lg:w-3/4 
                ${fullWidth ? "w-full" : "w-min"} 
            }`}
		>
			<input
				className="flex-grow bg-transparent pl-4 text-white placeholder-dark-3 outline-none"
				placeholder="Search for your next recipe"
                name="search"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={onEnter}
			/>

			<SearchIcon onSubmit={onSubmit} />
		</div>
	);
}
