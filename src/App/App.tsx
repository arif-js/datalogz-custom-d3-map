import "./App.css";

import { scaleSequential } from "d3-scale";
import * as chromatic from "d3-scale-chromatic";

import * as React from "react";
import { data as data1 } from "../data/data.1.level";
import { data as data2 } from "../data/data";
import TreeMap, { ColorModel } from "../components/TreeMap";
import { NumberOfChildrenPlacement } from "../components/Node";

interface TreeMapInPutData {  
  name: string;
  value?: number;
  sim_score?: number;
  children?: Array<TreeMapInPutData>;
  className?: string;
  style?: string;
  type?: string;
  state?: string;
}

class App extends React.Component<{}, { data: TreeMapInPutData, dataChanged: number }> {
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
    if (data.sim_score) {
      data.style = `{ "fill": "${this.getValueColor(data.sim_score)}" }`; // Set the new key "style" for the target object
    } else {
      data.style = `{ "fill": "rgb(159, 198, 255)" }`
    }

    if (data.state === "copied") {
      data.style = `{ "fill": "#fff" }`; // Set the new key "style" for the target object
    }

    // If the current data object has children, recursively search through them
    if (data.children) {
        for (const child of data.children) {
          this.addStyleToNode(child);
        }
    }

    return data;
  }

  public convertValue(value) {
    if (value === 1 && value > 0.8) {
        return 0.1;  // Convert 1 to the lowest value between 0.1 and 0.2
    } else if (value >= 0 && value < 0.8) {
        return 0.5;  // Convert values between 0 and 0.8 to 0.5
    } else {
        return value;  // Return the original value for other cases
    }
  }


  public changeValueBasedOnState (data: TreeMapInPutData) {
    if (data.sim_score !== undefined) {
      data.value = this.convertValue(data.sim_score)
    }

    if (data.children) {
      for (const child of data.children) {
        this.changeValueBasedOnState(child);
      }
    }

    return data;
  }

  public getValueColor(value: number) {
    let outputValue = 100 - (100 - (value*100));

    // Generate the RGB color string with varying opacity
    const color = `hsl(216, 100%, ${outputValue}%)`;
 
    return color;
  }

  public applyHardcodedChanges = (data) => {
    // Adding hardcoded class name red: removed column / green: added column
    let result = this.addClassNameToNode(data, "Child 1.1", "redBG");
    result = this.addClassNameToNode(result, "Child 1.2", "greenBG");
    result = this.changeValueBasedOnState(result);

    // Changing background color based on the value prop
    result = this.addStyleToNode(result);

    return result;
  }

  constructor(props) {
    super(props);
    
    this.state = {
      data: this.applyHardcodedChanges(data1),
      dataChanged: 1,
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
          data={this.state.data}
          dataChanged={this.state.dataChanged}
          className="AppTreeMap"
          nodeClassName="AppTreeMap__node"
          valuePropInData="value"
          colorModel={ColorModel.OneEachChildren}
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

      <button onClick={() => {
        this.setState({ ...this.state, data: this.applyHardcodedChanges(data2), dataChanged: this.state.dataChanged+1 });
      }}>ChangeData 2</button>
      <button onClick={() => {
        this.setState({ ...this.state, data: this.applyHardcodedChanges(data1), dataChanged: this.state.dataChanged+1 });
      }}>ChangeData 1</button>
      </React.Fragment>
    );
  }
}

export default App;
