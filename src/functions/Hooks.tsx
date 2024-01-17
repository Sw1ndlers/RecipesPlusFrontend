import { Result } from "@/types/Results";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchWithToken } from "./Fetching";

export function useUserData() {
	const apiUrl = process.env.API_URL;
	const router = useRouter();

	const [userData, setUserData] = useState<Result<string, any> | null>(null);

	useEffect(() => {
		fetchWithToken(`${apiUrl}/user/getInfo`, {})
			.then((response) => response.json())
			.then((data) => {
				setUserData(data);
			});
	}, []);

	useEffect(() => {
		if (userData?.ok == false) {
			router.push("/login");
		}
	}, [userData]);

	return { userData, setUserData };
}