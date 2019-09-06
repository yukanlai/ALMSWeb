dashboard = {
  initBarChart: function(labels, data, count){
    var genedColors = Please.make_scheme({
      h: 13.4,
      s: .61,
      v: .94
    },{
      scheme_type: 'half-rainbow',
      format: 'hex',
      colors_returned: count
    });

    var ctx1 = document.getElementById("stats-chart-instanceAmts").getContext("2d");

    var barChart1 = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Instance Name',
          data: data,
          backgroundColor: genedColors
        }]
      },
      options: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontFamily: 'Montserrat',
            usePointStyle: false
          }
        },
        scales: {
          xAxes: [{
            barPercentage: 0.4
          }]
        }
      }
    });
  },

  initLineChart: function(){
    var ctx1 = document.getElementById("stats-chart-instanceHealth").getContext("2d");

    var lineChart1 = new Chart(ctx1, {
      type: 'line',
      data: {
        labels: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"],
        datasets: [{
          label: 'Instance Activity',
          data: [20, 3, 10, 18, 30, 7, 2, 9, 0, 5, 60, 54, 88, 78, 43, 55, 21, 17, 31, 67],
          borderColor: '#51cbce',
          fill: false
        }]
      },
      options:{
        legend: {
          display: true,
          position: 'left',
          labels: {
            fontFamily: 'Montserrat',
            usePointStyle: true
          }
        }
      }
    });

  },

  fetchStats: function(dataURL){
    return $.ajax({
      type: "Get",
      contentType: 'application/json',
      dataType: 'json',
      url: dataURL
    });
  },

  getNRenderStats: function(){
    var getServerAmt = this.fetchStats("https://localhost:5001/api/Dashboard/amount/server");
    var getAppAmt = this.fetchStats("https://localhost:5001/api/Dashboard/amount/app");
    var getInstanceAmt = this.fetchStats("https://localhost:5001/api/Dashboard/amount/instance");
    var getInstanceAmts = this.fetchStats("https://localhost:5001/api/Dashboard/amount/detail/instance");
    var getInstanceHealth = this.fetchStats("https://localhost:5001/api/Dashboard/health/instance");

    getServerAmt.done(function(data){
      $('#stats-p-serverAmt').text(data.Data);
    });

    getAppAmt.done(function(data){
      $('#stats-p-appAmt').text(data.Data);
    });

    getInstanceAmt.done(function(data){
      $('#stats-p-instanceAmt').text(data.Data);
    });

    getInstanceAmts.done(function(data){
      // var kvp = JSON.parse(data);
      var kvp = data.Data;
      var chartLabels = [];
      var chartData = [];

      kvp.forEach(function(item, index){
        chartLabels[index] = item.AppName;
        chartData[index] = item.InstanceAmount;
      });

      dashboard.initBarChart(chartLabels, chartData, kvp.length);
    });

    getInstanceHealth.done(function(){
      
    });
  }

};