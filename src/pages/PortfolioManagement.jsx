// PortfolioPage.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import portfolioService from '../services/portfolio.services';

export default function PortfolioPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hasPortfolio, setHasPortfolio] = useState(false);
  const [portfolio, setPortfolio] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

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

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this portfolio? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleting(true);
      await portfolioService.deletePortfolio(id);
      setHasPortfolio(false);
      setPortfolio(null);
    } catch (err) {
      setError('Failed to delete portfolio. Please try again.');
      console.error('Error deleting portfolio:', err);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 max-w-md w-full text-center">
          <div className="text-red-400 text-4xl mb-4">⚠️</div>
          <h2 className="text-red-300 text-xl font-semibold mb-2">Error</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {hasPortfolio ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-700 pb-4">
              <h1 className="text-3xl font-bold text-white">Portfolio Preview</h1>
            </div>

            {/* Portfolio Preview Card */}
            <div 
              className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700 cursor-pointer hover:bg-gray-750 transition-colors group"
              onClick={() => navigate(`/view/portfolio/${id}`)}
            >
              <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {portfolio.avatar ? (
                    <img
                      src={portfolio.avatar}
                      alt={portfolio.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-600 group-hover:border-blue-500 transition-colors"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center text-2xl font-bold text-gray-300 group-hover:bg-blue-600 transition-colors">
                      {portfolio.name ? portfolio.name.charAt(0).toUpperCase() : '👤'}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  {/* Name & Title */}
                  <div>
                    <h2 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {portfolio.name || 'Anonymous User'}
                    </h2>
                    {portfolio.title && (
                      <p className="text-lg text-gray-300 mt-1">{portfolio.title}</p>
                    )}
                  </div>

                  {/* Bio Preview */}
                  {portfolio.bio && (
                    <p className="text-gray-400 line-clamp-3">
                      {portfolio.bio.length > 150 
                        ? `${portfolio.bio.substring(0, 150)}...` 
                        : portfolio.bio
                      }
                    </p>
                  )}

                  {/* Quick Stats */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    {portfolio.projects && portfolio.projects.length > 0 && (
                      <span className="flex items-center gap-1">
                        <span className="text-blue-400">📁</span>
                        {portfolio.projects.length} Project{portfolio.projects.length !== 1 ? 's' : ''}
                      </span>
                    )}
                    {portfolio.experience && portfolio.experience.length > 0 && (
                      <span className="flex items-center gap-1">
                        <span className="text-green-400">💼</span>
                        {portfolio.experience.length} Experience{portfolio.experience.length !== 1 ? 's' : ''}
                      </span>
                    )}
                    {portfolio.skills && portfolio.skills.length > 0 && (
                      <span className="flex items-center gap-1">
                        <span className="text-purple-400">⚡</span>
                        {portfolio.skills.length} Skill{portfolio.skills.length !== 1 ? 's' : ''}
                      </span>
                    )}
                    {portfolio.education && portfolio.education.length > 0 && (
                      <span className="flex items-center gap-1">
                        <span className="text-yellow-400">🎓</span>
                        {portfolio.education.length} Education
                      </span>
                    )}
                  </div>

                  {/* Top Skills Preview */}
                  {portfolio.skills && portfolio.skills.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Top Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {portfolio.skills.slice(0, 4).map((skill, index) => (
                          <span
                            key={index}
                            className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-500/30"
                          >
                            {skill.name}
                          </span>
                        ))}
                        {portfolio.skills.length > 4 && (
                          <span className="text-gray-400 text-sm py-1">
                            +{portfolio.skills.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Contact Info */}
                  {portfolio.contactEmail && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>📧</span>
                      <span>{portfolio.contactEmail}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Click to view indicator */}
              <div className="mt-6 pt-4 border-t border-gray-700 text-center">
                <p className="text-gray-400 text-sm group-hover:text-blue-400 transition-colors">
                  Click to view full portfolio
                </p>
              </div>
            </div>

            {/* Management Actions */}
            <div className="flex gap-4 justify-center sm:justify-start">
              <button
                onClick={() => navigate(`/portfolio/${id}/edit`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg"
              >
                
                Edit Portfolio
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg"
              >
                {deleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                   
                    Delete Portfolio
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-800 rounded-xl p-12 shadow-2xl border border-gray-700 max-w-md mx-auto">
              <div className="text-6xl mb-6">📁</div>
              <h2 className="text-2xl font-bold text-white mb-4">No Portfolio Found</h2>
              <p className="text-gray-400 mb-8">
                This portfolio doesn't exist or has been removed.
              </p>
              <button
                onClick={() => navigate('/blog/createportfolio')}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg"
              >
                Create New Portfolio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}