import "./Node.css";

import * as React from "react";
import classnames from "classnames";
import { ScaleLinear } from "d3-scale";
import useTooltip from "../Tooltip/useTooltip";
import Tooltip from "../Tooltip/Tooltip";
import NumberOfChildren, {
  NumberOfChildrenPlacement,
} from "./NumberOfChildren";
import { getNumberItemsWidthByNumberOfChars } from "./helpers";
import LabelNewLine from "./LabelNewLine";
import { Utils } from "../../utils/Utils";

export interface NodeProps {
  /*
        HierarchyRectangularNode properties
    */
  x0?: number;
  y0?: number;
  x1?: number;
  y1?: number;

  bgColor: string;
  textColor: string;
  borderColor: string;
  className?: string;
  hasChildren: boolean;
  height?: number;
  hideNumberOfChildren?: boolean;
  id: number;
  isSelectedNode: boolean;
  label: string;
  type: string;
  state: string;
  dataType: string | undefined;
  columnType: string | undefined;
  expression: string | undefined;
  similarity_score: number | undefined;
  countChildren: number | undefined;
  nodeTotalNodes: number;
  onClick?: (ev?: React.MouseEvent<SVGElement>) => void;
  style?: React.CSSProperties;
  treemapId?: string;
  url: string;
  value: string;
  hideValue: boolean;
  width?: number;
  xScaleFactor?: number;
  xScaleFunction?: ScaleLinear<number, number>;
  xTranslated?: number;
  yScaleFactor?: number;
  yScaleFunction?: ScaleLinear<number, number>;
  yTranslated?: number;
  zoomEnabled?: boolean;
  numberOfChildrenPlacement: NumberOfChildrenPlacement;
}

const Node: React.FunctionComponent<NodeProps> = ({
  bgColor,
  borderColor,
  className,
  hasChildren,
  height,
  hideNumberOfChildren,
  id,
  isSelectedNode,
  label,
  type,
  state,
  dataType,
  columnType,
  expression,
  similarity_score,
  countChildren,
  nodeTotalNodes,
  onClick,
  textColor,
  treemapId,
  url,
  hideValue,
  value,
  width,
  x0,
  x1,
  xScaleFactor,
  xScaleFunction,
  xTranslated,
  y0,
  y1,
  yScaleFactor,
  yScaleFunction,
  yTranslated,
  zoomEnabled,
  style,
  numberOfChildrenPlacement,
}) => {
  const currentXTranslated =
    xTranslated !== undefined
      ? xTranslated
      : zoomEnabled === true
      ? xScaleFunction(x0)
      : x0;
  const currentYTranslated =
    yTranslated !== undefined
      ? yTranslated
      : zoomEnabled === true
      ? yScaleFunction(y0)
      : y0;
  
  // Modified width/height of the tile based on the state value
  const currentWidth = width !== undefined ? width : xScaleFactor * (x1 - x0) > 200 && state === "copied" && !isSelectedNode ? 200 : xScaleFactor * (x1 - x0);
  const currentHeight = height !== undefined ? height : state === "copied" && yScaleFactor * (y1 - y0) > 50 && !isSelectedNode ? 50 : yScaleFactor * (y1 - y0);

  const cursor =
    hasChildren === true && isSelectedNode === false ? "pointer" : "auto";

  const fontSize = Number(style.fontSize);
  const itemsWidth = getNumberItemsWidthByNumberOfChars(
    fontSize,
    nodeTotalNodes.toString().length
  );
  const showNumberOfItems = !hideNumberOfChildren && hasChildren;

  const paddedCurrentWidth =
    currentWidth -
    (Number(style.paddingLeft) || 0) -
    (Number(style.paddingRight) || 4);
  const clipWidth = Math.max(
    0,
    showNumberOfItems &&
      numberOfChildrenPlacement === NumberOfChildrenPlacement.TopRight
      ? paddedCurrentWidth - itemsWidth
      : paddedCurrentWidth
  );

  const { hideTooltip, showTooltip, disableTooltip } = useTooltip();

  const handleMouseMove = React.useCallback(
    (ev: React.MouseEvent) => {
      showTooltip(<Tooltip label={label} countChildren={countChildren} similarity_score={similarity_score} value={value} type={type} expression={expression} state={state} columnType={columnType} dataType={dataType} />, ev);
    },
    [showTooltip, value, label]
  );

  const handleMouseLeave = React.useCallback(() => {
    hideTooltip();
  }, [showTooltip]);

  return (
    <g
      onMouseEnter={disableTooltip ? undefined : handleMouseMove}
      onMouseLeave={disableTooltip ? undefined : handleMouseLeave}
      onMouseMove={disableTooltip ? undefined : handleMouseMove}
      transform={`translate(${currentXTranslated},${currentYTranslated})`}
      id={`${id}`}
      onClick={hasChildren ? onClick : null}
      style={{ cursor }}
    >
      <rect
        id={`rect-${id}`}
        width={currentWidth}
        height={currentHeight}
        className={classnames("Node", className)}
        style={{
          fill: bgColor,
          stroke: borderColor,
          ...style,
        }}
      />
      <clipPath id={`clip-${treemapId}-${id}`}>
        <rect width={clipWidth} height={currentHeight} />
      </clipPath>
      <a
        className={classnames({ Node__link: !!url })}
        href={url}
        target="_blank"
      >
        <text
          clipPath={`url(#clip-${treemapId}-${id})`}
          transform={`translate(${style.paddingLeft || 0}, ${
            style.paddingTop || 0
          })`}
          style={{
            fontVariant: style.fontVariant,
            fontWeight: style.fontWeight,
            fontSize: style.fontSize,
            fontFamily: style.fontFamily,
          }}
        >
          <LabelNewLine
            label={label}
            countChildren={countChildren}
            type={type}
            state={state}
            textColor={textColor}
            value={hideValue ? '' : value}
            hasChildren={hasChildren}
            containerWidth={clipWidth}
            containerHeight={currentHeight}
            style={style}
          />
        </text>
      </a>

      {/* Type value */}
      <text
          dy="2.1em" 
        >
          <tspan
            fontSize={style.fontSize}
            fill={textColor}
            style={{ fontStyle: "italic" }}
            dx={4}
          >
            {type ? Utils.capitalizeString(type) : ''}
          </tspan>
        </text>
      {showNumberOfItems && (
        <NumberOfChildren
          customId={id}
          width={currentWidth}
          height={currentHeight}
          style={style}
          textColor={textColor}
          nodeTotalNodes={nodeTotalNodes}
          isSelectedNode={isSelectedNode}
          placement={numberOfChildrenPlacement}
        />
      )}
    </g>
  );
};

export default Node;
