const { searchWorkersByActivity } = require(Runtime.getFunctions()['services/workerService'].path);

exports.handler = async function (context, event, callback) {
  const response = new Twilio.Response();

  response.setBody(await searchWorkersByActivity(context.getTwilioClient(), event));

  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST');
  response.appendHeader('Content-Type', 'application/json');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
  callback(null, response);
};
