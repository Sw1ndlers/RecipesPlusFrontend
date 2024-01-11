import { Recipe } from "@/types/Recipes";
import { RatingStars } from "@components/RatingStars";
import Link from "next/link";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
	const href = `/recipe/${recipe.id}/${recipe.rawTitle}`;

	return (
		<Link
			href={href}
			className="min-h-[300px] w-64 max-w-[250px] flex-grow cursor-pointer rounded-md border
                border-dark-5 bg-dark-7 shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl"
		>
			<div className="h-44 w-full">
				<img
					src={recipe.image}
					alt={recipe.title}
					className=" size-full rounded-t-md object-cover object-top"
				/>
			</div>

			<div className="p-4 text-dark-0">
				<p
					className="text-lg font-bold"
					dangerouslySetInnerHTML={{ __html: recipe.title }}
				/>

				<div className="flex flex-row items-center">
					<RatingStars rating={recipe.rating} />

					<p className=" pl-2 text-sm">
						{recipe.ratingCount} Ratings
					</p>
				</div>
			</div>
		</Link>
	);
}

export function LoadingRecipeCard() {
	return (
		<div
			className="min-h-[300px] w-64 max-w-[250px] flex-grow animate-pulse cursor-pointer rounded-md
                border border-dark-5 bg-dark-7 shadow-lg"
		>
			<div className="h-44 w-full rounded-t-md bg-dark-5"></div>

			<div className="p-4 text-dark-0">
				<div className="h-4 rounded-md bg-dark-5"></div>
				<div className="mt-2 h-4 rounded-md bg-dark-5"></div>
				<div className="mt-2 h-4 rounded-md bg-dark-5"></div>
			</div>
		</div>
	);
}
