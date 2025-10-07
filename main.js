// ======== CONFIGURATION ========
// Replace with your actual Azure Node.js API URL:
const API_BASE = "https://node-js-on-azure-tak-grasewdcfyatatb9.canadacentral-01.azurewebsites.net";

// ======== WAKE SERVER FUNCTION ========
async function wakeServer() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (res.ok) {
      const data = await res.json();
      console.log("✅ Server awake:", data);
    } else {
      console.warn("⚠️ Wake-up call failed:", res.status);
    }
  } catch (err) {
    console.error("🚫 Error waking server:", err);
  }
}

// ======== DICE ROLL FUNCTION ========
async function rollDice() {
  try {
    // Call the Node.js API for a Yahtzee roll (5 dice)
    const response = await fetch(`${API_BASE}/yahtzee-roll`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    console.log("🎲 API Roll:", data);

    // Display the dice rolls on the page
    data.rolls.forEach((val, i) => {
      const dieField = document.getElementById(`die${i + 1}`);
      if (dieField) dieField.value = val;
    });

    // Calculate and display total
    const total = data.rolls.reduce((a, b) => a + b, 0);
    document.getElementById("total").value = total;

    // Optional: indicate Yahtzee!
    if (data.isYahtzee) {
      alert("🎉 YAHTZEE! All dice match!");
    }

  } catch (err) {
    console.error("❌ Roll failed:", err);
    alert("A network or CORS error occurred. Check console for details.");
  }
}

// ======== CORS FAILURE DEMO ========
async function demonstrateCORSFailure() {
  try {
    console.log("Attempting intentional CORS failure...");
    // This endpoint will fail CORS intentionally
    await fetch("https://example.com/api/yahtzee-roll");
  } catch (err) {
    console.warn("✅ CORS failure successfully triggered:", err);
  }
}

// ======== EVENT HANDLERS ========
document.getElementById("roll-btn").addEventListener("click", rollDice);
document.addEventListener("keydown", e => {
  if (e.key === "Enter") rollDice();
});

// ======== ON PAGE LOAD ========
wakeServer();          // “Wake up” your Node.js server (prevents cold start lag)
demonstrateCORSFailure();  // Show that CORS errors are detected
