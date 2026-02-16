// Initial Data
const initialData = [12, 19, 3, 5, 2, 3];
const initialLabels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

// Create the chart instance
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: initialLabels,
        datasets: [{
            label: '# of Votes',
            data: initialData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Function to update the chart data
function updateChartData() {
    // Generate new random data (example)
    const newData = [
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20)
    ];


    const newLabels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Skyblue', 'Pink'];

    // Update the chart's data array
    myChart.data.datasets[0].data = newData;
    myChart.data.labels = newLabels;

    // Call update() to re-render the chart with the new data and animations
    myChart.update();
}
