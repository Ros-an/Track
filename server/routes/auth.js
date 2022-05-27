import express from "express";

const router = express.Router();

router.get("/register", (req, res) => {
    res.send("This is register end point");
});

module.exports = router;