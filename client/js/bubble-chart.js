BubbleChart = function(domId, graph) {
  var el = document.getElementById(domId);

  var width = el.offsetWidth,
      height = el.offsetHeight;

  var color = d3.scale.category20();

  var force = d3.layout.force()
        .charge(function(d) {
          return -Math.pow(d.radius, 2) / 1;
        })
        .size([width, height]);

  var svg = d3.select("#"+domId).append("svg")
        .attr("width", width)
        .attr("height", height);

  force
    .nodes(graph.nodes)
    .friction(0.9)
    .linkDistance(function(d) {
      return d.radius;
    })
    .linkStrength(1)
    .start();

  var link = svg.selectAll(".link")
        .data(graph.nodes)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function(d) { return 1; });

  var node = svg.selectAll(".node")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 50)
        .style("fill", function(d) { return color(d.group); })
        .call(force.drag);

  node.append("title")
    .text(function(d) { return d.name; });

  node.append("svg:text")
    .text(function(d) {return d.name;})
    .attr("dx", function(d) {return d.dx;})
    .attr("dy", function(d) {return d.dy;});

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.x; })
      .attr("y1", function(d) { return d.y; })
      .attr("x2", function(d) { return d.x; })
      .attr("y2", function(d) { return d.y; });

    node.attr("cx", function(d) { return d.x = Math.max(d.radius, Math.min(width - d.radius*2, d.x)); })
      .attr("cy", function(d) { return d.y = Math.max(d.radius, Math.min(height - d.radius*2, d.y)); });
  });

  return force;
};
