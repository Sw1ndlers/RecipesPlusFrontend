"use client";

import { useUserData } from "@/functions/Hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProfileContent, ProfileSidebar, LoadingPage } from "../../ProfileComponents";

export default function ProfilePage() {
	const { userData, setUserData } = useUserData();

	if (userData == null) {
		return <LoadingPage />
	}

	return (
		<div className="flex h-[calc(100vh-64px)] flex-row px-5 py-10 gap-12">
			<ProfileSidebar />

            <ProfileContent>
                <p>
                    
                </p>
            </ProfileContent>
		</div>
	);
}
