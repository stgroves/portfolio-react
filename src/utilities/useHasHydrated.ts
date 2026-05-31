import React from "react";

export function useHasHydrated() {
	const [hydrated, setHydrated] = React.useState(false);

	React.useEffect(() => {
		setHydrated(true);
	}, []);

	return hydrated;
}