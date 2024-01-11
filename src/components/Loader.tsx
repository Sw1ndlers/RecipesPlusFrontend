import React from "react";

export function Spinner({ size = 50, borderSize = 5 }) {
	return (
		<div
			className={`
                animate-spin rounded-full 
                border-white border-b-transparent
            `}
            style={{
                width: size,
                height: size,
                borderWidth: borderSize
            }}
		></div>
	);
}
