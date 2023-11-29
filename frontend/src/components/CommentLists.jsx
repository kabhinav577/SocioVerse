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
import { useSelector } from 'react-redux';

const CommentLists = ({ name, comments }) => {
  const [newComment, setNewComment] = useState('');
  const { palette } = useTheme();
  const posts = useSelector((state) => state.posts);
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

  const main = palette.neutral.main;

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = () => {};

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

      <form onSubmit={handleSubmit}>
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
