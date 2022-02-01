import { useState, useEffect } from "react";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../../hooks/use-http";
import { addComment, getAllComments } from "../../lib/api";
import CommentItem from "./CommentItem";

const Comments = (props) => {
  const { quoteId } = props;
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { sendRequest: addCommentRequest, status: addStatus } = useHttp(addComment);
  const {
    sendRequest: fetchCommentsRequest,
    data,
    fetchStatus,
  } = useHttp(getAllComments);k

  useEffect(() => {
    fetchCommentsRequest(quoteId);
  }, [quoteId, fetchCommentsRequest, addStatus]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addCommentHandler = (commentText) => {
    addCommentRequest({
      quoteId,
      commentData: {
        text:commentText
      }
    });
    setIsAddingComment(false);
  };

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onAddComment={addCommentHandler} />}
      {data && data.map((comment) => (
        <CommentItem key={comment.id} text={comment.text} />
      ))}
    </section>
  );
};

export default Comments;
