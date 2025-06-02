import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Edit, Trash2, X, AlertTriangle, Eye, Mail, Briefcase, GraduationCap, Star, FolderOpen, ArrowLeft, ExternalLink } from 'lucide-react';
import portfolioService from '../services/portfolio.services';

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
        setError('Failed to load portfolio. Please try again.');
        console.error('Error fetching portfolio:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPortfolio();
    }
  }, [id]);

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);
      await portfolioService.deletePortfolio(id);
      setHasPortfolio(false);
      setPortfolio(null);
      setShowDeleteConfirm(false);
    } catch (err) {
      setError('Failed to delete portfolio. Please try again.');
      console.error('Error deleting portfolio:', err);
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500/30 border-t-blue-500 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-purple-500/20 border-r-purple-500 animate-spin-reverse mx-auto"></div>
          </div>
          <p className="text-gray-300 text-lg font-medium">Loading portfolio...</p>
          <p className="text-gray-500 text-sm mt-2">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="bg-red-500/20 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-red-300 text-xl font-semibold mb-3">Something went wrong</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-red-500/25 hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {hasPortfolio ? (
          <div className="space-y-8">
            {/* Back Button & Header */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
              </button>
              <div className="text-right">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Portfolio Preview
                </h1>
                <p className="text-gray-400 text-sm mt-1">Manage your professional presence</p>
              </div>
            </div>

            {/* Enhanced Portfolio Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group">
              <div 
                className="cursor-pointer"
                onClick={() => navigate(`/view/portfolio/${id}`)}
              >
                <div className="flex items-start gap-8">
                  {/* Enhanced Avatar */}
                  <div className="flex-shrink-0 relative">
                    {portfolio.avatar ? (
                      <div className="relative">
                        <img
                          src={portfolio.avatar}
                          alt={portfolio.name}
                          className="w-24 h-24 rounded-2xl object-cover border-2 border-gray-600 group-hover:border-blue-500 transition-all duration-300 shadow-lg"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-2xl font-bold text-gray-300 group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 shadow-lg">
                        {portfolio.name ? portfolio.name.charAt(0).toUpperCase() : '👤'}
                      </div>
                    )}
                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-3 border-gray-800 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* Enhanced Info Section */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                        {portfolio.name || 'Anonymous User'}
                      </h2>
                      {portfolio.title && (
                        <p className="text-xl text-gray-300 mt-2 font-medium">{portfolio.title}</p>
                      )}
                    </div>

                    {portfolio.bio && (
                      <div className="bg-gray-700/30 rounded-xl p-4 border-l-4 border-blue-500/50">
                        <p className="text-gray-300 leading-relaxed">
                          {portfolio.bio.length > 200 
                            ? `${portfolio.bio.substring(0, 200)}...` 
                            : portfolio.bio
                          }
                        </p>
                      </div>
                    )}

                    {/* Enhanced Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {portfolio.projects?.length > 0 && (
                        <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <FolderOpen className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-300 text-sm font-medium">Projects</span>
                          </div>
                          <span className="text-white text-lg font-bold">{portfolio.projects.length}</span>
                        </div>
                      )}
                      {portfolio.experience?.length > 0 && (
                        <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <Briefcase className="w-4 h-4 text-green-400" />
                            <span className="text-green-300 text-sm font-medium">Experience</span>
                          </div>
                          <span className="text-white text-lg font-bold">{portfolio.experience.length}</span>
                        </div>
                      )}
                      {portfolio.skills?.length > 0 && (
                        <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <Star className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-300 text-sm font-medium">Skills</span>
                          </div>
                          <span className="text-white text-lg font-bold">{portfolio.skills.length}</span>
                        </div>
                      )}
                      {portfolio.education?.length > 0 && (
                        <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <GraduationCap className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-300 text-sm font-medium">Education</span>
                          </div>
                          <span className="text-white text-lg font-bold">{portfolio.education.length}</span>
                        </div>
                      )}
                    </div>
                    {portfolio.skills?.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          Featured Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {portfolio.skills.slice(0, 6).map((skill, index) => (
                            <span
                              key={index}
                              className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 px-4 py-2 rounded-full text-sm border border-blue-500/30 hover:border-blue-400/50 transition-colors backdrop-blur-sm"
                            >
                              {skill.name}
                            </span>
                          ))}
                          {portfolio.skills.length > 6 && (
                            <span className="text-gray-400 text-sm py-2 px-3 bg-gray-700/30 rounded-full">
                              +{portfolio.skills.length - 6} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    {portfolio.contactEmail && (
                      <div className="flex items-center gap-3 text-sm bg-gray-700/20 rounded-xl p-3">
                        <Mail className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300">{portfolio.contactEmail}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-700/50 text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-400 group-hover:text-blue-400 transition-colors">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">Click to view full portfolio</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate(`/blog/edit/portfolio/${id}`)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-blue-500/25 hover:scale-105 group"
              >
                <Edit className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Edit Portfolio
              </button>
              <button
                onClick={handleDeleteClick}
                disabled={deleting}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-800 disabled:to-red-900 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-red-500/25 hover:scale-105 group"
              >
                {deleting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-5 h-5 group-hover:shake transition-transform" />
                    Delete Portfolio
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-16 shadow-2xl border border-gray-700/50 max-w-lg mx-auto">
              <div className="bg-gray-700/50 rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center">
                <FolderOpen className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">No Portfolio Found</h2>
              <p className="text-gray-400 mb-10 text-lg leading-relaxed">
                 Create Portfolio to showcase your work.
              </p>
              <button
                onClick={() => navigate('/blog/createportfolio/')}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-green-500/25 hover:scale-105 group"
              >
                <span className="flex items-center gap-3">
                  Create New Portfolio
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative border border-gray-700/50 animate-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              onClick={handleCancelDelete}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
            >
              <X size={20} />
            </button>

            {/* Warning Icon */}
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-red-500/20 rounded-full border-2 border-red-500/30">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white text-center mb-3">
              Delete Portfolio?
            </h3>

            {/* Message */}
            <p className="text-gray-300 text-center mb-8 leading-relaxed">
              Are you sure you want to delete this portfolio? This action cannot be undone and all your data will be permanently removed.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-6 py-3 text-gray-300 bg-gray-700/50 hover:bg-gray-700 rounded-xl font-semibold transition-all duration-200 border border-gray-600/50 hover:border-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="flex-1 px-6 py-3 text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-800 disabled:to-red-900 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-red-500/25 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}