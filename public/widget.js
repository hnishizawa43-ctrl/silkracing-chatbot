(function () {
  "use strict";

  var WIDGET_ORIGIN =
    document.currentScript && document.currentScript.getAttribute("data-origin")
      ? document.currentScript.getAttribute("data-origin")
      : document.currentScript
        ? document.currentScript.src.replace(/\/widget\.js.*$/, "")
        : "";

  // --- State ---
  var isOpen = false;

  // --- Floating Button ---
  var btn = document.createElement("button");
  btn.id = "silk-chat-btn";
  btn.setAttribute("aria-label", "チャットを開く");
  btn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  Object.assign(btn.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    zIndex: "2147483646",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "none",
    background: "#0284c7",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  });
  btn.addEventListener("mouseenter", function () {
    btn.style.transform = "scale(1.08)";
    btn.style.boxShadow = "0 6px 28px rgba(0,0,0,0.25)";
  });
  btn.addEventListener("mouseleave", function () {
    btn.style.transform = "scale(1)";
    btn.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
  });

  // --- Chat Container ---
  var container = document.createElement("div");
  container.id = "silk-chat-container";
  Object.assign(container.style, {
    position: "fixed",
    bottom: "100px",
    right: "24px",
    zIndex: "2147483647",
    width: "400px",
    height: "600px",
    maxWidth: "calc(100vw - 32px)",
    maxHeight: "calc(100dvh - 120px)",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
    display: "none",
    opacity: "0",
    transform: "translateY(16px) scale(0.96)",
    transition: "opacity 0.25s ease, transform 0.25s ease",
    border: "1px solid rgba(0,0,0,0.08)",
  });

  // --- iframe ---
  var iframe = document.createElement("iframe");
  iframe.src = WIDGET_ORIGIN + "/widget";
  iframe.title = "Silk Horse Club AI Chat";
  iframe.allow = "clipboard-write";
  Object.assign(iframe.style, {
    width: "100%",
    height: "100%",
    border: "none",
    borderRadius: "16px",
  });
  container.appendChild(iframe);

  // --- Close button (X) on top-right of container ---
  var closeBtn = document.createElement("button");
  closeBtn.setAttribute("aria-label", "チャットを閉じる");
  closeBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  Object.assign(closeBtn.style, {
    position: "absolute",
    top: "8px",
    right: "8px",
    zIndex: "10",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "none",
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.15s ease",
  });
  closeBtn.addEventListener("mouseenter", function () {
    closeBtn.style.background = "rgba(0,0,0,0.7)";
  });
  closeBtn.addEventListener("mouseleave", function () {
    closeBtn.style.background = "rgba(0,0,0,0.5)";
  });
  closeBtn.addEventListener("click", function () {
    toggle();
  });
  container.appendChild(closeBtn);

  // --- Toggle ---
  function toggle() {
    isOpen = !isOpen;
    if (isOpen) {
      container.style.display = "block";
      // Trigger reflow for animation
      void container.offsetHeight;
      container.style.opacity = "1";
      container.style.transform = "translateY(0) scale(1)";
      // Change button to X icon
      btn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    } else {
      container.style.opacity = "0";
      container.style.transform = "translateY(16px) scale(0.96)";
      setTimeout(function () {
        if (!isOpen) container.style.display = "none";
      }, 250);
      // Change button back to chat icon
      btn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
    }
  }

  btn.addEventListener("click", toggle);

  // --- Mobile responsive ---
  var mq = window.matchMedia("(max-width: 480px)");
  function applyMobile(e) {
    if (e.matches) {
      Object.assign(container.style, {
        bottom: "0",
        right: "0",
        width: "100vw",
        height: "100dvh",
        maxWidth: "100vw",
        maxHeight: "100dvh",
        borderRadius: "0",
      });
      iframe.style.borderRadius = "0";
    } else {
      Object.assign(container.style, {
        bottom: "100px",
        right: "24px",
        width: "400px",
        height: "600px",
        maxWidth: "calc(100vw - 32px)",
        maxHeight: "calc(100dvh - 120px)",
        borderRadius: "16px",
      });
      iframe.style.borderRadius = "16px";
    }
  }
  mq.addEventListener("change", applyMobile);
  applyMobile(mq);

  // --- Inject ---
  document.body.appendChild(container);
  document.body.appendChild(btn);
})();
