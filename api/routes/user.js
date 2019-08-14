const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// don't need delete / logout
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/signup", (req, res, next) => {
	User.find({ email: req.body.email })
		.exec()
		.then(user => {
			if (user.length >= 1) {
				return res.status(409).json({
					message: "Mail exists"
				});
			} else {
				// only execute this if you don't have an email address for the user
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						return res.status(500).json({
							error: err
						});
					} else {
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							email: req.body.email,
							// should NOT store password in raw database, which is why you need to hash it
							// you can't reverse a hash
							// 10 salting rounds (to ensure it cannot be looked up in dictionary table)
							password: hash
						});
						user.save()
							.then(result => {
								console.log(result);
								res.status(201).json({
									message: "User Created"
								});
							})
							.catch(err => {
								console.log(err);
								res.status(500).json({
									error: err
								});
							});
					}
				});
			}
		});
});

router.delete("/:userId", (req, res, next) => {
	// params is what you encoded in the url
	User.remove({ _id: req.params.userId })
		.exec()
		.then(result => {
			res.status(200).json({
				message: "User deleted"
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});
module.exports = router;
