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
  expression?: string | undefined;
}

function prettyFormatDAX(dax) {
  let formattedDax = [];
  const lines = dax.split('\n');

  let indentLevel = 0;
  for (let line of lines) {
      line = line.trim();

      // Adjust the indentation if ending a block
      if (line.endsWith(')')) {
          indentLevel--;
      }

      // Add indentation
      formattedDax.push('    '.repeat(indentLevel) + line);

      // Adjust the indentation if starting a block
      if (line.includes('=') || line.endsWith('(')) {
          indentLevel++;
      }
  }

  console.log(formattedDax.join('\n'))
  return formattedDax.join('\n');
}

const Tooltip: React.FC<TooltipProps> = ({ label, value, type, state, columnType, dataType, expression }) => {
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
              <span style={{ color: "rgb(27 140 249)", fontWeight: 500 }}>Similarity Score:</span> {`${value}`}
            </span>
            <br></br>
            {state && <span className="TreeMap__tooltipValue">
              <span style={{ color: "rgb(27 140 249)", fontWeight: 500 }}>State:</span>: {`${state}`}
            </span>}
            {columnType && <>
              <br></br>
              <span className="TreeMap__tooltipValue">
                <span style={{ color: "rgb(27 140 249)", fontWeight: 500 }}>Column Type:</span> {`${columnType}`}
              </span>
            </>}
            {dataType && <>
              <br></br><span className="TreeMap__tooltipValue">
                <span style={{ color: "rgb(27 140 249)", fontWeight: 500 }}>Data Type:</span> {`${dataType}`}
              </span>
            </>}
            {expression && <>
              <br></br><span className="TreeMap__tooltipValue" style={{ whiteSpace: "pre" }}>
                <span style={{ color: "rgb(27 140 249)", fontWeight: 500 }}>Expression:</span>: {prettyFormatDAX(expression)}
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