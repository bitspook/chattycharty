Template.data.helpers({
  chats: function() {
    return _.sortBy(_.uniq(Chats.find().map(function(doc) {
      return doc.chat_id;
    })), function(chat_id) {
      return parseInt(chat_id);
    });
  },
  selected_chat: function() {
    return Chats.find({chat_id: Session.get('selected_chat_id')}, {sort: {timestamp: 1}});
  }
});

Template.data.events({
  'click .chat-id': function(e) {
    e.preventDefault();

    var chatId = e.currentTarget.getAttribute('data-id');

    Meteor.subscribe('chat_with_id', chatId);
    Session.set('selected_chat_id', chatId);
  }
});
