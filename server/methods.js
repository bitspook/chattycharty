function getRandomColor () {

}

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
          group: chat.location_code
        };
      } else {
        locationMap[chat.location]['freq'] += 1;
      }
    });

    _.each(_.keys(locationMap), function(key) {
      locationMap[key]['radius'] = locationMap[key]['freq'] * 10;
      graph.nodes.push(locationMap[key]);
    });

    return graph;
  }
});
