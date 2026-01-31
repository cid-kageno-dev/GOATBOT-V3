const { getTime } = global.utils;

module.exports = {
	config: {
		name: "shadow_notify",
		isBot: true,
		version: "1.0.0",
		author: "Cid Kageno",
		envConfig: {
			allow: true
		},
		category: "events"
	},

	langs: {
		en: {
			notification: "🟢 %1 is now online\nPowered by Shadow Garden ⚔️\n\n🕒 Started at: %2"
		}
	},

	onStart: async ({ api, getLang }) => {
		const { config } = global.GoatBot;
		const botName = config.nickNameBot || "Cid Kageno";
		const time = getTime("DD/MM/YYYY HH:mm:ss");

		// Prepare the message
		// %1 will be replaced by botName, %2 by time
		const msg = getLang("notification", botName, time);

		// Send to all Admins in config.json
		if (config.adminBot && config.adminBot.length > 0) {
			for (const adminID of config.adminBot) {
				try {
					await api.sendMessage(msg, adminID);
					console.log(`\x1b[36m[SHADOW GARDEN]\x1b[0m Notification sent to Admin: ${adminID}`);
				} catch (err) {
					// Silent error handling for disabled threads
					if (err.error !== 1545116 && err.errorSummary !== 'Thread disabled') {
						console.error(`Failed to send notification to admin ${adminID}:`, err.message);
					}
				}
			}
		} else {
			// Fallback: If no admin is found, send to the bot's own ID (so you see it works)
			try {
				await api.sendMessage(msg, api.getCurrentUserID());
			} catch (e) {
				// Ignore
			}
		}

		// This command runs once on startup, so we do not return a callback function.
		return;
	}
};
