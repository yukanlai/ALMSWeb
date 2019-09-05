var fetchStats = function(dataURL){
  return $.ajax({
    method: "Get",
    contentType: 'application/json',
    dataType: 'json',
    url: dataURL
  });
}

var getServerAmt = fetchStats("https://localhost:5001/api/Dashboard/amount/server");
var getAppAmt = fetchStats("https://localhost:5001/api/Dashboard/amount/app");
var getInstanceAmt = fetchStats("https://localhost:5001/api/Dashboard/amount/instance");
var getInstanceAmts = fetchStats("https://localhost:5001/api/Dashboard/amount/detail/instance");
var getInstanceHealth = fetchStats("https://localhost:5001/api/Dashboard/health/instance");

getServerAmt.done(function(){
  
});

getAppAmt.done(function(){
  
});

getInstanceAmt.done(function(){
  
});

getInstanceAmts.done(function(){
  
});

getInstanceHealth.done(function(){
  
});