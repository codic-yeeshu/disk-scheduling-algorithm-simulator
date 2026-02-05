import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// Professional color palette
const COLORS = {
    fcfs: '#3b82f6',   // Blue
    sstf: '#8b5cf6',   // Purple
    scan: '#06b6d4',   // Cyan
    cscan: '#10b981',  // Emerald
    look: '#f59e0b',   // Amber
    clook: '#ec4899'   // Pink
};

function ChartDisplay({ data, title = '', multiLine = false }) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
        return null;
    }

    const chartData = multiLine ? {
        labels: Array.from({ length: Math.max(...Object.values(data).map(d => d.finalOrder?.length || 0)) }, (_, i) => i),
        datasets: Object.entries(data).filter(([key]) => key !== 'minimumSeekCount').map(([algo, result]) => ({
            label: algo.toUpperCase(),
            data: result.finalOrder,
            borderColor: COLORS[algo] || '#3b82f6',
            backgroundColor: `${COLORS[algo]}20` || 'rgba(59, 130, 246, 0.1)',
            tension: 0.2,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: COLORS[algo] || '#3b82f6',
            pointBorderColor: '#1e293b',
            pointBorderWidth: 2,
            borderWidth: 2,
        }))
    } : {
        labels: data.map((_, i) => i),
        datasets: [{
            label: 'Disk Head Position',
            data: data,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.2,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointBackgroundColor: '#3b82f6',
            pointBorderColor: '#1e293b',
            pointBorderWidth: 2,
            borderWidth: 2,
            fill: true,
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 800,
            easing: 'easeOutQuart',
        },
        plugins: {
            legend: {
                display: multiLine,
                position: 'top',
                labels: {
                    color: '#cbd5e1',
                    font: {
                        size: 12,
                        family: "'Inter', sans-serif",
                        weight: '500'
                    },
                    padding: 16,
                    usePointStyle: true,
                    pointStyle: 'circle',
                }
            },
            title: {
                display: !!title,
                text: title,
                color: '#f8fafc',
                font: {
                    size: 16,
                    weight: '600',
                    family: "'Inter', sans-serif"
                },
                padding: { bottom: 24 }
            },
            tooltip: {
                backgroundColor: '#1e293b',
                titleColor: '#f8fafc',
                bodyColor: '#cbd5e1',
                borderColor: '#334155',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
                displayColors: true,
                titleFont: {
                    size: 13,
                    weight: '600',
                    family: "'Inter', sans-serif"
                },
                bodyFont: {
                    size: 12,
                    family: "'Inter', sans-serif"
                },
                callbacks: {
                    title: function (context) {
                        return `Step ${context[0].label}`;
                    },
                    label: function (context) {
                        return `Track: ${context.raw}`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Request Sequence',
                    color: '#94a3b8',
                    font: {
                        size: 12,
                        family: "'Inter', sans-serif",
                        weight: '500'
                    },
                    padding: { top: 8 }
                },
                grid: {
                    color: 'rgba(51, 65, 85, 0.5)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#94a3b8',
                    font: { size: 11 }
                },
                border: {
                    color: '#334155'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Disk Track Number',
                    color: '#94a3b8',
                    font: {
                        size: 12,
                        family: "'Inter', sans-serif",
                        weight: '500'
                    },
                    padding: { bottom: 8 }
                },
                min: 0,
                max: 200,
                grid: {
                    color: 'rgba(51, 65, 85, 0.5)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#94a3b8',
                    font: { size: 11 },
                    stepSize: 25
                },
                border: {
                    color: '#334155'
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index',
        }
    };

    return (
        <div className="chart-container" style={{ height: '400px' }}>
            <Line data={chartData} options={options} />
        </div>
    );
}

export default ChartDisplay;
