import "./App.css";

import { scaleSequential } from "d3-scale";
import * as chromatic from "d3-scale-chromatic";

import * as React from "react";
import { data as data1 } from "../data/data.1.level";
import TreeMap, { ColorModel } from "../components/TreeMap";
import { NumberOfChildrenPlacement } from "../components/Node";

interface TreeMapInPutData {  
  name: string;
  value?: number;
  children?: Array<TreeMapInPutData>;
  className?: string;
  style?: string;
}

class App extends React.Component<{}, { data: TreeMapInPutData }> {
  private treeMapRef: React.RefObject<TreeMap<TreeMapInPutData>>;

  public addClassNameToNode(data: TreeMapInPutData, targetName: any, className: string) {
    // Check if the current data object has the target name
    if (data.name === targetName) {
        data.className = className; // Set the new key "className" for the target object
    }

    // If the current data object has children, recursively search through them
    if (data.children) {
        for (const child of data.children) {
          this.addClassNameToNode(child, targetName, className);
        }
    }

    return data;
  }

  public addStyleToNode(data: TreeMapInPutData) {
    // Check if the current data object has the target name
    if (data.value) {
        data.style = `{ "fill": "${this.getValueColor(data.value)}" }`; // Set the new key "style" for the target object
    }

    // If the current data object has children, recursively search through them
    if (data.children) {
        for (const child of data.children) {
          this.addStyleToNode(child);
        }
    }

    return data;
  }

  public getValueColor(value: number) {
    let outputValue = 100 - (value * 0.5);

    // Generate the RGB color string with varying opacity
    const color = `hsl(216, 100%, ${outputValue}%)`;

    return color;
  }

  constructor(props) {
    super(props);
    
    // Adding hardcoded class name red: removed column / green: added column
    let result = this.addClassNameToNode(data1, "Child 1.1", "redBG");
    result = this.addClassNameToNode(result, "Child 1.2", "greenBG");

    // Changing background color based on the value prop
    result = this.addStyleToNode(result);

    this.state = {
      data: result,
    };
    this.treeMapRef = React.createRef();
  }

  componentDidMount() {
    console.log(
      "componentDidMount: ",
      this.treeMapRef && this.treeMapRef.current
    );
  }

  public render() {
    return (
      <React.Fragment>
        <TreeMap<TreeMapInPutData>
          ref={this.treeMapRef}
          id="myTreeMap"
          width={500}
          height={400}
          data={this.state.data}
          className="AppTreeMap"
          nodeClassName="AppTreeMap__node"
          levelsToDisplay={1}
          paddingInner={2}
          onZoom={(level, id, items) => console.log({ level, id, items })}
          onTreeMapDidMount={(treeMap: TreeMap<TreeMapInPutData>) =>
            console.log(treeMap.getZoomLevel())
          }
          nodeStyle={{
            fontSize: 12,
            paddingTop: 2,
            paddingLeft: 5,
            paddingRight: 5,
          }}
          numberOfChildrenPlacement={NumberOfChildrenPlacement.TopRight}
          customD3ColorScale={scaleSequential(
            chromatic.interpolateSpectral
          )}
          // svgStyle={{fontFamily: "'Courier New', Courier, monospace"}}
          // nodeStyle={{ fill: "black", stroke: "white" }}
          // disableBreadcrumb={true}
          // hideNumberOfChildren={true}
          hideValue={true}
          // tooltipOffsetY={25}
          // tooltipClassName="MyCustomTooltip"
          // tooltipPlacement="top"
          // disableTooltip={true}
          // valueUnit={"MB"}
          // svgClassName="AppTreeMap__svg"
          darkNodeBorderColor="silver"
          darkNodeTextColor="white"
          lightNodeBorderColor="brown"
          lightNodeTextColor="brown"
        />
      </React.Fragment>
    );
  }
}

export default App;
