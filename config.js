require('dotenv').config();

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  MONGODB_URI: process.env.MONGODB_URI,
  CHANNEL_ID: process.env.CHANNEL_ID,
  GROUP_ID: process.env.GROUP_ID,
  COMMENT_TEXT: process.env.COMMENT_TEXT,
  BUTTON_RULES: process.env.BUTTON_RULES,
  BUTTON_CHAT: process.env.BUTTON_CHAT,
  BUTTON_BOT: process.env.BUTTON_BOT
};
