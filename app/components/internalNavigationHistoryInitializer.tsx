"use client";

import { useEffect } from "react";
import { initializeInternalNavigationHistory } from "./internalNavigationHistory";

export function InternalNavigationHistoryInitializer() {
	useEffect(() => {
		initializeInternalNavigationHistory(window.location.pathname);
	}, []);

	return null;
}
