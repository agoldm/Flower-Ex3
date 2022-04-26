var express = require('express');
var router = express.Router();
const checkUser = require("../middlewares/checkUser")

const { getAllUsers, addUser, deleteUser, updateUser } = require("../controllers/users")

//get all users
router.get("/", async (req, res) => {
  res.json(await getAllUsers())
})

//add user
router.post("/", async (req, res) => {
  res.json(await addUser(req.body))
})
 
//update user
router.put("/:id", async (req, res) => {
  res.json(await updateUser(req.params.id, req.body))
})

//delete user
router.delete("/:id", async (req, res) => {
  res.json(await deleteUser(req.params.id))
})
module.exports = router;
