import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../@/components/ui/form";
import { Input } from "../@/components/ui/input";
import { Button } from "../@/components/ui/button";
import { Textarea } from "../@/components/ui/textarea";
import { fetchFunction } from "../functions";
import { useState } from "react";
import { InputProps, CommentFormProps } from "../interfaces";

const NameInput: React.FC<InputProps> = ({
  dataValue,
  updateValueFunction,
}) => {
  return (
    <div className="w-full">
      <Input
        placeholder="Name"
        value={dataValue}
        onChange={(e) => {
          updateValueFunction(e.target.value);
        }}
      />
    </div>
  );
};

const CommentInput: React.FC<InputProps> = ({
  dataValue,
  updateValueFunction,
}) => {
  const form = useForm();

  return (
    <Form {...form}>
      <form className="w-full h-96 space-y-8">
        <FormField
          control={form.control}
          name="message"
          render={() => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="h-96"
                  placeholder="insert message"
                  value={dataValue}
                  onChange={(e) => updateValueFunction(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

const CommentForm: React.FC<CommentFormProps> = ({ setTrigger }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const submitComment = () => {
    const body = { name, message: comment };
    fetchFunction("comments", "POST", body);
    setComment("");
    setTrigger(true);
  };
  return (
    <div className="flex flex-col gap-y-2.5 w-6/12 items-center">
      <NameInput dataValue={name} updateValueFunction={setName} />
      <CommentInput dataValue={comment} updateValueFunction={setComment} />
      <Button
        className="w-2/4 bg-white text-black shadow-md border-2 border-black hover:bg-black hover:text-white"
        type="submit"
        onClick={() => submitComment()}
      >
        Comment
      </Button>
    </div>
  );
};

export { CommentForm };
