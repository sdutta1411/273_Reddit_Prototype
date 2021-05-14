var connection = new require("./kafka/Connection");
var InitiateMongoServer = require("./database")



InitiateMongoServer();
//topics files

// let user_login = require("./services/authentication/user_login");
// let signup = require("./services/authentication/signup");
let user = require("./services/User/index")
let community = require("./services/community/index")
let message = require("./services/message/index")


function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log("123", data.data);
    fname.handle_request(data.data, function (err, res) {
      // console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, function (err, data) {
        console.log(data);
      });
      return;
    });
  });
}

function response(data, res, producer) {
  // console.log("after handle", res);
  var payloads = [
    {
      topic: data.replyTo,
      messages: JSON.stringify({
        correlationId: data.correlationId,
        data: res,
      }),
      partition: 0,
    },
  ];
  producer.send(payloads, function (err, data) {
    //console.log('producer send', data);
    if (err) {
      console.log("Error when producer sending data", err);
    } else {
      console.log(data);
    }
  });
  return;
}

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
// handleTopicRequest("user_login", user_login);
// handleTopicRequest("signup", signup);

handleTopicRequest("community",community);
handleTopicRequest("message",message);
handleTopicRequest("user",user);
