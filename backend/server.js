require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");

// DB connection (pool is initialized on require)
const { pool } = require("./config/db");

// Routes (you'll write these)
// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
// const complaintRoutes = require("./routes/complaintRoutes");
// const notificationRoutes = require("./routes/notificationRoutes");
// const validatorRoutes = require("./routes/validatorRoutes");
// const superAdminRoutes = require("./routes/superAdminRoutes");
const createPatient = require("./routes/patientRoutes");

const app = express();

const trustedOrigins = [
  "http://localhost:3000",
  "http://localhost:4000",
  "http://localhost:5173",
  "http://localhost:5174",
  "https://super-admin-y8rk.vercel.app",
];


app.use(cors({
  origin: trustedOrigins,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.set("trust proxy", 1);

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes.",
}));

// Routes
// app.use("/auth", authRoutes);
// app.use("/user", userRoutes);
// app.use("/complaints", complaintRoutes);
// app.use("/notifications", notificationRoutes);
// app.use("/admin", validatorRoutes);
// app.use("/superadmin", superAdminRoutes);

(async () => {
  const res = await pool.query("SELECT current_database(), inet_server_addr()");
  console.log("DB check:", res.rows[0]);
})();

app.use("/patients", createPatient);

app.get("/api/data", (req, res) => res.json({ message: "Data from express" }));

// Socket.IO
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: trustedOrigins, credentials: true } });

app.set("io", io);

io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  socket.on("joinRoom", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room ${userId}`);
  });

  socket.on("sendNotification", (data) => {
    if (data?.userId) {
      io.to(data.userId).emit("receiveNotification", data);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
