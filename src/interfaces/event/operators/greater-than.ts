import {Operator} from "./index";
import {OperatorTypes} from "../../../features/tree-builder";
import {BaseInputMixin} from "../mix-ins";

export interface GreaterThanOperator extends Operator<typeof OperatorTypes.GreaterThan>, BaseInputMixin {}