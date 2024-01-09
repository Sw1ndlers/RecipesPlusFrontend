const dateOptions: Intl.DateTimeFormatOptions = {
	year: "numeric",
	month: "long",
	day: "numeric",
};

export function formatDuration(durationString: string) {
	const match = durationString.match(/^PT(\d+H)?(\d+M)?(\d+S)?$/);

	if (!match) {
		throw new Error("Invalid duration format");
	}

	const hours = match[1] ? parseInt(match[1], 10) : 0;
	const minutes = match[2] ? parseInt(match[2], 10) : 0;
	const seconds = match[3] ? parseInt(match[3], 10) : 0;

	const formattedDuration = [];

	if (hours > 0) {
		formattedDuration.push(`${hours} ${hours === 1 ? "hour" : "hours"}`);
	}

	if (minutes > 0) {
		formattedDuration.push(
			`${minutes} ${minutes === 1 ? "minute" : "minutes"}`,
		);
	}

	if (seconds > 0) {
		formattedDuration.push(
			`${seconds} ${seconds === 1 ? "second" : "seconds"}`,
		);
	}

	return formattedDuration.join(" ");
}

export function formatDate(dateString: any) {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", dateOptions);
}
