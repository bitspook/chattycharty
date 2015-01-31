var MongoClient = require('mongodb'),
    _ = require('underscore');

var dbUrl = "mongodb://127.0.0.1:3001/meteor";

MongoClient.connect(dbUrl, function(err, db) {
  if (err) {
    console.log("ERROR", err.message);
    throw err;
  }

  var Chats = db.collection('chats');
  var Locations = db.collection('locations');
  var count = 0;

  Chats.find().each(function(err, chat) {
    count++;

    if (err) {
      console.log("Error while getting chat", err.message);
    }

    if (chat === null) {
      console.log("******************** DONE ********************");
      return;
    }

    var locationContext = chat.chat_location_context;

    if (! locationContext) {
      console.log("NO LOCATION CONTEXT");
      return;
    }

    var temp = locationContext.split(':'),
        locationCode = temp[0] || null,
        fromDate = temp[1] || null,
        toDate = temp[2] || null;

    console.log("HAS LOC, finding loc", locationCode, fromDate, toDate);
    Locations.find({code: locationCode}).toArray(function(err, loc) {
      if (err) {
        console.log("Error while getting location", loc);
        throw err;
      }

      loc = loc[0];

      console.log("HAS LOC, updating chat");
      Chats.update({_id: chat._id}, { $set: {
        location: loc ? loc.location : null,
        location_code: loc ? loc.code : null,
        to_date: toDate ? toDate : null,
        from_date : fromDate ? fromDate : null
      }}, function(err) {
        if (err) {
          console.log('Error while updating Chat', err);
          throw err;
        }
        console.log("Successfully updated chat", count);
      });

    });
  });
});
