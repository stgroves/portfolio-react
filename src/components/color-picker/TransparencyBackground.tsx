import React from "react";
import {Dimension2D} from "../../interfaces/values/tuples";
import {isParsableColor, isValidLength} from "../../utilities/css";

export interface TransparencyBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
	cellSize?: Dimension2D<string>;
	cell1Color?: string;
	cell2Color?: string;
}

const CELL_1_COLOR = 'gray';
const CELL_2_COLOR = 'white';
const CELL_SIZE = '20px';

export function TransparencyBackground(props: TransparencyBackgroundProps): React.ReactElement {
	const {
		children,
		style,
		cell1Color = CELL_1_COLOR,
		cell2Color = CELL_2_COLOR,
		cellSize = {width: CELL_SIZE, height: CELL_SIZE},
		...rest
	} = props;

	const validCell1Color = isParsableColor(cell1Color) ? cell1Color : CELL_1_COLOR;
	const validCell2Color = isParsableColor(cell2Color) ? cell2Color : CELL_2_COLOR;
	const validWidth = isValidLength(cellSize.width) ? cellSize.width : CELL_SIZE;
	const validHeight = isValidLength(cellSize.height) ? cellSize.height : CELL_SIZE;

	return (
		<div
			{...rest}
			style={{
				...style,
				backgroundImage: `conic-gradient(
					${validCell1Color} 0deg 90deg,
					${validCell2Color} 90deg 180deg,
					${validCell1Color} 180deg 270deg,
					${validCell2Color} 270deg 360deg
				)`,
				backgroundSize: `${validWidth} ${validHeight}`,
				backgroundPosition: "0 0"
			}}
		>
			{children}
		</div>
	)
}