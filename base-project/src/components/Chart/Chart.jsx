import "./Chart.css";
import ChartBar from "./ChartBar";

const Chart = (props) => {
  let maxValue = props.dataPoints.reduce(
    (a, b) => (b.value > a ? b.value : a),
    0
  );

  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          label={dataPoint.label}
          maxValue={maxValue}
        />
      ))}
    </div>
  );
};

export default Chart;
