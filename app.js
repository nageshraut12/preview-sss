 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/app.js b/app.js
new file mode 100644
index 0000000000000000000000000000000000000000..2194b0c9c28749d3d4d2679d7c3966024d1ee296
--- /dev/null
+++ b/app.js
@@ -0,0 +1,51 @@
+const scrollButton = document.getElementById("scroll-to-form");
+const form = document.getElementById("situation-form");
+const responseCard = document.getElementById("response");
+
+const buildResponse = ({ situation, category, impact, responseTime, stakeholders }) => {
+  const stakeholdersList = stakeholders
+    ? stakeholders.split(",").map((name) => name.trim()).filter(Boolean)
+    : ["Incident lead", "Primary stakeholder", "Comms owner"];
+
+  return `
+    <h3>${category} response plan</h3>
+    <p><strong>Situation:</strong> ${situation}</p>
+    <p>
+      <strong>Impact:</strong> ${impact} · <strong>Target response:</strong> ${responseTime}
+    </p>
+    <p><strong>Recommended actions</strong></p>
+    <ul>
+      <li>Confirm the situation scope and collect the latest signals within 10 minutes.</li>
+      <li>Assign an owner to every action and set updates every 20 minutes.</li>
+      <li>Communicate a clear status update to stakeholders and affected users.</li>
+      <li>Track resolution steps, mitigation progress, and next review time.</li>
+    </ul>
+    <p><strong>Stakeholders to notify</strong></p>
+    <ul>
+      ${stakeholdersList.map((name) => `<li>${name}</li>`).join("")}
+    </ul>
+    <p><strong>Closure</strong>: capture learnings and confirm follow-up tasks before closing the incident.</p>
+  `;
+};
+
+scrollButton.addEventListener("click", () => {
+  form.scrollIntoView({ behavior: "smooth" });
+});
+
+form.addEventListener("submit", (event) => {
+  event.preventDefault();
+
+  const situation = document.getElementById("situation").value.trim();
+  const category = document.getElementById("category").value;
+  const impact = document.getElementById("impact").value;
+  const responseTime = document.getElementById("response-time").value;
+  const stakeholders = document.getElementById("stakeholders").value.trim();
+
+  responseCard.innerHTML = buildResponse({
+    situation,
+    category,
+    impact,
+    responseTime,
+    stakeholders,
+  });
+});
 
EOF
)
