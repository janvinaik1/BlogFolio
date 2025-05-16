import { useNavigate } from "react-router-dom";
import { CalendarIcon, EditIcon, TrashIcon } from "lucide-react";

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
    navigate(`/blog/${blog._id}`);
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

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:scale-[1.01] transition-all duration-300 border border-gray-200 dark:border-gray-700 flex flex-col"
    >
      {/* Image or Gradient Banner */}
      <div className="h-40 w-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>

      <div className="p-5 flex flex-col flex-grow">
        {/* Blog Title */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {blog.title}
        </h2>

        {/* Author & Date */}
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
          <CalendarIcon size={14} />
          <span>
            {blog.updatedAt && blog.updatedAt !== blog.createdAt
              ? `Updated: ${formatDate(blog.updatedAt)}`
              : `Created: ${formatDate(blog.createdAt)}`}
          </span>
        </div>

        {/* Content Preview */}
        <p className="text-gray-700 dark:text-gray-300 text-base mb-4 line-clamp-3 flex-grow">
          {blog.content}
        </p>

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-medium bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-gray-100 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            by <span className="font-medium">{blog.author?.username || "Unknown"}</span>
          </div>

          {isAuthor && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleEdit}
                className="p-2 rounded-full bg-yellow-50 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 hover:bg-yellow-100 dark:hover:bg-yellow-800 transition"
                aria-label="Edit"
              >
                <EditIcon size={16} />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 rounded-full bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-800 transition"
                aria-label="Delete"
              >
                <TrashIcon size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
