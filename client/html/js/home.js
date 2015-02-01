Template.home.rendered = function() {
  Meteor.call('getChatGraph', '', 240, function(err, graph) {
    if (err) {
      throw err;
    }

    bubbleChart = new BubbleChart('bubble-graph', graph);
  });
};

Template.home.events({
  'keyup #search': function(e) {
    Meteor.call('getChatGraph', e.currentTarget.value, 0, function(err, graph) {
      document.getElementById("bubble-graph").innerHTML = '';
      bubbleChart = new BubbleChart("bubble-graph", graph);
    });
  }
});

Template.home.helpers({
  'selected_location_name': function() {
    return Session.get('selected_location_name');
  }
});

Tracker.autorun(function() {
  var selectedLocationCode = Session.get('selected_location_code');

  if (! selectedLocationCode) {
    return;
  }

  var domId = "line-chart";
  document.getElementById(domId).innerHTML = '';

  Meteor.call('getChatGrapForLocationCode', selectedLocationCode, function(err, data) {
    if (err) {
      if (err) {
        throw err;
      }
    }

    lineChart = new LineChart(domId, data);
  });
});
