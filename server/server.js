import express from "express";

const app = express();

app.use("/", (req, res) => {
  console.log("API is working");
});

app.listen(5000 || process.env.PORT);
