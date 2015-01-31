Template.home.rendered = function() {
  Meteor.call('getChatGraph', '', 140, function(err, graph) {
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
    });
  }
});
