import {Stack} from "../stack/Stack";
import sidebarLogo from "../../assets/sidebar-logo.png";
import styles from "./Sidebar.module.css";
import {Button, Separator} from "@base-ui/react";
import React from "react";
import {BuildNavigationTree, NavigationMenuNode} from "../../features/navigation-builder";

export interface SidebarProps {
	links: NavigationMenuNode;
}

export function Sidebar({links}: SidebarProps) {
	return (
		<Stack orientation={"vertical"} className={styles.Sidebar}>
			<div style={{ display: "flex", flexDirection: "column", gap: "10px"}}>
				<div className={styles.Slot}>
					<img src={sidebarLogo} alt="Logo" width="200px" height="200px"/>
				</div>
				<Button>Download CV</Button>
			</div>
			{BuildNavigationTree(links)}
			<div style={{ display: "flex", flexDirection: "column", gap: "10px"}}>
				<Separator orientation="horizontal"/>
				<Button>Webmaster Login</Button>
			</div>
		</Stack>
	);
}