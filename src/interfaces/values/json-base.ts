import {JSONBase} from "../../classes/json-base";

export type JSONValue =
	| string
	| number
	| boolean
	| null
	| JSONValue[]
	| { [key: string]: JSONValue };

export interface JSONSerializableObject {
	type: string;
	[key: string]: JSONValue;
}

export interface JSONConstructor<T extends JSONBase> {
	new (...args: any[]): T;
	fromJSON(json: JSONSerializableObject): T;
	ID: string;
}

export function registerJSONClass<T extends JSONBase>(ctor: JSONConstructor<T>) {
	if (typeof ctor.fromJSON !== "function") {
		throw new Error(`${ctor.name} does not implement fromJSON`);
	}
}