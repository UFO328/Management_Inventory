function renderTransactionPerDayChart() {
      const options = {
    
        chart: {
            type: 'area',
            height: 400,
            zoom: {
            enabled: false
          }
        },
        
        title: {
            text: 'Transaction Day'
        },
        colors: [
            '#10b981',
        ],
        series: [{
            name: 'Trasaction Per Day',
            data: dataTransactionPerDay
        }],
    
        xaxis: {
            categories: labelsTransactionPerDay
        }
    
    }
    
    const chart = new ApexCharts(
    
        document.querySelector("#chartTrasactionPerDay"),
    
        options
    
    )
    
    chart.render()
}