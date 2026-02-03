const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const keywords = {
  Healthcare: ["injury", "fever", "pain", "clinic", "hospital"],
  Education: ["exam", "assignment", "course", "class", "tuition"],
  Technical: ["error", "bug", "server", "login", "network"],
  "Work Professional": ["manager", "deadline", "hr", "meeting", "project"],
};

const detectPriority = (text) => {
  const urgentWords = ["urgent", "immediately", "critical", "emergency", "asap"];
  if (urgentWords.some((word) => text.includes(word))) {
    return "High";
  }
  if (text.length > 120) {
    return "Medium";
  }
  return "Normal";
};

app.post("/api/analyze", (req, res) => {
  const { situation = "", category = "General" } = req.body || {};
  const normalized = situation.toLowerCase();
  const priority = detectPriority(normalized);

  const matchedKeywords = (keywords[category] || []).filter((word) => normalized.includes(word));
  const insights = matchedKeywords.length
    ? `Detected focus areas: ${matchedKeywords.join(", ")}.`
    : "No specific keywords detected; treating as a general request.";

  res.json({
    title: `${category} situation response`,
    summary: `${insights} We'll prioritize clarity and fast next steps based on the details provided.`,
    priority,
    immediateActions: [
      "Confirm the situation details and timeline with the requester.",
      "Identify who is impacted and what services are affected.",
      "Assign a single point of contact for updates and decisions.",
    ],
    nextSteps: [
      "Collect supporting information (logs, documents, or context).",
      "Create a short communication update for stakeholders.",
      "Schedule a follow-up review to confirm resolution and prevention steps.",
    ],
    stakeholders: [
      "Primary requester",
      "Subject-matter expert",
      "Operations lead",
    ],
    message: situation.trim(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
