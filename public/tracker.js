
const APIKEY = "I252SR79BGSGOH9U";
    const x = [];
    const y = [];
    let update = false;
    let time = "TIME_SERIES_INTRADAY"
    let SYMBOL = "IBM" ;
    let symbole = document.getElementById("sym");
    let search = document.getElementById("search");
    let dataNum = 100;
    let chart;

    // draw all the data points on the page
    async function drawData() {
        await getData();
        let ctx = document.getElementById('myChart').getContext('2d');
        chart = new Chart(ctx, {
        type: 'line',
            scaleOverride: true,
                scaleSteps: 10,
                scaleStepWidth: 50,
                scaleStartValue: 0,
    data: { 
        labels: x,
            datasets: [{
                label: SYMBOL,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: y
            }]
        
        }, 
        options: {
            responsive: true,
            animation: {
                duration: 500,
                xAxis: true,
                yAxis: true
            }
        }
    }); 
    // updates the graph every minute
    if (update) {
        setInterval(function() {
        addData(chart);
    }, 60000)
    }

    // updates the graph when an another input is typed 
    search.addEventListener("click", (e) => {
            if (symbole.value.length > 0) {
                    SYMBOL = symbole.value
                    addData(chart);
                    chart.data.datasets[0].label = SYMBOL;
            }
        });
}



// fetches data from alphavantage every minute 
    async function getData() {
        const URL =
            `https://www.alphavantage.co/query?function=${time}&symbol=${SYMBOL}&interval=1min&outputsize=compact&apikey=${APIKEY}`
        let data = await fetch(URL);
        let jsonData = await data.json();
        for (let key in jsonData[`Time Series (1min)`]) {
            x.unshift(key)
            y.unshift(jsonData[`Time Series (1min)`][key]['1. open'])
        }
        let start =  dataNum; //100
        let end =  (dataNum * 2) - 1; //199
        while(y.length >= (dataNum * 2)) {
            y.splice(start, end);
            x.splice(start, end);
            start = start + dataNum; 
            end = end + dataNum; 
        }

}



drawData();

update = true;

// adds the latest data point (stock price and time) to the graph
async function addData() {
        await getData();
        chart.data.labels.push(x[x.length - 1]);
        chart.data.datasets[0].data.push(y[y.length - 1]);
        console.log(chart.data.datasets[0].data[y.length - 1])
        chart.update();
        
}





