Router.configure({
  layoutTemplate: 'layout'
});


Router.map(function() {
  this.route('home', {
    path: '/',
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
