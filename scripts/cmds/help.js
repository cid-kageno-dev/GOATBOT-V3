module.exports = {
	config: {
		name: "help",
		aliases: ["menu", "h", "commands"],
		version: "3.1",
		author: "Cid",
		shortDescription: "Show all available commands",
		longDescription: "Displays a premium, stylized list of all commands available on the bot.",
		category: "system",
		guide: "{pn}help [command name]"
	},

	onStart: async function ({ message, args, prefix, event }) {
		const { commands } = global.GoatBot;
		const { senderID } = event;

		// 1. FANCY FONT GENERATOR
		const toFancy = (str) => {
			const map = {
				A: "𝐀", B: "𝐁", C: "𝐂", D: "𝐃", E: "𝐄", F: "𝐅", G: "𝐆", H: "𝐇", I: "𝐈",
				J: "𝐉", K: "𝐊", L: "𝐋", M: "𝐌", N: "𝐍", O: "𝐎", P: "𝐏", Q: "𝐐", R: "𝐑",
				S: "𝐒", T: "𝐓", U: "𝐔", V: "𝐕", W: "𝐖", X: "𝐗", Y: "𝐘", Z: "𝐙",
				a: "𝐚", b: "𝐛", c: "𝐜", d: "𝐝", e: "𝐞", f: "𝐟", g: "𝐠", h: "𝐡", i: "𝐢",
				j: "𝐣", k: "𝐤", l: "𝐥", m: "𝐦", n: "𝐧", o: "𝐨", p: "𝐩", q: "𝐪", r: "𝐫",
				s: "𝐬", t: "𝐭", u: "𝐮", v: "𝐯", w: "𝐰", x: "𝐱", y: "𝐲", z: "𝐳"
			};
			return str.replace(/[A-Za-z]/g, (char) => map[char] || char);
		};

		// 2. EMOJI MAPPING
		const categoryEmojis = {
			ai: "🤖", "ai-image": "🎨", group: "👥", system: "⚙️",
			fun: "🎡", owner: "👑", config: "🛠️", economy: "💰",
			media: "📽️", "18+": "🔞", tools: "🧰", utility: "🔌",
			info: "ℹ️", image: "🖼️", game: "🎮", admin: "🛡️",
			rank: "🏆", boxchat: "💬", others: "📂"
		};

		// 3. DATA PROCESSING
		const categories = {};
		let totalCommands = 0;

		const cleanCategoryName = (text) => {
			if (!text) return "others";
			return text.normalize("NFKD").replace(/[^\w\s-]/g, "").trim().toLowerCase();
		};

		for (const [name, cmd] of commands) {
			const cat = cleanCategoryName(cmd.config.category);
			if (!categories[cat]) categories[cat] = [];
			categories[cat].push(cmd.config.name);
			totalCommands++;
		}

		// 4. SPECIFIC COMMAND INFO
		if (args[0]) {
			const query = args[0].toLowerCase();
			const cmd = commands.get(query) || [...commands.values()].find(c => (c.config.aliases || []).includes(query));

			if (!cmd) return message.reply(`⚠️ | 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 "${query}" 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝.`);

			const { name, version, author, guide, category, shortDescription, aliases, role } = cmd.config;
			const roleText = role === 1 ? "Admin" : role === 2 ? "Owner" : "User";
			
			const usage = guide 
				? guide.replace(/{pn}/g, prefix) 
				: `${prefix}${name}`;

			return message.reply(
				`╭───『 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐈𝐍𝐅𝐎 』───╮\n` +
				`│ 🏷️ 𝐍𝐚𝐦𝐞: ${toFancy(name.toUpperCase())}\n` +
				`│ 📂 𝐂𝐚𝐭𝐞𝐠𝐨𝐫𝐲: ${categoryEmojis[category] || "📂"} ${toFancy(category || "Unknown")}\n` +
				`│ 📝 𝐈𝐧𝐟𝐨: ${shortDescription}\n` +
				`│ 🖇️ 𝐀𝐥𝐢𝐚𝐬: ${aliases?.join(", ") || "None"}\n` +
				`│ 🛡️ 𝐏𝐞𝐫𝐦: ${roleText}\n` +
				`│ 👤 𝐀𝐮𝐭𝐡𝐨𝐫: ${author}\n` +
				`│ 💡 𝐔𝐬𝐚𝐠𝐞: ${usage}\n` +
				`╰─────────────────────╯`
			);
		}

		// 5. MAIN MENU DISPLAY
		// --- SAFE NAME FETCHING FIX ---
		let userName = "Member";
		try {
			// Only try to fetch if the system exists
			if (global.GoatBot.usersData && typeof global.GoatBot.usersData.get === 'function') {
				const user = await global.GoatBot.usersData.get(senderID);
				if (user && user.name) userName = user.name;
			}
		} catch (err) {
			// If it fails, keep userName as "Member"
		}
		// -----------------------------

		const sortedCategories = Object.keys(categories).sort();
		
		let msg = `╭───────────────╮\n`;
		msg += `│  ☁️ 𝐀𝐋𝐏𝐇𝐀 𝐒𝐘𝐒𝐓𝐄𝐌 ☁️  │\n`;
		msg += `╰───────────────╯\n`;
		msg += `👋 𝐇𝐞𝐥𝐥𝐨, ${toFancy(userName)}!\n`;
		msg += `🤖 𝐂𝐦𝐝𝐬: ${totalCommands}  |  🏷️ 𝐏𝐫𝐞𝐟𝐢𝐱: [ ${prefix} ]\n`;
		msg += `─────────────────\n`;

		for (const cat of sortedCategories) {
			if (!categories[cat] || categories[cat].length === 0) continue;
			
			const emoji = categoryEmojis[cat] || "📂";
			const catName = toFancy(cat.toUpperCase());
			const cmdList = categories[cat].map(c => `⭓ ${c}`).join("  ");

			msg += `\n╭──『 ${emoji} ${catName} 』\n`;
			msg += `│ ${cmdList}\n`;
			msg += `╰─────────────◊\n`;
		}

		msg += `\n╭──────────────────╮\n`;
		msg += `│ 💡 𝐓𝐲𝐩𝐞 "${prefix}𝐡𝐞𝐥𝐩 <𝐜𝐦𝐝>" \n`;
		msg += `│    𝐟𝐨𝐫 𝐦𝐨𝐫𝐞 𝐝𝐞𝐭𝐚𝐢𝐥𝐬.\n`;
		msg += `╰──────────────────╯`;

		return message.reply(msg);
	}
};
