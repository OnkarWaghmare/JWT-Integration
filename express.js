const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:8080", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);

app.use(bodyParser.json());
// Secret key for signing the JWT
const SECRET_KEY = "your-secret-key";

// Mock user database
const users = [
  { id: 1, username: "onkar", password: "abc123" },
  { id: 2, username: "bhagyashri", password: "xyz123" },
];

// Route to authenticate users and generate a token
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Find the user
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate a JWT
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "1h", // Token expires in 1 hour
  });

  res.json({ token });
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  console.log("tokkk");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("tok", token);

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  // Verify the token
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user; // Add the user payload to the request object
    next();
  });
};

// Protected route
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Welcome to the protected route!", user: req.user });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
