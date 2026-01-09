'use client';

import { cloneElement, useId, useState, type ReactElement } from "react";

interface TooltipProps {
  children: ReactElement<any>;
  text: string;
  skipAriaDescription?: boolean;
}

export default function Tooltip({ children, text, skipAriaDescription }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const tooltipId = useId();

  const withHandlers = <Args extends unknown[]>(
    original?: (...args: Args) => void,
    handler?: (...args: Args) => void
  ) => {
    return (...args: Args) => {
      original?.(...args);
      handler?.(...args);
    };
  };

  const trigger = cloneElement(children, {
    "aria-describedby": (visible && !skipAriaDescription) ? tooltipId : undefined,
    onMouseEnter: withHandlers(children.props.onMouseEnter, () => setVisible(true)),
    onMouseLeave: withHandlers(children.props.onMouseLeave, () => setVisible(false)),
    onFocus: withHandlers(children.props.onFocus, () => setVisible(true)),
    onBlur: withHandlers(children.props.onBlur, () => setVisible(false)),
  } as Record<string, unknown>);

  return (
    <div className="relative inline-flex items-center">
      {trigger}
      <div
        id={tooltipId}
        role="tooltip"
        className={`absolute z-10 w-max px-3 py-1.5 text-sm font-medium text-white bg-slate-800 rounded-md shadow-sm bottom-full left-1/2 -translate-x-1/2 mb-2 transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-800" />
      </div>
    </div>
  );
}
