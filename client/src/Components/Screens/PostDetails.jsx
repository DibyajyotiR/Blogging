import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PostDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params.id);
  const postId = params.id;

  const [post, setPost] = useState({});

  const getPostDetails = () => {
    axios
      .get(`http://localhost:5000/api/post/getById/${postId}`)
      .then((response) => {
        setPost(response.data.post);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
      });
  };

  useEffect(() => {
    getPostDetails();
  }, [postId]);

  // console.log(post);

  return (
    <div className="flex justify-center items-center p-5 md:p-10 lg:p-20">
      <div className="bg-[#427A76] p-6 md:p-10 rounded-lg shadow-lg w-2xl">
        <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
        <p className="text-gray-200">{post?.description}</p>
        <div className="flex justify-between mt-4">
          <button
            className="px-3 md:px-5 py-1 md:py-2 bg-blue-600 active:scale-95 transision duration-200 cursor-pointer text-white rounded border-none outline-none"
            onClick={() => navigate(`/edit-post/${postId}`)}
          >
            Edit
          </button>
          <button
            className="px-3 md:px-5 py-1 md:py-2 bg-blue-600 active:scale-95 transision duration-200 cursor-pointer text-white rounded border-none outline-none"
            onClick={() => navigate("/")}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
