"use client";

import { useUserData } from "@/functions/Hooks";
import {
	ProfileLoadingPage,
	ProfileContent,
	ProfileSidebar,
} from "../ProfileComponents";
import { ReactElement, useEffect } from "react";
import Layout from "@/app/layout";

export default function ProfilePage() {
	const { userData, setUserData } = useUserData();

	if (userData == null) {
		return <ProfileLoadingPage />;
	}

	return (
		<div className="flex h-[calc(100vh-64px)] flex-row gap-12 px-5 py-10">
			<ProfileContent>
				<p></p>
			</ProfileContent>
		</div>
	);
}

