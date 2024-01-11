import React from "react";

export function Spinner({ size = 50, borderSize = 5, hidden = false }) {
	return (
		<div
			className={`
                animate-spin rounded-full 
                border-white border-b-transparent
                ${hidden ? "hidden" : "block"}
            `}
            style={{
                width: size,
                height: size,
                borderWidth: borderSize
            }}
		></div>
	);
}
