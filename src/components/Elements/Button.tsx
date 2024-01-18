export function Button({ text = "Button", href = "/", className = "" }) {
	return (
		<a
			href={href}
			className={`
                cursor-pointer rounded-md 
                border border-dark-5 bg-dark-6 
                px-4 py-1 text-dark-0 hover:bg-dark-5
                ${className}
            `}
		>
			{text}
		</a>
	);
}
