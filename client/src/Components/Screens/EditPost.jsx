import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const params = useParams();
  const postId = params.id;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const getData = () => {
    axios
      .get(`http://localhost:5000/api/post/getById/${postId}`)
      .then((response) => {
        // console.log(response.data.post);
        setTitle(response.data.post.title);
        setDescription(response.data.post.description);
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedPost = { title, description };
    axios
      .put(`http://localhost:5000/api/post/update/${postId}`, updatedPost)
      .then((response) => {
        console.log("Post updated successfully:", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  };

  useEffect(() => {
    getData();
  }, [postId]);

  return (
    <div className="p-5 md:p-10 lg:p-20 flex justify-center items-center h-[90vh]">
      <form className="bg-[#11224E] p-5 lg:p-8 rounded-lg shadow-lg flex flex-col gap-4 w-xl">
        <h2 className="text-lg md:text-2xl font-bold mb-5 text-white text-center">
          Update Post
        </h2>
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
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          className="px-3 py-1 md:px-4 md:py-2 lg:px-5 bg-green-500 rounded-lg cursor-pointer active:scale-95 transition duration-200 active:bg-green-600 hover:bg-green-400 text-white"
          onClick={handleUpdate}
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
