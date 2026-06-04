import api from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { id: postId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");

  const titleLimit = 50;
  const descLimit = 3000;

  useEffect(() => {
    api
      .get(`/post/getById/${postId}`)
      .then((res) => {
        const post = res.data.post;
        setTitle(post.title);
        setDescription(post.description);
        setOriginalTitle(post.title);
      })
      .catch(() =>
        setError("Could not load post. Please go back and try again.")
      )
      .finally(() => setLoading(false));
  }, [postId]);

  const handleUpdate = () => {
    if (!title.trim() || !description.trim()) {
      setError("Both title and description are required.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    api
      .put(`/post/update/${postId}`, { title, description })
      .then(() => {
        setSuccess("Post updated successfully!");
        setOriginalTitle(title);
        setTimeout(() => navigate("/"), 1200);
      })
      .catch(() =>
        setError("Failed to update post. Please try again.")
      )
      .finally(() => setSaving(false));
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      setDeleting(true);

      await api.delete(`/post/delete/${postId}`);

      alert("Post deleted successfully!");
      navigate("/");
    } catch (err) {
      setError("Failed to delete post. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-100 px-4 py-10 md:px-10 lg:px-20 flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="h-5 w-28 bg-stone-200 rounded-full animate-pulse mb-8" />
          <div className="h-8 w-56 bg-stone-200 rounded-xl animate-pulse mb-2" />
          <div className="h-4 w-40 bg-stone-200 rounded-full animate-pulse mb-8" />
          <div className="bg-white border border-stone-200 rounded-2xl p-8 flex flex-col gap-6">
            <div className="h-12 bg-stone-100 rounded-xl animate-pulse" />
            <div className="h-48 bg-stone-100 rounded-xl animate-pulse" />
            <div className="h-10 w-32 bg-stone-100 rounded-xl animate-pulse self-end" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 px-4 py-10 pb-20 md:px-10 lg:px-20 flex justify-center">
      <div className="w-full max-w-2xl">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition mb-5 cursor-pointer"
        >
          ← Back to Home
        </button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
              Edit Post
            </h1>
            <span className="text-xs font-medium bg-amber-50 text-amber-600 border border-amber-100 px-3 py-1 rounded-full">
              Draft
            </span>
          </div>

          <p className="text-sm text-slate-500">
            Editing:{" "}
            <span className="font-medium text-slate-600">
              {originalTitle}
            </span>
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
          {success && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3">
              <span>✅</span>
              <span>{success} Redirecting…</span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

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
              maxLength={titleLimit}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
            />
          </div>

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

          <div className="flex items-center justify-between pt-2 border-t border-stone-100">
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/")}
                className="text-sm text-slate-400 hover:text-slate-600 border border-stone-200 hover:border-stone-300 px-5 py-2.5 rounded-xl transition cursor-pointer"
              >
                Discard
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition cursor-pointer"
              >
                {deleting ? "Deleting..." : "Delete Post"}
              </button>
            </div>

            <button
              onClick={handleUpdate}
              disabled={saving || !title.trim() || !description.trim()}
              className="bg-green-700 hover:bg-green-800 disabled:bg-green-300 disabled:cursor-not-allowed text-white text-sm font-medium px-6 py-2.5 rounded-xl transition active:scale-95 cursor-pointer flex items-center gap-2 min-w-[148px] justify-center"
            >
              {saving ? "Saving..." : "Save Changes →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;