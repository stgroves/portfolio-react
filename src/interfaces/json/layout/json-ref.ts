import {JSONNode} from "../node";
import {LayoutTypes} from "../../../features/tree-builder";

export interface JSONRefNode extends JSONNode<typeof LayoutTypes.Ref> {
	["ref-type"]: "element" | "branch";
	ref: string;
}