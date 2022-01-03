//linechart showing commits over dates
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as d3 from "d3";

const margin = { top: 40, right: 80, bottom: 60, left: 50 },
    width = 960 - margin.left - margin.right,
    height = 280 - margin.top - margin.bottom,
    color = "OrangeRed";

const Chart = () => {
    const [activeIndex, setActiveIndex] = React.useState(null),
        [data, setData] = React.useState([]);

    React.useEffect(() => {
        d3.csv("http://localhost:3001/users").then((d) => {
            d = d.reverse();
            const parseDate = d3.timeParse("%m/%d/%Y");
            d.forEach((i) => {
                i.date = parseDate(i.date);
                i.commits = Number(i.commits);
            });
            setData(d);
          });
          return () => undefined;
      }, []);

    const yMinValue = d3.min(data, (d) => d.commits),
        yMaxValue = d3.max(data, (d) => d.commits);

    const getX = d3
        .scaleTime()
        .domain(d3.extent(data, (d) => d.date))
        .range([0, width]);

    const getY = d3
        .scaleLinear()
        .domain([yMinValue - 1, yMaxValue + 2])
        .range([height, 0]);

    const getXAxis = (ref) => {
        const xAxis = d3.axisBottom(getX);
        d3.select(ref).call(xAxis.tickFormat(d3.timeFormat("%b %d")));
    };

    const getYAxis = (ref) => {
        const yAxis = d3.axisLeft(getY).tickSize(-width).tickPadding(7);
        d3.select(ref).call(yAxis);
    };

    const linePath = d3
        .line()
        .x((d) => getX(d.date))
        .y((d) => getY(d.commits))
        .curve(d3.curveMonotoneX)(data);

    const areaPath = d3
        .area()
        .x((d) => getX(d.date))
        .y0((d) => getY(d.commits))
        .y1(() => getY(yMinValue - 1))
        .curve(d3.curveMonotoneX)(data);

    const handleMouseMove = (e) => {
        const bisect = d3.bisector((d) => d.date).left,
            x0 = getX.invert(d3.pointer(e, this)[0]),
            index = bisect(data, x0, 1);
        setActiveIndex(index);
    };

    const handleMouseLeave = () => {
        setActiveIndex(null);
    };

    return (
      <div className="wrapper">
          <svg
              viewBox={`0 0 ${width + margin.left + margin.right} 
                              ${height + margin.top + margin.bottom}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
          >
              <g className="axis" ref={getYAxis} />
              <g
                  className="axis xAxis"
                  ref={getXAxis}
                  transform={`translate(0,${height})`}
              />
              <path fill={color} d={areaPath} opacity={0.3} />
              <path strokeWidth={3} fill="none" stroke={color} d={linePath} />

              <text
                  transform={"rotate(-90)"}
                  x={0 - height / 2} y={0 - margin.left} dy="1em">
                  {"Commits"}
              </text>
              <text
                  x={width / 2} y={0 - margin.top / 2} text-anchor="middle" >
                  {"SWENG IBM Project: Commits April, 2021"}
              </text>
              <a
                  className="subtitle"
                  
                  target="_blank">
                  <text x="0" y={height + 50}>
                      {"Source: Github api"}
                  </text>
              </a>

              {data.map((item, index) => {
                  return (
                      <g key={index}>
                          <text
                              fill="#666"
                              x={getX(item.date)}
                              y={getY(item.commits) - 20}
                              textAnchor="middle"
                          >
                              {index === activeIndex ? item.price : ""}
                          </text>
                          <circle
                              cx={getX(item.date)}
                              cy={getY(item.commits)}
                              r={index === activeIndex ? 6 : 4}
                              fill={color}
                              strokeWidth={index === activeIndex ? 2 : 0}
                              stroke="#fff"
                              style={{ transition: "ease-out .1s" }}
                          />
                      </g>
                  );
              })}
          </svg>
      </div>
    );
};

ReactDOM.render(
    <Chart />,
    document.getElementById("root")
);