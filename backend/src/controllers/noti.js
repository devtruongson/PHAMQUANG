import noti from "../models/noti.js";

const Notification = {
  getNotiById: async (req, res) => {
    try {
      const data = await noti
        .findById(req.params.id)
        .populate("user postUser postId");
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  watchedNotifications: async (req, res) => {
    try {
      const data = await noti.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            watched: true,
          },
        },
        {
          new: true,
        }
      );
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getAllNotiByUser: async (req, res) => {
    try {
      const data = await noti.find({ postUser: req.params.id });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
export default Notification;
