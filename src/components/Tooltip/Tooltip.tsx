import "./Tooltip.css";
import * as React from "react";
import useTooltip from "./useTooltip";

interface TooltipProps {
  label: React.ReactNode;
  value?: number | string | Date;
  state?: string;
  type?: string;
  dataType?: string | undefined;
  columnType?: string | undefined;
}

const Tooltip: React.FC<TooltipProps> = ({ label, value, type, state, columnType, dataType }) => {
  const { tooltipClassName } = useTooltip();
  return (
    <div className={tooltipClassName}>
      <div className="TreeMap__tooltip">
        {value !== undefined ? (
          <div>
            <h4 className="TreeMap__tooltipLabel">
              {label} {type ? `(${type})` : ""}
            </h4>
            <span className="TreeMap__tooltipValue">
              Similarity Score: {`${value}`}
            </span>
            <br></br>
            {state && <span className="TreeMap__tooltipValue">
              State: {`${state}`}
            </span>}
            {columnType && <>
              <br></br>
              <span className="TreeMap__tooltipValue">
                Column Type: {`${columnType}`}
            </span>
            </>}
            {dataType && <>
              <br></br><span className="TreeMap__tooltipValue">
                Data Type: {`${dataType}`}
              </span>
            </>}
          </div>
        ) : (
          label
        )}
      </div>
    </div>
  );
};

export default Tooltip;