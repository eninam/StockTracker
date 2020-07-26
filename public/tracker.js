
const APIKEY = "I252SR79BGSGOH9U";
    const x = [];
    const y = [];
    let update = false;
    let time = "TIME_SERIES_INTRADAY"
    let SYMBOL = "IBM" ;
    let symbole = document.getElementById("sym");
    let button = document.getElementById("btn");
    let dataNum = 100;
    let chart;
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
    if (update) {
        setInterval(function() {
        addData(chart);
        console.log("here");
    }, 60000)
    }

    button.addEventListener("click", () => {
        if(symbole.value.length > 0) {
        SYMBOL = symbole.value
        addData(chart);
        chart.data.datasets[0].label = SYMBOL;
        console.log("seach");
        }
        });

        // click the search button if the return key is pressed
        symbole.addEventListener("keyup", () => {
            if (event.keyCode === 38) {
                // Cancel the default action, if needed
                event.preventDefault();
                // Trigger the button element with a click
                document.getElementById("myBtn").click();
            }
        });
}



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

async function addData() {
        await getData();
        chart.data.labels.push(x[x.length - 1]);
        chart.data.datasets[0].data.push(y[x.length - 1]);
        chart.update();
}





