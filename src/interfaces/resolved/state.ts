import {JSONNode} from "../json/node";
import {ComponentProps} from "react";
import {AnyComponent} from "../../features/tree-builder";

export interface ResolvedState<TJSONNode extends JSONNode> {
	id: string;
	jsonNode: TJSONNode;
	properties: ComponentProps<AnyComponent>;
}