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
    onBeforeAction: function() {
      Session.set('showing_to_10', false);
      this.next();
    },
    template: 'home'
  });

  this.route('top10', {
    path: '/top-10-locations',
    template: 'home',
    onBeforeAction: function() {
      Session.set('showing_top_10', true);
      this.next();
    }
  });

  this.route('data', {
    path: '/data',
    waitOn: function() {
      return Meteor.subscribe('chat_ids');
    },
    template: 'data'
  });

});
