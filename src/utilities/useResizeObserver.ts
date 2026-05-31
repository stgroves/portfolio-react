import React, {RefObject, useEffect} from 'react';

const useResizeObserver:
	(ref: React.RefObject<Element | null>, callback: (rect: DOMRectReadOnly) => void, observeParent?: boolean) =>
		void = (ref: RefObject<Element | null>, callback: (rect: DOMRectReadOnly) => void, observeParent = false): void =>
{
	useEffect(() => {
		if (!ref.current)
			return;

		const observer = new ResizeObserver((entries: ResizeObserverEntry[]): void => {
			callback(entries[0].contentRect);
		});

		const target: Element | null = observeParent ? ref.current.parentElement : ref.current;

		if (!target)
			return;

		observer.observe(target);
		return () => observer.disconnect();
	}, [ref, callback, observeParent]);
}
export default useResizeObserver