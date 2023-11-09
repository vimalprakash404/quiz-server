const express = require("express")
const router = express.Router();
const quiz = require("./quiz")

router.use("/quiz",quiz);
router.post("/", (req, res) => {
    return res.status(400).send({message : "saample"})
});



module.exports = router;

  
module.exports = router ; 