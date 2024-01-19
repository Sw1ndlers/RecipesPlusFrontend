"use client";

import { useUserData } from "@/functions/Hooks";
import { ProfileContent, ProfileLoadingPage } from "../ProfileComponents";

export default function ProfilePage() {
	const { userData, setUserData } = useUserData();

	if (userData == null) {
		return <ProfileLoadingPage />;
	}

	return (
        <></>
	);
}
