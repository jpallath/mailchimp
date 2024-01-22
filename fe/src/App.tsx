import { useState } from "react";
import { CommentForm } from "./components/commentForm";
import { CommentPage } from "./components/commentPage";
import { SingleComment } from "./components/singleComment";
import { DeleteButton } from "./components/deleteButton";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [trigger, setTrigger] = useState(false);
  return (
    <div className="App h-screen flex items-center justify-center flex-col gap-y-10 relative">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CommentForm setTrigger={setTrigger} />
                <CommentPage trigger={trigger} setTrigger={setTrigger} />
                <DeleteButton setTrigger={setTrigger} />
              </>
            }
          />
          <Route path="/comments/:id" element={<SingleComment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
