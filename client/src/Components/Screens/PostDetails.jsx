import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const formatDate = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const readTime = (text = "") => {
  const words = text.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

const PostDetails = () => {
  const { id: postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    axios
      .get(`https://blogg-qqfa.onrender.com/api/post/getById/${postId}`)
      .then((res) => setPost(res.data.post))
      .catch(() => setError("Could not load this post."))
      .finally(() => setLoading(false));
  }, [postId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Loading skeleton ──
  if (loading) {
    return (
      <div className="min-h-screen bg-stone-100 px-4 py-10 md:px-10 lg:px-20 flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="h-5 w-28 bg-stone-200 rounded-full animate-pulse mb-8" />
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
            <div className="h-44 bg-stone-200 animate-pulse" />
            <div className="p-8 flex flex-col gap-4">
              <div className="h-4 w-3/4 bg-stone-100 rounded-full animate-pulse" />
              <div className="h-4 w-full bg-stone-100 rounded-full animate-pulse" />
              <div className="h-4 w-5/6 bg-stone-100 rounded-full animate-pulse" />
              <div className="h-4 w-2/3 bg-stone-100 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Error state ──
  if (error) {
    return (
      <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center gap-4 px-4">
        <div className="text-4xl">😕</div>
        <h2 className="text-xl font-semibold text-slate-700">Post not found</h2>
        <p className="text-sm text-slate-400">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-2 bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition cursor-pointer"
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 px-4 py-10 pb-20 md:px-10 lg:px-20 flex justify-center">
      <div className="w-full max-w-2xl">

        {/* ── Back button ── */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition mb-6 cursor-pointer"
        >
          ← Back to Home
        </button>

        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">

          {/* ── Hero Banner ── */}
          <div className="bg-gradient-to-br from-slate-800 to-green-900 px-8 py-10">
            <span className="text-xs font-medium bg-white/15 text-white/90 px-3 py-1 rounded-full inline-block mb-4">
              Blog
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-4">
              {post?.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/60">
              {post?.createdAt && (
                <span>📅 {formatDate(post.createdAt)}</span>
              )}
              <span>⏱ {readTime(post?.description)}</span>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="px-8 py-8">
            <p className="text-sm md:text-base text-slate-600 leading-relaxed whitespace-pre-line">
              {post?.description}
            </p>
          </div>

          {/* ── Footer Actions ── */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-8 py-5 border-t border-stone-100">
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/edit-post/${postId}`)}
                className="bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition active:scale-95 cursor-pointer"
              >
                ✏️ Edit Post
              </button>
              <button
                onClick={() => navigate("/")}
                className="text-sm text-slate-500 hover:text-slate-700 border border-stone-200 hover:border-stone-300 px-5 py-2.5 rounded-xl transition cursor-pointer"
              >
                ← Home
              </button>
            </div>

            {/* Copy link */}
            <button
              onClick={handleCopy}
              className={`text-xs font-medium px-4 py-2 rounded-xl border transition cursor-pointer flex items-center gap-1.5 ${
                copied
                  ? "bg-green-50 border-green-200 text-green-600"
                  : "bg-stone-50 border-stone-200 text-slate-400 hover:text-slate-600"
              }`}
            >
              {copied ? "✅ Link copied!" : "🔗 Copy link"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;