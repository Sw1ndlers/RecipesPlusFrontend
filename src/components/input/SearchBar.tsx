import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

export function SearchBar({
	currentValue = "",
	fullWidth = false,
	className = "",
}) {
	const [query, setQuery] = useState(currentValue);

	function onInput(e: React.ChangeEvent<HTMLInputElement>) {
		setQuery(e.target.value);
	}

	function onSubmit(e: React.MouseEvent | React.KeyboardEvent) {
		if (query === "") return;

		e.preventDefault();
		window.location.href = `/search?q=${query}`;
	}

	function onEnter(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			onSubmit(e);
		}
	}

	return (
		<div
			className={`flex h-11 items-center justify-center rounded-md border border-dark-5 bg-dark-7 shadow-md lg:w-3/4 
                ${fullWidth ? "w-full" : "w-min"} 
                ${className}
                }`}
		>
			<input
				className="flex-grow bg-transparent pl-4 text-white placeholder-dark-3 outline-none"
				placeholder="Search for your next recipe"
				value={query}
				onChange={onInput}
				onKeyDown={onEnter}
			/>
			<div
				className="mx-1 flex size-10 items-center justify-center"
				onClick={onSubmit}
			>
				<IconSearch className="size-5 cursor-pointer text-dark-3 " />
			</div>
		</div>
	);
}
