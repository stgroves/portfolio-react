import {useSlider2DContext} from "./Slider2DContext";
import React, {ReactElement} from "react";
import {useHasHydrated} from "../../utilities/useHasHydrated";

function useThumbAlignment(alignment: string) {
	const hydrated: boolean = useHasHydrated();

	if (alignment === "edge-client-only")
		return hydrated ? "edge" : "center";

	return alignment;
}

export function Slider2DThumb(props: React.HTMLAttributes<HTMLDivElement>): ReactElement {
	const { style, ...rest } = props;
	const { value, xRange, yRange, thumbAlignment } = useSlider2DContext();

	const resolvedAlignment = useThumbAlignment(thumbAlignment);

	const xPercent: number = ((value.x - xRange.min) / xRange.getRange()) * 100;
	const yPercent: number = ((value.y - yRange.min) / yRange.getRange()) * 100;

	console.log(xPercent, yPercent);

	return (
		<div
			{...rest}
			style={{
				...style,
				position: "absolute",
				left: `${xPercent}%`,
				top: `${yPercent}%`,
				transform: "translate(-50%, -50%)",
			}}
		/>
	);
}