/* eslint-disable react-hooks/rules-of-hooks */

import ErrorPage from "@components/Error";
import { Err, Ok, Result, ForceUnwrap } from "@/types/Results";
import { RecipeInfo, RecipeInstruction } from "@/types/RecipeInfo";
import { RatingStars } from "@components/RatingStars";
import useSWR from "swr";
import { formatDate, formatDuration } from "@/functions/utils";
import { Spinner } from "@components/Loader";
import CenterLayout from "@components/layouts/Center";
import { RawText } from "@components/RawText";
import type { Metadata, ResolvingMetadata } from "next";
import { getUrlInfo } from "./request";
import { Recipe } from "@/types/Recipes";
import { useState } from "react";

// let recipeInfoCache: Result<RecipeInfo, string> | undefined = undefined;

export async function generateMetadata({
	params,
}: {
	params: { recipe: [number, string] };
}): Promise<Metadata> {
	const fetchResult = await getRecipeInfo({ params });

    if (!fetchResult.ok) {
        return {
            title: "Error",
            description: "Error",
        };
    }

    const recipeResult = fetchResult.value;

    if (!recipeResult.ok) {
        return {
            title: "Error",
            description: "Error",
        };
    }

    const recipeInfo: RecipeInfo = (recipeResult.value as any)[0];

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

function HowToStep({ instruction }: { instruction: RecipeInstruction }) {
	return (
		<>
			<p className="mt-2 text-white">{instruction.text}</p>

			{instruction.image &&
				instruction.image.map((image, index) => (
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

export async function getRecipeInfo(context: {
	params: { recipe: any };
}): Promise<Result<Result<Recipe, string>, JSX.Element>> {
	const apiUrl = process.env.API_URL;
	const recipeParams = context.params.recipe;
	const urlInfo = getUrlInfo({ recipeParams });

	if (!urlInfo.ok) {
		Err(urlInfo.error);
	}

	const { recipeId, recipeRawTitle } = ForceUnwrap(urlInfo);

	const response = await fetch(
		`https://${apiUrl}/recipe/${recipeId}/${recipeRawTitle}`,
	);

	const data: Result<Recipe, string> = await response.json();
	return Ok(data);
}

export default async function RecipePage({
	params,
}: {
	params: { recipe: [number, string] };
}) {
	const fetchResult = await getRecipeInfo({ params });

	if (!fetchResult.ok) {
		return fetchResult.error;
	}

	const recipeResult = fetchResult.value;

	if (!recipeResult.ok) {
		return recipeResult.error;
	}

	const recipeInfo: RecipeInfo = (recipeResult.value as any)[0];

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
					rating={parseFloat(recipeInfo.aggregateRating.ratingValue)}
				/>
				<p className="ml-2">
					{recipeInfo.aggregateRating.ratingValue} (
					{recipeInfo.aggregateRating.ratingCount} Ratings)
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
						Recipe by {recipeInfo.author[0].name}
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
								<HowToStep instruction={instruction} />
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
