Meteor.startup(function() {
  /**
   * If there is no data in mongodb, populate 'chats' collection in mongodb using the data file provided by stayzilla
   */

  if (Chats.find().count() > 0) {
    return;
  }

  console.log("IMPORTING CHAT DATABASE");

  var fs = Npm.require('fs');
  var filePath = 'data/hackathon_chat_data.csv';

  Assets.getText(filePath, function(err, res) {
    if (err)
      throw new Meteor.Error(err);

    var data = Baby.parse(res).data;

    Lazy(data).forEach(function(line, index) {
      if (index == 0)
        return;

      var doc = {
        chat_id: line[0],
        message: line[1],
        timestamp: line[2],
        chat_location_context: line[3]
      };

      Chats.insert(doc);

      if (index == data.length-1) {
        console.log("DONE IMPORTING CHAT DATA");
      }
    });
  });
});
