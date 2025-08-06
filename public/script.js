Chart.defaults.color = '#ffffff'; // sets all text to white
const MAX_POINTS = 30;

const tempChartCtx = document.getElementById('tempChart').getContext('2d');
const ramChartCtx = document.getElementById('ramChart').getContext('2d');

// Initialize empty data arrays with nulls for padding
const initialLabels = Array(MAX_POINTS).fill('');
const initialData = Array(MAX_POINTS).fill(null);

const tempData = {
    labels: initialLabels.slice(),
    datasets: [{
    label: 'CPU Temp (°C)',
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    data: initialData.slice(),
    spanGaps: true,       // Important to connect points skipping nulls
    tension: 0.3,         // Smooth line
    fill: false,
    pointRadius: 3
    }]
};

const ramData = {
    labels: initialLabels.slice(),
    datasets: [{
    label: 'RAM Usage (%)',
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgb(54, 162, 235)',
    data: initialData.slice(),
    spanGaps: true,
    tension: 0.3,
    fill: false,
    pointRadius: 3
    }]
};

const tempChart = new Chart(tempChartCtx, {
    type: 'line',
    data: tempData,
    options: {
    animation: false,
    scales: {
        y: { beginAtZero: true },
        x: { display: false }
    }
    }
});

const ramChart = new Chart(ramChartCtx, {
    type: 'line',
    data: ramData,
    options: {
    animation: false,
    scales: {
        y: { beginAtZero: true, max: 100 },
        x: { display: false }
    }
    }
});

async function fetchStats() {
    const res = await fetch('/api/stats');
    const data = await res.json();

    document.getElementById('temp').innerText = data.temp;
    document.getElementById('cpu').innerText = data.cpu;
    document.getElementById('mem').innerText = data.mem;
    document.getElementById('disk').innerText = data.disk;
    document.getElementById('uptime').innerText = data.uptime;

    document.getElementById('wifi').innerText = data.wifi.ssid;
    document.getElementById('bitrate').innerText = data.wifi.bitrate;
    document.getElementById('signal').innerText = data.wifi.signal;

    const temp = parseFloat(data.temp.replace("'C", ""));
    const mem = parseFloat(data.mem);

    updateChart(tempChart, temp);
    updateChart(ramChart, mem);
    updateLinkQualityBar(data.wifi.quality);
}

function updateChart(chart, newValue) {
    const dataset = chart.data.datasets[0];
    const labels = chart.data.labels;

    // Remove oldest data and label if full
    if (dataset.data.length >= MAX_POINTS) {
    dataset.data.shift();
    labels.shift();
    }

    // Add new data and a blank label (we hide X axis)
    dataset.data.push(newValue);
    labels.push('');

    chart.update();
}
function updateLinkQualityBar(percent) {
const text = document.querySelector('.bar-fill');
text.style.width = percent + '%';
text.innerHTML = percent + '%'; 
text.style.color = '#000';

// Optional: change color based on quality
if (percent > 75) text.style.backgroundColor = '#4caf50';       // Green
else if (percent > 40) text.style.backgroundColor = '#ff9800';  // Orange
else text.style.backgroundColor = '#f44336';                    // Red
}

setInterval(fetchStats, 5000);
fetchStats();