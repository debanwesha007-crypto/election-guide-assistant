// =============================================
//  Election Guide Assistant — Main Entry Point
// =============================================

(function () {
  let activeCtx = "general";

  function init() {
    checkApiKey();
    renderChips(activeCtx, handleChipSelect);
    bindContextButtons();
    bindInputControls();
    greet();
  }

  function checkApiKey() {
    if (CONFIG.API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
      const banner = document.createElement("div");
      banner.id = "api-banner";
      banner.innerHTML = `
        ⚠️ <strong>API key not set.</strong>
        Open <code>src/config.js</code> and replace <code>YOUR_GEMINI_API_KEY_HERE</code>
        with your free key from
        <a href="https://aistudio.google.com/app/apikey" target="_blank">aistudio.google.com</a>.
      `;
      document.getElementById("app").insertBefore(banner, document.getElementById("context-bar"));
    }
  }

  function greet() {
    addMessage(
      "ai",
      "Hello! I'm your <strong>Election Guide Assistant</strong>, powered by Google Gemini. I can help you understand how elections work — from voter registration and ballot access to vote counting and result certification.<br><br>Choose a topic above or ask me anything. What would you like to know?",
      true
    );
  }

  function bindContextButtons() {
    document.querySelectorAll(".ctx-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".ctx-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeCtx = btn.dataset.ctx;
        renderChips(activeCtx, handleChipSelect);
      });
    });
  }

  function handleChipSelect(question) {
    sendToAssistant(question, activeCtx);
  }

  function bindInputControls() {
    const inputEl = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    sendBtn.addEventListener("click", () => {
      const text = inputEl.value.trim();
      if (text) {
        inputEl.value = "";
        sendToAssistant(text, activeCtx);
      }
    });

    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const text = inputEl.value.trim();
        if (text) {
          inputEl.value = "";
          sendToAssistant(text, activeCtx);
        }
      }
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
