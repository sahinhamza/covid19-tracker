import React, { useEffect } from "react";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line, Bar } from "react-chartjs-2";
import styles from "./chart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getDailyDataAsync } from "../../Redux/fetchData";
ChartJS.register(...registerables);

export function Chart() {
    const countryData = useSelector(state => state.covid.data);
    const dailyData = useSelector(state => state.covid.dailyData);
    const country = useSelector(state => state.covid.country);

    const dispatch = useDispatch();

    useEffect(() => {
        const url = "https://covid19.mathdro.id/api/daily";
        dispatch(getDailyDataAsync(url));

    }, [dispatch]);

    if (!countryData) {
        return (
            <div>Loading...</div>
        )
    }

    let lineChart;
    if (dailyData) {
        lineChart = dailyData.length ? (
            <Line
                data={{
                    labels: dailyData.map(item => item.date),
                    datasets: [
                        {
                            data: dailyData.map(item => item.confirmed),
                            label: "Infected",
                            borderColor: "#3333ff",
                            fill: true,
                        },
                        {
                            data: dailyData.map(item => item.deaths),
                            label: "Deaths",
                            borderColor: "red",
                            backgroundColor: "rgba(255,0,0,0.5)",
                            fill: true,
                        },
                    ],
                }}
            />
        ) : null;
    }

    let { confirmed, recovered, deaths } = countryData;

    const barChart = countryData ? (
        <Bar
            data={{
                labels: ["Infected", "Recovered", "Deaths", "Active"],
                datasets: [
                    {
                        label: country,
                        backgroundColor: [
                            "rgba(0, 0, 255, 0.5)",
                            "rgba(0, 255, 0, 0.5)",
                            "rgba(255, 0, 0, 0.5)",
                            "rgba(242, 234, 0, 0.5)",
                        ],
                        hoverBackgroundColor: [
                            "rgba(0, 77, 153)",
                            "rgba(30, 102, 49)",
                            "rgba(255, 51, 51)",
                            "rgba(204, 153, 0)",
                        ],
                        data: [
                            confirmed.value,
                            recovered.value,
                            deaths.value,
                            confirmed.value - (recovered.value + deaths.value),
                        ],
                    },
                ],
            }}
            options={{
                legend: { display: false },
                title: { display: true, text: `Current state in ${country}` },
            }}
        />
    ) : null;

    return (
        <div className={styles.container}>{country ? barChart : lineChart}</div>
    );
};

