import React, { useState, useEffect } from 'react';
import { FiEye, FiCalendar, FiMapPin } from 'react-icons/fi';
import { getProjects } from '../services/api';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const projectCategories = [
    'Consultation', 'Design', 'Marketing & Design', 'Consultation & Marketing', 'Development'
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Featured Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our portfolio of successful projects across various industries and services.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {projectCategories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 rounded-full border-2 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <div className="text-5xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Projects Yet</h3>
            <p className="text-gray-500">Projects will appear here once added from the admin panel.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project._id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                {/* Project Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image?.startsWith('http') ? project.image : `http://localhost:5000${project.image}`}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80';
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {project.category || 'Project'}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <FiCalendar className="mr-2" />
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                    <FiMapPin className="ml-4 mr-2" />
                    <span>Location</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{project.name}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">{project.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold">
                      <FiEye />
                      <span>Read More</span>
                    </button>
                    <div className="text-sm text-gray-500">Project Details →</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center space-x-2 border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-all">
            <span>View All Projects</span>
            <FiEye />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;