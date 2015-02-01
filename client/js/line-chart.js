LineChart = function(domId, rawData) {
  var el = document.getElementById(domId);

  var margin = {top: 20, right: 50, bottom: 30, left: 50},
      width = el.offsetWidth - margin.left - margin.right,
      height = el.offsetHeight - margin.top - margin.bottom;

  var x = d3.scale.linear()
        .range([0, width]);

  var y = d3.scale.linear()
        .range([height, 0]);

  var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

  var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

  var line = d3.svg.line()
        .x(function(d) { return x(d.month); })
        .y(function(d) { return y(d.queries); });

  var svg = d3.select("#"+domId).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data = [];
  for(var i = 0; i < rawData.length; i++) {
    data.push({
      month: rawData[i][0],
      queries: +rawData[i][1]
    });
  }

  x.domain(d3.extent(data, function(d) { return d.month; }));
  y.domain(d3.extent(data, function(d) { return d.queries; }));

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .style("text-anchor", "end")
    .attr("x", 0)
    .attr("y", 30)
    .text("Month");

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Queries");

  svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);
};
