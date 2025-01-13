//Login Call
async function login(username, password) {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  console.log("getting response", response);
  if (response.ok) {
    const data = await response.json();
    console.log("jwt token", data.token);
  }
}

login("onkar", "abc123");
