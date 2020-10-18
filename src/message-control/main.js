const { ipcMain } = require("electron");
const { database } = require("../database/load-database");
const {
  getPortfolioDetailsMessageReply,
  getPortfoliosMessageReply,
  addPortfoliosMessageReply,
  getCurrenciesMessageReply,
  addCurrenciesMessageReply,
  getMarketsMessageReply,
  addMarketsMessageReply
} = require("./messages");

function handleMessageResponse(event, messageType, err, rows){

  const handler = {
    getPortfolioDetailsMessageReply,
    getPortfoliosMessageReply,
    addPortfoliosMessageReply,
    getCurrenciesMessageReply,
    addCurrenciesMessageReply,
    getMarketsMessageReply,
    addMarketsMessageReply
  }[messageType];

  if (handler) {
    try {
      console.log(`Handler is ${handler}`)
      event.reply(handler, (err && err.message) || rows);
    } catch (error) {
      console.error(`Error on event-handler: ${messageType}`);
    }
  } else {
    console.error(`Unhandled event: ${messageType}`);
    event.reply("asynchronous-reply", (err && err.message) || rows);
  }
}

ipcMain.on("asynchronous-message", (event, arg, messageType) => {
  const sql = arg;
  console.log(messageType)
  database.all(sql, (err, rows) => {
    console.log("Sending get portfolios reply back");
    console.log(sql);
    handleMessageResponse(event, messageType, err, rows);
  });
});
