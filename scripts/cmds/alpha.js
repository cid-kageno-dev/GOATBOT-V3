const axios = require("axios");

module.exports.config = {
  name: "alpha",
  version: "4.3",
  hasPermssion: 0,
  credits: "J O Y",
  description: "Chat with Alpha (Triggered by name)",
  commandCategory: "ai",
  usages: "Alpha [message]",
  cooldowns: 2,
};

module.exports.handleEvent = async function ({ api, event }) {
  // 1. Get the message body
  const content = event.body ? event.body.trim() : "";
  if (!content) return;

  // 2. TRIGGER: Check if the message starts with "Alpha" (Case Insensitive)
  const trigger = "alpha";
  if (content.toLowerCase().indexOf(trigger) !== 0) return;

  // 3. Clean the message
  // Removes "Alpha" and any following punctuation (e.g. "Alpha, hello" becomes "hello")
  const rawQuery = content.slice(trigger.length).trim().replace(/^[,.]\s*/, "");
  
  // If user just typed "Alpha", send a greeting
  if (!rawQuery) return api.sendMessage("🌑 Yes? I am listening...", event.threadID, event.messageID);

  const senderID = event.senderID;
  const specialUsers = {
    "100075163264087": "Lord Shadow" // Your ID
  };

  try {
    // 4. Set the Persona
    let prompt = rawQuery;
    if (specialUsers[senderID]) {
      prompt = `Act as Alpha from Shadow Garden. Lord Shadow (Cid) is asking: "${rawQuery}". Answer briefly, loyally, and respectfully.`;
    } else {
      prompt = `Act as Alpha from Shadow Garden. A human asks: "${rawQuery}". Answer mysteriously, arrogantly, and elegantly.`;
    }

    // 5. Call the API
    const response = await axios.get("https://hybrid-ani.onrender.com/chat", {
      params: {
        ask: prompt
      }
    });

    const alphaReply = response.data.response || response.data.message || response.data.answer || response.data;

    // 6. Send Reply
    return api.sendMessage(alphaReply, event.threadID, event.messageID);

  } catch (err) {
    console.error("Alpha API Error:", err);
    // Silent fail to avoid spamming errors in chat
  }
};

module.exports.run = async function ({ api, event, args }) {
  // This allows you to also use it with a prefix like /alpha text
  const content = args.join(" ");
  if (!content) return api.sendMessage("🌑 Use: Alpha [message]", event.threadID);
  
  // Pass to the same logic (or just copy-paste the API call here if preferred)
  // For simplicity, we just remind the user how to use it.
  api.sendMessage("🌑 You can just type 'Alpha [message]' without the slash.", event.threadID);
};
