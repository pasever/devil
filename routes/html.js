userController = require("../controllers/userController.js"),
       session = require("express-session"),
        router = express.Router(),
           api = require("./api"),
            db = require("../models");


//home page
router.get(
  "/", (req, res, next) => {
    
  const namVal = req.session.user ? req.session.user.firstName : "";

  res.render("index", { title: "Home", name: namVal });

});

// Detailers page
router.get(
  "/detail", (req, res, next) => {
  res.render("detail", { message: "Detail" });
});

// Booking Page

router.get(
  "/booking", (req, res) => {
  
    const id = req.session.user._id;
    const query = db.User.findById({ _id: id });
  
    query.exec((err, data) => {
    const current = data.booking[0];

    res.render("booking", { booking: current });
  });

});

// GET Login
router.get("/myaccount", (req, res, next) => {

  const namVal = req.session.user ? req.session.user.firstName : "";

  res.render('myaccount');
});

// API routes
router.use("/api", api);

module.exports = router;
