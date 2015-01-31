Template.home.rendered = function() {
  Meteor.call('getChatGraph', '', 40, function(err, graph) {
    if (err) {
      throw err;
    }

    bubbleChart = new BubbleChart('graph', graph);
  });
};

Template.home.events({
  'keyup #search': function(e) {
    Meteor.call('getChatGraph', e.currentTarget.value, 0, function(err, graph) {
      document.getElementById("graph").innerHTML = '';
      bubbleChart = new BubbleChart('graph', graph);

      if (bubbleChart.nodes().length < 20) {
        bubbleChart.charge(-(Math.pow(bubbleChart.nodes().length, 3.0))).start();
      }
    });
  }
});
