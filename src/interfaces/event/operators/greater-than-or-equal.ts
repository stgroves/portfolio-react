import {Operator} from "./index";
import {OperatorTypes} from "../../../features/tree-builder";
import {BaseInputMixin} from "../mix-ins/";

export interface GreaterThanOrEqualOperator extends Operator<typeof OperatorTypes.GreaterThanOrEqual>, BaseInputMixin {}