import { useState } from 'react';
import PropTypes from 'prop-types';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useAuth, usePosts } from '../hooks';
import { createComment, toggleLike } from '../api';
import styles from '../styles/home.module.css';
import Comment from './Comment';
const Post = ({ post }) => {
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();
  const auth=useAuth();
  const handleAddComment = async (e) => {
    if (e.key === 'Enter') {
        console.log("comment:",auth);
        if(!auth.user)
        {
            toast.error('Login to comment!', {
                position: 'top-left',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
              });
              return;
        }
      setCreatingComment(true);

      const response = await createComment(comment, post._id);

      if (response.success) {
        setComment('');
        posts.addComment(response.data.comment, post._id);
        toast.success('Comment created successfully!', {
          position: 'top-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      } else {
        toast.error(response.message, {
          position: 'top-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
    }

    setCreatingComment(false);
  };
  const handlePostLikeClick=async()=>{
    if(!auth.user)
        {
            toast.error('Login to like!', {
                position: 'top-left',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
              });
              return;
        }
    const response=await toggleLike(post._id,'Post');
    if (response.success) {
        if(response.data.deleted)
        {
            toast.success('Like removed successfully!', {
          position: 'top-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        }
        else{
            toast.success('Like added successfully!', {
                position: 'top-left',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
              });
        }
        
      } else {
        toast.error(response.message, {
          position: 'top-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
  }
  return (

      <div className={styles.postWrapper} key={post._id}>
        <div className={styles.postHeader}>
          <div className={styles.postAvatar}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/9131/9131478.png"
              alt="user-pic"
            />
            <div>
              <Link
                to={{
                  pathname: `/user/${post.user._id}`,
                  state: {
                    user: post.user,
                  },
                }}
                className={styles.postAuthor}
              >
                {post.user.name}
              </Link>
              <span className={styles.postTime}>a minute ago</span>
            </div>
          </div>
          <div className={styles.postContent}>{post.content}</div>

          <div className={styles.postActions}>
            <div className={styles.postLike}>
                <button onClick={handlePostLikeClick} className={styles.like} >
              <img
                src="https://cdn-icons-png.flaticon.com/512/889/889140.png"
                alt="likes-icon"
              />
              </button>
              <span>{post.likes.length}</span>
            </div>

            <div className={styles.postCommentsIcon}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/5910/5910103.png"
                alt="comments-icon"
              />
              <span>{post.comments.length}</span>
            </div>
          </div>
          <div className={styles.postCommentBox}>
            <input
              placeholder="Start typing a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={handleAddComment}
            />
          </div>

          <div className={styles.postCommentsList}>
            {post.comments.map((comment) => (
              <Comment comment={comment} key={`post-comment-${comment._id}`} />
            ))}
          </div>
        </div>
      </div>
      

  );
};

Post.propTypes = {
  posts: PropTypes.object.isRequired,
};

export default Post;
