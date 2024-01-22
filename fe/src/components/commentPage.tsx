import { useEffect, useState } from "react";
import { fetchFunction, formatDate } from "../functions";
import { useNavigate } from "react-router-dom";
import { CommentItem, CommentPageProps, CommentProp } from "../interfaces";

const Comment: React.FC<CommentProp> = ({ comment }) => {
  const navigate = useNavigate();
  const handleOnClick = (commentId: string) => {
    navigate(`/comments/${commentId}`);
  };

  return (
    <div
      className="w-9/12 p-8 border-black border-2 cursor-pointer"
      onClick={() => handleOnClick(comment._id)}
    >
      <p className="font-semibold">{comment.message}</p>
      <h3>
        {comment.name} at {formatDate(comment.createdAt)}
      </h3>
    </div>
  );
};

const CommentPage: React.FC<CommentPageProps> = ({ trigger, setTrigger }) => {
  const [comments, setComments] = useState([
    { _id: "", name: "", createdAt: new Date(), message: "" },
  ]);
  const fetchComments = async () => {
    try {
      const response = await fetchFunction("comments", "GET", {});
      const comments = (await response?.json()) ?? [];
      setComments(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    fetchComments();
    setTrigger(false);
  }, [trigger]);
  return (
    <div className="w-6/12 border-t-black border-t-4 flex flex-col items-center justify-center gap-y-4 py-4">
      {comments.map((comment) => (
        <Comment comment={comment} key={comment._id} />
      ))}
    </div>
  );
};

export { CommentPage };
