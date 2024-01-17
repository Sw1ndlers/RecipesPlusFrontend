"use client";

import { CenterLayout } from "@/components/Layouts/Center";
import { fetchWithToken } from "@/functions/Fetching";
import { Result } from "@/types/Results";
import { useEffect, useState } from "react";

type VerifyResultType = Result<string, string>;

function VerifyInput() {
	const apiUrl = process.env.API_URL;

	const [code, setCode] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [verifyResult, setVerifyResult] = useState<VerifyResultType>();
	const [shouldSendCode, setShouldSendCode] = useState(false);

	function onChange(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.value.length > 4) {
			setCode(event.target.value.slice(0, 4));
		} else {
			setCode(event.target.value);
		}
	}

	function verifyButtonText(verifyResult: VerifyResultType | undefined) {
		if (verifyResult == undefined) {
			return "Verify";
		}
		if (isLoading) {
			return "Loading";
		}
		if (verifyResult.ok) {
			return "Success! Redirecting...";
		}
		if (verifyResult.ok == false) {
			return verifyResult.error;
		}
	}

	useEffect(() => {
		if (verifyResult?.ok) {
			setTimeout(() => {
				window.location.href = "/";
			}, 3000);
		}
	}, [verifyResult]);

	useEffect(() => {
		if (verifyResult?.ok == false) {
			setTimeout(() => {
				setVerifyResult(undefined);
			}, 2000);
		}
	}, [verifyResult]);

	useEffect(() => {
		if (shouldSendCode) {
			setIsLoading(true);
			fetchWithToken(`${apiUrl}/auth/verifyCode?code=${code}`, {
				method: "POST",
			})
				.then((res) => res.json())
				.then((data) => {
					setVerifyResult(data);
					setIsLoading(false);
				});

			setShouldSendCode(false);
		}
	}, [shouldSendCode]);

	return (
		<>
			<p className=" justify-self-center text-center text-2xl font-bold">
				Email Verification
			</p>

			<p className=" mt-2 justify-self-center text-center text-sm text-dark-0">
				Enter the code 4 digit code sent to your email to verify your
				account.
			</p>

			<span className=" my-4 h-px w-full bg-dark-5"></span>

			<input
				className=" 
                        h-16 w-full rounded-md border border-dark-5
                        bg-dark-7 text-center text-3xl tracking-widest text-white placeholder-dark-3
                        outline-none transition-all duration-200 focus:border-dark-3"
				value={code}
				onChange={onChange}
			></input>

			<span className="my-4 h-px w-full bg-dark-5"></span>

			<button
				className={`
                    flex h-9 w-full items-center justify-center
                    rounded-md border border-dark-5 bg-dark-7
                    text-center text-sm
                    transition-all duration-200 hover:bg-dark-6
                    
                    ${
                        verifyResult == undefined
                            ? "text-white"
                            : ""
                    }
                    ${
						verifyResult?.ok
							? "border-green-500 text-green-500"
							: ""
					}  
                    ${
						verifyResult?.ok == false
							? "border-red-500 text-red-500"
							: ""
					}
                `}
				onClick={() => setShouldSendCode(true)}
			>
				{verifyButtonText(verifyResult)}
			</button>
		</>
	);
}

export default function RegisterPage() {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<div className="flex h-max w-[420px] flex-col items-center rounded-md border border-dark-5 bg-dark-9 px-10 py-6 text-white shadow-lg">
				<VerifyInput />
			</div>
		</div>
	);
}
