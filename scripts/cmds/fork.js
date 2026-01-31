module.exports = {
  config: {
    name: "fork",
    aliases: ["repo", "source"],
    version: "1.0",
    author: "Cid Kageno",
    countDown: 3,
    role: 0,
    longDescription: "Returns the link to the official, updated fork of the bot's repository.",
    category: "system",
    guide: { en: "{pn}" }
  },

  onStart: async function({ message }) {
    const text = "✓ | 𝘏𝘦𝘳𝘦 𝘪𝘴 𝘵𝘩𝘦 𝘶𝘱𝘥𝘢𝘵𝘦𝘥 𝘧𝘰𝘳𝘬:\n\nhttps://github.com/cid-kageno-dev/GOAT-BOT-V3.git\n\n\n"  +
                 "𝗜 𝗔𝗠 𝗔𝗧𝗢𝗠𝗜𝗖 💥";
    
    message.reply(text);
  }
};
