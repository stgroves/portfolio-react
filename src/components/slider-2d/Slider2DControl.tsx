import React, {ReactElement, ReactNode, RefObject, useEffect, useRef} from "react";
import {useSlider2DContext} from "./Slider2DContext";

import {clamp, roundToNearest} from "../../utilities/math";
import {AccessibilityKeys} from "../../utilities/accessibility";

export interface Slider2DControlProps extends React.HTMLProps<HTMLDivElement>{
	children?: ReactNode;
}

export function Slider2DControl(props: Slider2DControlProps): ReactElement {
	const { children, style, ...rest } = props;
	const {
		setXY,
		xRange,
		yRange,
		step,
		largeStep,
		valueRef,
		interval,
		setLiveText,
		liveText
	} = useSlider2DContext();

	const pressedKeys: RefObject<Set<string>> = useRef(new Set<string>());

	const lastAnnounced: RefObject<{x: number | null, y: number | null}> =
		useRef<{x: number | null, y: number | null}>({ x: null, y: null });

	useEffect((): void => {
		const { x, y } = valueRef.current;

		if (lastAnnounced.current.x !== x || lastAnnounced.current.y !== y) {
			lastAnnounced.current = { x, y };
			setLiveText(`X ${x}, Y ${y}`);
		}
	}, [valueRef]);


	function handlePointerDown(e: React.PointerEvent<HTMLDivElement>): void {
		const el: Element & HTMLDivElement = e.currentTarget;
		el.setPointerCapture(e.pointerId);

		function move(ev: PointerEvent): void {
			const rect: DOMRect = el.getBoundingClientRect();

			const percentX: number = clamp((ev.clientX - rect.left) / rect.width, 0, 1);
			const percentY: number = clamp((ev.clientY - rect.top) / rect.height, 0, 1);

			const x: number = xRange.min + percentX * xRange.getRange();
			const y: number = yRange.min + percentY * yRange.getRange();

			setXY(
				roundToNearest(x, step.x),
				roundToNearest(y, step.y)
			);
		}

		function up(ev: PointerEvent) {
			el.releasePointerCapture(ev.pointerId);
			window.removeEventListener("pointermove", move);
			window.removeEventListener("pointerup", up);
		}

		window.addEventListener("pointermove", move);
		window.addEventListener("pointerup", up);

		move(e.nativeEvent);
	}

	function handleBlur() {
		pressedKeys.current.clear();
		cancelAnimationFrame(raf.current!);
		raf.current = null;
	}

	const raf = useRef<number | null>(null);
	const lastTime = useRef(0);

	function updateFromKeys() {
		const usingLargeStep = pressedKeys.current.has(AccessibilityKeys.LARGE_STEP);

		const stepX = usingLargeStep ? largeStep.x : step.x;
		const stepY = usingLargeStep ? largeStep.y : step.y;

		let dx: number = 0;
		let dy: number = 0;

		if (pressedKeys.current.has(AccessibilityKeys.ARROW_RIGHT))
			dx += stepX;

		if (pressedKeys.current.has(AccessibilityKeys.ARROW_LEFT))
			dx -= stepX;

		if (pressedKeys.current.has(AccessibilityKeys.ARROW_DOWN))
			dy += stepY;

		if (pressedKeys.current.has(AccessibilityKeys.ARROW_UP))
			dy -= stepY;

		if (dx !== 0 && dy !== 0) {
			const factor: number = 1 / Math.sqrt(2);
			dx *= factor;
			dy *= factor;
		}

		setXY(valueRef.current.x + dx, valueRef.current.y + dy);
	}
//#region test
	function loop(time: number) {
		if (time - lastTime.current >= interval) {
			updateFromKeys();
			lastTime.current = time;
		}
		raf.current = requestAnimationFrame(loop);
	}
//#endregion
	function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
		if (!pressedKeys.current.has(e.key))
			pressedKeys.current.add(e.key);

		if (raf.current === null)
			raf.current = requestAnimationFrame(loop);
	}

	function handleKeyUp(e: React.KeyboardEvent) {
		pressedKeys.current.delete(e.key);

		if (pressedKeys.current.size === 0) {
			cancelAnimationFrame(raf.current!);
			raf.current = null;
		}
	}

	return (
		<div
			{...rest}
			role = "application"
			tabIndex = {0}
			aria-label = "2D Slider"
			aria-description = "Use arrow keys to adjust X and Y. Shift for large steps."
			onPointerDown = {handlePointerDown}
			onKeyDown = {handleKeyDown}
			onKeyUp = {handleKeyUp}
			onBlur = {handleBlur}
			style = {{
				...style,
				position: "relative",
				touchAction: "none"
			}}
		>
			{children}
			<div
				aria-live="polite"
				style={{
					position: "absolute",
					width: 1,
					height: 1,
					overflow: "hidden",
					clip: "rect(0 0 0 0)",
					whiteSpace: "nowrap"
				}}
			>
				{liveText}
			</div>
		</div>
	);
}