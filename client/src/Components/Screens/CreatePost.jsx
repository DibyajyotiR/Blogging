import React, { useState } from "react";
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      setError("Both title and description are required.");
      setSuccess("");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    api
      .post("/post/create", { title, description })
      .then(() => {
        setSuccess("Post published successfully!");
        setTitle("");
        setDescription("");
        setTimeout(() => navigate("/"), 1200);
      })
      .catch(() => {
        setError("Failed to create post. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  const titleLimit = 100;
  const descLimit = 1000;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#141413] to-[#0F172B] px-4 py-10 pb-20 md:px-10 lg:px-20 flex justify-center">
      <div className="w-full max-w-2xl">

        {/* ── Page Header ── */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition mb-5 cursor-pointer"
          >
            ← Back to Home
          </button>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Write a new post
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Share your ideas, learnings, and stories
          </p>
        </div>

        {/* ── Tip Banner ── */}
        <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3 mb-6 flex gap-3 items-start">
          <span className="text-lg mt-0.5">💡</span>
          <p className="text-sm text-green-800 leading-relaxed">
            <span className="font-medium">Writing tip:</span> A clear, specific
            title gets more clicks. Aim for 50–70 characters and lead with the
            most interesting part.
          </p>
        </div>

        {/* ── Form Card ── */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 flex flex-col gap-6">

          {/* Success */}
          {success && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3">
              <span>✅</span>
              <span>{success} Redirecting…</span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Title Field */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                Post Title
              </label>
              <span
                className={`text-xs ${
                  title.length > titleLimit * 0.9
                    ? "text-red-400"
                    : "text-slate-300"
                }`}
              >
                {title.length}/{titleLimit}
              </span>
            </div>
            <input
              type="text"
              placeholder="e.g. How I Built My First Full-Stack App"
              maxLength={titleLimit}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
            />
          </div>

          {/* Description Field */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                Content
              </label>
              <span
                className={`text-xs ${
                  description.length > descLimit * 0.9
                    ? "text-red-400"
                    : "text-slate-300"
                }`}
              >
                {description.length}/{descLimit}
              </span>
            </div>
            <textarea
              placeholder="Tell your story… What did you learn? What problem did you solve?"
              maxLength={descLimit}
              rows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition resize-none leading-relaxed"
            />
            <p className="text-xs text-slate-300 text-right">
              {description.trim() === ""
                ? "0 words"
                : `${description.trim().split(/\s+/).length} words`}
            </p>
          </div>

          {/* ── Actions ── */}
          <div className="flex items-center justify-between pt-2 border-t border-stone-100">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-slate-400 hover:text-slate-600 border border-stone-200 hover:border-stone-300 px-5 py-2.5 rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading || !title.trim() || !description.trim()}
              className="bg-green-700 hover:bg-green-800 disabled:bg-green-300 disabled:cursor-not-allowed text-white text-sm font-medium px-6 py-2.5 rounded-xl transition active:scale-95 cursor-pointer flex items-center gap-2 min-w-[140px] justify-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Publishing…
                </>
              ) : (
                "Publish Post →"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;