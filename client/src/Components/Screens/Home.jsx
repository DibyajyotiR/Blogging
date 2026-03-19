import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const getData = () => {
    axios
      .get("http://localhost:5000/api/post/get")
      .then((res) => {
        setAllPosts(res?.data?.posts);
        // console.log(res.data.posts);
        setMessage("");
      })
      .catch(() => {
        // console.log(err);
        setMessage("Error retrieving data");
        setAllPosts([]);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (postId) => {
    axios
      .delete(`http://localhost:5000/api/post/delete/${postId}`)
      .then((res) => {
        console.log("Post deleted successfully:", res.data);
        // Refresh the list of posts after deletion
        getData();
      })
      .catch((err) => {
        console.error("Error deleting post:", err);
      });
  };

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 p-5 md:p-10 lg:p-20">
      {message && <p className="text-red-500">{message}</p>}
      {/* Blog post cards will go here */}
      {allPosts.map((post) => (
        <div
          className="relative bg-[#D6F4ED] p-4 lg:p-6 rounded-lg shadow-md h-52 md:h-64 lg:h-92 xl:h-72"
          key={post._id}
        >
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-4">
            {post.title}
          </h2>
          <p className="text-gray-700 mb-2 text-sm md:text-base">
            {post.description.slice(0, 150)}{" "}
            {post.description.length > 150 && (
              <span
                className="text-blue-800 underline cursor-pointer"
                onClick={() => navigate(`/post-details/${post._id}`)}
              >
                ...read more
              </span>
            )}
          </p>

          <div className="flex justify-between absolute bottom-3 w-[90%] mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
              onClick={() => navigate(`/edit-post/${post._id}`)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
              onClick={() => handleDelete(post._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
