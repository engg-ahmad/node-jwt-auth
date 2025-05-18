import { Request, Response } from 'express';

import Post from '../models/post';

async function createPost(req: Request, res: Response): Promise<any> {
  try {
    const { user, body } = req;
    if (!user || !user.id) {
      return res.status(401).json({ message: 'Unauthorized: user not found' });
    }

    const { title, content } = body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Email, title, and content are required' });
    }

    const post = await Post.create({ user_id: user.id, title, content });
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function updatePost(req: Request, res: Response): Promise<any> {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const post = await Post.update(id, { title, content });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function deletePost(req: Request, res: Response): Promise<any> {
  try {
    const { id } = req.params;
    const post = await Post.deleteOne(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getPosts(req: Request, res: Response): Promise<any> {
  try {
    const { user } = req;
    if (!user || !user.id) {
      return res.status(401).json({ message: 'Unauthorized: user not found' });
    }
    const posts = await Post.find(user.id);
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export default {
  createPost,
  updatePost,
  deletePost,
  getPosts
}