import { useEffect, useState } from "react";
import { fetchFunction } from "../fetchFunction";
import { useNavigate } from "react-router-dom";

interface CommentPageProps {
  trigger: boolean;
  setTrigger: Function;
}

const CommentPage: React.FC<CommentPageProps> = ({ trigger, setTrigger }) => {
  const [comments, setComments] = useState([
    { _id: "", name: "", createdAt: new Date(), message: "" },
  ]);
  const fetchComments = async () => {
    try {
      const response = await fetchFunction(
        "http://localhost:3001/comments",
        "GET",
        {}
      );

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

interface CommentProp {
  comment: CommentItem;
}

interface CommentItem {
  name: string;
  message: string;
  createdAt: Date;
  _id: string;
}

const Comment: React.FC<CommentProp> = ({ comment }) => {
  const navigate = useNavigate();
  const formatDate = (createdAt: Date) => {
    const getTimes = (date: Date) => {
      const hour = date.getHours();
      const minute = date.getMinutes();
      const amPm = hour < 12 ? "AM" : "PM";
      const formattedHour = hour % 12 || 12;
      return { minute, amPm, formattedHour };
    };
    const date = new Date(createdAt);
    const now = new Date();
    const differenceInDays =
      Math.abs(now.getTime() - date.getTime()) / (1000 * 3600 * 24);
    if (differenceInDays > 7) {
      const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
      const { formattedHour, minute, amPm } = getTimes(date);
      return `${weekday} at ${formattedHour}:${minute} ${amPm}`;
    } else {
      const month = date.toLocaleDateString("en-US", { month: "long" });
      const day = date.getDate();
      const { formattedHour, minute, amPm } = getTimes(date);
      return `${month} ${day} at ${formattedHour}:${minute} ${amPm}`;
    }
  };

  const handleOnClick = (commentId: string) => {
    navigate(`/comments/${commentId}`);
  };

  return (
    <div
      className="w-9/12 border-black border-2 cursor-pointer"
      onClick={() => handleOnClick(comment._id)}
    >
      <p className="font-semibold">{comment.message}</p>
      <h3>
        {comment.name} at {formatDate(comment.createdAt)}
      </h3>
    </div>
  );
};
