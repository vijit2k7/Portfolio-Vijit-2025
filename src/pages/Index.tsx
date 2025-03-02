import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  ArrowDownIcon,
  Menu,
  X,
  BookOpenIcon,
  BriefcaseIcon,
  GlobeIcon,
  PhoneIcon,
  MapPinIcon,
  Sparkles,
  Code,
  Database,
  Server,
  Layout,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';

const enterpriseProjects = [
  {
    id: 1,
    title: "UOB Infinity App",
    description: "Digital banking platform with multinational support for Singapore, Malaysia, Indonesia, and Vietnam.",
    technologies: ["React", "Redux", "Micro Frontends", "Module Federation"],
    image: "/images/uob.png",
    link: "https://www.uob.com.sg/business/digital/infinity/index.page"
  },
  {
    id: 2,
    title: "Airtel Payments Bank Blog",
    description: "Implemented Blogs web page for APB using Angular and Prismic CMS.",
    technologies: ["Angular", "Prismic CMS", "Web Performance"],
    image: "/images/airtelblog.png",
    link: "https://www.airtel.in/blog/"
  },
  {
    id: 3,
    title: "HSBC Cards Landing Page",
    description: "Reduced customer response time from 1:20 minutes to 40 seconds, implemented in US market.",
    technologies: ["React", "Redux", "Node.js"],
    image: "/images/HSBC.png",
    link: "https://www.hsbc.com.my/advance/"
  },
  {
    id: 4,
    title: "Klutchh Esports",
    description: "Led a team of 10 professionals as CTO to develop an innovative esports platform attracting 40,000+ users.",
    technologies: ["React Native", "Node.js", "AWS", "MongoDB"],
    image: "/images/klutchh.png",
    link: "https://landingpagev2.onrender.com/"
  },
];

const latestProjects = [
  {
    id: 5,
    title: "TwitterX AutoDM",
    description: "Automated direct messaging system for Twitter/X platform that helps businesses engage with followers and potential customers.",
    technologies: ["React", "Node.js", "Twitter API", "Tailwind CSS"],
    image: "/images/twitter.png",
    link: "https://xdm-frontend-final-pqxr.onrender.com/"
  }
];

const skills = [
  { name: "ReactJs/NextJs/SSR", level: 95 },
  { name: "HTML/CSS/JavaScript", level: 90 },
  { name: "Redux/Redux Toolkit", level: 88 },
  { name: "Node/Express/GraphQL", level: 85 },
  { name: "TypeScript", level: 85 },
  { name: "SQL/MongoDB", level: 80 },
  { name: "AWS/Docker/NGINX", level: 78 },
  { name: "Webpack/Vite", level: 75 },
  { name: "Unit Testing (Jest)", level: 75 },
  { name: "Micro Frontends", level: 70 },
];

const experiences = [
  {
    title: "Senior Software Engineer",
    company: "Luxoft Malaysia",
    location: "Kuala Lumpur",
    period: "November 2022 - Present",
    description: "Maintaining the 'Infinity' app, a digital banking platform for UOB Bank across Singapore, Malaysia, Indonesia, and Vietnam. Optimizing app performance using memoization, server-side rendering, and image optimization. Integrating multiple microfrontend applications using module federation for merchant onboarding."
  },
  {
    title: "SDE-3",
    company: "Airtel Payments Bank",
    location: "New Delhi",
    period: "October 2021 - October 2022",
    description: "Optimized web performance by reducing bundle size from 5.6MB to 4.5MB. Implemented Blogs web page using Angular and Prismic CMS. Redesigned and developed recharge section with auto refresh functionality. Implemented Transaction SOA feature for downloading and sending emails."
  },
  {
    title: "Full Stack Engineer",
    company: "HSBC",
    location: "Pune",
    period: "October 2019 - October 2021",
    description: "Created a POC for cards landing page & statement transaction history in ReactJs, reducing response time from 1:20 minutes to 40 seconds. Developed a machine learning model for analyzing loan default data, reducing defaults by 3.5%. Gained international exposure in markets like Hong Kong, UK, Taiwan, Malaysia, and US."
  },
  {
    title: "Instructor (MERN Stack)",
    company: "Newton School",
    location: "India",
    period: "July 2021 - December 2021",
    description: "Mentored over 300+ students on web development. Taught technologies like JavaScript, HTML, CSS, ReactJS, NodeJS, SQL, and NoSQL databases."
  },
  {
    title: "Software Engineer",
    company: "HSBC",
    location: "Pune",
    period: "June 2016 - October 2019",
    description: "Worked on the Octopus project for Hong Kong Team, automating the issuance of AAVS cards. Created end-to-end projects using Angular 1.5 & Spring for credit cards, implemented in Malaysia, Hong Kong, and Taiwan."
  }
];

const education = [
  {
    degree: "Masters in Computer Science",
    institution: "IIIT Bangalore",
    location: "India",
    period: "July 2020 - July 2022",
    details: "Graduated with 3.87 GPA"
  },
  {
    degree: "Bachelor of Technology - Electronics and Communications",
    institution: "Netaji Subhas Institute of Technology",
    location: "New Delhi",
    period: "January 2012 - July 2016",
    details: "Graduated with 75% aggregate"
  },
  {
    degree: "High School",
    institution: "Delhi Public School, Vasant Kunj",
    location: "New Delhi",
    period: "April 2010 - April 2012",
    details: "Graduated with 96% in boards"
  }
];

const certifications = [
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services (AWS)",
    period: "September 2019 - September 2022",
    link: "www.certmetrics.com"
  },
  {
    name: "DS C20 | 1st June 2020 Cohort | Course 1 - LOA",
    issuer: "upGrad",
    period: "May 2020 - June 2022",
    link: "www.credential.net"
  }
];

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group h-full cursor-pointer"
      onClick={() => {
        if (project.link) {
          window.open(project.link, '_blank');
        }
      }}
    >
      <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 animated-border h-full flex flex-col">
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-purple-600/80 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center">
            {project.link ? (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-2 bg-white text-primary font-medium rounded-md transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all cursor-pointer hover:bg-neutral-50"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.link, '_blank', 'noopener,noreferrer');
                }}
              >
                View Project
              </a>
            ) : (
              <button className="px-6 py-2 bg-white text-primary font-medium rounded-md transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                Project Details
              </button>
            )}
          </div>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        </div>
        <div className="p-6 bg-white flex-1 flex flex-col">
          <h3 className="text-lg font-semibold mb-2 gradient-text">{project.title}</h3>
          <p className="text-neutral-600 mb-4 flex-grow">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
            {project.technologies.map((tech, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 text-xs bg-neutral-100 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
          {project.link && (
            <div className="mt-4 w-full">
              <a 
                href={project.link}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-2 px-4 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors font-medium"
                onClick={(e) => {
                  // Prevent default behavior first
                  e.preventDefault();
                  // Stop event propagation
                  e.stopPropagation();
                  // Open in new tab with fallback
                  try {
                    window.open(project.link, '_blank');
                  } catch (err) {
                    // Fallback - direct assignment as a last resort
                    window.location.href = project.link;
                  }
                }}
              >
                <GlobeIcon size={16} className="mr-2" />
                Visit Website
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isLoaded, setIsLoaded] = useState(false);
  const sections = useRef<HTMLElement[]>([]);
  
  // Add form state for the contact form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form input handler
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Show sending toast
      toast.info("Sending your message...");
      
      // Create form data to submit
      const formElement = e.target;
      
      // Submit the form using the browser's fetch API
      const response = await fetch("https://formsubmit.co/vijit2k7@yahoo.in", {
        method: "POST",
        body: new FormData(formElement),
        headers: {
          'Accept': 'application/json'
        },
      });
      
      if (response.ok) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-neutral-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-semibold tracking-tighter">
            <span className="text-neutral-900">Vijit Mishra</span>
            <span className="gradient-text font-bold">.</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {["home", "about", "experience", "skills", "projects", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`relative text-base font-medium capitalize transition-colors ${
                  activeSection === item
                    ? "gradient-text"
                    : "text-neutral-600 hover:text-primary"
                }`}
              >
                {item}
                {activeSection === item && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-purple-400 rounded-full"
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
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md pt-24 px-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-6">
              {["home", "about", "experience", "skills", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`text-xl font-medium capitalize text-left transition-colors ${
                    activeSection === item
                      ? "gradient-text"
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
      
      {/* Just after the <header> section, before the <main> tag */}
      {/* Add a top contact info bar */}
      <div className="bg-neutral-900 text-white py-2 hidden md:block">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6 text-sm">
              <a 
                href="mailto:vijit2k7@yahoo.in" 
                className="flex items-center hover:text-primary transition-colors"
              >
                <MailIcon size={14} className="mr-1.5" />
                <span>vijit2k7@yahoo.in</span>
              </a>
              <a 
                href="tel:+60173400070" 
                className="flex items-center hover:text-primary transition-colors"
              >
                <PhoneIcon size={14} className="mr-1.5" />
                <span>+60173400070</span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="https://www.linkedin.com/in/vijit-mishra-b01355188/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <LinkedinIcon size={16} />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <GithubIcon size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <main className="pt-24">
        {/* Hero Section */}
        <section 
          id="home" 
          className="min-h-[85vh] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden"
        >
          {/* Background Animation Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.div 
              className="absolute top-20 right-[20%] w-64 h-64 rounded-full bg-primary/5 blur-3xl" 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.2, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-20 left-[30%] w-72 h-72 rounded-full bg-purple-400/5 blur-3xl" 
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-block mb-3"
            >
              <span className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
                <Sparkles size={14} className="mr-1.5 animate-pulse-soft" /> Senior Software Engineer
              </span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              <span className="block mb-2">Hello, I'm</span>
              <span className="gradient-text">Vijit Mishra</span>
            </h1>
            
            <motion.p 
              className="text-neutral-600 mb-10 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              FullStack Engineer with nearly 8+ years of experience in Software Design & Development. I specialize in building modern web applications and have international exposure across multiple markets including Singapore, Malaysia, Indonesia, and Vietnam.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-3 bg-gradient-to-r from-primary to-purple-500 text-white rounded-md hover:opacity-90 transition-colors animated-border"
              >
                Contact Me
              </button>
              <a
                href="/Vijit_Mishra_Resume_Updated.pdf" 
                download
                className="px-8 py-3 border border-neutral-300 rounded-md hover:bg-neutral-100 transition-colors flex items-center justify-center"
              >
                <ArrowDownIcon size={16} className="mr-2" />
                Download Resume
              </a>
              <button
                onClick={() => scrollToSection("projects")}
                className="px-8 py-3 border border-neutral-300 rounded-md hover:bg-neutral-100 transition-colors"
              >
                View My Work
              </button>
            </motion.div>
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
              className="text-primary hover:text-primary/80 transition-colors"
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
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-400 mx-auto mb-10"></div>
              
              <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="w-full md:w-1/3 mb-8 md:mb-0">
                  <motion.div 
                    className="aspect-square overflow-hidden rounded-xl shadow-xl relative"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20"></div>
                    <img 
                      src="/images/VijitProfile.jpeg" 
                      alt="Vijit Mishra" 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
                
                <div className="w-full md:w-2/3">
                  <h3 className="text-xl font-semibold mb-4 gradient-text">Who I am</h3>
                  <p className="text-neutral-600 mb-4">
                    I'm a Senior Software Engineer based in Kuala Lumpur, Malaysia, with a passion for building modern web applications. I specialize in ReactJS, NextJS, Redux, Node.js, and related technologies.
                  </p>
                  <p className="text-neutral-600 mb-6">
                    With over 8 years of experience in software development, I've worked on a variety of projects ranging from digital banking applications to e-commerce platforms. I focus on writing clean, maintainable code and creating intuitive user experiences.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-neutral-50 hover:shadow-md transition-shadow">
                      <h4 className="font-medium text-primary">Name:</h4>
                      <p className="text-neutral-600">Vijit Mishra</p>
                    </div>
                    <div className="p-4 rounded-lg bg-neutral-50 hover:shadow-md transition-shadow">
                      <h4 className="font-medium text-primary">Email:</h4>
                      <p className="text-neutral-600">vijit2k7@yahoo.in</p>
                    </div>
                    <div className="p-4 rounded-lg bg-neutral-50 hover:shadow-md transition-shadow">
                      <h4 className="font-medium text-primary">Location:</h4>
                      <p className="text-neutral-600">Kuala Lumpur, Malaysia</p>
                    </div>
                    <div className="p-4 rounded-lg bg-neutral-50 hover:shadow-md transition-shadow">
                      <h4 className="font-medium text-primary">Phone:</h4>
                      <p className="text-neutral-600">+60173400070</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Education & Certifications Section */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Education */}
                <div>
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <BookOpenIcon size={20} className="mr-2 text-primary" />
                    <span className="gradient-text">Education</span>
                  </h3>
                  <div className="space-y-6">
                    {education.map((edu, index) => (
                      <motion.div 
                        key={index} 
                        className="glass-card p-6 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                      >
                        <h4 className="font-semibold">{edu.degree}</h4>
                        <p className="text-neutral-600">{edu.institution}, {edu.location}</p>
                        <p className="text-sm text-neutral-500">{edu.period}</p>
                        <p className="text-sm text-neutral-600 mt-2">{edu.details}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Certifications */}
                <div>
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <BookOpenIcon size={20} className="mr-2 text-primary" />
                    <span className="gradient-text">Certifications</span>
                  </h3>
                  <div className="space-y-6">
                    {certifications.map((cert, index) => (
                      <motion.div 
                        key={index} 
                        className="glass-card p-6 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                      >
                        <h4 className="font-semibold">{cert.name}</h4>
                        <p className="text-neutral-600">{cert.issuer}</p>
                        <p className="text-sm text-neutral-500">{cert.period}</p>
                        <a 
                          href={`https://${cert.link}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary text-sm inline-flex items-center mt-2 hover:underline"
                        >
                          <GlobeIcon size={14} className="mr-1" />
                          View Certificate
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Experience Section */}
        <section 
          id="experience" 
          className="py-20 bg-neutral-50 relative overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-purple-400/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-2 text-center">Work Experience</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-400 mx-auto mb-12"></div>
              
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary hover:shadow-xl transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-lg font-semibold gradient-text">{exp.title}</h3>
                      <span className="text-sm text-neutral-500">{exp.period}</span>
                    </div>
                    <p className="text-primary font-medium mb-2 flex items-center">
                      <BriefcaseIcon size={16} className="mr-1" /> {exp.company}
                    </p>
                    <p className="text-neutral-500 text-sm mb-3 flex items-center">
                      <MapPinIcon size={14} className="mr-1" /> {exp.location}
                    </p>
                    <p className="text-neutral-600">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Skills Section */}
        <section 
          id="skills" 
          className="py-20 bg-white relative overflow-hidden"
        >
          {/* Dynamic Background Elements */}
          <motion.div 
            className="absolute -right-20 top-20 w-72 h-72 rounded-full bg-gradient-to-br from-purple-400/10 to-primary/10 blur-3xl -z-10"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.2, 0.3],
              rotate: 360
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-2 text-center">My Skills</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-400 mx-auto mb-12"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium flex items-center">
                        {skill.name.includes("React") && <Code size={16} className="mr-2 text-primary" />}
                        {skill.name.includes("HTML") && <Layout size={16} className="mr-2 text-primary" />}
                        {skill.name.includes("Redux") && <Database size={16} className="mr-2 text-primary" />}
                        {skill.name.includes("Node") && <Server size={16} className="mr-2 text-primary" />}
                        {skill.name}
                      </h3>
                      <span className="text-neutral-500">{skill.level}%</span>
                    </div>
                    <div className="w-full skill-bar">
                      <motion.div 
                        className="skill-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.2, delay: 0.1 * index, ease: "easeOut" }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <motion.div 
                className="mt-16 bg-white p-8 rounded-lg shadow-lg glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-6 text-center gradient-text">Other Expertise</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {["Git/GitHub", "DevOps (CICD)", "Apache Kafka/Camel", "Machine Learning", "Akamai (CDN)", "Micro Frontends", "Image Optimization", "Performance Tuning"].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="py-2 px-4 bg-neutral-50 rounded-md text-center border border-neutral-200 hover:border-primary/30 hover:bg-neutral-100 transition-colors"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -3 }}
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Projects Section */}
        <section 
          id="projects" 
          className="py-20 bg-neutral-50 relative overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute top-40 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl font-bold mb-2 text-center">My Projects</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-400 mx-auto mb-12"></div>
              
              {/* Enterprise Projects */}
              <div className="mb-16">
                <h3 className="text-2xl font-semibold mb-8 text-center gradient-text">Enterprise Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {enterpriseProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              </div>
              
              {/* Latest Projects */}
              <div>
                <h3 className="text-2xl font-semibold mb-8 text-center gradient-text">My Latest Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {latestProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section 
          id="contact" 
          className="py-20 bg-white relative overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute -left-20 bottom-0 w-96 h-96 bg-gradient-to-tr from-primary/5 to-purple-400/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-2 text-center">Get In Touch</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-400 mx-auto mb-12"></div>
              
              <div className="bg-white rounded-lg shadow-xl overflow-hidden animated-border">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3 bg-gradient-to-br from-primary to-purple-600 p-8 md:p-12 text-white">
                    <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                    <div className="space-y-6">
                      <motion.div 
                        className="flex items-center space-x-4"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MailIcon size={20} className="animate-pulse-soft" />
                        <span>vijit2k7@yahoo.in</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center space-x-4"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <PhoneIcon size={20} className="animate-pulse-soft" />
                        <span>+60173400070</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center space-x-4"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MapPinIcon size={20} className="animate-pulse-soft" />
                        <span>Kuala Lumpur, Malaysia</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center space-x-4"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <LinkedinIcon size={20} className="animate-pulse-soft" />
                        <a 
                          href="https://www.linkedin.com/in/vijit-mishra-b01355188/" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline cursor-pointer"
                          onClick={() => window.open("https://www.linkedin.com/in/vijit-mishra-b01355188/", "_blank")}
                        >
                          LinkedIn Profile
                        </a>
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-2/3 p-8 md:p-12">
                    <h3 className="text-xl font-semibold mb-6 gradient-text">Send Me a Message</h3>
                    <form className="space-y-6" onSubmit={handleSubmit} action="https://formsubmit.co/vijit2k7@yahoo.in" method="POST">
                      {/* Add these hidden fields for FormSubmit configuration */}
                      <input type="hidden" name="_subject" value="New portfolio contact message" />
                      <input type="hidden" name="_template" value="table" />
                      <input type="hidden" name="_captcha" value="false" />
                      <input type="hidden" name="_next" value={window.location.href} />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                            Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                            placeholder="Your email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
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
                          name="subject"
                          className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                          placeholder="Subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                          placeholder="Your message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <motion.button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-md hover:opacity-90 transition-colors disabled:opacity-70"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </motion.button>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="py-8 bg-neutral-900 text-white border-t border-neutral-800">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <motion.a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <GithubIcon size={20} />
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/in/vijit-mishra-b01355188/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <LinkedinIcon size={20} />
            </motion.a>
            <motion.a 
              href="mailto:vijit2k7@yahoo.in" 
              className="text-neutral-400 hover:text-white transition-colors"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <MailIcon size={20} />
            </motion.a>
          </div>
          <p className="text-neutral-400">
            © {new Date().getFullYear()} Vijit Mishra. All rights reserved.
          </p>
        </div>
      </footer>
      
      {/* Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Index;
