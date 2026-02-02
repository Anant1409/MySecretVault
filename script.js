// 🔥 Firebase Configuration (अपनी डिटेल्स यहाँ डाल)
const firebaseConfig = {
  apiKey: "AIzaSyDMNvdYJSGjkOKgIjdx32Qj-BWcDdsEOvM",
  authDomain: "shadowvault-12bb9.firebaseapp.com",
  databaseURL: "https://shadowvault-12bb9-default-rtdb.firebaseio.com",
  projectId: "shadowvault-12bb9",
  storageBucket: "shadowvault-12bb9.firebasestorage.app",
  messagingSenderId: "482322744429",
  appId: "1:482322744429:web:8c111cc8480e12cc71eb64",
  measurementId: "G-4V4HWB969V"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 🔐 HARD-CODED USERS
const users = {
  "shadow1": "nightfall",
  "cipher": "void777",
  "neon": "pulseX",
  "ghost": "silence",
  "raven": "blackwing"
};

// 🔑 LOGIN
function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

  if (users[u] && users[u] === p) {
    sessionStorage.setItem("auth", "true");
    sessionStorage.setItem("currentUser", u); // दोस्त का नाम याद रखने के लिए
    showVault();
  } else {
    document.getElementById("error").textContent = "Access Denied.";
  }
}

function showVault() {
  document.getElementById("gate").classList.add("hidden");
  document.getElementById("vault").classList.remove("hidden");
  loadMessages(); // लॉगिन होते ही पुराने मैसेज लोड करो
}

// 📩 SEND MESSAGE TO FIREBASE
function sendMessage() {
  const msg = document.getElementById("confession").value.trim();
  const user = sessionStorage.getItem("currentUser") || "Anonymous";

  if (!msg) return;

  // Firebase में डेटा भेजना
  database.ref("messages").push().set({
    username: user,
    text: msg,
    timestamp: Date.now()
  });

  document.getElementById("confession").value = "";
}

// 🔄 LOAD MESSAGES IN REAL-TIME
function loadMessages() {
  const wall = document.getElementById("wall");
  
  // Firebase से मैसेज सुनना (Listen)
  database.ref("messages").on("value", (snapshot) => {
    wall.innerHTML = ""; // दीवार साफ़ करो ताकि डुप्लीकेट न हों
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      const p = document.createElement("p");
      p.innerHTML = `<span style="color: #00f2ff;">${data.username}:</span> ${data.text}`;
      wall.prepend(p); // नया मैसेज सबसे ऊपर
    });
  });
}

// 🚪 LOGOUT & SESSION
if (sessionStorage.getItem("auth")) { showVault(); }

function logout() {
  sessionStorage.clear();
  location.reload();
}

// 🛑 SECURITY
document.addEventListener("contextmenu", e => e.preventDefault());