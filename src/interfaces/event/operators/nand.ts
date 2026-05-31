import {Operator} from "./index";
import {OperatorTypes} from "../../../features/tree-builder";
import {MultipleInputMixin} from "../mix-ins";

export interface NandOperator extends Operator<typeof OperatorTypes.Nand>, MultipleInputMixin {}