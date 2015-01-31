Meteor.methods({
  getChatGraph: function(searchTerm, limit) {
    limit = limit || 100;

    if (searchTerm.length >= 3) {
      limit = 0;
    }

    var regex = new RegExp(searchTerm, 'igm');

    var graph = { nodes: []};

    var locationMap = {};

    var validChats = Chats.find({
      location: regex
    }, {limit: limit}).forEach(function(chat) {
      if (! locationMap[chat.location]) {
        locationMap[chat.location] = {
          name: chat.location,
          freq: 1,
          group: chat.location_code,
          location_code: chat.location_code
        };
      } else {
        locationMap[chat.location]['freq'] += 1;
      }
    });

    _.each(_.keys(locationMap), function(key) {
      locationMap[key]['radius'] = Math.min(100, locationMap[key]['freq'] * 5);
      graph.nodes.push(locationMap[key]);
    });

    return graph;
  },
  getChatGrapForLocationCode: function(locationCode) {
    var fromDates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var toDates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    Chats.find({location_code: locationCode}).forEach(function(loc) {
      var fromDate = loc.from_date ? loc.from_date.split('/')[1] : null,
          toDate = loc.to_date ? loc.to_date.split('/')[1] : null;

      if (fromDate) {
        fromDates[fromDate-1] += 1;
      }
      if (toDate) {
        fromDates[toDate-1] += 1;
      }
    });

    return _.map(fromDates, function(freq, i) {
      return [i+1, freq];
    });
  }
});
