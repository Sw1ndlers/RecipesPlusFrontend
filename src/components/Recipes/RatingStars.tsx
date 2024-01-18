import {
	IconStar,
	IconStarFilled,
	IconStarHalfFilled,
} from "@tabler/icons-react";

export function RatingStars({
	rating,
	divHeight = "10",
	starSize = 18,
}: {
	rating: number;
	divHeight?: string;
	starSize?: number;
}) {
	let stars = [];
	let currentRating = rating;

	for (let i = 0; i < 5; i++) {
		if (currentRating >= 1) {
			stars.push(
				<IconStarFilled color="white" size={starSize} key={i} />,
			);
		} else if (currentRating >= 0.5) {
			stars.push(
				<IconStarHalfFilled color="white" size={starSize} key={i} />,
			);
		} else {
			stars.push(<IconStar color="white" size={starSize} key={i} />);
		}

		currentRating -= 1;
	}

	return (
		<div
			className={`flex h-${divHeight} flex-row items-center gap-1 text-dark-0`}
		>
			{stars}
		</div>
	);
}
