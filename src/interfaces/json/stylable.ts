import {CSSProperties} from "react";
import {JSONNode} from "./node";

export interface JSONStylableNode<TType extends string = string> extends JSONNode<TType> {
	style: CSSProperties
	className: string
}