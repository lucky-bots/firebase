const functions = require("firebase-functions");
const request = require("request-promise");

const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message/reply";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer <ZtOyNyDbjRMWp3PeP3pvQWatE0XyR7vyaSS2dFKRKn23U01WAVDBEUVin7PYbVb7I8Mnkmo0MndOnJN5ucH5/TKYyIERPbJ5DB/Fkehg62gVEzWsdWyQMCRg/1Okyls>`
};

exports.LineBotReply = functions.https.onRequest((req, res) => {
  if (req.method === "POST"){
    reply(req.body);
  } else {
    return res.status(200).send(`Done`);
  }
});

const reply = bodyResponse => {
  return request({
    method: `POST`,
    uri: LINE_MESSAGING_API,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: bodyResponse.events[0].replyToken,
      messages: [{
        type: `text`,
        text: JSON.stringify(bodyResponse)
      }]
    })
  });
};
