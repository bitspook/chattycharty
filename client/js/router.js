Router.configure({
  layoutTemplate: 'layout'
});


Router.map(function() {
  this.route('home', {
    path: '/',
    waitOn: function() {
      // Session.setDefault('valid_chats_limit', 5);
      // return Meteor.subscribe('valid_chats', Session.get('valid_chats_limit'));
    },
    template: 'home'
  });

  this.route('data', {
    path: '/data',
    waitOn: function() {
      return Meteor.subscribe('chat_ids');
    },
    template: 'data'
  });

});
