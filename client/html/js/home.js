var renderCharts = function() {
  var showing_top_10 = Session.get('showing_top_10');

  if (showing_top_10)
    Meteor.call('getTop10Locations', function(err, graph) {
      if (err)
        throw err;

      bubbleChart = new BubbleChart('bubble-graph', graph);
    });
  else
    Meteor.call('getChatGraph', '', 240, function(err, graph) {
      if (err) {
        throw err;
      }
      bubbleChart = new BubbleChart('bubble-graph', graph);
    });
};

Template.home.rendered = function() {
  // renderCharts();
};

Template.home.events({
  'keyup #search': function(e) {
    Meteor.call('getChatGraph', e.currentTarget.value, 0, function(err, graph) {
      document.getElementById("bubble-graph").innerHTML = '';
      bubbleChart = new BubbleChart("bubble-graph", graph);
    });
  },
  'click .navbar-brand': function() {
    Session.set('showing_top_10', false);
  }
});

Template.home.helpers({
  'selected_location_name': function() {
    return Session.get('selected_location_name');
  }
});

Tracker.autorun(function() {
  var showing_top_10 = Session.get('showing_top_10');
  console.log('autorunning');

  if(document.getElementById('bubble-graph'))
    document.getElementById('bubble-graph').innerHTML = '';
  renderCharts();
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
