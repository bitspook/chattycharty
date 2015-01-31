Meteor.startup(function() {
  /**
   * If there is no data in mongodb, populate 'chats' collection in mongodb using the data file provided by stayzilla
   */

  var fs = Npm.require('fs');
  var chatfilePath = 'data/hackathon_chat_data.csv';
  var locationfilePath = 'data/chat_location_mapping.csv';

  if (Chats.find().count() === 0) {

    console.log("IMPORTING CHAT DATABASE");

    /**
     * Importing chat data
     */

    Assets.getText(chatfilePath, function(err, res) {
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
  }

  /**
   * Importing Location data
   */
  if (Locations.find().count() === 0) {
    Assets.getText(locationfilePath, function(err, res) {
      if (err)
        throw new Meteor.Error(err);

      var data = Baby.parse(res).data;

      console.log("START IMPORTING LOCATION DATA");

      Lazy(data).forEach(function(line, index) {
        if (index == 0)
          return;

        Locations.insert({
          code: line[0],
          location: line[1]
        });

        if (index == data.length-1) {
          console.log("DONE IMPORTING LOCATION DATA");
        }
      });

    });
  }
});
