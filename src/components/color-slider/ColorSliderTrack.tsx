import {Slider, SliderTrackProps} from "@base-ui/react";
import {useColorSliderContext} from "./ColorSliderContext";
import React from "react";

export function ColorSliderTrack(props: SliderTrackProps): React.ReactElement {
	const { children, style, ...rest } = props;
	const { canvasRef } = useColorSliderContext();

	return (
		<Slider.Track {...rest} style={{ ...style, background: "transparent" }}>
			<canvas ref={canvasRef} style={{ width: "100%", height: "100%" }}/>
			{children}
		</Slider.Track>
	)
}