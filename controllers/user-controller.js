const { User, Thought } = require("../models");

module.exports = {
  // GET users
  getMultipleUsers: async (req, res) => {
    try {
      const users = await User.find().select("-__v");
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // GET user by ID
  getSingleUser: async (req, res) => {
    try {
      // populate thoughts & friends array, when retrieving single user data.
      const user = await User.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends")
        .select("-__v");

      if (!user) {
        return res.status(404).json({ message: "No User found with ID." });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // CREATE new user
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);

      // Send HTTP status 201 that the user was created
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // UPDATE user by ID
  updateUser: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user was found with this ID." });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // DELETE user by ID
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;

      const user = await User.findOne({ _id: userId });

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user was found with this ID." });
      }

      // Remove a user's associated thoughts when deleting a user
      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      await User.deleteOne({ _id: userId });

      res.status(200).json({ message: "The User has been successfully deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // ADD new friend to the user's friend list
  addFriend: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user was found with this ID." });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // REMOVE friend from user's friend list
  removeFriend: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user was found with this ID." });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};