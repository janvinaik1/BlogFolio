import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import portfolioService from '../services/portfolio.services';

export default function PortfolioPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const result = await portfolioService.getPortfolio(id);
        setPortfolio(result.portfolio);
      } catch (err) {
        console.error('Failed to fetch portfolio:', err);
        setError('Something went wrong while loading the portfolio.');
      } finally {
        setLoading(false);
      }
    };

    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) setIsLoggedIn(true);

    if (id) fetchPortfolio();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <p className="animate-pulse">Loading portfolio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-400">
        <p>Portfolio not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={portfolio.avatar}
            alt={portfolio.name}
            className="w-24 h-24 rounded-full border-2 border-gray-700 object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">{portfolio.name}</h1>
            <p className="text-gray-400">{portfolio.title}</p>
            {portfolio.contactEmail && (
              <p className="text-gray-400 text-sm mt-1">📧 {portfolio.contactEmail}</p>
            )}
          </div>
        </div>

        {/* Bio */}
        {portfolio.bio && (
          <section>
            <h2 className="text-xl font-semibold mb-2">About</h2>
            <p className="text-gray-300 whitespace-pre-line">{portfolio.bio}</p>
          </section>
        )}

        {/* Skills */}
        {portfolio.skills?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.map(skill => (
                <span
                  key={skill._id}
                  className="px-3 py-1 bg-blue-600/20 text-blue-300 text-sm rounded-full border border-blue-500/30"
                >
                  {skill.name} — {skill.level}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {portfolio.experience?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Experience</h2>
            <ul className="space-y-2">
              {portfolio.experience.map(exp => (
                <li key={exp._id} className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold text-blue-400">{exp.position}</p>
                  <p className="text-gray-300">{exp.company}</p>
                  <p className="text-gray-500 text-sm">{exp.duration}</p>
                  {exp.description && <p className="text-gray-400">{exp.description}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Projects */}
        {portfolio.projects?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Projects</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {portfolio.projects.map(project => (
                <div
                  key={project._id}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-md"
                >
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                  )}
                  <h3 className="text-lg font-bold text-blue-300">{project.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{project.description || 'No description.'}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    {project.techStack?.join(', ')}
                  </div>
                  <div className="mt-3 flex gap-4 text-sm">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:underline"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Social Links */}
        {portfolio.socialLinks?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Connect with me</h2>
            <div className="flex gap-4 flex-wrap">
              {portfolio.socialLinks.map(link => (
                <a
                  key={link._id}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Contact Info */}
        {portfolio.contact && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Contact</h2>
            <ul className="text-gray-300 space-y-1">
              {portfolio.contact.phone && <li>📞 {portfolio.contact.phone}</li>}
              {portfolio.contact.address && <li>📍 {portfolio.contact.address}</li>}
              {portfolio.contact.website && (
                <li>
                  🌐 <a href={portfolio.contact.website} className="text-blue-400 hover:underline" target="_blank" rel="noreferrer">{portfolio.contact.website}</a>
                </li>
              )}
              {portfolio.contact.email && <li>📧 {portfolio.contact.email}</li>}
            </ul>
          </section>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-10 justify-center">
          <button
            onClick={() => navigate(`/public/home?authorId=${portfolio._id}`)}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg shadow"
          >
            View My Blogs
          </button>

          {isLoggedIn && (
            <button
              onClick={() => navigate('/blog/profile')}
              className="bg-gray-700 hover:bg-gray-800 px-5 py-2 rounded-lg shadow"
            >
              Back to Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
