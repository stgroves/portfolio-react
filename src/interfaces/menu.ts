import {IBase, IRestrictive} from "./interfaces";
import {IContainer, IGrid, IStack} from "./containers";
import {IBoxGroup, IFoldoutGroup, IToggleGroup} from "./groups";

export interface IMenu extends IContainer<MenuItem>, IRestrictive {
	type: "menu"
}

export interface ISeparator extends IBase {
	type: "separator"
}

interface IMenuContentItem extends IBase, IRestrictive {
	name: string,
	icon?: string,
}

export interface IMenuLink extends IMenuContentItem {
	type: "link",
	href: string
}

export interface IMenuSubMenu extends IMenuContentItem, IContainer<MenuItem> {
	type: "submenu",
	isNested?: true
}

type MenuContainer = IStack<MenuItem> | IGrid<MenuItem>
type MenuGroups = IFoldoutGroup<MenuContainer> | IBoxGroup<MenuContainer> | IToggleGroup<MenuContainer>;

export type MenuItem = IMenuSubMenu | IMenuLink | ISeparator | MenuContainer | MenuGroups;