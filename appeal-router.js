const express = require("express");
const Nike = require("./model");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { nameCros, shoesSize, clientname, phone } = req.body;
    const appeal = new Nike({
      nameCros,
      shoesSize,
      clientname,
      phone,
    });
    await appeal.save();
    res.json({ message: "Успішно створено." });
  } catch (error) {
    console.error("Помилка при створенні:", error);
    res.status(500).json({ error: "Помилка при створенні" });
  }
});

router.get("/shoes", async (req, res) => {
  try {
    const apartments = await Nike.find({});
    res.json(apartments);
  } catch (error) {
    console.error("Error fetching apartments:", error);
    res.status(500).json({ error: "Error fetching apartments" });
  }
});

module.exports = router;
