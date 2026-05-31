import {NavigationMenu} from "@base-ui/react";
import React, {ReactElement} from "react";
import {NavLink} from "react-router-dom";
import styles from "../components/sidebar/Sidebar.module.css";
import {detectType, UniversalImage} from "../components/universal-image/UniversalImage";
import {ConditionalWrapper} from "../components/conditional-wrapper/ConditionalWrapper";

export enum Direction {
	Up = "up",
	Down = "down",
	Left = "left",
	Right = "right"
}

export interface BaseNavigationData {
	label: string;
	icon?: string;
}

export interface NavigationLinkData extends BaseNavigationData {
	type: "link";
	link: string;
}

export interface NavigationMenuData extends BaseNavigationData {
	type: "menu";
	submenu: NavigationMenuNode;
	arrowDirection: Direction;
}

export interface NavigationMenuNode {
	items: NavigationItem[];
	style: NavigationMenuConfig;
}

export interface NavigationMenuConfig {
	isNested?: boolean;
}

export type NavigationItem = NavigationLinkData | NavigationMenuData;

export function CreateLink(linkData: NavigationLinkData, children: React.ReactNode) {
	const isExternal = /^[a-z][a-z0-9+.-]*:\/\//i.test(linkData.link);

	if (isExternal)
		return (<a href={linkData.link} target="_blank" rel="noopener noreferrer">{children}</a>);

	return (<NavLink to={linkData.link}>{children}</NavLink>);
}

function CreateElement(item: BaseNavigationData): ReactElement {
	return (
		<>
			{item.icon ? <UniversalImage {...detectType(item.icon)} /> : null}
			{item.label}
		</>
	);
}

export function DrawArrow(arrowDirection: Direction): ReactElement {
	const className = `fa-solid fa-chevron-${arrowDirection}`;
	return (<i className={className}></i>);
}

export function BuildNavigationTree(menu: NavigationMenuNode): ReactElement {
	const hasSubmenu = menu.items.find(item => item.type === "menu") !== undefined;
	const isNested = menu.style.isNested ?? false;

	return (
		<NavigationMenu.Root>
			<NavigationMenu.List>
				{menu.items.map((item, index) => {
					switch (item.type) {
						case "link":
							return (
								<NavigationMenu.Item key={index}>
									<NavigationMenu.Link render={CreateLink(item, CreateElement(item))}/>
								</NavigationMenu.Item>
							);
						case "menu":
							return (
								<NavigationMenu.Item key={index}>
									<NavigationMenu.Trigger className={styles.Trigger}>
										{CreateElement(item)}
										<NavigationMenu.Icon className={styles.Icon}>
											{DrawArrow(item.arrowDirection)}
										</NavigationMenu.Icon>
									</NavigationMenu.Trigger>
									<NavigationMenu.Content className={styles.Content}>
										<div>
											{BuildNavigationTree(item.submenu)}
										</div>
									</NavigationMenu.Content>
								</NavigationMenu.Item>
							);
						default:
							throw new Error("Unrecognised type!");
					}
				})}
			</NavigationMenu.List>
			<ConditionalWrapper
				condition={hasSubmenu && !isNested}
				wrapper={(children):ReactElement => <NavigationMenu.Portal>
					<NavigationMenu.Positioner>
						<NavigationMenu.Popup>
							{children}
						</NavigationMenu.Popup>
					</NavigationMenu.Positioner>
				</NavigationMenu.Portal>}>
				{hasSubmenu ? <NavigationMenu.Viewport/> : null}
			</ConditionalWrapper>
		</NavigationMenu.Root>
	);
}