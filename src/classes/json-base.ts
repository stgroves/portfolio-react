import {JSONValue} from "../interfaces/values/json-base";

export abstract class JSONBase {
	protected constructor(readonly type: string) { }

	public saveToJSON = (): JSONValue => {
		const jsonObj: JSONValue = {type: this.type};
		this.applyToJSONObject(jsonObj);
		return jsonObj;
	}

	protected abstract applyToJSONObject(obj: { [key: string]: JSONValue }): void;
}