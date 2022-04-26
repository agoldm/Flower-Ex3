var express = require('express');
var router = express.Router();
const checkUser = require("../middlewares/checkUser")
const path = require('path');

const { login, register } = require("../controllers/users")

// all pages
router.get("/home", (req, res) => {
  res.sendFile("views/home.html", { root: __dirname });
})
router.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'about.html'));
})
router.get("/catalog2", checkUser, (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'catalog2.html'));
})
router.get("/manage_users", checkUser, (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'manage_users.html'));
})
router.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'contact.html'));
})
router.get("/addFlower", checkUser, (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'addFlower.html'));
})

router.post("/login", async (req, res) => {


  let username = req.body.username;
  let password = req.body.password;

  let data = await login(username, password)

  if (data.success) return res.json({ login: true, type: data.data.category, username: username });


  res.json({ login: false });

})


router.post("/register", async (req, res) => {

  let data = await register(req.body);

  if (data.success) return res.json({ login: true});

  res.json({ login: false });

})


router.post("/change-password", async (req, res) => {
})
module.exports = router;
