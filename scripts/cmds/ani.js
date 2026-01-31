const axios = require("axios");

module.exports = {
	config: {
		name: "ani",
		version: "1.1",
		author: "Cid (Niga)",
		countDown: 5,
		role: 0,
		description: "Chat with Ani",
		category: "ai",
		guide: "ani <message>"
	},

	onStart: async function () {},

	// ========== CHAT TRIGGER ==========
	onChat: async function ({ message, event }) {
		const { body } = event;
		if (!body) return;

		// ignore commands
		if (body.startsWith("/") || body.startsWith("!")) return;

		const triggerRegex = /\bani\b/i;

		if (triggerRegex.test(body) && !body.toLowerCase().includes("ani.js")) {
			await askAni(body, message, event.senderID);
		}
	},

	// ========== REPLY TRIGGER ==========
	onReply: async function ({ message, event, Reply }) {
		if (event.senderID != Reply.author) return;
		await askAni(event.body, message, event.senderID);
	}
};

// ========== CORE ==========
async function askAni(content, message, authorID) {
	try {
		const res = await axios.post(
			"https://hybrid-ani.onrender.com/chat",
			{ message: content },
			{ timeout: 20000 }
		);

		const text =
			res.data.reply ||
			res.data.response ||
			"No response from Ani 😶";

		const msg =
`╭──『 ☁️ 𝐀𝐍𝐈 』
│ ${text}
╰─────────────◊`;

		return message.reply({ body: msg }, (err, info) => {
			if (err) return;

			// ✅ CORRECT WAY (GoatBot)
			global.GoatBot.onReply.set(info.messageID, {
				commandName: "ani",
				author: authorID
			});
		});

	} catch (e) {
		message.reply("⚠️ Ani is not responding right now.");
	}
}
