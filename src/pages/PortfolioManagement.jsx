import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Edit,
  Trash2,
  X,
  AlertTriangle,
  Eye,
  Mail,
  Briefcase,
  GraduationCap,
  Star,
  FolderOpen,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import portfolioService from "../services/portfolio.services";

export default function PortfolioPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hasPortfolio, setHasPortfolio] = useState(false);
  const [portfolio, setPortfolio] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await portfolioService.getPortfolio(id);
        setHasPortfolio(result.hasPortfolio);
        setPortfolio(result.portfolio);
      } catch (err) {
        setError("Failed to load portfolio. Please try again.");
        console.error("Error fetching portfolio:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPortfolio();
    }
  }, [id]);

  const handleDeleteClick = () => setShowDeleteConfirm(true);
  const handleCancelDelete = () => setShowDeleteConfirm(false);

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);
      await portfolioService.deletePortfolio(id);
      setHasPortfolio(false);
      setPortfolio(null);
      setShowDeleteConfirm(false);
      navigate("/"); // Redirect after delete
    } catch (err) {
      setError("Failed to delete portfolio. Please try again.");
      console.error("Error deleting portfolio:", err);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-blue-500/30 border-t-blue-500 mx-auto mb-4 sm:mb-6"></div>
            <div className="absolute inset-0 rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-purple-500/20 border-r-purple-500 animate-spin-reverse mx-auto"></div>
          </div>
          <p className="text-gray-300 text-base sm:text-lg font-medium">
            Loading portfolio...
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-2">
            Please wait while we fetch your data
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
        <div className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6 sm:p-8 w-full max-w-md text-center shadow-2xl">
          <div className="bg-red-500/20 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />
          </div>
          <h2 className="text-red-300 text-lg sm:text-xl font-semibold mb-3">
            Something went wrong
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-red-500/25 hover:scale-105 text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
        {hasPortfolio ? (
          <div className="space-y-6 sm:space-y-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group self-start sm:self-auto"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm sm:text-base">Back</span>
              </button>
              <div className="text-left sm:text-right">
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Portfolio Preview
                </h1>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  Manage your professional presence
                </p>
              </div>
            </div>

            {/* Main Portfolio Card */}
            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group">
              {/* Top-right buttons - Mobile responsive */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-2 sm:gap-3 z-10">
                <button
                  onClick={() => navigate(`/blog/edit/portfolio/${id}`)}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-blue-500/30 border border-blue-500/40 text-blue-100 text-xs sm:text-sm font-medium hover:bg-blue-500/40 hover:text-white transition-transform hover:scale-105"
                >
                  <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">Edit</span>
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-red-500/30 border border-red-500/40 text-red-100 text-xs sm:text-sm font-medium hover:bg-red-500/40 hover:text-white transition-transform hover:scale-105"
                >
                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">Delete</span>
                </button>
              </div>

              <div
                onClick={() => navigate(`/view/portfolio/${id}`)}
                className="cursor-pointer"
              >
                {/* Profile Section */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-0">
                  {/* Avatar */}
                  <div className="relative mx-auto sm:mx-0 flex-shrink-0">
                    {portfolio.avatar ? (
                      <div className="relative">
                        <img
                          src={portfolio.avatar}
                          alt={portfolio.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-gray-600 group-hover:border-blue-500 transition-all duration-300 shadow-lg"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    ) : (
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-300 group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 shadow-lg">
                        {portfolio.name
                          ? portfolio.name.charAt(0).toUpperCase()
                          : "👤"}
                      </div>
                    )}
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 space-y-4 sm:space-y-6 text-center sm:text-left">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                        {portfolio.name || "Anonymous User"}
                      </h2>
                      {portfolio.title && (
                        <p className="text-lg sm:text-xl text-gray-300 mt-2 font-medium">
                          {portfolio.title}
                        </p>
                      )}
                    </div>

                    {portfolio.bio && (
                      <div className="bg-gray-700/30 rounded-xl p-3 sm:p-4 border-l-4 border-blue-500/50">
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                          {portfolio.bio.length > 150
                            ? `${portfolio.bio.substring(0, 150)}...`
                            : portfolio.bio}
                        </p>
                      </div>
                    )}

                    {/* Stats Grid - Fully responsive */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                      {portfolio.projects?.length > 0 && (
                        <div className="bg-blue-500/10 rounded-xl p-3 sm:p-4 border border-blue-500/20">
                          <div className="flex items-center gap-1 sm:gap-2 mb-1">
                            <FolderOpen className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                            <span className="text-blue-300 text-xs sm:text-sm font-medium">
                              Projects
                            </span>
                          </div>
                          <span className="text-white text-base sm:text-lg font-bold">
                            {portfolio.projects.length}
                          </span>
                        </div>
                      )}
                      {portfolio.experience?.length > 0 && (
                        <div className="bg-green-500/10 rounded-xl p-3 sm:p-4 border border-green-500/20">
                          <div className="flex items-center gap-1 sm:gap-2 mb-1">
                            <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                            <span className="text-green-300 text-xs sm:text-sm font-medium">
                              Experience
                            </span>
                          </div>
                          <span className="text-white text-base sm:text-lg font-bold">
                            {portfolio.experience.length}
                          </span>
                        </div>
                      )}
                      {portfolio.skills?.length > 0 && (
                        <div className="bg-purple-500/10 rounded-xl p-3 sm:p-4 border border-purple-500/20">
                          <div className="flex items-center gap-1 sm:gap-2 mb-1">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                            <span className="text-purple-300 text-xs sm:text-sm font-medium">
                              Skills
                            </span>
                          </div>
                          <span className="text-white text-base sm:text-lg font-bold">
                            {portfolio.skills.length}
                          </span>
                        </div>
                      )}
                      {portfolio.education?.length > 0 && (
                        <div className="bg-yellow-500/10 rounded-xl p-3 sm:p-4 border border-yellow-500/20 col-span-2 lg:col-span-1">
                          <div className="flex items-center gap-1 sm:gap-2 mb-1">
     

                       <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                            <span className="text-yellow-300 text-xs sm:text-sm font-medium">
                              Education
                            </span>
                          </div>
                          <span className="text-white text-base sm:text-lg font-bold">
                            {portfolio.education.length}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Featured Skills */}
                    {portfolio.skills?.length > 0 && (
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                          Featured Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {portfolio.skills.slice(0, 6).map((skill, index) => (
                            <span
                              key={index}
                              className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm border border-blue-500/30 hover:border-blue-400/50 transition-colors backdrop-blur-sm"
                            >
                              {skill.name}
                            </span>
                          ))}
                          {portfolio.skills.length > 6 && (
                            <span className="text-gray-400 text-xs sm:text-sm py-1.5 sm:py-2 px-3 bg-gray-700/30 rounded-full">
                              +{portfolio.skills.length - 6} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Contact Email */}
                    {portfolio.contactEmail && (
                      <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm bg-gray-700/20 rounded-xl p-3">
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
                        <span className="text-gray-300 break-all min-w-0">
                          {portfolio.contactEmail}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* View Portfolio Footer */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700/50 text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-400 group-hover:text-blue-400 transition-colors">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-medium">
                      Click to view full portfolio
                    </span>
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>

              {/* Delete Confirmation Modal */}
              {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                  <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-sm sm:max-w-md w-full p-6 sm:p-8 relative border border-gray-700/50 animate-in zoom-in-95 duration-200">
                    {/* Close button */}
                    <button
                      onClick={handleCancelDelete}
                      className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
                    >
                      <X size={18} className="sm:w-5 sm:h-5" />
                    </button>

                    {/* Warning Icon */}
                    <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-red-500/20 rounded-full border-2 border-red-500/30">
                      <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-3">
                      Delete Portfolio?
                    </h3>

                    {/* Message */}
                    <p className="text-gray-300 text-center mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                      Are you sure you want to delete this portfolio? This action cannot be undone and all your data will be permanently removed.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <button
                        onClick={handleCancelDelete}
                        className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-gray-300 bg-gray-700/50 hover:bg-gray-700 rounded-xl font-semibold transition-all duration-200 border border-gray-600/50 hover:border-gray-500 text-sm sm:text-base"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirmDelete}
                        disabled={deleting}
                        className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-800 disabled:to-red-900 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-red-500/25 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        {deleting ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-white/30 border-t-white"></div>
                            <span className="text-xs sm:text-sm">Deleting...</span>
                          </>
                        ) : (
                          <>
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                            Delete
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* No Portfolio State */
          <div className="text-center py-16 sm:py-20 px-4">
            <h2 className="text-xl sm:text-2xl text-gray-300 font-semibold mb-2">
              No portfolio found
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mb-6">
              Create your portfolio to showcase your skills and experience.
            </p>
            <button
              onClick={() => navigate("/blog/createportfolio")}
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow transition-colors"
            >
              Create Portfolio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}