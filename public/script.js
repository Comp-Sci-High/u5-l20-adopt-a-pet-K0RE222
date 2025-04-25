const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const petData = new FormData(form);
  const reqBody = Object.fromEntries(petData);

  const response = await fetch("/add/pet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reqBody)
  });

  const data = await response.json();
  window.location.href = "/";
});
