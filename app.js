const form = document.getElementById("situation-form");
const responseCard = document.getElementById("response");

const renderResponse = (data) => {
  responseCard.innerHTML = `
    <h3>${data.title}</h3>
    <p><strong>Summary:</strong> ${data.summary}</p>
    <p><strong>Priority:</strong> ${data.priority}</p>
    <p><strong>Immediate actions</strong></p>
    <ul>${data.immediateActions.map((item) => `<li>${item}</li>`).join("")}</ul>
    <p><strong>Recommended next steps</strong></p>
    <ul>${data.nextSteps.map((item) => `<li>${item}</li>`).join("")}</ul>
    <p><strong>Suggested stakeholders</strong></p>
    <ul>${data.stakeholders.map((item) => `<li>${item}</li>`).join("")}</ul>
  `;
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const situation = document.getElementById("situation").value.trim();
  const category = document.getElementById("category").value;

  if (!situation) {
    responseCard.innerHTML = "<p class=\"placeholder\">Please add a situation summary to generate a plan.</p>";
    return;
  }

  responseCard.innerHTML = "<p class=\"placeholder\">Analyzing the situation...</p>";

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ situation, category }),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    renderResponse(data);
  } catch (error) {
    responseCard.innerHTML =
      "<p class=\"placeholder\">Unable to reach the AI service right now. Please try again soon.</p>";
  }
});
