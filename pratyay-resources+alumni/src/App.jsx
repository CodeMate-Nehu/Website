/*
 * App.jsx
 * Main application entry point mounting the Navbar, Footer, and
 * dynamically routing between Resources, Alumni, Alumni Detailed, and Alumni View All views.
 */
import { useState } from 'react';
import Navbar from './components/Navbar';
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
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
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
