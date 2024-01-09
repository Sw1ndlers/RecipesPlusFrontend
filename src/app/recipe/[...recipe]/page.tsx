/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import ErrorPage from "@components/Error";
import { Err, Ok, Result } from "@/types/Results";
import { RecipeInfo } from "@/types/RecipeInfo";
import { RatingStars } from "@/components/RatingStars";
import useSWR from "swr";
import { formatDate, formatDuration } from "@/functions/utils";

function getUrlInfo({
	recipeParams,
}: {
	recipeParams: [number, string];
}): Result<
	{
		recipeId: number;
		recipeRawTitle: string;
	},
	JSX.Element
> {
	let recipeId = recipeParams[0];
	let recipeRawTitle = recipeParams[1];

	if (!recipeRawTitle) {
		return Err(<ErrorPage caption="No recipe title found" />);
	}

	if (!recipeId) {
		return Err(<ErrorPage caption="No recipe id found" />);
	}

	if (isNaN(recipeId)) {
		return Err(<ErrorPage caption={"Recipe ID is not a number"} />);
	}

	recipeId = parseInt(recipeId as any);

	return Ok({ recipeId, recipeRawTitle });
}

function PrepInfoBox({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<div className=" m-auto">
			<p className=" font-bold text-white "> {title}: </p>
			<p className=""> {description} </p>
		</div>
	);
}

export default function RecipePage({
	params,
}: {
	params: { recipe: [number, string] };
}) {
	const recipeParams = params.recipe;
	const urlInfo = getUrlInfo({ recipeParams });

	if (!urlInfo.ok) {
		return urlInfo.error;
	}

	const { recipeId, recipeRawTitle } = urlInfo.value;
	const fetcher = (...args: [RequestInfo, RequestInit?]) =>
		fetch(...args).then((res) => res.json());

	const {
		data,
		error,
		isLoading,
	}: {
		data: Result<RecipeInfo, string>;
		error: any;
		isLoading: any;
	} = useSWR(
		`http://localhost:3001/recipe/${recipeId}/${recipeRawTitle}`,
		fetcher,
	);

	if (error) return <ErrorPage caption={error} />;
	if (isLoading) return <ErrorPage title="Loading Recipe..." caption="" />;
	if (!data.ok) return <ErrorPage caption={data.error} />;

	const recipeInfo: RecipeInfo = (data.value as any)[0];

	return (
		<div className="min-h-screen max-w-[650px] self-center p-10 text-center text-dark-0">
			{/* Title */}
			<h1
				className="text-3xl font-bold text-white sm:text-5xl"
				dangerouslySetInnerHTML={{ __html: recipeInfo.headline }}
			></h1>

			{/* Rating */}
			<div className="mt-4 flex w-full flex-row items-center justify-center">
				<RatingStars
					rating={parseFloat(recipeInfo.aggregateRating.ratingValue)}
				/>
				<p className="ml-2">
					{recipeInfo.aggregateRating.ratingValue} (
					{recipeInfo.aggregateRating.ratingCount} Ratings)
				</p>
			</div>

			{/* Description */}
			<p
				className="mt-4 text-white"
				dangerouslySetInnerHTML={{ __html: recipeInfo.description }}
			></p>

			{/* Image + Author */}
			<div className="mt-4 rounded-md border border-dark-5 p-4 shadow-md">
				{/* Image */}

				<img src={recipeInfo.image.url} alt={recipeInfo.headline} />

				{/* Author */}
				<p className="mt-4 text-sm">
					<span className="text-white">
						Recipe by {recipeInfo.author[0].name}
					</span>{" "}
					<span className="">
						| Updated on {formatDate(recipeInfo.dateModified)}
					</span>
				</p>
			</div>

			{/* Prep Info */}

			<div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-md border border-dark-5 px-8 py-4 shadow-md">
				<PrepInfoBox
					title="Cook Time"
					description={formatDuration(recipeInfo.cookTime)}
				/>
				<PrepInfoBox
					title="Prep Time"
					description={formatDuration(recipeInfo.prepTime)}
				/>
				<PrepInfoBox
					title="Total Time"
					description={formatDuration(recipeInfo.totalTime)}
				/>
				<PrepInfoBox
					title="Servings"
					description={recipeInfo.recipeYield[0]}
				/>
			</div>

			{/* Ingredients */}

			<div className="mt-8">
				<h1 className=" text-4xl font-semibold text-white">
					Ingredients
				</h1>

				<div className="mt-4">
					{recipeInfo.recipeIngredient.map((ingredient, index) => (
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
					{recipeInfo.recipeInstructions.map((instruction, index) => (
						<div key={index}>
							<h1 className="text-lg font-bold text-white">
								Step {index + 1}
							</h1>

							{instruction["@type"] == "HowToStep" && (
								<>
									<p className="mt-2 text-white">
										{instruction.text}
									</p>

									{instruction.image &&
										instruction.image.map(
											(image, index) => (
												<img
													key={index}
													src={image.url}
													alt={recipeInfo.headline}
													className="mt-4 rounded-lg"
												/>
											),
										)}
								</>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
