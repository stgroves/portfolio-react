import React from "react";

interface BaseProps {
	children: React.ReactNode;
}

export interface ConditionalWrapperProps extends BaseProps {
	condition: boolean;
	wrapper: (children: React.ReactNode) => React.ReactNode;
}

export function ConditionalWrapper({
	condition,
	wrapper,
	children,
}: ConditionalWrapperProps) {
	return condition ? wrapper(children) : children;
}
