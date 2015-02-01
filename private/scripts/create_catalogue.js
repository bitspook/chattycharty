/**
 * create catalogue
 */
var Lazy = require('lazyjs');


Lazy.readFile("../data/hackathon_chat_data.csv")
  .take(10)
  .each(function(data) {
    console.log(data);
  });



// if (ChatCatalogue.find().count() === 0) {
//   Assets.getText(chatfilePath, function(err, res) {
//     if (err)
//       throw new Meteor.Error(err);

//     var data = Baby.parse(res).data;

//     Lazy(data).forEach(function(line, index) {
//       if (index == 0)
//         return;

//       var done = [];

//       if (! _.contains(done, line[0])) {
//         done.push(line[0]);

//         var chat = Chats.findOne({chat_id: line[0]});

//         if (! chat)
//           return;

//         console.log("INSERTING NEW CATALOGUE", line[0]);

//         ChatCatalogue.insert({
//           chat_id: line[0],
//           messages: [line[1]],
//           time_stamp: line[2],
//           chat_location_context: line[3],
//           location: chat.location,
//           location_code: chat.location_code,
//           to_date: chat.to_date,
//           from_date: chat.from_date
//         });
//       } else {
//         console.log("UPDATING CATALOGUE", line[0]);
//         ChatCatalogue.update({
//           chat_id: line[0]}, {
//             $push: {
//               messages: line[1]
//             }
//           });
//       }

//       if (index == data.length-1) {
//         console.log("DONE IMPORTING CHAT DATA");
//       }
//     });
//   });
// }
