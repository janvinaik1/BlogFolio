import { useNavigate } from "react-router-dom";
import { Calendar, Edit, Trash2, Eye, Clock, User } from "lucide-react";
import { marked } from "marked";
import DOMPurify from "dompurify";

const BlogCard = ({ blog, onDelete, onEdit }) => {
  const navigate = useNavigate();

  let userId = null;
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      userId = user.id;
    }
  } catch (err) {
    console.error("Error parsing user from localStorage:", err);
  }

  const isAuthor = userId === blog.author?._id;

  const handleClick = () => {
    if (userId) {
      navigate(`/blog/${blog._id}`);
    } else {
      navigate(`/public/${blog._id}`);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(blog._id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(blog._id);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const cleanHtml = DOMPurify.sanitize(marked.parse(blog.content || ""), {
    FORBID_TAGS: ["img"],
  });

  return (
    <article
      onClick={handleClick}
      className="group cursor-pointer bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-500 border border-gray-100 dark:border-gray-700 flex flex-col backdrop-blur-sm relative"
    >
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      {/* Image or Gradient Banner */}
      <div className="h-48 sm:h-52 md:h-60 w-full relative overflow-hidden">
        {blog.coverImage ? (
          <img
            src={blog.coverImage}
            alt="Blog cover"
            className="w-full h-full transition-transform duration-700 group-hover:scale-110"
            style={{
              objectFit: "cover",
              objectPosition: "center center",
            }}
            onLoad={(e) => {
              const img = e.target;
              if (img.naturalHeight > img.naturalWidth) {
                img.style.objectPosition = "center top";
              } else {
                img.style.objectPosition = "center center";
              }
            }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.className +=
                " bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700";
            }}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}

        {/* Floating status indicator for authors */}
        {isAuthor && (
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-xs font-medium text-gray-700 dark:text-gray-300">
            <User size={12} />
            Author
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6 flex flex-col flex-grow relative">
        {/* Blog Title */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
          {blog.title}
        </h2>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-violet-500" />
            <span>
              {blog.updatedAt && blog.updatedAt !== blog.createdAt
                ? `Updated ${formatDate(blog.updatedAt)}`
                : formatDate(blog.createdAt)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-emerald-500" />
            <span>{blog.readTime} min read</span>
          </div>

          {isAuthor && (
            <div className="flex items-center gap-1.5 ml-auto">
              <Eye size={14} className="text-blue-500" />
              <span>{blog.viewsCount ?? 0} views</span>
            </div>
          )}
        </div>

        {/* Content Preview */}
        <div
          className="text-gray-600 dark:text-gray-300 text-base mb-6 line-clamp-3 prose dark:prose-invert prose-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />

        {/* Action Buttons */}
        {isAuthor && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 w-full">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-all duration-300 text-sm font-medium hover:shadow-md"
              aria-label="Edit blog post"
            >
              <Edit size={16} />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-all duration-300 text-sm font-medium hover:shadow-md"
              aria-label="Delete blog post"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        )}

        {/* Read More Indicator */}
        <div className="absolute bottom-2 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
