import { useState } from 'react';
import { Send, SendOutlined } from '@mui/icons-material';
import {
  Box,
  Divider,
  Typography,
  useTheme,
  InputBase,
  useMediaQuery,
} from '@mui/material';
import { setPost } from 'state';
import { useSelector, useDispatch } from 'react-redux';

const CommentLists = ({ name, comments, postId }) => {
  const [newComment, setNewComment] = useState('');
  const { palette } = useTheme();
  // const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const dispatch = useDispatch();

  const main = palette.neutral.main;

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e, postId, comment) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${postId}/comments`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ comment }),
        }
      );

      if (response.ok) {
        // Fetch the updated post data after adding the comment
        const updatedResponse = await fetch(
          `http://localhost:3001/posts/${postId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (updatedResponse.ok) {
          const updatedPost = await updatedResponse.json();

          // Dispatch the setPost action to update the Redux state with the modified post
          setNewComment('');
          dispatch(setPost({ post: updatedPost }));
        } else {
          console.error('Failed to fetch updated post data');
        }
      } else {
        // Handle error
        console.error('Failed to submit comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <Box mt="0.5rem">
      <Typography
        sx={{
          color: main,
          textAlign: 'center',
          m: '1rem 0',
          fontWeight: 700,
        }}
      >
        Comments
      </Typography>
      {comments.map((comment, i) => (
        <Box key={`${name}-${i}`}>
          <Divider />
          <Typography
            sx={{
              color: main,
              m: '0.5rem 0',
              pl: '0.5rem',
            }}
          >
            {comment}
          </Typography>
        </Box>
      ))}

      <form onSubmit={(e) => handleCommentSubmit(e, postId, newComment)}>
        <Box
          mt="0.5rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
        >
          <InputBase
            type="text"
            label="Add your comment"
            variant="filled"
            value={newComment}
            onChange={handleInputChange}
            sx={{
              width: '100%',
              borderRadius: '2.5rem',
              pl: '1.2rem',
              height: isNonMobileScreens ? '3rem' : '',
              backgroundColor: palette.neutral.light,
            }}
          />
          <button
            disabled={!newComment}
            type="submit"
            style={{
              width: '10%',
              position: 'absolute',
              right: isNonMobileScreens ? '0rem' : '0.5rem',
              background: 'transparent',
              padding: '0.2rem',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            {newComment ? <Send /> : <SendOutlined />}
          </button>
        </Box>
      </form>
    </Box>
  );
};

export default CommentLists;
