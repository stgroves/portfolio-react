import {IContainer} from "./containers";
import {IBase, IRestrictive} from "./interfaces";

interface IGroup<T extends IContainer<any>> extends IBase, IRestrictive {
	label?: string;
	content: T;
}

export interface IBoxGroup<T extends IContainer<any>> extends IGroup<T> {
	type: "box-group";
}

export interface IFoldoutGroup<T extends IContainer<any>> extends IGroup<T> {
	type: "foldout-group";
	folded?: boolean;
}

export interface IToggleGroup<T extends IContainer<any>> extends IGroup<T> {
	type: "toggle-group";
	toggled?: boolean;
}