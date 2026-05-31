import {JSONNode} from "./node";
import {JSONContainerNode} from "./container";

export interface JSONTree {
	elementRegistry?: Record<string, JSONNode>;
	layoutTree: JSONContainerNode;
	branchRegistry?: Record<string, JSONContainerNode>;
}