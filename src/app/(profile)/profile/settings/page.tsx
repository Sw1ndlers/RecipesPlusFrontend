"use client";

import { useUserData } from "@/functions/Hooks";
import { ProfileContent, ProfileLoadingPage } from "../../ProfileComponents";

export default function ProfilePage() {
	const { userData, setUserData } = useUserData();

	if (userData == null) {
		return <ProfileLoadingPage />;
	}

	return (
		<div className="flex h-[calc(100vh-64px)] flex-row px-5 py-10 gap-12">
			<ProfileContent>
				<p></p>
			</ProfileContent>
		</div>
	);
}
