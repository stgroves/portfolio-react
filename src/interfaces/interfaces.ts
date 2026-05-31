import {InvalidMode, AccessLevel} from "../enums/restriction";
import {IMenu} from "./menu";
import {IGrid, IStack} from "./containers";
import {IBoxGroup, IFoldoutGroup, IToggleGroup} from "./groups";

export interface IBase {
	key: string
}

export interface IRestrictive {
	accessLevel?: AccessLevel,
	invalidMode?: InvalidMode
}

export interface ILogo extends IBase, IRestrictive {
	type: "logo",
	src: string,
	alt: string,
	width?: number | string | undefined,
	height?: number | string | undefined
}

export interface IButton extends IBase, IRestrictive {
	type: "button",
	content: UIItem
}

type UIContainers = IGrid<UIItem> | IStack<UIItem>
type UIGroups = IBoxGroup<UIContainers> | IFoldoutGroup<UIContainers> | IToggleGroup<UIContainers>

export type UIItem = ILogo | IButton | IMenu | UIContainers | UIGroups;