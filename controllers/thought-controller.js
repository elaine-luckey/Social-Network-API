const { User, Thought } = require("../models");

module.exports = {
  // GET thought
  getThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // GET thought by ID
  getSingleThought: async (req, res) => {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      console.log(thought);

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought was found with the provided ID." });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // CREATE new thought
  createThought: async (req, res) => {
    try {
      // Thoughts are not unique, so must use $push instead of $addToSet
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "A thought was created, but no user was found with the provided ID.",
        });
      }

      res.status(201).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // UPDATE thought by ID
  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought was found with the provided ID." });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // DELETE thought by ID
  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought was found with the provided ID." });
      }

      res.status(200).json({ message: "The thought successfully deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // ADD new reaction to thought's reaction array
  addReaction: async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { runValiators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought was found with the provided ID." });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // REMOVE reaction by ID
  removeReaction: async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought was found with the provided ID." });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};