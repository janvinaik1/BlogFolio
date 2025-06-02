const BlogLinkView = ({ blogLink }) => {
  if (!blogLink) return <p>No blog link provided.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Blog</h2>
      <a
        href={blogLink}
        className="text-blue-600 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit Blog
      </a>
    </div>
  );
};

export default BlogLinkView;
