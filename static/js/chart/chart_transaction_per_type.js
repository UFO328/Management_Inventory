function renderTransactionTypeChart(){
    //console.log('day run') 
    const options = {

        chart: {

            type: 'donut',

            height: 350

        },

        series: transactionTypeData,

        labels: transactionTypeLabels,
        colors: [

            '#ef4444',
            '#10b981'


        ],
        title: {

            text: 'Transaction Type'

        },

        legend: {

            position: 'bottom'

        },

        dataLabels: {

            enabled: true

        },

        responsive: [

            {

                breakpoint: 480,

                options: {

                    chart: {

                        width: 300

                    },

                    legend: {

                        position: 'bottom'

                    }

                }

            }

        ]

    }

    const chart = new ApexCharts(

        document.querySelector(
            "#transaction-type-chart"
        ),

        options

    )

    chart.render()

}