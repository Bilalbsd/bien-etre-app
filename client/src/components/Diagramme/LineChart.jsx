import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function LineChart({ scoreEvolution }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current && scoreEvolution.length > 0) {
            const ctx = chartRef.current.getContext('2d');

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: scoreEvolution.map((_, index) => `Questionnaire ${index + 1}`),
                    datasets: [{
                        label: 'Score', data: scoreEvolution, fill: false,
                        borderColor: 'rgb(75, 192, 192)', tension: 0.1
                    }]
                },
                options: { scales: { y: { beginAtZero: true } } }
            });
        }
    }, [scoreEvolution]);

    return <canvas ref={chartRef} />;
}

export default LineChart;
