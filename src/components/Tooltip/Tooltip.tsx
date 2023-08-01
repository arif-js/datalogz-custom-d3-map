import "./Tooltip.css";

import * as React from "react";
import classnames from "classnames";

import useTooltip from "./useTooltip";

interface TooltipProps {
  label: React.ReactNode;
  value?: number | string | Date;
  state?: string;
  type?: string;
}

export const Tooltip = React.memo<TooltipProps>(({ label, value, type, state }) => {
  const { tooltipClassName } = useTooltip();
  return (
    <div className={tooltipClassName}>
      <div className="TreeMap__tooltip">
        {value !== undefined ? (
          <div>
            <h4 className="TreeMap__tooltipLabel">{label} {type? `(${type})` : ''}</h4>
            <span className="TreeMap__tooltipValue">Similarity Score: {`${value}`}</span>
          </div>
        ) : (
          label
        )}
      </div>
    </div>
  );
});
