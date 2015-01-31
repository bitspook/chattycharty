Meteor.publish('chat_ids', function(limit) {
  limit = limit || 400;
  return Chats.find({}, {fields: {chat_id: 1}, limit: limit, sort: {chat_id: 1}});
});

Meteor.publish('chats', function(limit) {
  limit = limit || 100;

  return Chats.find({}, {limit: limit});
});

Meteor.publish('chat_with_id', function(chatId) {
  return Chats.find({chat_id: chatId});
});
