import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import getTheme from '../utils/getTheme';
import { getAllInvitations } from "../services/invitationService";
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

// Import the logo asset directly to let the bundler manage asset compilation paths
import logoAsset from '../assets/logo/logo.png';

function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const currentTheme = getTheme("traditional");
  const [invitations, setInvitations] = useState([]);
  
  // State engine tracking the active static file preview context
  const [activePreviewUrl, setActivePreviewUrl] = useState("/landing.html?slug=satyavasavi&side=bride");
  const [activePhase, setActivePhase] = useState("landing");

  // Head Metadata Manipulation Hook
  useEffect(() => {
    document.title = "VS Traditional Invitations";

    let faviconLink = document.querySelector("link[rel~='icon']");
    if (!faviconLink) {
      faviconLink = document.createElement('link');
      faviconLink.rel = 'icon';
      faviconLink.type = 'image/png';
      document.head.appendChild(faviconLink);
    }
    faviconLink.href = logoAsset;
  }, []);

  useEffect(() => {
    async function loadInvitations() {
      try {
        if (!user) return;

        if (user.role === 'admin') {
          const response = await getAllInvitations();
          setInvitations(response);
          return;
        }

        const response = await fetch(`${API_URL}/api/invitations/my`, {
          credentials: 'include'
        });
        const result = await response.json();

        if (result.success) {
          setInvitations([result.data]);
        }
      } catch (error) {
        console.error("Payload synchronization halted:", error);
      }
    }

    loadInvitations();
  }, [user]);

  function vs() {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role === 'admin') {
      navigate('/developer');
      return;
    }
    navigate('/dashboard');
  }

  // Updates the iframe source pointer smoothly based on selected phase
  const handleUpdatePreview = (pageType, side) => {
    const mockSlug = "satyavasavi";
    setActivePhase(pageType);
    setActivePreviewUrl(`/${pageType}.html?slug=${mockSlug}&side=${side}`);
  };

  return (
    <div
      className="min-h-screen overflow-hidden relative selection:bg-yellow-500 selection:text-black font-sans"
      style={{
        background: "linear-gradient(to bottom, #020617, #090d16, #020617)",
        color: currentTheme.colors.primary,
      }}
    >
      {/* HEADER / NAVIGATION REGISTRY BAR */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-yellow-700/20 bg-slate-950/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">
          
          {/* BRAND LOGO DESIGN BLOCK */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src={logoAsset} 
              alt="VS Brand Logo" 
              className="w-10 h-10 object-contain rounded-lg border border-yellow-500/20 p-0.5 bg-slate-950"
            />
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-500 to-amber-300 bg-clip-text text-transparent tracking-wide">
              VS Traditional Invitations
            </h1>
          </div>

          {/* SYSTEM LINKS ANCHOR MODULE */}
          <nav className="hidden md:flex items-center gap-8 text-yellow-100/70 font-medium text-sm">
            <a href="#hero" className="hover:text-yellow-400 transition-colors">Home</a>
            <a href="#showcase" className="hover:text-yellow-400 transition-colors">Live Showcase</a>
            <a href="#themes" className="hover:text-yellow-400 transition-colors">Divine Themes</a>
            <a href="#capabilities" className="hover:text-yellow-400 transition-colors">Platform Capabilities</a>
          </nav>

          {/* DYNAMIC CONTEXT CONDITIONAL ROUTING TOGGLES */}
          {user ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  const invitation = invitations.find(item => item?._id === user.invitation);
                  if (invitation) {
                    navigate(`/${invitation.slug}/builder`);
                  } else {
                    navigate('/dashboard');
                  }
                }}
                className="bg-gradient-to-r from-yellow-500 to-amber-400 hover:from-yellow-400 hover:to-amber-300 text-slate-950 px-6 py-2.5 rounded-full font-bold transition-all shadow-md shadow-yellow-500/10 text-sm"
              >
                Dashboard
              </button>
              <button
                onClick={logout}
                className="border border-yellow-500/40 hover:border-yellow-500 text-yellow-400 px-6 py-2.5 rounded-full font-bold text-sm transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/login')}
                className="border border-yellow-500/40 hover:border-yellow-500 text-yellow-400 px-6 py-2.5 rounded-full font-bold text-sm transition-all"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-yellow-500 to-amber-400 hover:from-yellow-400 hover:to-amber-300 text-slate-950 px-6 py-2.5 rounded-full font-bold transition-all shadow-md shadow-yellow-500/10 text-sm"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </header>

      {/* AMBIENT CANVAS BACKGROUND EFFECT CONSTANTS */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-amber-600/5 rounded-full blur-3xl bottom-32 right-10 animate-pulse"></div>
      </div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 z-50"></div>

      {/* HERO SECTION CONTAINER */}
      <div id="hero" className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-yellow-500 tracking-[6px] uppercase text-xs md:text-sm font-semibold"
        >
          Traditional Cinematic Invitation Platform
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-6 text-4xl md:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
        >
          Create Beautiful
          <br />
          <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
            Wedding Invitations
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-6 text-sm md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          Design dynamic, cinematic digital invitations backed by premium responsive static HTML architectures. Seamless content rendering with tradition, storytelling, and zero backend bottlenecks.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => vs()}
          className="mt-10 bg-gradient-to-r from-yellow-500 to-amber-400 hover:opacity-95 text-slate-950 px-10 h-14 rounded-full text-lg font-bold shadow-xl shadow-yellow-500/10 tracking-wide"
        >
          Create Invitation
        </motion.button>
      </div>

      {/* DYNAMIC USER INVITATIONS CONTROL PANEL */}
      {user && invitations.length > 0 && (
        <section className="relative z-10 py-16 max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Your Active Invitations</h2>
            <p className="mt-2 text-slate-400 text-sm">Modify or open live parameters for your active event documents.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {invitations.map((invitation) => invitation && (
              <div key={invitation._id} className="rounded-2xl border border-slate-900 bg-slate-900/40 backdrop-blur-sm p-6 shadow-xl transition-all duration-300 hover:border-yellow-500/20">
                <h3 className="text-xl font-bold text-yellow-400 tracking-wide">{invitation.title}</h3>
                <p className="mt-2 text-sm text-slate-500 font-mono">/{invitation.slug}</p>
                <div className="flex gap-4 mt-6">
                  <button onClick={() => navigate(`/${invitation.slug}/builder`)} className="bg-gradient-to-r from-yellow-500 to-amber-400 text-slate-950 px-5 h-9 rounded-md text-xs font-bold shadow-md hover:opacity-95 transition-all">Edit Suite</button>
                  <button onClick={() => window.location.href = `/landing.html?slug=${invitation.slug}`} className="border border-yellow-500/30 text-yellow-400 px-5 h-9 rounded-md text-xs font-bold hover:border-yellow-400/80 transition-all">Open Live File</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ADVANCED DUAL-DEVICE LIVE PREVIEW SHOWCASE */}
      <section id="showcase" className="relative z-10 py-20 max-w-[1550px] mx-auto px-6 border-t border-slate-900/40">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
            Cinematic Invitation Showcase
          </h2>
          <p className="mt-3 text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
            Select a template lifecycle phase on the left to seamlessly reload and preview simultaneous cross-platform views on both simulated Laptop and Mobile displays.
          </p>
        </div>

        {/* THREE-COLUMN HORIZONTAL GRID LAYOUT */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-center">
          
          {/* COLUMN 1: PHASE SELECTION CONTROLS (3 Columns) */}
          <div className="xl:col-span-3 space-y-4">
            
            {/* Phase 1 Card */}
            <div 
              onClick={() => handleUpdatePreview('landing', 'bride')}
              className={`rounded-2xl border p-5 cursor-pointer transition-all duration-300 text-left ${
                activePhase === 'landing' 
                  ? 'border-yellow-500 bg-yellow-500/5 shadow-lg shadow-yellow-500/5' 
                  : 'border-slate-900 bg-slate-900/20 hover:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase font-bold tracking-widest text-yellow-500">Phase 01</div>
                {activePhase === 'landing' && <span className="text-[10px] font-semibold text-yellow-400 px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">Active</span>}
              </div>
              <h3 className="text-lg font-bold text-slate-100 mt-1">Cover Landing Page</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Initial elegant greetings block displaying couple portrait image assets, venue details, and user selection options.
              </p>
            </div>

            {/* Phase 2 Card */}
            <div 
              onClick={() => handleUpdatePreview('divine-intro', 'bride')}
              className={`rounded-2xl border p-5 cursor-pointer transition-all duration-300 text-left ${
                activePhase === 'divine-intro' 
                  ? 'border-yellow-500 bg-yellow-500/5 shadow-lg shadow-yellow-500/5' 
                  : 'border-slate-900 bg-slate-900/20 hover:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase font-bold tracking-widest text-yellow-500">Phase 02</div>
                {activePhase === 'divine-intro' && <span className="text-[10px] font-semibold text-yellow-400 px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">Active</span>}
              </div>
              <h3 className="text-lg font-bold text-slate-100 mt-1">Divine Intro Scene</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Captivates users with clean standalone keyframe animations, traditional chants, and divine vector transitions running at 60 FPS.
              </p>
            </div>

            {/* Phase 3 Card */}
            <div 
              onClick={() => handleUpdatePreview('invitation', 'bride')}
              className={`rounded-2xl border p-5 cursor-pointer transition-all duration-300 text-left ${
                activePhase === 'invitation' 
                  ? 'border-yellow-500 bg-yellow-500/5 shadow-lg shadow-yellow-500/5' 
                  : 'border-slate-900 bg-slate-900/20 hover:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase font-bold tracking-widest text-yellow-500">Phase 03</div>
                {activePhase === 'invitation' && <span className="text-[10px] font-semibold text-yellow-400 px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">Active</span>}
              </div>
              <h3 className="text-lg font-bold text-slate-100 mt-1">Main Invitation Suite</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                The main event hub. Assembles groom/bride sections, multi-event ceremony details, map links, and user media archives.
              </p>
            </div>

          </div>

          {/* COLUMN 2: LAPTOP DISPLAY SIMULATOR (6 Columns) */}
          <div className="xl:col-span-6 flex flex-col items-center justify-center w-full group px-2">
            {/* Expanded scale boundaries to give standard web metrics canvas room inside simulation wrapper */}
            <div className="relative w-full max-w-[640px] aspect-[16/10] bg-slate-950 rounded-2xl border-[8px] border-slate-900 shadow-2xl overflow-hidden ring-1 ring-slate-800/40">
              {/* FIXED: Scaled out viewport down smoothly via transform matrix scale rules to completely fix layout sizing constraints */}
              <iframe 
                src={activePreviewUrl} 
                title="Laptop Device Simulation Viewport"
                className="border-0 absolute top-0 left-0"
                style={{
                  width: '300%',
                  height: '300%',
                  transform: 'scale(0.3334)',
                  transformOrigin: 'top left',
                }}
                loading="lazy"
              ></iframe>
            </div>
            {/* Simulated Laptop Base and Notch Stand */}
            <div className="w-[110%] max-w-[700px] h-3 bg-slate-800 rounded-b-xl shadow-xl relative z-10 border-t border-slate-700/30"></div>
            <div className="w-24 h-1.5 bg-slate-900 rounded-b-md shadow-inner"></div>
            <p className="mt-3 text-xs text-slate-500 font-medium tracking-wide">Desktop Layout Viewport (Scaled 50%)</p>
          </div>

          {/* COLUMN 3: MOBILE SMARTPHONE SIMULATOR (3 Columns) */}
          <div className="xl:col-span-3 flex flex-col items-center justify-center w-full">
            <div className="relative w-full max-w-[250px] h-[480px] rounded-[36px] border-[8px] border-slate-900 bg-slate-950 shadow-2xl overflow-hidden ring-1 ring-slate-800/40">
              {/* Smartphone Notch Camera Mask */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-b-lg z-50"></div>
              
              {/* Mobile Viewport Node scaled slightly to guarantee responsive constraints fit mock borders */}
              <iframe 
                src={activePreviewUrl} 
                title="Mobile Smartphone Simulation Viewport"
                className="border-0 absolute top-0 left-0 pointer-events-none select-none"
                style={{
                  width: '200%',
                  height: '200%',
                  transform: 'scale(0.5)',
                  transformOrigin: 'top left',
                }}
                loading="lazy"
              ></iframe>
            </div>
            <p className="mt-4 text-xs text-slate-500 font-medium tracking-wide">Mobile Layout Viewport (Scaled 75%)</p>
          </div>

        </div>
      </section>

      {/* DIVINE THEME DEEP SHOWCASE ENGINE */}
      <section id="themes" className="relative z-10 py-20 max-w-7xl mx-auto px-6 border-t border-slate-900/60">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-wide bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">Divine Theme Collections</h2>
          <p className="mt-2 text-slate-500 text-sm">Selectable template matrices deployed instantly straight into native file nodes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-amber-50/10 text-yellow-400 flex items-center justify-center text-xl mx-auto mb-4">🕉</div>
            <h4 className="font-bold text-slate-200">Ganesha Theme</h4>
            <p className="text-xs text-slate-400 mt-2">Sacred beginnings featuring detailed torans and deep glow matrices.</p>
          </div>
          <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-xl mx-auto mb-4">🪈</div>
            <h4 className="font-bold text-slate-200">Krishna Theme</h4>
            <p className="text-xs text-slate-400 mt-2">Elegant cinematic flows highlighting deep flute-inspired background elements.</p>
          </div>
          <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xl mx-auto mb-4">✨</div>
            <h4 className="font-bold text-slate-200">Vishnu Theme</h4>
            <p className="text-xs text-slate-400 mt-2">Grand majestic layers embedded with traditional royal configurations.</p>
          </div>
          <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center text-xl mx-auto mb-4">🛕</div>
            <h4 className="font-bold text-slate-200">Temple Theme</h4>
            <p className="text-xs text-slate-400 mt-2">Authentic South Indian temple layouts featuring custom architectural aesthetics.</p>
          </div>
        </div>
      </section>

      {/* PLATFORM CAPABILITIES */}
      <section id="capabilities" className="relative z-10 py-20 max-w-7xl mx-auto px-6 border-t border-slate-900/60">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">Platform Capabilities</h2>
          <p className="mt-3 text-slate-400 text-sm">Advanced rendering processes configured to output responsive static code bundles.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-8 shadow-md">
            <div className="text-3xl mb-4">🎬</div>
            <h3 className="text-lg font-bold text-yellow-400">Cinematic Storytelling</h3>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">Build beautiful entry sequences with modular introductory components and customized transition timers.</p>
          </div>
          <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-8 shadow-md">
            <div className="text-3xl mb-4">🛕</div>
            <h3 className="text-lg font-bold text-red-400">Divine Theme Engine</h3>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">Switch configurations instantly via our automated theme constants engine supporting traditional iconography.</p>
          </div>
          <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-8 shadow-md">
            <div className="text-3xl mb-4">📸</div>
            <h3 className="text-lg font-bold text-blue-400">Smart Media Galleries</h3>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">Upload layout images safely processed into lazy-loaded fast arrays preventing layout shifts on devices.</p>
          </div>
        </div>
      </section>

      {/* MASTER SYSTEM FOOTER */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div>&copy; 2026 VS Traditional Invitations. All rights reserved. Powered by zero-dependency compilation systems.</div>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Privacy Infrastructure</span>
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;