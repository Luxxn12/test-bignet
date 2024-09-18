import { AppDispatch } from "@/app/store";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createItems } from "./postSlice";
import { Button, TextField } from "@mui/material";

export default function PostAdd() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      createItems({
        id: Date.now(),
        title,
        body,
      })
    );
    setBody("");
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="standard-basic"
        label="Title"
        variant="standard"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        id="standard-basic"
        label="Body"
        variant="standard"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
}
