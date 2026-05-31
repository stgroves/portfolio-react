import {Operator} from "./index";
import {OperatorTypes} from "../../../features/tree-builder";
import {BaseInputMixin} from "../mix-ins";

export interface LessThanOrEqualOperator extends Operator<typeof OperatorTypes.LessThanOrEqual>, BaseInputMixin {}