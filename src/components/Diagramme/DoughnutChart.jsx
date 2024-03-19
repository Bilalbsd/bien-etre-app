import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function DoughnutChart({ scoreDistribution }) {
    // Données pour le diagramme circulaire (camembert)
    const doughnutData = {
        labels: Object.keys(scoreDistribution),
        datasets: [{
            data: Object.values(scoreDistribution),
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)'
            ],
            borderWidth: 1
        }]
    };

    return <Doughnut data={doughnutData} />;
}

export default DoughnutChart;
