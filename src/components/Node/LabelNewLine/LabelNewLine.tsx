import * as React from "react";
import { getTextDimensions, truncateText } from "../helpers";

interface LabelNewLineProps {
  label: string;
  state: string;
  type: string;
  textColor: string;
  value: string;
  hasChildren: boolean;
  countChildren: number | undefined;
  containerWidth: number;
  containerHeight: number;
  style: React.CSSProperties;
}

const LabelNewLine: React.FunctionComponent<LabelNewLineProps> = ({
  label,
  textColor,
  value,
  type,
  countChildren,
  hasChildren,
  containerWidth,
  containerHeight,
  style,
}) => {
  if (!label) {
    return null;
  }

  const fullLabel = hasChildren ? `${label.replace(/_/g, " ")} (${countChildren})` : label;
  
  const { width, height } = getTextDimensions(fullLabel, style);
  if (containerHeight < height) {
    return null;
  }
  const maxTextRows = Math.floor(containerHeight / height);
  const splitLabel =
    width >= containerWidth || !hasChildren
      ? label.replace(/_/g, " ")
          .split(/(?=[A-Z/a-z0-9.][^A-Z/a-z0-9. ])/g)
          .concat(value)
          .slice(0, maxTextRows)
      : [fullLabel];

  return (
    <>
      {splitLabel.map((item: string, index) => {
        return (
          <tspan
            fontSize={style.fontSize}
            fill={textColor}
            key={index}
            x={0}
            dy={style.fontSize}
          >
            {truncateText(item, style, containerWidth)}
          </tspan>
        );
      })}
    </>
  );
};

export default LabelNewLine;
