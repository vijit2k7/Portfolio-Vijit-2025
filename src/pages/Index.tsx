
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  ArrowDownIcon,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    title: "Finance Dashboard",
    description: "A comprehensive financial analytics dashboard with interactive charts.",
    technologies: ["React", "TypeScript", "Recharts"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "Full-featured online shopping platform with payment integration.",
    technologies: ["React", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Weather Application",
    description: "Real-time weather forecasting with location detection.",
    technologies: ["React", "Weather API", "Geolocation"],
    image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2051&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Task Management System",
    description: "Collaborative project management tool with real-time updates.",
    technologies: ["React", "Firebase", "Redux"],
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop",
  },
];

const skills = [
  { name: "React", level: 90 },
  { name: "JavaScript", level: 85 },
  { name: "TypeScript", level: 80 },
  { name: "Node.js", level: 75 },
  { name: "CSS/SCSS", level: 85 },
  { name: "UI/UX Design", level: 70 },
];

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isLoaded, setIsLoaded] = useState(false);
  const sections = useRef<HTMLElement[]>([]);

  useEffect(() => {
    // Animation to show content has loaded
    setIsLoaded(true);
    
    // For intersection observer to detect active section
    sections.current = Array.from(document.querySelectorAll("section"));
    
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.65,
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);
    
    sections.current.forEach((section) => {
      observer.observe(section);
    });
    
    return () => {
      sections.current.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-neutral-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-semibold tracking-tighter">
            <span className="text-neutral-900">Portfolio</span>
            <span className="text-primary">.</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {["home", "about", "skills", "projects", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`relative text-base font-medium capitalize transition-colors ${
                  activeSection === item
                    ? "text-primary"
                    : "text-neutral-600 hover:text-primary"
                }`}
              >
                {item}
                {activeSection === item && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-neutral-700 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      
      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-white pt-24 px-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-6">
              {["home", "about", "skills", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`text-xl font-medium capitalize text-left transition-colors ${
                    activeSection === item
                      ? "text-primary"
                      : "text-neutral-600"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className="pt-24">
        {/* Hero Section */}
        <section 
          id="home" 
          className="min-h-[85vh] flex flex-col justify-center items-center text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              <span className="block">Hello, I'm</span>
              <span className="text-primary">John Doe</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-neutral-600 mb-8">
              Frontend Developer & UI Designer
            </h2>
            <p className="text-neutral-600 mb-10 max-w-2xl mx-auto">
              I craft responsive websites where technology meets creativity. I'm passionate about building excellent software that improves the lives of those around me.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Contact Me
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="px-8 py-3 border border-neutral-300 rounded-md hover:bg-neutral-100 transition-colors"
              >
                View My Work
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <button
              onClick={() => scrollToSection("about")}
              aria-label="Scroll down"
              className="text-neutral-400 hover:text-primary transition-colors"
            >
              <ArrowDownIcon size={28} />
            </button>
          </motion.div>
        </section>
        
        {/* About Section */}
        <section 
          id="about" 
          className="py-20 bg-white"
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-2 text-center">About Me</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-10"></div>
              
              <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="w-full md:w-1/3 mb-8 md:mb-0">
                  <div className="aspect-square overflow-hidden rounded-xl shadow-lg relative">
                    <div className="absolute inset-0 bg-primary/10"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-2/3">
                  <h3 className="text-xl font-semibold mb-4">Who I am</h3>
                  <p className="text-neutral-600 mb-4">
                    I'm a Frontend Developer based in San Francisco, CA, with a passion for building beautiful, responsive websites and web applications. I specialize in JavaScript, React, and modern frontend technologies.
                  </p>
                  <p className="text-neutral-600 mb-6">
                    With 5+ years of experience in web development, I've worked on a variety of projects ranging from small business websites to large enterprise applications. I focus on writing clean, maintainable code and creating intuitive user experiences.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium">Name:</h4>
                      <p className="text-neutral-600">John Doe</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Email:</h4>
                      <p className="text-neutral-600">john@example.com</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Location:</h4>
                      <p className="text-neutral-600">San Francisco, CA</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Availability:</h4>
                      <p className="text-neutral-600">Open to offers</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Skills Section */}
        <section 
          id="skills" 
          className="py-20 bg-neutral-50"
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-2 text-center">My Skills</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">{skill.name}</h3>
                      <span className="text-neutral-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.1 * index }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-16 bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-6 text-center">Other Expertise</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {["Git", "Webpack", "RESTful APIs", "GraphQL", "Responsive Design", "UI/UX", "Figma", "Jest"].map((item, index) => (
                    <div 
                      key={index}
                      className="py-2 px-4 bg-neutral-50 rounded-md text-center border border-neutral-100"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Projects Section */}
        <section 
          id="projects" 
          className="py-20 bg-white"
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl font-bold mb-2 text-center">My Projects</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="group"
                  >
                    <div className="overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative h-64 overflow-hidden">
                        <div className="absolute inset-0 bg-neutral-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center">
                          <button className="px-6 py-2 bg-primary text-white rounded-md transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                            View Project
                          </button>
                        </div>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 bg-white">
                        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                        <p className="text-neutral-600 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1 text-xs bg-neutral-100 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section 
          id="contact" 
          className="py-20 bg-neutral-50"
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-2 text-center">Get In Touch</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3 bg-primary p-8 md:p-12 text-white">
                    <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <MailIcon size={20} />
                        <span>john@example.com</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <GithubIcon size={20} />
                        <span>github.com/johndoe</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <LinkedinIcon size={20} />
                        <span>linkedin.com/in/johndoe</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-2/3 p-8 md:p-12">
                    <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                            placeholder="Your email"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                          placeholder="Subject"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                          placeholder="Your message"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="py-8 bg-white border-t border-neutral-100">
        <div className="container mx-auto px-6 text-center">
          <p className="text-neutral-600">
            © {new Date().getFullYear()} John Doe. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
