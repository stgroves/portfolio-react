import React, {ReactNode} from "react";
import {Orientation} from "@base-ui/react";

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
	orientation?: Orientation;
}

export function Stack(props: StackProps) {
	const {orientation = "vertical", children, ...rest} = props;

	let flexDirection;

	switch (orientation) {
		case "horizontal":
			flexDirection = "row";
			break;

		case "vertical":
			flexDirection = "column";
			break;
	}

	return (
		<div
			{...rest}
			style={{
				display: "flex",
				flexDirection,
				...((rest as any).style || {}),
			}}
		>
			{children}
		</div>
	)
}