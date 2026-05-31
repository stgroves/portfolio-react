import {Slider, SliderThumbProps} from "@base-ui/react";

export function ColorSliderThumb(props: SliderThumbProps) {
	const {...rest} = props;

	return (
		<Slider.Thumb {...rest}/>
	)
}