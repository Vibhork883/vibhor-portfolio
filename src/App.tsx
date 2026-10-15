import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hls from "hls.js";

gsap.registerPlugin(ScrollTrigger);

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [count, setCount] = useState<number>(0);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const words = ["Engineer", "Automate", "Analyze", "Innovate"];

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2700; 

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentCount = Math.floor(progress * 100);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    };

    requestAnimationFrame(step);

    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 900);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0A0A0A] text-[#F5F5F5] flex flex-col justify-between p-8 md:p-16 select-none font-sans">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="flex justify-between items-center">
        <span className="text-xs uppercase tracking-[0.3em] text-[#878787] font-mono">Vibhor Kohli // Portfolio '26</span>
        <span className="text-xs uppercase tracking-[0.2em] text-[#878787] font-mono">New Delhi, IN</span>
      </motion.div>
      <div className="flex justify-center items-center h-40 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.h2 key={words[wordIndex]} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-[#F5F5F5]/80">
            {words[wordIndex]}
          </motion.h2>
        </AnimatePresence>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <span className="text-xs font-mono text-[#878787] uppercase tracking-widest">System Initialization</span>
          <span className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#F5F5F5] tabular-nums leading-none">{String(count).padStart(3, "0")}</span>
        </div>
        <div className="w-full h-[3px] bg-[#1F1F1F] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] transition-all duration-75 ease-out" style={{ width: `${count}%`, boxShadow: "0 0 12px rgba(137, 170, 204, 0.4)" }} />
        </div>
      </div>
    </div>
  );
};

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["AI & ML Engineer", "C++ Automation Specialist", "Data Analyst", "Fullstack Enthusiast"];

  useEffect(() => {
    const timer = setInterval(() => { setRoleIndex((prev) => (prev + 1) % roles.length); }, 2200);
    return () => clearInterval(timer);
  }, [roles.length]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const videoSrc = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(eyebrowRef.current, { opacity: 0, filter: "blur(10px)", y: 20 }, { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, delay: 0.2 })
        .fromTo(nameRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2 }, "-=0.6");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative w-full h-screen flex flex-col justify-between items-center overflow-hidden bg-[#0A0A0A]">
      <video ref={videoRef} autoPlay muted loop playsInline className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
        <div className="inline-flex items-center gap-3 rounded-full backdrop-blur-md border border-white/10 bg-[#141414]/80 px-3 py-2 shadow-xl shadow-black/20">
          <a href="#hero" className="group relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] p-[1px] transition-transform duration-300 hover:scale-105">
            <span className="w-full h-full bg-[#0A0A0A] rounded-full flex items-center justify-center font-serif italic text-xs text-[#F5F5F5]">VK</span>
          </a>
          <div className="w-px h-4 bg-[#1F1F1F] hidden sm:block" />
          <div className="flex items-center gap-1 text-xs sm:text-sm">
            <a href="#works" className="px-3 py-1.5 rounded-full text-[#878787] hover:text-[#F5F5F5] hover:bg-[#1F1F1F] transition-colors">Projects</a>
            <a href="#experience" className="px-3 py-1.5 rounded-full text-[#878787] hover:text-[#F5F5F5] hover:bg-[#1F1F1F] transition-colors">Experience</a>
            <a href="#skills" className="px-3 py-1.5 rounded-full text-[#878787] hover:text-[#F5F5F5] hover:bg-[#1F1F1F] transition-colors">Skills</a>
          </div>
          <div className="w-px h-4 bg-[#1F1F1F]" />
          <a href="mailto:vibhorkohli9876@gmail.com" className="relative group inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] text-black hover:opacity-90 transition-opacity">
            Contact <span className="text-xs">↗</span>
          </a>
        </div>
      </nav>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 max-w-4xl mt-12">
        <div ref={eyebrowRef} className="text-xs md:text-sm text-[#878787] uppercase tracking-[0.3em] mb-6 font-mono">MCA @ VIPS GGSIPU // Ex-Crowdwisdom Trading</div>
        <h1 ref={nameRef} className="text-5xl md:text-8xl lg:text-9xl font-serif italic leading-[0.9] tracking-tight text-[#F5F5F5] mb-6">Vibhor Kohli</h1>
        <div className="text-base md:text-2xl text-[#878787] mb-6 h-8 flex items-center justify-center gap-2">
          <span>A dedicated</span>
          <span className="relative overflow-hidden inline-block min-w-[200px] text-left">
            <AnimatePresence mode="wait">
              <motion.span key={roles[roleIndex]} initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }} transition={{ duration: 0.35 }} className="absolute font-serif italic text-[#F5F5F5] underline decoration-[#89AACC]/40 underline-offset-4">{roles[roleIndex]}</motion.span>
            </AnimatePresence>
          </span>
          <span>based in New Delhi.</span>
        </div>
        <p className="text-xs md:text-sm text-[#878787] max-w-lg mb-10 leading-relaxed font-sans">Specializing in Machine Learning models, C++ automation scripts, and end-to-end data pipelines for real-world intelligence and algorithmic workflows.</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#works" className="px-7 py-3.5 rounded-full text-xs md:text-sm font-medium bg-[#F5F5F5] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F5F5F5] border border-transparent hover:border-[#89AACC] transition-all duration-300 transform hover:scale-105">Explore Projects</a>
          <a href="https://leetcode.com" target="_blank" rel="noreferrer" className="px-7 py-3.5 rounded-full text-xs md:text-sm font-medium border border-[#1F1F1F] bg-[#0A0A0A]/60 text-[#F5F5F5] hover:border-[#89AACC] backdrop-blur-sm transition-all duration-300 transform hover:scale-105">LeetCode Profile ↗</a>
        </div>
      </div>
    </section>
  );
};

const SelectedWorks: React.FC = () => {
  const projects = [
    { id: "01", title: "Stock Intelligence & Sentiment Dashboard", category: "Machine Learning / CrewAI / Streamlit", year: "2026", desc: "Scrapes Reddit via PRAW, runs spaCy NER + VADER sentiment analysis, and leverages local Llama 3 (Ollama) via CrewAI to summarize market catalysts and bull/bear thesis.", tags: ["Python", "Streamlit", "Ollama", "CrewAI", "Plotly"], colSpan: "md:col-span-7", gradient: "from-[#1A2332] to-[#0D131D]", metric: "Real-time Sentiment & Local LLM" },
    { id: "02", title: "Parkinson's Disease Prediction System", category: "Healthcare ML & Predictive Analytics", year: "2025", desc: "Built an XGBoost model achieving 92.31% accuracy on the UCI Parkinson's dataset. Applied SMOTE oversampling and hyperparameter tuning with GridSearchCV.", tags: ["Python", "XGBoost", "SMOTE", "Scikit-Learn"], colSpan: "md:col-span-5", gradient: "from-[#1E1B2E] to-[#0E0C17]", metric: "92.31% Accuracy" },
    { id: "03", title: "Sierra Chart C++ & Trade Log Automation", category: "Crowdwisdom Trading / Automation", year: "2024", desc: "Custom C++ study file bug resolution for live trading. Implemented a pywinauto + OCR script extracting trade activity logs, slashing processing from 10 mins to batch overnight runs.", tags: ["C++", "pywinauto", "OCR", "Sierra Chart"], colSpan: "md:col-span-5", gradient: "from-[#162521] to-[#0A1210]", metric: "100% Bug Resolution" },
    { id: "04", title: "Text-To-Speech Convertor (AWS Polly)", category: "Cloud Speech Synthesis", year: "2024", desc: "Cloud-based converter using AWS Polly to convert raw text into natural-sounding speech audio with customizable voices and streamlined audio output download.", tags: ["AWS Polly", "Python", "Cloud Architecture"], colSpan: "md:col-span-7", gradient: "from-[#2B1F1D] to-[#120B0A]", metric: "Real-time Cloud Audio" },
  ];

  return (
    <section id="works" className="bg-[#0A0A0A] py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#1F1F1F] pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#878787] mb-3 font-mono"><span className="w-8 h-px bg-[#89AACC]" />Selected Portfolio Projects</div>
            <h2 className="text-4xl md:text-6xl font-serif text-[#F5F5F5]">Featured <span className="italic font-light">Engineered Systems</span></h2>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {projects.map((proj) => (
            <motion.div key={proj.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className={`${proj.colSpan} group relative bg-gradient-to-br ${proj.gradient} border border-[#1F1F1F] hover:border-[#89AACC]/40 rounded-3xl p-8 flex flex-col justify-between min-h-[360px] transition-all duration-500 overflow-hidden shadow-2xl`}>
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none" />
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-mono text-[#89AACC] border border-[#89AACC]/30 px-3 py-1 rounded-full">{proj.year}</span>
                  <span className="text-xs font-mono text-[#878787]">{proj.id}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif italic text-[#F5F5F5] mb-3 group-hover:text-[#89AACC] transition-colors">{proj.title}</h3>
                <p className="text-xs md:text-sm text-[#878787] leading-relaxed mb-6">{proj.desc}</p>
              </div>
              <div>
                <div className="text-xs font-mono text-[#89AACC] mb-4">✦ {proj.metric}</div>
                <div className="flex flex-wrap gap-2">
                  {proj.tags.map((t) => (<span key={t} className="text-[11px] font-mono text-[#F5F5F5]/70 bg-black/40 border border-white/5 px-2.5 py-1 rounded-md">{t}</span>))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExperienceSection: React.FC = () => {
  const experiences = [
    { role: "C++ Intern - Automation & AI", company: "Crowdwisdom Trading, Israel", period: "2024 - 2025", bullets: ["Debugged and optimized custom C++ study files for Sierra Chart used in live high-frequency trading.", "Built Python stock data retrieval assistant using CrewAI and PRAW scraping 20 subreddits.", "Automated trade log extraction with pywinauto & OCR."] },
    { role: "Master's of Computer Application (MCA)", company: "VIPS (GGSIPU), Delhi", period: "2025 – 2027", bullets: ["Advanced specialization in Machine Learning, System Architecture, and Cloud Technologies."] },
    { role: "Bachelor's of Computer Application (BCA)", company: "Bennett University, UP", period: "2021 – 2024", bullets: ["Core foundational coursework in Computer Science, Data Structures, SQL, and Software Development."] },
  ];

  return (
    <section id="experience" className="bg-[#0A0A0A] py-20 border-t border-[#1F1F1F] px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#878787]">Career Path</span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#F5F5F5] mt-2">Work Experience <span className="italic font-light">& Education</span></h2>
        </div>
        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 md:p-8 rounded-2xl bg-[#141414]/50 border border-[#1F1F1F] hover:border-[#89AACC]/40 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-serif italic text-[#F5F5F5]">{exp.role}</h3>
                  <span className="text-xs font-mono text-[#89AACC]">{exp.company}</span>
                </div>
                <span className="text-xs font-mono text-[#878787] bg-[#1F1F1F] px-3 py-1 rounded-full self-start md:self-auto">{exp.period}</span>
              </div>
              <ul className="space-y-2">
                {exp.bullets.map((b, bIdx) => (<li key={bIdx} className="text-xs md:text-sm text-[#878787] flex items-start gap-2"><span className="text-[#89AACC] mt-1">•</span><span>{b}</span></li>))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillsSection: React.FC = () => {
  const skillCategories = [
    { category: "Languages & Core", skills: ["Python", "C++", "C", "SQL"] },
    { category: "Data Science & ML", skills: ["Pandas", "NumPy", "Matplotlib", "Scikit-Learn", "XGBoost"] },
    { category: "AI & Cloud Tools", skills: ["CrewAI", "Ollama", "AWS Polly", "Streamlit"] },
    { category: "Computer Science", skills: ["DBMS", "Computer Networks", "Operating Systems"] },
  ];
  return (
    <section id="skills" className="bg-[#0A0A0A] py-20 border-t border-[#1F1F1F] px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#878787]">Capabilities</span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#F5F5F5] mt-2">Technical Stack <span className="italic font-light">& Certifications</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#141414] border border-[#1F1F1F]">
              <h3 className="text-sm font-mono text-[#89AACC] uppercase tracking-wider mb-4">// {cat.category}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (<span key={s} className="text-xs font-mono text-[#F5F5F5] bg-[#1F1F1F] px-3 py-1.5 rounded-lg border border-white/5">{s}</span>))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactFooter: React.FC = () => {
  return (
    <footer className="bg-[#0A0A0A] pt-20 pb-12 overflow-hidden relative">
      <div className="max-w-4xl mx-auto text-center px-6">
        <span className="text-xs font-mono text-[#89AACC] uppercase tracking-[0.3em] block mb-4">Get In Touch</span>
        <h2 className="text-4xl md:text-7xl font-serif text-[#F5F5F5] mb-8">Ready to collaborate on <br /><span className="italic font-light text-[#89AACC]">your next system?</span></h2>
        <a href="mailto:vibhorkohli9876@gmail.com" className="inline-block px-8 py-4 rounded-full text-sm md:text-base font-medium bg-gradient-to-r from-[#89AACC] to-[#4E85BF] text-black hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#89AACC]/20 mb-12">vibhorkohli9876@gmail.com ↗</a>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#1F1F1F] text-xs font-mono text-[#878787] gap-4">
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /><span>Available for ML & Software Roles</span></div>
          <div><span>Phone: +91 8383039883</span></div>
          <div><span>© {new Date().getFullYear()} Vibhor Kohli. New Delhi, India</span></div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="bg-[#0A0A0A] text-[#F5F5F5] min-h-screen selection:bg-[#89AACC] selection:text-black">
      {isLoading ? <LoadingScreen onComplete={() => setIsLoading(false)} /> : (
        <main>
          <HeroSection />
          <SelectedWorks />
          <ExperienceSection />
          <SkillsSection />
          <ContactFooter />
        </main>
      )}
    </div>
  );
}
