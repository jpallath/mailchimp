import { useEffect, useState } from "react";
import { fetchFunction } from "../fetchFunction";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../@/components/ui/button";

export const SingleComment: React.FC = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [comment, setComment] = useState({
    name: "",
    message: "",
    createdAt: "",
  });
  const getComment = async () => {
    const comment = await fetchFunction(
      `http://localhost:3001/comments/${id}`,
      "GET",
      {}
    ).then((res) => {
      if (res) {
        return res.json();
      } else {
        return null;
      }
    });
    setComment(comment[0]);
  };
  useEffect(() => {
    getComment();
  });
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col gap-y-2">
      <Button onClick={() => handleClick()}>View all comments</Button>
      <div className="border-black border-2 p-6">
        <h3>{comment.name} said:</h3>
        <p className="font-bold">{comment.message}</p>
        <p>{comment.createdAt}</p>
      </div>
    </div>
  );
};
