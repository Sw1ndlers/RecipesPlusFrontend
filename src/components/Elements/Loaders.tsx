export function Spinner({
	size = 50,
	stroke = 5,
	hidden = false,
	className = "",
}) {
	return (
		<div
			className={`
                animate-spin rounded-full 
                border-white border-b-transparent
                ${hidden ? "hidden" : "block"}
                ${className}
            `}
			style={{
				width: size,
				height: size,
				borderWidth: stroke,
			}}
		></div>
	);
}
