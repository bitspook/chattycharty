Meteor.methods({
  getChatGraph: function(searchTerm, limit) {
    limit = limit || 100;

    if (searchTerm.length >= 3) {
      limit = 0;
    }

    var regex = new RegExp(searchTerm, 'igm');

    var graph = { nodes: []};

    var locationMap = {};

    var normalizeChatsColl = {};

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
      }
      if (normalizeChatsColl && normalizeChatsColl.length) {
        normalizeChatsColl[chat.chat_id].push(chat.location);
      }
      else {
        normalizeChatsColl[chat.chat_id] = [chat.location];
      }
    });

    _.each(_.keys(normalizeChatsColl), function(key) {
      _.each(_.uniq(normalizeChatsColl[key]), function(loc) {
        locationMap[loc].freq += 1;
      });
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

    var chats = {};

    Chats.find({location_code: locationCode}).forEach(function(chat) {
      var fromDate = chat.from_date ? chat.from_date.split('/')[1] : null;

      if (fromDate) {
        if(chats[chat.chat_id] && chats[chat.chat_id].length)
          chats[chat.chat_id].push(fromDate);
        else chats[chat.chat_id] = [fromDate];
      }
    });

    _.each(_.keys(chats), function(key) {
      _.each(_.uniq(chats[key]), function(month, i) {
        fromDates[month-1] += 1;
      });
    });

    return _.map(fromDates, function(freq, i) {
      return [i+1, freq];
    });
  }
});
