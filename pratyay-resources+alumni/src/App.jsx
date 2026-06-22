/*
 * App.jsx
 * Main application entry point mounting the Navbar, Footer, and
 * dynamically routing between Resources, Alumni, Alumni Detailed, and Alumni View All views.
 */
import { useState } from 'react';
import StaggeredMenu from './components/ui/StaggeredMenu';
import Logo from './assets/BrandLogo.png';
import Resources from './pages/Resources';
import Alumni from './pages/Alumni';
import AlumniDetailed from './pages/AlumniDetailed';
import AlumniViewAll from './pages/AlumniViewAll';
import Footer from './components/Footer';

const defaultAlumni = {
  name: "Nikunj Maheshwari",
  role: "Software Engineer",
  company: "Google",
  domain: "Product Engineering",
  batch: "BTECH IT 2023-27",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80&sat=-100",
  expertise: ["Full Stack", "System Design", "MongoDB", "React", "Node.js", "AWS"],
  internships: 3,
  papers: 2,
  openSource: "Open Source CONTRIBUTOR",
  bio: "I am an execution-driven B.Tech student prioritizing full-stack web applications, AI integration, and cross-platform mobile development. Beyond writing code, I focus on logical system architecture, rapid prototyping, and delivering highly scalable, user-centric products. I thrive under pressure and am actively seeking internship opportunities to push the boundaries of modern technology."
};

function App() {
  const [currentPage, setCurrentPage] = useState('alumni-view-all');
  const [selectedAlumni, setSelectedAlumni] = useState(defaultAlumni);

  const handleSelectAlumni = (alumni) => {
    setSelectedAlumni(alumni);
    setCurrentPage('alumni-detailed');
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col justify-between">
      <div>
        <StaggeredMenu
          position="right"
          isFixed={true}
          items={[
            { label: 'Home', ariaLabel: 'Go to home page', link: '#alumni', onClick: () => setCurrentPage('alumni') },
            { label: 'Resources', ariaLabel: 'View resources', link: '#resources', onClick: () => setCurrentPage('resources') },
            { label: 'Events', ariaLabel: 'View events', link: '#events', onClick: () => {} },
            { label: 'Community', ariaLabel: 'Join community', link: '#community', onClick: () => {} }
          ]}
          socialItems={[
            { label: 'Facebook', link: 'https://facebook.com/mvpblocks' },
            { label: 'Instagram', link: 'https://instagram.com/mvpblocks' },
            { label: 'Twitter', link: 'https://twitter.com/mvpblocks' },
            { label: 'GitHub', link: 'https://github.com/mvpblocks' },
            { label: 'Dribbble', link: 'https://dribbble.com/mvpblocks' }
          ]}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#1f2937"
          openMenuButtonColor="#1f2937"
          changeMenuColorOnOpen={true}
          colors={['#ffedd5', '#f37f30']}
          logoUrl={Logo}
          accentColor="#f37f30"
        />
        {currentPage === 'resources' && <Resources />}
        {currentPage === 'alumni' && (
          <Alumni 
            onSelectAlumni={handleSelectAlumni} 
            onViewAll={() => setCurrentPage('alumni-view-all')}
          />
        )}
        {currentPage === 'alumni-detailed' && (
          <AlumniDetailed 
            alumni={selectedAlumni} 
            onBack={() => setCurrentPage('alumni')} 
          />
        )}
        {currentPage === 'alumni-view-all' && (
          <AlumniViewAll 
            onSelectAlumni={handleSelectAlumni}
            onBack={() => setCurrentPage('alumni')}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
