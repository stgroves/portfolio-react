import React, {JSXElementConstructor} from "react";
import {JSX} from "react/jsx-runtime";
import IntrinsicElements = JSX.IntrinsicElements;

export type ComponentEvents<T extends keyof IntrinsicElements | JSXElementConstructor<any>> = {
	[K in keyof React.ComponentProps<T> as K extends `on${string}` ? K : never]:
	React.ComponentProps<T>[K]
};

export type EventKeys<T extends JSXElementConstructor<any> | keyof IntrinsicElements> =
	Extract<keyof React.ComponentProps<T>, `on${string}`>;