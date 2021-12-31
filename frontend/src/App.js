import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { scaleLinear, scaleBand } from 'd3-scale';
import XYAxis from './components/axis/xy-axis';
import Line from './components/line/line';
import { line, curveMonotoneX } from 'd3-shape';
import { extent } from 'd3-array';
import { transition } from 'd3-transition';


class App extends Component {
    
    constructor() {
        super();
        this.state = {users: []}
        
        /*this.state= {data: [
            { name: "01/04/2021", value: 30 },
            { name: "", value: 10 },
            { name: 'Mar', value: 50 },
            { name: 'Apr', value: 20 },
            { name: 'May', value: 80 },
            { name: 'Jun', value: 30 },
            { name: 'July', value: 0 },

          ],
     
        }*/
        
      }
    /*
    callAPI() {
         fetch("http://localhost:3001/users")
            .then(res => JSON.parse(res))
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }*/

    componentDidMount() {
    fetch("http://localhost:3001/users")
      .then( res => {
        console.log(res);
        return res.json()
     })   
     .then(users => { 
        console.log(users); 
        this.setState({ users })
     });
  }

    render() {
        
        
        const data =   
            [
            { name: "01/04/2021", value: 1 },
            { name: "", value: 10 },
            { name: "", value: 50 },
            { name: "  ", value: 20 },
            { name: 'May', value: 80 }

          ]
    const parentWidth = 500;

    const margins = {
      top: 20,
      right: 20,
      bottom: 100,
      left: 20,
    };

    const width = parentWidth - margins.left - margins.right;
    const height = 200 - margins.top - margins.bottom;

    const ticks = 5;
    const t = transition().duration(1000);

    const xScale = scaleBand()
      .domain(data.map(d => d.name))
      .rangeRound([0, width]).padding(0.1);

    const yScale = scaleLinear()
      .domain(extent(data, d => d.value))
      .range([height, 0])
      .nice();

    const lineGenerator = line()
      .x(d => xScale(d.name))
      .y(d => yScale(d.value))
      .curve(curveMonotoneX);
        return (
            <div className="App">
                
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <svg
                  className="lineChartSvg"
                  width={width + margins.left + margins.right}
                  height={height + margins.top + margins.bottom}
                >
                  <g transform={`translate(${margins.left}, ${margins.top})`}>
                    <XYAxis {...{ xScale, yScale, height, ticks, t }} />
                    <Line data={data} xScale={xScale} yScale={yScale} lineGenerator={lineGenerator} width={width} height={height} />
                  </g>
                </svg>
                {this.state.users.map(user =>
                <div key={user.id}>name: {user.name} value: {user.value}</div>
              )}
            </div>
            
        );
    }
}

export default App;