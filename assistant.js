// =============================================
//  Election Guide Assistant — AI Engine
//  Powered by Google Gemini (Free API)
// =============================================

/**
 * Add a chat message bubble to the conversation.
 */
function addMessage(role, content, isHTML = false) {
  const chatEl = document.getElementById("chat");

  const msgDiv = document.createElement("div");
  msgDiv.className = `msg ${role}`;

  const avatar = document.createElement("div");
  avatar.className = `avatar ${role === "ai" ? "ai-avatar" : "user-avatar"}`;
  avatar.textContent = role === "ai" ? "EG" : "You";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  if (isHTML) {
    bubble.innerHTML = content;
  } else {
    bubble.textContent = content;
  }

  msgDiv.appendChild(avatar);
  msgDiv.appendChild(bubble);
  chatEl.appendChild(msgDiv);
  chatEl.scrollTop = chatEl.scrollHeight;
}

/**
 * Show the animated typing indicator.
 */
function showTyping() {
  const chatEl = document.getElementById("chat");
  const div = document.createElement("div");
  div.className = "msg ai";
  div.id = "typing-indicator";
  div.innerHTML = `
    <div class="avatar ai-avatar">EG</div>
    <div class="bubble typing">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  `;
  chatEl.appendChild(div);
  chatEl.scrollTop = chatEl.scrollHeight;
  return div;
}

/**
 * Convert basic markdown to safe HTML.
 */
function formatReply(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n\n/g, "<br><br>")
    .replace(/\n(\d+\.) /g, "<br>$1 ")
    .replace(/\n- /g, "<br>• ")
    .replace(/^(\d+\.) /gm, "$1 ");
}

/**
 * Send the user's message to the Google Gemini API and render the reply.
 */
async function sendToAssistant(userText, activeCtx) {
  if (!userText.trim()) return;

  addMessage("user", userText);

  document.getElementById("quick-chips").style.display = "none";

  const sendBtn = document.getElementById("send-btn");
  const inputEl = document.getElementById("user-input");
  sendBtn.disabled = true;

  const typing = showTyping();

  const systemPrompt = `${SYSTEM_PROMPT_BASE}\n\n${CTX_MAP[activeCtx] || CTX_MAP.general}`;

  // Gemini API endpoint with key as query param
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.MODEL}:generateContent?key=${CONFIG.API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: [
          {
            role: "user",
            parts: [{ text: userText }]
          }
        ],
        generationConfig: {
          maxOutputTokens: CONFIG.MAX_TOKENS,
          temperature: 0.7,
        }
      }),
    });

    const data = await response.json();
    typing.remove();

    if (!response.ok) {
      const errMsg = data?.error?.message || "API request failed.";
      // Show helpful messages for common errors
      if (errMsg.includes("API_KEY_INVALID") || errMsg.includes("API key not valid")) {
        addMessage("ai", "⚠️ Your Gemini API key is invalid. Please check <code>src/config.js</code> and make sure you pasted the correct key from <a href='https://aistudio.google.com/app/apikey' target='_blank'>aistudio.google.com</a>.", true);
      } else {
        addMessage("ai", `Error: ${errMsg}`);
      }
    } else {
      const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text
        || "I couldn't generate a response. Please try again.";
      addMessage("ai", formatReply(replyText), true);
    }

  } catch (err) {
    typing.remove();
    console.error("Assistant error:", err);
    addMessage("ai", "Something went wrong connecting to the assistant. Please check your internet connection and API key in <code>src/config.js</code>.", true);
  }

  sendBtn.disabled = false;
  inputEl.focus();
}
