import * as React from "react";
import classnames from "classnames";

import {
  TreemapLayout,
  HierarchyRectangularNode,
  treemap,
  hierarchy,
  treemapSquarify,
} from "d3-hierarchy";
import { scaleLinear, ScaleSequential, scaleSequential } from "d3-scale";
import { interpolateSpectral } from "d3-scale-chromatic";

import Node, { NumberOfChildrenPlacement } from "../Node";
import Breadcrumb from "../Breadcrumb";
import { ITreeMapProps, ColorModel } from "./ITreeMapProps";
import { ITreeMapState } from "./ITreeMapState";
import { Utils } from "../../utils/Utils";
import TooltipProvider from "../Tooltip/TooltipProvider";

export interface CustomHierarchyRectangularNode<TreeMapInputData>
  extends HierarchyRectangularNode<TreeMapInputData> {
  customId: number;
}

class TreeMap<TreeMapInputData> extends React.Component<
  ITreeMapProps<TreeMapInputData>,
  ITreeMapState<TreeMapInputData>
> {
  // Default Props values
  public static defaultProps: ITreeMapProps<{}> = {
    id: "myTreeMap",
    data: null,
    dataChanged: 0,
    height: 600,
    width: 600,
    valueFormat: ",d",
    disableBreadcrumb: false,
    colorModel: ColorModel.OneEachChildren,
    paddingInner: 0,
    customD3ColorScale: scaleSequential(interpolateSpectral),
    namePropInData: "name",
    linkPropInData: "link",
    valuePropInData: "value", // can be value, count, ...
    childrenPropInData: "children",
    statePropInData: "state",
    typePropInData: "type",
    numberOfChildrenPlacement: NumberOfChildrenPlacement.BottomRight,
    darkNodeTextColor: "white",
    darkNodeBorderColor: "white",
    lightNodeTextColor: "black",
    lightNodeBorderColor: "black",
    disableTooltip: false,
    tooltipOffsetX: 0,
    tooltipOffsetY: 0,
    levelsToDisplay: 1,
  };


  // Note. This treemap element initially was using treemap and hierarchy directly on the render.
  //       I noticed a performance problem when the original data "this.props.data" has more than 1500 elements.
  //       Now, the component is designed to show only the first level of nodes and when click on one expand the rest.
  private _treemap: TreemapLayout<TreeMapInputData>;
  private _rootData: HierarchyRectangularNode<TreeMapInputData>;
  private _nodes: Array<CustomHierarchyRectangularNode<TreeMapInputData>>;

  constructor(props: ITreeMapProps<TreeMapInputData>) {
    super(props);

    const { width, height, data, dataChanged, namePropInData } = props;

    this._createD3TreeMap(width, height, data);

    // Default State values
    this.state = {
      height,
      width,
      data,
      dataChanged,
      xScaleFactor: 1,
      yScaleFactor: 1,
      xScaleFunction: scaleLinear().range([0, width]),
      yScaleFunction: scaleLinear().range([0, height]),
      zoomEnabled: false,
      breadcrumbItems: [
        {
          text: data[namePropInData],
          key: 0,
        },
      ],
      selectedId: 0,
      selectedNode: this._treemap(
        this._rootData
      ) as CustomHierarchyRectangularNode<TreeMapInputData>,
    };
  }

  public componentDidMount() {
    const { onTreeMapDidMount } = this.props;
    this._zoomTo(0);
    if (onTreeMapDidMount) {
      onTreeMapDidMount(this);
    }
  }

  public UNSAFE_componentWillReceiveProps(
    nextProps: ITreeMapProps<TreeMapInputData>
  ) {
    const { width, height, data, dataChanged } = nextProps;

    if (this.state.dataChanged !== dataChanged) { // if the data changed
      this._createD3TreeMap(width, height, data);
      this._zoomTo(0);
      this.setState({
        data,
        dataChanged,
        width,
        height,
        xScaleFunction: scaleLinear().range([0, width]),
        yScaleFunction: scaleLinear().range([0, height]),
        selectedNode: this._treemap(
          this._rootData
        ) as CustomHierarchyRectangularNode<TreeMapInputData>,
      });
    }

    if (height !== this.props.height || width !== this.props.width) {
      this.setState({
        width,
        height,
        xScaleFunction: scaleLinear().range([0, width]),
        yScaleFunction: scaleLinear().range([0, height]),
        selectedNode: this._treemap(
          this._rootData
        ) as CustomHierarchyRectangularNode<TreeMapInputData>,
      });
    }
  }

  public render() {
    const { width, height, breadcrumbItems, selectedNode, data } = this.state;

    const {
      svgClassName,
      svgStyle,
      className,
      childrenPropInData,
      breadCrumbClassName,
      disableBreadcrumb,
      tooltipPlacement,
      tooltipClassName,
      disableTooltip,
      tooltipOffsetX,
      tooltipOffsetY,
      levelsToDisplay,
    } = this.props;

    this._createD3TreeMap(width, height, data);

    let reactNodes: Array<React.ReactNode> = [];
    const maxLevel = levelsToDisplay;
    const iterateAllChildren = (
      mainNode: CustomHierarchyRectangularNode<TreeMapInputData>,
      level: number
    ) => {
      reactNodes = reactNodes.concat(this._getNode(mainNode));
      if (level < maxLevel) {
        if (
          mainNode.hasOwnProperty(childrenPropInData) &&
          mainNode[childrenPropInData].length > 0
        ) {
          mainNode[childrenPropInData].forEach((element) => {
            iterateAllChildren(element, level + 1);
          });
        }
      }
    };
    iterateAllChildren(selectedNode, 0);

    return (
      <TooltipProvider
        tooltipPlacement={tooltipPlacement}
        tooltipClassName={tooltipClassName}
        disableTooltip={disableTooltip}
        tooltipOffsetX={tooltipOffsetX}
        tooltipOffsetY={tooltipOffsetY}
      >
        <div className={className}>
          {disableBreadcrumb === false ? (
            <Breadcrumb
              items={breadcrumbItems}
              className={breadCrumbClassName}
            />
          ) : null}
          <svg
            className={classnames(svgClassName)}
            height={height}
            width={width}
            style={{ ...svgStyle }}
            // preserveAspectRatio="xMidYMid slice"
          >
            {reactNodes}
          </svg>
        </div>
      </TooltipProvider>
    );
  }

  private _createD3TreeMap(
    width: number,
    height: number,
    data: TreeMapInputData
  ) {
    const {
      valuePropInData,
      childrenPropInData,
      paddingInner,
      colorModel,
    } = this.props;
    // 1. Create treemap structure
    this._treemap = treemap<TreeMapInputData>()
      .size([width, height])
      .tile(treemapSquarify.ratio(1))
      .paddingOuter(3)
      .paddingTop(19)
      .paddingInner(paddingInner)
      .round(true);

    // 2. Before compute a hierarchical layout, we need a root node
    //    If the data is in JSON we use d3.hierarchy
    this._rootData = hierarchy(data)
      .sum((s) => {
        if (s["state"] === "copied") {
          return 1; // Smaller width for "copied" nodes
        } else {
          return 4; // Larger width for other nodes
        }
      })
      .sort(
        (a, b) => a[valuePropInData] - b[valuePropInData]
      ) as HierarchyRectangularNode<TreeMapInputData>;

    // 3. Get array of nodes
    let numberItemId = 0;
    this._nodes = this._treemap(this._rootData)
      .each((item: CustomHierarchyRectangularNode<TreeMapInputData>) => {
        item.customId = numberItemId++;
      })
      .descendants() as Array<CustomHierarchyRectangularNode<TreeMapInputData>>;
  }

  private _getNode(node: CustomHierarchyRectangularNode<TreeMapInputData>) {
    const {
      id: treemapId,
      valueUnit,
      hideValue,
      hideNumberOfChildren,
      nodeStyle,
      nodeClassName,
      valuePropInData,
      childrenPropInData,
      namePropInData,
      linkPropInData,
      statePropInData,
      typePropInData,
      numberOfChildrenPlacement,
      darkNodeTextColor,
      darkNodeBorderColor,
      lightNodeTextColor,
      lightNodeBorderColor,
    } = this.props;

    const {
      selectedId,
      xScaleFactor,
      xScaleFunction,
      yScaleFactor,
      yScaleFunction,
      zoomEnabled,
    } = this.state;

    const { customId, data, x0, x1, y0, y1 } = node;

    const name = data[namePropInData];
    const url = data[linkPropInData];
    const state = data[statePropInData];
    const dataType = data['data_type'];
    const columnType = data['column_type'];
    const similarity_score = data['sim_score'];
    const expression = data['expression'];
    const countChildren = data['count_children'];
    const type = data[typePropInData];
    const nodeClassNameFromData = data["className"];
    const nodeStyleFromData = data["style"] ? JSON.parse(data["style"]) : {};

    const hasChildren =
      node[childrenPropInData] && node[childrenPropInData].length > 0
        ? true
        : false;
    const formattedValue = data[valuePropInData] ? `${Math.round((data[valuePropInData] + Number.EPSILON) * 100) / 100}${valueUnit ? ` ${valueUnit}` : ""}` : '';

    const nodeTotalNodes = node.descendants().length - 1;
    const { bgColor, textColor, borderColor } = this._getColorsFromNode(
      node,
      nodeTotalNodes,
      nodeStyleFromData,
      {
        darkNodeTextColor,
        darkNodeBorderColor,
        lightNodeTextColor,
        lightNodeBorderColor,
      }
    );

    const isSelectedNode = customId === selectedId;

    return (
      <Node
        bgColor={bgColor}
        textColor={textColor}
        borderColor={borderColor}
        className={classnames(nodeClassName, nodeClassNameFromData)}
        style={{
          fontVariant: "normal",
          fontWeight: "normal",
          fontSize: 14,
          fontFamily: "Arial",
          ...nodeStyle,
          ...nodeStyleFromData,
        }}
        hasChildren={hasChildren}
        hideNumberOfChildren={hideNumberOfChildren}
        id={customId}
        isSelectedNode={isSelectedNode}
        key={customId}
        label={name}
        state={state}
        dataType={dataType}
        columnType={columnType}
        similarity_score={similarity_score}
        expression={expression}
        countChildren={countChildren}
        type={type}
        nodeTotalNodes={nodeTotalNodes}
        onClick={!isSelectedNode ? this._onNodeClick : undefined}
        treemapId={treemapId}
        url={url}
        value={formattedValue}
        hideValue={hideValue}
        x0={x0}
        x1={x1}
        xScaleFactor={xScaleFactor}
        xScaleFunction={xScaleFunction}
        y0={y0}
        y1={y1}
        yScaleFactor={yScaleFactor}
        yScaleFunction={yScaleFunction}
        zoomEnabled={zoomEnabled}
        numberOfChildrenPlacement={numberOfChildrenPlacement}
      />
    );
  }

  private _onBreadcrumbItemClicked = (ev: React.MouseEvent<HTMLElement>) => {
    this._zoomTo(Number(ev.currentTarget.id));
  };

  private _onNodeClick = (ev: React.MouseEvent<SVGElement>) => {
    this._zoomTo(parseInt(ev.currentTarget.id));
  };

  private _getColorsFromNode(
    node: CustomHierarchyRectangularNode<TreeMapInputData>,
    nodeTotalNodes: number,
    nodeStyleFromData,
    {
      darkNodeTextColor,
      darkNodeBorderColor,
      lightNodeTextColor,
      lightNodeBorderColor,
    }
  ) {
    let backgroundColor;
    backgroundColor = nodeStyleFromData.fill;

    return {
      bgColor: backgroundColor,
      textColor:
        Utils.getHighContrastColorFromString(backgroundColor) === "dark"
          ? darkNodeTextColor
          : lightNodeTextColor,
      borderColor:
        Utils.getHighContrastColorFromString(backgroundColor) === "dark"
          ? darkNodeBorderColor
          : lightNodeBorderColor,
    };
  }

  private _zoomTo(nodeId: number) {
    const { xScaleFunction, yScaleFunction, width, height } = this.state;

    const { onZoom } = this.props;

    const currentNode = this._nodes
      .filter((item: CustomHierarchyRectangularNode<TreeMapInputData>) => {
        return item.customId.toString() === nodeId.toString();
      })
      .pop();
    if (currentNode) {
      const x = currentNode.x0;
      const y = currentNode.y0;
      const dx = currentNode.x1 - currentNode.x0;
      const dy = currentNode.y1 - currentNode.y0;
      const xScaleFactor = width / dx;
      const yScaleFactor = height / dy;
      const breadcrumbItems = this._treemap(this._rootData)
        .path(currentNode)
        .map(
          ({
            data,
            customId,
          }: CustomHierarchyRectangularNode<TreeMapInputData>) => {
            return {
              text: data["name"],
              key: customId,
              onClick:
                customId !== nodeId ? this._onBreadcrumbItemClicked : undefined,
            };
          }
        );
      if (onZoom) {
        onZoom(currentNode.depth, nodeId, breadcrumbItems);
      }
      this.setState({
        xScaleFactor,
        yScaleFactor,
        xScaleFunction: xScaleFunction.domain([x, x + dx]),
        yScaleFunction: yScaleFunction.domain([y, y + dy]),
        zoomEnabled: currentNode.parent === null ? false : true,
        selectedId: nodeId,
        selectedNode: currentNode,
        breadcrumbItems,
      });
    } else {
      console.warn("No node found for " + nodeId);
    }
  }

  public resetZoom() {
    this._zoomTo(0);
  }

  public zoomTo(id) {
    this._zoomTo(id);
  }

  public zoomOut() {
    const { selectedId } = this.state;
    const selectedNode = this._nodes
      .filter((item: CustomHierarchyRectangularNode<TreeMapInputData>) => {
        return item.customId === selectedId;
      })
      .pop();
    if (
      selectedNode &&
      selectedNode.parent &&
      selectedNode.parent.customId !== undefined
    ) {
      this._zoomTo(selectedNode.parent.customId);
    }
  }

  public getZoomLevel() {
    const { selectedNode } = this.state;
    return selectedNode.depth;
  }

  public getSelectedNodeId() {
    const { selectedId } = this.state;
    return selectedId;
  }

  public getSelectedNode() {
    const { selectedNode } = this.state;
    return selectedNode;
  }
}

export default TreeMap;
