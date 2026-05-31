import {TEXT_NODE} from "../../features/tree-builder";
import {JSONNode} from "./node";
import {SingleValue} from "../mix-ins/single-value";

export interface JSONTextNode extends JSONNode<typeof TEXT_NODE>, SingleValue<string> {}