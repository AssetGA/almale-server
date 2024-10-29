const https = require("follow-redirects").https;

class SMSClient {
  constructor(apiKey, fromNumber) {
    this.apiKey = apiKey;
    this.fromNumber = fromNumber;
  }

  sendSMS(toNumber, messageText) {
    const options = {
      method: "POST",
      hostname: "api.infobip.com",
      path: "/sms/2/text/advanced",
      headers: {
        Authorization: `App ${this.apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      maxRedirects: 20,
    };

    const postData = JSON.stringify({
      messages: [
        {
          destinations: [{ to: toNumber }],
          from: this.fromNumber,
          text: messageText,
        },
      ],
    });

    const req = https.request(options, (res) => {
      let chunks = [];

      res.on("data", (chunk) => {
        chunks.push(chunk);
      });

      res.on("end", () => {
        const body = Buffer.concat(chunks);
        console.log("Ответ от сервера:", body.toString());
      });

      res.on("error", (error) => {
        console.error("Ошибка при отправке SMS:", error);
      });
    });

    req.write(postData);
    req.end();
  }
}

module.exports = SMSClient;
