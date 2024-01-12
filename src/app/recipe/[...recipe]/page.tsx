import { RatingStars } from "@/components/Recipes/RatingStars";
import { RawText } from "@/components/Elements/RawText";
import { fetchRecipeInfo, getRecipeInfoFromUrl } from "@/functions/Fetching";
import { formatDate, formatDuration } from "@/functions/Utils";
import { RecipeInfo, RecipeStep } from "@/types/RecipeInfo";
import type { Metadata } from "next";

export async function generateMetadata({
	params,
}: {
	params: { recipe: [number, string] };
}): Promise<Metadata> {
	const urlInfo = getRecipeInfoFromUrl(params.recipe);
	const returnError = {
		title: "Error",
		description: "Error",
	};

	if (!urlInfo.ok) {
		return returnError;
	}

	const fetchResult = await fetchRecipeInfo(
		urlInfo.value.recipeId,
		urlInfo.value.recipeRawTitle,
	);

	if (!fetchResult.ok) {
		return returnError;
	}

	const recipeResult = fetchResult.value;

	if (!recipeResult.ok) {
		return returnError;
	}

	const recipeInfo: RecipeInfo = (recipeResult.value as any);

	return {
		title: recipeInfo.headline,
		description: recipeInfo.description,
		openGraph: {
			title: recipeInfo.headline,
			description: recipeInfo.description,
			images: [
				{
					url: recipeInfo.image.url,
				},
			],
		},
	};
}

function InfoBox({
	title,
	description: value,
}: {
	title: string;
	description: string;
}) {
	return (
		<div className=" m-auto">
			<p className=" font-bold text-white "> {title}: </p>
			<p className=""> {value} </p>
		</div>
	);
}

function InfoBoxContainer({
	title,
	caption = "",
	information,
}: {
	title: string;
	caption?: string;
	information: { title: string; description: string }[];
}) {
	return (
		<div className="mt-4 flex flex-col rounded-md border border-dark-5 px-8 py-4 shadow-md">
			<h1 className="text-2xl font-semibold text-white underline underline-offset-8">
				{title}
				<span className="text-sm text-dark-0"> {caption} </span>
			</h1>
			<div className="mt-3 flex flex-wrap items-center justify-between gap-4 rounded-md">
				{information.map(
					(info, index) =>
						info.description && (
							<InfoBox
								title={info.title}
								description={info.description}
								key={index}
							/>
						),
				)}
			</div>
		</div>
	);
}

function HowToStep({ instruction }: { instruction: RecipeStep }) {
	return (
		<>
			<p className="mt-2 text-white">{instruction.text}</p>

			{instruction.images &&
				instruction.images.map((image, index) => (
					<img
						key={index}
						src={image.url}
						alt={instruction.text}
						className="mt-4 rounded-lg"
					/>
				))}
		</>
	);
}

export default async function RecipePage({
	params,
}: {
	params: { recipe: [number, string] };
}) {
	const urlInfo = getRecipeInfoFromUrl(params.recipe);

	if (!urlInfo.ok) {
		return urlInfo.error;
	}

	const fetchResult = await fetchRecipeInfo(
		urlInfo.value.recipeId,
		urlInfo.value.recipeRawTitle,
	);



	if (!fetchResult.ok) {
		return fetchResult.error;
	}

	const recipeResult = fetchResult.value;


	if (!recipeResult.ok) {
		return recipeResult.error;
	}


	const recipeInfo: RecipeInfo = (recipeResult.value as any);

	return (
		<div className="min-h-screen max-w-[650px] self-center p-10 text-center text-dark-0">
			{/* Title */}
			<RawText
				text={recipeInfo.headline}
				className="text-3xl font-bold text-white sm:text-5xl"
			/>

			{/* Rating */}
			<div className="mt-4 flex w-full flex-row items-center justify-center">
				<RatingStars
					rating={recipeInfo.rating.value}
				/>
				<p className="ml-2">
					{recipeInfo.rating.value} (
					{recipeInfo.rating.count} Ratings)
				</p>
			</div>

			{/* Description */}
			<RawText
				text={recipeInfo.description}
				className="mt-4 text-white"
			/>

			{/* Image + Author */}
			<div className="mt-4 rounded-md border border-dark-5 p-4 shadow-md">
				{/* Image */}
				<img src={recipeInfo.image.url} alt={recipeInfo.headline} />

				{/* Author */}
				<p className="mt-4 text-sm">
					<span className="text-white">
						Recipe by {recipeInfo.author}
					</span>{" "}
					<span className="">
						| Updated on {formatDate(recipeInfo.dateModified)}
					</span>
				</p>
			</div>

			{/* <PrepInfo recipeInfo={recipeInfo} />
			<NutritionInfo recipeInfo={recipeInfo} /> */}

			<InfoBoxContainer
				title="Prep Information"
				information={[
					{
						title: "Cook Time",
						description:
							recipeInfo.cookTime &&
							formatDuration(recipeInfo.cookTime),
					},
					{
						title: "Prep Time",
						description:
							recipeInfo.prepTime &&
							formatDuration(recipeInfo.prepTime),
					},
					{
						title: "Total Time",
						description:
							recipeInfo.totalTime &&
							formatDuration(recipeInfo.totalTime),
					},
					{
						title: "Servings",
						description: recipeInfo.recipeYield[0],
					},
				]}
			/>

			<InfoBoxContainer
				title="Nutrition"
				caption="(per serving)"
				information={[
					{
						title: "Calories",
						description: recipeInfo.nutrition.calories,
					},
					{
						title: "Fat",
						description: recipeInfo.nutrition.fatContent,
					},
					{
						title: "Carbs",
						description: recipeInfo.nutrition.carbohydrateContent,
					},
					{
						title: "Protein",
						description: recipeInfo.nutrition.proteinContent,
					},
				]}
			/>

			{/* Ingredients */}

			<div className="mt-8">
				<h1 className=" text-4xl font-semibold text-white">
					Ingredients
				</h1>

				<div className="mt-4">
					{recipeInfo.ingredients.map((ingredient, index) => (
						<p
							key={index}
							className={`
                                border-dark-5 p-1 
                                ${index == 0 ? "" : "border-t"}
                            `}
						>
							{ingredient}
						</p>
					))}
				</div>
			</div>

			{/* Directions */}

			<div className="mt-8">
				<h1 className=" text-4xl font-semibold text-white">
					Directions
				</h1>

				<div className="mt-4 flex flex-col gap-8">
					{recipeInfo.steps.map((instruction, index) => (
						<div key={index}>
							<h1 className="text-lg font-bold text-white">
								Step {index + 1}
							</h1>

						
							<HowToStep instruction={instruction} />
				
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
