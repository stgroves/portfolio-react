import {Orientation} from "@base-ui/react";
import {JSONContainerNode} from "../container";

export interface JSONStackNode extends JSONContainerNode {
	orientation: Orientation
}