let token;

//Login Call
async function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  if (username && password) {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    console.log("getting response", response);
    if (response.ok) {
      const data = await response.json();
      document.getElementsByClassName("output-msg")[0].textContent =
        "Login credentials are valid !";
      token = data.token;
      console.log("jwt token", data.token);
      return data.token;
    }
  } else {
    document.getElementsByClassName("output-msg")[0].textContent =
      "Enter valid login credentials";
  }
}

async function callProtectedRoute() {
  if (token) {
    const response = await fetch("http://localhost:3000/protected", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      let data = await response.json();
      console.log("Protected Data:", data);
      document.getElementsByClassName(
        "output-msg"
      )[0].textContent = `${data?.user?.username} ${data.message}`;
    } else {
      console.error("Access denied");
    }
  } else {
    document.getElementsByClassName("output-msg")[0].textContent =
      "Login first to get JWT token";
  }
}

document.getElementById("log-in-btn").addEventListener("click", login);
document
  .getElementById("protected-btn")
  .addEventListener("click", callProtectedRoute);
//   async () => {
//     let token = await login("onkar", "abc123");
//     if (token) {
//       callProtectedRoute(token);
//     }
//   }
// )();
