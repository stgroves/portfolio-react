import React from "react";
import {TransparencyBackground, TransparencyBackgroundProps} from "./TransparencyBackground";

export interface ColorPreviewProps extends TransparencyBackgroundProps {
	color: string;
}

export function ColorPreview(props: ColorPreviewProps) {
	const {color, ...rest} = props;

	return (
		<TransparencyBackground {...rest}>
			<div style={{width: '100%', height: '100%', backgroundColor: color}} />
		</TransparencyBackground>
	);
}