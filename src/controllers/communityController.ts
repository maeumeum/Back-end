import { Request, Response } from "express";
import { CommunityService } from "../services/communityService.js";

export class CommunityController {
  public communityService = new CommunityService();

  public createPost = async (req: Request, res: Response) => {
    try {
      const { title, content, postType, images, user_id } = req.body;
      console.log(req.body);
      // const newPost = await PostModel.create(req.body);
      const newPost = await this.communityService.createPost({
        title,
        content,
        postType,
        images,
        user_id,
      });
      res.send(newPost);
    } catch (err) {
      res.status(400).send(err);
    }
  };

  public getAllPosts = async (req: Request, res: Response) => {
    try {
      const posts = await this.communityService.findAllPost();
      // const posts = await PostModel.find();
      res.send(posts);
    } catch (err) {
      res.status(400).send(err);
    }
  };

  public searchPost = async (req: Request, res: Response) => {
    const { keyword } = req.query;
    try {
      const posts = await this.communityService.searchPost(keyword as string);
      res.send(posts);
    } catch (err) {
      res.status(400).send(err);
    }
  };

  public getPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    // const comment = await PostCommentModel.find({ post_id: id });
    const comment = await this.communityService.findByPostIdComment(id);
    // const post = await PostModel.findOne({ _id: id });
    const post = await this.communityService.indByPostIdPost(id);
    res.send({ post, comment });
  };

  public patchPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content, images, postType } = req.body;
    try {
      const Posts = await this.communityService.findOneAndUpdate(id, {
        title,
        content,
        images,
        postType,
      });
      res.send(Posts);
    } catch {
      res.status(400).send({ message: "오류 발생" });
    }
  };

  public deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      // await PostModel.deleteOne({ _id: id });
      await this.communityService.delete(id);
      res.send({
        message: "삭제가 완료되었습니다.",
      });
    } catch {
      res.status(400).send({ message: "오류 발생" });
    }
  };

  public getUserPosts = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const userPosts = await this.communityService.getUserPosts(id);
      res.status(200).send(userPosts);
    } catch {
      res.status(404).send({ message: "오류 발생" });
    }
  };
}