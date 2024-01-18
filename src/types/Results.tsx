// Result type

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

export function Ok<T, E>(value: T): Result<T, E> {
	return { ok: true, value };
}

export function Err<T, E>(error: E): Result<T, E> {
	return { ok: false, error };
}

export function Unwrap<T, E>(result: Result<T, E>): T {
	if (result.ok) {
		return result.value;
	} else {
		throw result.error;
	}
}

export function ForceUnwrap<T, E>(result: Result<T, E>): T {
	if (result.ok) {
		return result.value;
	} else {
		throw new Error("Forced unwrap failed");
	}
}

// Option type

export type Option<T> = { some: true; value: T } | { some: false };

export function Some<T>(value: T): Option<T> {
	return { some: true, value };
}

export function None<T>(): Option<T> {
	return { some: false };
}
