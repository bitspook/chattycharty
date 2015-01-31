BubbleChart = function(domId, graph) {
  var el = document.getElementById(domId);

  var width = el.offsetWidth,
      height = el.offsetHeight;

  var color = d3.scale.category20();

  var force = d3.layout.force()
        .charge(function(d, i) {
          return -Math.pow(d.radius, 2.0) / 10;
        })
        .size([width, height]);

  function collide(node) {
    var r = node.radius + 16,
        nx1 = node.x - r,
        nx2 = node.x + r,
        ny1 = node.y - r,
        ny2 = node.y + r;
    return function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== node)) {
        var x = node.x - quad.point.x,
            y = node.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = node.radius + quad.point.radius;
        if (l < r) {
          l = (l - r) / l * .5;
          node.x -= x *= l;
          node.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2
        || x2 < nx1
        || y1 > ny2
        || y2 < ny1;
    };
  }

  var svg = d3.select("#"+domId).append("svg")
        .attr("width", width)
        .attr("height", height);

  force
    .nodes(graph.nodes)
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
        .attr("r", function(d) {
          return Math.min(d.radius, 100);
        })
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

    /**
     * prevent nodes from going out of the box
     */
    node.attr("cx", function(d) { return d.x = Math.max(d.radius, Math.min(width - d.radius*2, d.x)); })
      .attr("cy", function(d) { return d.y = Math.max(d.radius, Math.min(height - d.radius*2, d.y)); });

    /**
     * Collision detection. Prevent nodes from getting over each other
     */

    var q = d3.geom.quadtree(graph.nodes),
        i = 0,
        n = graph.nodes.length;

    while (++i < n) {
      q.visit(collide(graph.nodes[i]));
    }

    svg.selectAll("circle")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
  });

  node.on('click', function() {
    var selectedLocationCode = d3.select(this).data()[0].group;
    Session.set('selected_location_code', selectedLocationCode);
  });

  return {
    force: force,
    svg: svg,
    nodes: graph.nodes
  };
};
