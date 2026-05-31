import {IBase} from "./interfaces";
import {Orientation} from "@base-ui/react";

export interface IContainer<T> extends IBase {
	items: T[]
}

export interface IStack<T> extends IContainer<T> {
	type: "stack";
	orientation: Orientation;
}

export interface IGrid<T> extends IContainer<T> {
	type: "grid";
	prioritise?: Orientation;
	fixedCount?: number;
}