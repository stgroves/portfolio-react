import {JSONStylableNode} from "./stylable";
import {JSONNode} from "./node";

export interface JSONContainerNode<TType extends string = string> extends JSONStylableNode<TType> {
	children: JSONNode[];
}