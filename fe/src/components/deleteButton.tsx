import { Button } from "../@/components/ui/button";
import { fetchFunction } from "../fetchFunction";

interface DeleteButtonProp {
  setTrigger: Function;
}

export const DeleteButton: React.FC<DeleteButtonProp> = ({ setTrigger }) => {
  const handleDelete = async () => {
    const response = await fetchFunction(
      "http://localhost:3001/comments",
      "DELETE",
      {}
    );
    if (response) {
      setTrigger(true);
    }
  };
  return (
    <div className="absolute bottom-24 right-24">
      <Button className="bg-red-600" onClick={() => handleDelete()}>
        Delete All Comments
      </Button>
    </div>
  );
};
