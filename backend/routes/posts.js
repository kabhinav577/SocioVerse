import express from 'express';
import {
  commentPost,
  getFeedPosts,
  getUserPosts,
  likePost,
  getOnePost,
} from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);
// Get a single post by ID
router.get('/:postId', verifyToken, getOnePost);

/* POSt */
router.post('/:id/comments', verifyToken, commentPost);

/* UPDATE */
router.patch('/:id/like', verifyToken, likePost);

export default router;
