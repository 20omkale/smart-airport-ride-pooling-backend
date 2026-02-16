import app from "./app";
import db from "./utils/database";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Test database connection
    await db.raw("SELECT 1");

    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Startup error:", error);
    process.exit(1);
  }
}

startServer();
