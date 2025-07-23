const { Telegraf } = require('telegraf');
const config = require('./config');
const storage = require('./storage');

const bot = new Telegraf(config.BOT_TOKEN);

(async () => {
  await storage.init();

  bot.on('message', async (ctx) => {
    const msg = ctx.message;
    const chatId = String(msg.chat.id);

    // Only act in the group
    if (chatId !== config.GROUP_ID) return;

    // Only on forwards from the channel
    if (!msg.forward_from_chat || String(msg.forward_from_chat.id) !== config.CHANNEL_ID) return;

    // Handle media albums: only comment once per album
    const msgId = msg.media_group_id || msg.message_id;
    const already = await storage.isProcessed(msgId);
    if (already) return;

    const inlineKeyboard = {
      reply_markup: {
        inline_keyboard: [[
          { text: '📌Правила', url: config.BUTTON_RULES },
          { text: '💬Чат', url: config.BUTTON_CHAT },
          { text: '🤖Бот', url: config.BUTTON_BOT }
        ]]
      },
      reply_to_message_id: msg.message_id
    };

    try {
      await ctx.reply(config.COMMENT_TEXT, inlineKeyboard);
      await storage.markAsProcessed(msgId);
    } catch (e) {
      console.error('Failed to send comment:', e.message);
    }
  });

  bot.launch();
  console.log('🤖 Bot is running...');
})();

// Graceful shutdown for Render.com
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));