"use client";

const HISTORY_KEY = "donnybeelo:internal-navigation-history";

function readHistory(): string[] {
	const raw = sessionStorage.getItem(HISTORY_KEY);
	if (!raw) return [];

	try {
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter((entry): entry is string => typeof entry === "string");
	} catch {
		return [];
	}
}

function writeHistory(history: string[]) {
	sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function hasPreviousInternalPage() {
	return readHistory().length > 1;
}

export function initializeInternalNavigationHistory(pathname: string) {
	if (readHistory().length > 0) return;
	writeHistory([pathname]);
}

export function recordInternalNavigation(pathname: string) {
	const history = readHistory();
	if (history[history.length - 1] === pathname) return;
	writeHistory([...history, pathname]);
}
