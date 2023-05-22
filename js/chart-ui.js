window.addEventListener('load', () => {
    const val = window.innerWidth < 1440 ? '353.5rem' : '353.5px'
    document.querySelectorAll('.chart-sheme').forEach(item => item.style.height = val)
});

class ChartUI {
    constructor(nodeName, data, options) {
        this.nodeName = nodeName
        this.data = data
        this.options = options
        this.maxvalue = this.getMaxValue()
        this.labels = []
        this.values = []
        this.getChartDatas()
        this.generateChartBlock()
    }

    getMaxValue() {
        let max = 0
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].value > max) {
                max = this.data[i].value
            }
        }
        return max
    }

    getChartDatas() {
        for (let i = 0; i < this.data.length; i++) {
            this.labels.push(this.data[i].year)
            this.values.push(this.data[i].value)
        }
    }

    generateChartBlock() {
        const node = typeof this.nodeName == 'string' ? document.querySelector(this.nodeName) : this.nodeName
        if (node) {
            const chartLabels = document.createElement('div')
            chartLabels.className = 'chart-labels'
            const chartDots = document.createElement('div')
            chartDots.className = 'chart-dots'
            for (let i = 0; i < this.data.length; i++) {
                let chartDot = document.createElement('div')
                chartDot.className = 'dot'
                chartDot.innerHTML = `
                <div class="dot__body" style="bottom: ${100 / this.maxvalue * this.data[i].value}%">
                <div class="box">
                        <div class="top">
                            <span class="year">${this.data[i].year} год</span>
                            <span class="change">${this.data[i].change}</span>
                        </div>
                        <div class="value">${this.data[i].value.toLocaleString('ru')} ${this.options.unit}</div>
                    </div>
                </div>
                `;
                chartDots.appendChild(chartDot)

                let label = document.createElement('div')
                label.className = 'label'
                label.innerHTML = `<span>${this.data[i].year}</span>`
                chartLabels.appendChild(label)
            }
            const chartMain = document.createElement('canvas')
            chartMain.className = 'chart-main'

            const chartSheme = document.createElement('div')
            chartSheme.className = 'chart-sheme'

            chartSheme.appendChild(chartDots)
            chartSheme.appendChild(chartMain)
            node.appendChild(chartSheme)
            node.appendChild(chartLabels)

            const ctx = node.querySelector('.chart-main').getContext("2d");
            const colors = {
                purple: {
                    half: "rgba(246, 215, 0, 0.2)",
                    quarter: "rgba(246, 215, 0, 0.1)",
                    zero: "rgba(255, 15, 0, 0)"
                }
            }

            const gradVal = window.innerWidth < 1440 ? window.innerWidth / 1440 * 354 : 354
            let gradient = ctx.createLinearGradient(0, 0, 0, gradVal);
            gradient.addColorStop(0, colors.purple.half);
            gradient.addColorStop(0.35, colors.purple.quarter);
            gradient.addColorStop(1, colors.purple.zero);

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.labels,
                    datasets: [{
                        borderWidth: 3,
                        borderColor: '#FFDF00',
                        fill: true,
                        backgroundColor: gradient,
                        data: this.values,
                    }]
                },
                options: {
                    animation: false,
                    responsive: true,
                    maintainAspectRatio: false,
                    onResize: () => {},
                    elements: {
                        point: {
                            radius: 0
                        },
                    },
                    plugins: {
                        customCanvasBackgroundColor: {
                            color: gradient,
                        },
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false,
                        },
                    },
                    scales: {
                        y: {
                            display: false,
                            beginAtZero: true
                        },
                        x: {
                            display: false
                        }
                    }
                }
            });
        }
    }
}

const testData = [{
        year: '2007',
        value: 25000,
        change: '+ 25.8%'
    },
    {
        year: '2008',
        value: 20000,
        change: '+ 25.8%'
    },
    {
        year: '2007',
        value: 20000,
        change: '+ 25.8%'
    },
    {
        year: '2008',
        value: 40000,
        change: '+ 25.8%'
    },
    {
        year: '2008',
        value: 20000,
        change: ''
    },
    {
        year: '2008',
        value: 70000,
        change: '+ 25.8%'
    },
    {
        year: '2009',
        value: 90000,
        change: '+ 25.8%'
    },
    {
        year: '2009',
        value: 90000,
        change: '+ 25.8%'
    },
    {
        year: '2009',
        value: 75000,
        change: '+ 25.8%'
    },
    {
        year: '2009',
        value: 90000,
        change: '+ 25.8%'
    },
]

document.querySelectorAll('.chart-item').forEach(item => {
    new ChartUI(item, testData, {
        unit: 'кг'
    })
})

