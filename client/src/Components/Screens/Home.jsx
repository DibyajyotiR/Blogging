import React, { useEffect, useState, useMemo } from "react";
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const formatDate = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const readTime = (text = "") => {
  const words = text.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const getData = () => {
    setLoading(true);
    api
      .get("/post/get")
      .then((res) => {
        setAllPosts(res?.data?.posts || []);
        setError("");
      })
      .catch(() => setError("Could not load posts. Please try again."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return allPosts.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }, [allPosts, search]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172B] to-white">

      <div className="text-center pt-20 px-4   text-white">
        <p className="inline-flex items-center px-3 bg-[#E1F5EE] text-[#0F6E56] rounded-2xl text-md "><span className="text-[#0F6E56] text-sm mr-1 ">✦</span> A home for your ideas</p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl  font-bold pt-5">Write. Publish. Inspire.</h1>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl  font-bold pt-1">Be remembered.</h1>
        <p className="text-gray-400 text-xs lg:text-sm ">ink.blog is where thoughtful writers share stories that last. Simple to start, powerful to grow.</p>
        <div className="mt-4 flex justify-center gap-5 text-sm sm:text-base">
          <p className="border-1 border-[#656565] px-3 py-1 rounded-lg hover:bg-[#2F2F2D] hover:border-[#656565]">Start writing for free</p>
          <p className="border-1 border-[#656565] px-3 py-1 rounded-lg hover:bg-[#2F2F2D] hover:border-[#656565]">Browse stories</p>
        </div>
      </div>

      <div className="px-4 py-10 pb-20 mb- md:px-10 lg:px-20">

        {/* ── Page Header ── */}
        

        {/* ── Search Bar ── */}
        <div className="relative mb-6 ">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by title or content…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-300 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
          />
        </div>

        {/* ── Error Banner ── */}
        {error && (
          <div className="flex items-center justify-between bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-6">
            <span>{error}</span>
            <button
              onClick={getData}
              className="text-xs border border-red-400 text-red-500 rounded-md px-3 py-1 hover:bg-red-100 transition cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* ── Skeleton Loader ── */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-52 rounded-2xl bg-stone-200 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* ── Empty State ── */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">
              {search ? "No posts match your search" : "No stories yet"}
            </h3>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              {search
                ? "Try a different keyword or clear your search."
                : "Check back soon — new stories are on the way."}
            </p>
          </div>
        )}

        {/* ── Post Grid ── */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((post) => (
              <div
                key={post._id}
                onClick={() => navigate(`/post-details/${post._id}`)}
                className="group bg-white border border-stone-200 rounded-2xl p-5 flex flex-col gap-3 hover:-translate-y-1 hover:shadow-md hover:border-green-300 transition-all duration-200 cursor-pointer relative overflow-hidden"
              >
                {/* green top accent bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                {/* Tag */}
                <span className="text-xs font-medium bg-green-50 text-green-700 px-3 py-1 rounded-full w-fit">
                  Blog
                </span>

                {/* Title */}
                <h2 className="text-lg font-semibold text-slate-800 leading-snug">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed flex-1">
                  {post.description.slice(0, 120)}
                  {post.description.length > 120 && (
                    <>
                      {"… "}
                      <span className="text-green-700 font-medium">
                        read more
                      </span>
                    </>
                  )}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-100 mt-auto">
                  <span className="text-xs text-slate-400">
                    {formatDate(post.createdAt)}
                  </span>
                  <span className="text-xs text-slate-300">
                    {readTime(post.description)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;