Meteor.publish('chat_ids', function(limit) {
  limit = limit || 400;
  return Chats.find({}, {fields: {chat_id: 1}, limit: limit, sort: {chat_id: 1}});
});

Meteor.publish('chats', function(limit) {
  limit = limit || 100;

  return Chats.find({}, {limit: limit});
});

Meteor.publish('chat_with_id', function(chatId) {
  var locationContext = Chats.findOne({chat_id: chatId}, {fields: {'chat_location_context': 1}}).chat_location_context,
      locationCode = parseInt(locationContext.split(':')[0]);

  var res = [Chats.find({chat_id: chatId})];

  if (!_.isNaN((locationCode)) && _.isNumber(locationCode)) {
    res.push(Locations.find({code: locationCode+''}));
  }

  return res;
});

Meteor.publish('valid_chats', function(limit) {
  limit = limit || 100;

  var validChats = Chats.find({
    location: {$ne: null, $exists: true}
  }, {limit: limit});

  return validChats;
});
