import * as React from 'react';
import { useAppSelector } from '../../hooks/store.hook';
import {
    axisBottom,
    axisLeft,
    ScaleBand,
    scaleBand,
    ScaleLinear,
    scaleLinear,
    select
} from "d3";
import { IData } from '../../types';

interface BarChartProps {
    data: IData[];
}

interface AxisBottomProps {
    scale: ScaleBand<string>;
    transform: string;
}

interface AxisLeftProps {
    scale: ScaleLinear<number, number, never>;
}

interface BarsProps {
    data: BarChartProps["data"];
    height: number;
    scaleX: AxisBottomProps["scale"];
    scaleY: AxisLeftProps["scale"];
}
function AxisBottom({ scale, transform }: AxisBottomProps) {
    const ref = React.useRef<SVGGElement>(null);

    React.useEffect(() => {
        if (ref.current) {
            select(ref.current).call(axisBottom(scale));
        }
    }, [scale]);

    return <g ref={ref} transform={transform} />;
}

function AxisLeft({ scale }: AxisLeftProps) {
    const ref = React.useRef<SVGGElement>(null);

    React.useEffect(() => {
        if (ref.current) {
            select(ref.current).call(axisLeft(scale));
        }
    }, [scale]);

    return <g ref={ref} />;
}
function Bars({ data, height, scaleX, scaleY }: BarsProps) {
    return (
        <>
            {data.map(({ value, label }) => (
                <rect
                    key={`bar-${label}`}
                    x={scaleX(label)}
                    y={scaleY(value)}
                    width={scaleX.bandwidth()}
                    height={height - scaleY(value)}
                    fill="#2d2d73"
                />
            ))}
        </>
    );
}
type Props = {
}
const defaultProps = {
}
const BarChart: React.FC<Props & BarChartProps> = ({ data }: BarChartProps) => {
    const margin = { top: 10, right: 0, bottom: 20, left: 30 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    const reducer = useAppSelector(store => store.weather_forecast_slice);
    const bar_chart = reducer.bar_chart;
    console.log('bar_chart', bar_chart);
    const scaleX = scaleBand()
        .domain(data.map(({ label }) => label))
        .range([0, width])
        .padding(0.5);
    const scaleY = scaleLinear()
        .domain([0, Math.max(...data.map(({ value }) => value))])
        .range([height, 0]);
    return (
        <div className="col-sm-12 col-md-12 col-lg-6">
            <div><span className="daily_forecast_label">Bar Chart</span></div>
            <div className='d-flex align-items-center justify-content-center my-5'>
            <div style={{maxWidth: "500px", overflowX: "auto", paddingBottom: "10px", margin: "0px"}}>
            <svg style={{color: "#fff", display: "flex", justifyContent: "center"}}
                width={width + margin.left + margin.right}
                height={height + margin.top + margin.bottom}
            >
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
                    <AxisLeft scale={scaleY} />
                    <Bars data={data} height={height} scaleX={scaleX} scaleY={scaleY} />
                </g>
            </svg>
            </div>
        </div>
        </div>
    )
}

BarChart.defaultProps = defaultProps;

export default BarChart;