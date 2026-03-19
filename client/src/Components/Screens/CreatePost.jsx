import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [successful, setSuccessful] = useState("");
  const [failed, setFailed] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      setFailed("Title and Description are required.");
      setSuccessful("");
      return;
    }

    const newPost = {
      title,
      description,
    };
    // console.log("New Post Created:", newPost);

    axios
      .post("http://localhost:5000/api/post/create", newPost)
      .then((response) => {
        console.log("Post successfully created:", response.data);
        setSuccessful("Post created successfully!");
        setFailed("");
      })
      .catch((error) => {
        console.error("There was an error creating the post!", error);
        setFailed("Failed to create post.");
        setSuccessful("");
      });

    setTitle("");
    setDescription("");
  };

  return (
    <div className="p-5 md:p-10 lg:p-20 flex justify-center items-center h-[90vh]">
      <form className="bg-[#11224E] p-5 lg:p-8 rounded-lg shadow-lg flex flex-col gap-4 w-xl">
        <h2 className="text-lg md:text-2xl font-bold mb-5 text-white text-center">
          Create New Post
        </h2>
        {successful && (
          <p className="text-green-500 mb-4 text-center">{successful}</p>
        )}
        {failed && <p className="text-red-500 mb-4 text-center">{failed}</p>}
        <input
          type="text"
          placeholder="Enter the Blog title"
          className="bg-white p-2 rounded outline-none border-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter the Blog description"
          className="bg-white p-2 rounded outline-none border-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
        ></textarea>
        <button
          className="px-3 py-1 md:px-4 md:py-2 lg:px-5 bg-green-500 rounded-lg cursor-pointer active:scale-95 transition duration-200 active:bg-green-600 hover:bg-green-400 text-white"
          onClick={handleSubmit}
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
