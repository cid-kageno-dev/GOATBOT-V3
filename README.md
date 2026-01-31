# ⚔️ CID KAGENO - Messenger Bot 

![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Platform](https://img.shields.io/badge/Platform-Render-blue)
![Library](https://img.shields.io/badge/Library-FCA--NeoKex-orange)

> "I am Atomic."
>
> A high-performance Facebook Messenger bot powered by `fca-neokex`. Designed for stability on Render with a custom "Shadow Garden" aesthetic.

---

## ⚡ Features

* **Render Optimized:** Auto-login and "Keep-Alive" support.
* **Anti-Ban Logic:** Uses Windows User-Agent spoofing to bypass `1357004` blocks.
* **Shadow Garden Theme:** Custom ASCII art startup screen.
* **Command System:** Modular command handling (GoatBot V2 structure).
* **Auto-Restart:** Automatically recovers from temporary Facebook disconnects.

---

## 🚀 Installation & Setup

### **1. Prerequisites**
* A Facebook account (secondary/bot account recommended).
* A GitHub account.
* A [Render.com](https://render.com) account (Free Tier works).

### **2. Deploy to Render**

1.  **Fork this Repository** to your GitHub.
2.  Create a new **Web Service** on Render.
3.  Connect your GitHub repository.
4.  Use the following settings:
    * **Runtime:** `Node`
    * **Build Command:** `npm install`
    * **Start Command:** `npm start`
5.  **Important:** In the "Environment" section, ensure Node version is set to `18` or higher (via `package.json` engines).

---

## 🍪 How to Get Cookies (account.txt)

This bot requires cookies to log in without a password, which prevents security locks.

1.  Download the **Cookie-Editor** extension for your browser.
2.  Go to Facebook and log in to your bot account.
3.  Open the extension -> Click **Export** -> **Export as JSON**.
4.  Create a file named `account.txt` in your project root.
5.  Paste the JSON code inside and save.
6.  **Upload/Commit** `account.txt` to your repo (Keep it private!).

---

## 🛠️ Troubleshooting

### **Error: 1357004 / "Not Logged In"**
* **Cause:** Facebook has flagged the Render IP address.
* **Fix:**
    1.  Log out of the bot account on your PC.
    2.  Clear browser cache/cookies.
    3.  Log in again (Incognito mode recommended).
    4.  Export **NEW** cookies.
    5.  Update `account.txt` and redeploy.

### **Error: `undici` or `fetch` not found**
* **Cause:** Render is using an old Node version (v14/v16).
* **Fix:** Ensure your `package.json` has this:
    ```json
    "engines": {
      "node": ">=18.0.0"
    }
    ```
    Then go to Render -> Manual Deploy -> **Clear Build Cache & Deploy**.

---

## 📝 Credits

* **Original Core:** GoatBot V2 by NTKhang
* **FCA Library:** [fca-neokex](https://github.com/KhangGia1810/fca-neokex)
* **Modifications:** Cid Kageno (Shadow Garden Edition)

---


