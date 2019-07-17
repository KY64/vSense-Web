const I = (id) => document.getElementById(id)
const C = (c) => document.getElementsByClassName(c)[0]

function addData(chart, label, data) {
    $.ajax({
        url     : "http://localhost:3000/data/sensor",
        type    : "get",
        dataType: "json",
        success : (result) => {
            // chart.data.labels.push(label);
            // chart.data.datasets[0].data.forEach(function(dataset,index) {
            chart.data.datasets[0].data[6] = result[0].value
            // });
        }
    })
    chart.update();
}

function removeData(chart) {
    chart.data.labels.shift();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
    });
    chart.update();
}

const stringMonth = m => {
    switch(m){
        case 0:
            m = "Jan"
            break
        case 1:
            m = "Feb"
            break
        case 2:
            m = "Mar"
            break
        case 3:
            m = "Apr"
            break
        case 4:
            m = "May"
            break
        case 5:
            m = "Jun"
            break
        case 6:
            m = "Jul"
            break
        case 7:
            m = "Aug"
            break
        case 8:
            m = "Sep"
            break
        case 9:
            m = "Oct"
            break
        case 10:
            m = "Nov"
            break
        case 11:
            m = "Dec"
            break
        default:
            console.log("NaN")
    }
    return m
}

const currentTime = () => {
    let time = new Date(),
        t = time.toString().slice(16,21),
        d = time.getDate(),
        m = time.getMonth()

    I("clock").innerHTML = t
    I("date").innerHTML = 
    `<span style="font-size:22pt;">${d}</span><br /><span class="bold"
    >${stringMonth(m)}</span>`

    return t
}

const timelineLabel = () => {
    let date = new Date(),
        d = date.getDate(),
        m = date.getMonth()

    let current = [(d-6)+" "+stringMonth(m),(d-5)+" "+stringMonth(m),(d-4)+" "+stringMonth(m),(d-3)+" "+stringMonth(m),(d-2)+" "+stringMonth(m),(d-1)+" "+stringMonth(m),d+" "+stringMonth(m)]

    return current
}

// =====================================================================
// =====================================================================
//                  ChartJS
// =====================================================================
// =====================================================================

var machineHealth = C("graph1").getContext("2d")
var machineHealth_chart = new Chart(machineHealth, {
    type : "doughnut",
    data : {
        labels : ["Good", "Warning", "Critical"],
        datasets : [{
            data : [20,10,2],
            backgroundColor : [
                "rgba(44, 204, 44,1)",
                "rgba(255, 153, 0 ,1)",
                "rgba(213, 77, 77, 1)"
            ],
            borderWidth: 0
        }]
    },
    options: {
        cutoutPercentage: 90
    }
})

var companyHealth = C("graph2").getContext("2d")
var companyHealth_chart = new Chart(companyHealth, {
    type : "line",
    data : {
        labels : timelineLabel(),
        datasets : [{
            label: "Company Health Trend",
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "rgba(0,0,0,0.3)",
            borderWidth: 2,
            data : [20,10,2,20,10,20,10],
            pointBorderColor: 0,
            pointBackgroundColor: "rgba(37,94,208,1)"
        }]
    }
})



var dailyRecord = C("graph3").getContext("2d")
var dailyRecord_chart = new Chart(dailyRecord, {
    type : "bar",
    data : {
        labels : timelineLabel(),
        datasets : [{
            label : "Daily Recording",
            backgroundColor: "rgba(37,94,208,0.6)",
            data : [20,10,2,20,10,20,10],
        }]
    }
})

// =====================================================================
// =====================================================================
//                  Script
// =====================================================================
// =====================================================================

