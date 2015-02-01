Template.layout.events({
  'click .all': function() {
    Session.set('showing_top_10', false);
  },
  'click .top10': function(e) {
    Session.set('showing_top_10', true);
  }
});
