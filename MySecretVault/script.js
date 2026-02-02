// 🔐 HARD-CODED USERS
const users = {
  "shadow1": "nightfall",
  "cipher": "void777",
  "neon": "pulseX",
  "ghost": "silence",
  "raven": "blackwing"
};

// 🛑 Disable Right Click
document.addEventListener("contextmenu", e => e.preventDefault());

// 🛑 Basic DevTools Detection
document.addEventListener("keydown", e => {
  if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
    e.preventDefault();
  }
});

// 🔑 LOGIN
function login() {
  const u = username.value;
  const p = password.value;

  if (users[u] && users[u] === p) {
    sessionStorage.setItem("auth", "true");
    document.getElementById("gate").classList.add("hidden");
    document.getElementById("vault").classList.remove("hidden");
  } else {
    error.textContent = "Access Denied.";
  }
}

// 🔄 SESSION CHECK
if (sessionStorage.getItem("auth")) {
  gate.classList.add("hidden");
  vault.classList.remove("hidden");
}

// 🚪 LOGOUT
function logout() {
  sessionStorage.clear();
  location.reload();
}

// 📩 SEND CONFESSION
function sendMessage() {
  const msg = confession.value.trim();
  if (!msg) return;

  // Display locally
  const p = document.createElement("p");
  p.textContent = "• " + msg;
  wall.prepend(p);

  // FORMSpree Example
  fetch("https://formspree.io/f/YOUR_FORM_ID", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg })
  });

  confession.value = "";
}