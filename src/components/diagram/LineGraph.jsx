import React, { Component, createRef } from 'react'
// import classes from "./LineGraph.module.css";
import Chart from "chart.js/auto";

// Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
// Chart.defaults.global.legend.display = false;
// Chart.defaults.global.elements.line.tension = 0;

export default class LineGraph extends Component {
    chartRef = createRef();

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        const { width: graphWidth } = myChartRef.canvas;
        let gradientLine = myChartRef
            .createLinearGradient(0, 0, graphWidth * 2, 0);
        gradientLine.addColorStop(0, "#FF006E");
        gradientLine.addColorStop(1, "#F46036");

        new Chart(myChartRef, {
            type: "line",
            data: {
                labels: this.props.labels,
                datasets: [
                    {
                        label: "User",
                        fill: false,
                        borderColor: "#6610f2",
                        data: this.props.datas,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    }
    render() {
        return (
            // <div className={classes.graphContainer}>
            <canvas
                id="myChart"
                ref={this.chartRef}
            />
            // </div>
        )
    }
}
