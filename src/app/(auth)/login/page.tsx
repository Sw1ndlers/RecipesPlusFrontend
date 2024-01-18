"use client";

/* eslint-disable jsx-a11y/alt-text */
import { CenterLayout } from "@/components/Layouts/Center";
import { Result } from "@/types/Results";
import logo from "@assets/icon.png";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";

function validEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function TextInput({
	label,
	name,
	placeholder,
}: {
	label: string;
	name: string;
	placeholder: string;
}) {
	return (
		<div className="text-dark-0 ">
			<p className="mb-1 text-sm font-bold">{label}</p>
			<input
				className="
                    h-9 w-full rounded-md border border-dark-5
                    bg-dark-7 pl-3 text-sm
                    text-white placeholder-dark-3 outline-none transition-all duration-200 focus:border-dark-3
                "
				placeholder={placeholder}
				type="text"
				name={name}
			></input>
		</div>
	);
}

function PasswordInput({
	label,
	name,
	placeholder,
}: {
	label: string;
	name: string;
	placeholder: string;
}) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="text-dark-0 ">
			<p className="mb-1 text-sm font-bold">{label}</p>
			<div className=" relative">
				<input
					className="
                        h-9 w-full rounded-md border border-dark-5
                        bg-dark-7 pl-3 text-sm
                        text-white placeholder-dark-3 outline-none transition-all duration-200 focus:border-dark-3
                    "
					placeholder={placeholder}
					type={showPassword ? "text" : "password"}
					name={name}
				></input>

				<div className="absolute right-0 top-0 mr-2 translate-y-1/4 cursor-pointer">
					{showPassword ? (
						<IconEye
							width={25}
							onClick={() => setShowPassword(!showPassword)}
						/>
					) : (
						<IconEyeOff
							width={25}
							onClick={() => setShowPassword(!showPassword)}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default function RegisterPage() {
	const apiUrl = process.env.API_URL;

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		const registerData: {
			username: string;
			password: string;
		} = {
			username: formData.get("username") as string,
			password: formData.get("password") as string,
		};

		const response = await fetch(`${apiUrl}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(registerData),
		});

		const data: Result<string, string> = await response.json();

		if (data.ok == false) {
			alert(data.error);
			return;
		}

		const sessionToken = data.value;
		localStorage.setItem("sessionToken", sessionToken);

		window.location.href = "/";
	}

	return (
		<CenterLayout>
			<div className="h-max w-[420px] rounded-md border border-dark-5 bg-dark-9 px-10 py-6 text-white shadow-lg">
				<form
					className="flex flex-col gap-6"
					autoComplete="off"
					onSubmit={onSubmit}
				>
					<div className=" flex w-full flex-row items-center gap-2">
						<img
							src={logo.src}
							width={40}
							height={40}
							className="justify-self-start"
						/>

						<p className=" justify-self-center text-center text-2xl font-bold">
							Welcome to Recipes+
						</p>
					</div>

					<span className=" h-px w-full bg-dark-5"></span>

					<TextInput
						label="Username or Email"
						name="username"
						placeholder="Your Name"
					/>

					<PasswordInput
						label="Password"
						name="password"
						placeholder="Your Password"
					/>

					<span className=" h-px w-full bg-dark-5"></span>

					<div className="flex items-center justify-between">
						<a
							href="/register"
							className=" cursor-pointer text-xs text-dark-0 hover:underline"
						>
							Dont have an account? Register.
						</a>
						<button className="rounded-full bg-dark-7 px-5 py-2 text-sm hover:bg-dark-6">
							Login
						</button>
					</div>
				</form>
			</div>
		</CenterLayout>
	);
}
