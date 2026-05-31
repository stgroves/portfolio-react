import React, {ReactElement} from "react";

export function Slider2DSurface(props: React.HTMLAttributes<HTMLDivElement>): ReactElement {
	const { children, style, ...rest } = props;

	return (
		<div {...rest} style={{...style, position: 'relative', overflow: 'hidden'}}>
			{children}
		</div>
	);
}