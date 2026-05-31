export class Dictionary<TKey, TValue> implements Iterable<[TKey, TValue]> {
	protected readonly data: Map<TKey, TValue>

	get size(): number { return this.data.size; }

	constructor(data?: Iterable<[TKey, TValue]>) {
		this.data = new Map();

		if (!data)
			return;

		for (const [key, value] of data)
			this.add(key, value);
	}

	[Symbol.iterator](): IterableIterator<[TKey, TValue]> {
		return this.data[Symbol.iterator]();
	}

	keys(): MapIterator<TKey> {
		return this.data.keys();
	}

	values(): MapIterator<TValue> {
		return this.data.values();
	}

	entries(): MapIterator<[TKey, TValue]> {
		return this.data.entries();
	}

	add(key: TKey, value: TValue): Dictionary<TKey, TValue> {
		if (this.data.has(key))
			throw new Error(`${key} already exists`);

		return this.set(key, value);
	}

	delete(key: TKey): boolean {
		return this.data.delete(key);
	}

	set(key: TKey, value: TValue): Dictionary<TKey, TValue> {
		this.data.set(key, value);
		return this;
	}

	tryGet(key: TKey): [true, TValue] | [false, undefined] {
		return this.has(key) ? [true, this.get(key)] : [false, undefined]
	}

	get(key: TKey): TValue {
		if (!this.has(key))
			throw new Error(`Key not found: ${key}`);

		return this.data.get(key)!;
	}

	has(key: TKey): boolean {
		return this.data.has(key);
	}

	clear(): void {
		this.data.clear();
	}
}