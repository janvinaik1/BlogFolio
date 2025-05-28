import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import blogService from "../services/blog.services";
import MDEditor from "@uiw/react-md-editor";

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [shareDropdownOpen, setShareDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await blogService.getBlogById(id);
        setBlog(response);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(err.message || "Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleShare = async (platform) => {
    const currentUrl = window.location.href;
    const title = blog?.title || "Check out this article";
    
    switch (platform) {
      case 'copy':
        try {
          await navigator.clipboard.writeText(currentUrl);
          alert('Link copied to clipboard!');
        } catch (err) {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = currentUrl;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + currentUrl)}`, '_blank');
        break;
    }
    setShareDropdownOpen(false);
  };

  const handleReadMoreArticles = () => {
    if (blog?.author?._id) {
      navigate(`/public/home?authorId=${blog.author._id}`);
    } else {
      // Fallback to general home page if author ID is not available
      navigate('/public/home');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your story...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-full transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors group"
          >
            <svg
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Articles
          </button>
        </div>
      </div>
      {/* Main Content */}
      <article className="max-w-4xl mx-auto">

        {/* Article Header */}
        <div className="px-6 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {blog.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center justify-between border-t border-b border-gray-200 py-6">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-gray-600 text-sm">
                    <i>Reading Time:</i> {blog.readTime} mins
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="px-6 pb-12">
          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-lg prose-gray max-w-none markdown-content
                         prose-headings:text-gray-900 prose-headings:font-bold
                         prose-p:text-gray-800 prose-p:leading-relaxed
                         prose-strong:text-gray-900 prose-strong:font-semibold
                         prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700
                         prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
                         prose-pre:bg-gray-100 prose-pre:text-gray-800
                         prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                         prose-ul:text-gray-800 prose-ol:text-gray-800
                         prose-li:text-gray-800 prose-li:leading-relaxed"
              style={{
                fontSize: "18px",
                lineHeight: "1.8",
                color: "#1f2937",
              }}
            >
              <style jsx>{`
                .markdown-content {
                  background: white !important;
                  color: #1f2937 !important;
                }

                /* Override MDEditor styles */
                .markdown-content .w-md-editor-text-pre,
                .markdown-content .w-md-editor-text-input,
                .markdown-content .w-md-editor-text-area,
                .markdown-content .w-md-editor-text,
                .markdown-content .wmde-markdown,
                .markdown-content .wmde-markdown-var {
                  background-color: white !important;
                  color: #1f2937 !important;
                }

                /* Headings */
                .markdown-content h1,
                .markdown-content h2,
                .markdown-content h3,
                .markdown-content h4,
                .markdown-content h5,
                .markdown-content h6 {
                  color: #111827 !important;
                  font-weight: 700 !important;
                  margin-top: 2rem !important;
                  margin-bottom: 1rem !important;
                }

                /* Paragraphs */
                .markdown-content p {
                  color: #374151 !important;
                  line-height: 1.75 !important;
                  margin-bottom: 1.25rem !important;
                }

                /* Links */
                .markdown-content a {
                  color: #2563eb !important;
                  text-decoration: none !important;
                }

                .markdown-content a:hover {
                  text-decoration: underline !important;
                }

                /* Lists */
                .markdown-content ul,
                .markdown-content ol {
                  color: #374151 !important;
                  margin-bottom: 1.25rem !important;
                }

                .markdown-content li {
                  color: #374151 !important;
                  margin-bottom: 0.5rem !important;
                }

                /* Code blocks */
                .markdown-content pre {
                  background-color: #f9fafb !important;
                  color: #374151 !important;
                  border: 1px solid #e5e7eb !important;
                  border-radius: 0.5rem !important;
                  padding: 1rem !important;
                  overflow-x: auto !important;
                  margin-bottom: 1.25rem !important;
                }

                .markdown-content code {
                  background-color: #f3f4f6 !important;
                  color: #374151 !important;
                  padding: 0.125rem 0.25rem !important;
                  border-radius: 0.25rem !important;
                  font-size: 0.875em !important;
                }

                .markdown-content pre code {
                  background-color: transparent !important;
                  padding: 0 !important;
                  border-radius: 0 !important;
                }

                /* Blockquotes */
                .markdown-content blockquote {
                  border-left: 4px solid #d1d5db !important;
                  padding-left: 1rem !important;
                  margin-left: 0 !important;
                  font-style: italic !important;
                  color: #6b7280 !important;
                  background-color: #f9fafb !important;
                  padding: 1rem !important;
                  border-radius: 0.5rem !important;
                  margin-bottom: 1.25rem !important;
                }

                /* Tables */
                .markdown-content table {
                  width: 100% !important;
                  border-collapse: collapse !important;
                  margin-bottom: 1.25rem !important;
                }

                .markdown-content th,
                .markdown-content td {
                  border: 1px solid #e5e7eb !important;
                  padding: 0.75rem !important;
                  text-align: left !important;
                  color: #374151 !important;
                }

                .markdown-content th {
                  background-color: #f9fafb !important;
                  font-weight: 600 !important;
                }

                /* Images */
                .markdown-content img {
                  max-width: 100% !important;
                  height: auto !important;
                  border-radius: 0.5rem !important;
                  margin: 1.25rem 0 !important;
                  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
                }

                /* Horizontal rules */
                .markdown-content hr {
                  border: none !important;
                  height: 1px !important;
                  background-color: #e5e7eb !important;
                  margin: 2rem 0 !important;
                }

                /* Strong/Bold text */
                .markdown-content strong,
                .markdown-content b {
                  color: #111827 !important;
                  font-weight: 600 !important;
                }

                /* Emphasis/Italic text */
                .markdown-content em,
                .markdown-content i {
                  color: #374151 !important;
                  font-style: italic !important;
                }
              `}</style>

              <MDEditor.Markdown
                source={blog.content}
                data-color-mode="light"
              />
            </div>
          </div>
        </div>

        {/* Article Footer */}
        <div className="border-t border-gray-200 px-6 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Share Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
                <div className="relative">
                  <button
                    onClick={() => setShareDropdownOpen(!shareDropdownOpen)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span>Share</span>
                  </button>
                  
                  {shareDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                      <div className="py-2">
                        <button
                          onClick={() => handleShare('copy')}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span>Copy Link</span>
                        </button>
                        <button
                          onClick={() => handleShare('twitter')}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                          <span>Twitter</span>
                        </button>
                        <button
                          onClick={() => handleShare('facebook')}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          <span>Facebook</span>
                        </button>
                        <button
                          onClick={() => handleShare('linkedin')}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          <span>LinkedIn</span>
                        </button>
                        <button
                          onClick={() => handleShare('whatsapp')}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                          </svg>
                          <span>WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Author Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {blog.author?.username?.charAt(0).toUpperCase() || "A"}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Written by {blog.author?.username}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Thank you for reading!
                  </p>
                </div>
              </div>

              <button
                onClick={handleReadMoreArticles}
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                Read More Articles
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetailPage;