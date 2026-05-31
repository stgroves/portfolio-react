import {Operator} from "./index";
import {OperatorTypes} from "../../../features/tree-builder";
import {BaseInputMixin} from "../mix-ins";

export interface LessThanOperator extends Operator<typeof OperatorTypes.LessThan>, BaseInputMixin {}