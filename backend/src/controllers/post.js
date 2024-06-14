import { io } from "../app.js";
import noti from "../models/noti.js";
import Post from "../models/Post.js";

const postController = {
  createPost: async (req, res) => {
    try {
      const data = req.body;
      const newPost = await Post.create({
        comments: [],
        content: data.content,
        title: data.title,
        tym: [],
        user: data.user,
      });
      io.emit("reload", { id: 1 });
      return res.status(201).json({
        data: newPost,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  removePost: async (req, res) => {
    try {
      const { id } = req.params;
      await Post.findByIdAndDelete(id);
      io.emit("reload", { id: 1 });
      return res.status(200).json({
        data: "ok",
        message: "removed post",
      });



    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  editPost: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      // console.log(data);
      const dataPost = await Post.findById(id);
      if (!dataPost) {
        return res.status(404).json({ message: "not found" });
      }
      // console.log(dataPost);
      dataPost.content = data.content;
      dataPost.title = data.title;
      io.emit("reload", { id: 1 });

      await dataPost.save();
      return res.status(200).json(dataPost);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getAllPosts: async (req, res) => {
    try {
      const data = await Post.find({}).populate("user");
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getAllPostsForUser: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Post.find({ user: id }).populate("user");
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getIdPost: async (req, res) => {
    try {
      const data = await Post.findById(req.params.id).populate("user");
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  tymPost: async (req, res) => {
    try {
      const { id } = req.params;
      const { idUser } = req.body;
      const dataPost = await Post.findById(id).populate("user");
      const data = await Post.findByIdAndUpdate(
        id,
        {
          $push: {
            tym: idUser,
          },
        },
        {
          new: true,
        }
      );
      io.emit("reload", { id: 1 });
      await noti.create({
        user: idUser,
        postId: id,
        postUser: dataPost.user._id,
        dataNoti: dataPost.user.name + " đã tym bài post của bạn",
      });
      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  removeTymPost: async (req, res) => {
    try {
      const { id } = req.params;
      const { idUser } = req.body;
      const data = await Post.findByIdAndUpdate(
        id,
        {
          $pull: {
            tym: idUser,
          },
        },
        {
          new: true,
        }
      );
      io.emit("reload", { id: 1 });

      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  commentPost: async (req, res) => {
    try {
      const { id } = req.params;
      const dataPost = await Post.findById(id).populate("user");
      const dataComment = req.body;
      // console.log(dataComment);
      // console.log(dataComment.idUser);

      // const data = await Post.findByIdAndUpdate(
      //   id,
      //   {
      //     $push: {
      //       comments: dataComment.dataComment,
      //       idUSer: dataComment.idUSer,
      //       nameUser: dataComment.nameUser,
      //     },
      //   },
      //   {
      //     new: true,
      //   }
      // );
      dataPost.comments.push({
        comments: dataComment.dataComment,
        idUser: dataComment.idUser,
        nameUser: dataComment.nameUser,
      });
      await dataPost.save();
      io.emit("reload", { id: 1 });
      await noti.create({
        user: dataComment.idUser,
        postId: id,
        postUser: dataPost.user._id,
        dataNoti: dataPost.user.name + " đã bình luận bài post của bạn",
      });
      return res.status(201).json(dataPost);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async getMaxLike(req, res) {
    const dataPost = await Post.find({ tym: { $exists: true } }).sort({ tym: -1 }).limit(1);
    return res.status(201).json(dataPost);
  },
  async updatePost(req, res, next) {
    try {
      const { id } = req.params;
      await Post.updateOne({ _id: id }, {
        comments: req.body.comments
      });
      return res.status(200).json({
        message: "successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  removeCommentPost: async (req, res) => {
    try {
      const { id } = req.params;
      const { indexPost } = req.query;
      const data = await Post.findById(id);
      data.comments.splice(indexPost);
      io.emit("reload", { id: 1 });
      await data.save();
      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
export default postController;
