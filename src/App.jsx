import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { toPng, toBlob } from 'html-to-image';
import { 
  GraduationCap, 
  Briefcase, 
  TrendingUp, 
  DollarSign, 
  RotateCcw,
  AlertTriangle,
  ShieldAlert,
  Shield,
  Coins,
  Building,
  ArrowRight,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  Mail,
  Check,
  Copy,
  Download,
  Camera,
  Rocket
} from 'lucide-react';

const SHARE_URL = 'https://college-auditor.vercel.app/';
const SHARE_TITLE = 'College ROI Auditor';
const SHARE_TEXT = 'Compare the financial outcomes of college education versus early workforce entry and investing.';

function ShareEngine() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = SHARE_URL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openShare = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
    setIsOpen(false);
  };

  const platforms = [
    {
      name: 'X',
      color: 'bg-black',
      action: () => openShare(`https://twitter.com/intent/tweet?url=${encodeURIComponent(SHARE_URL)}&text=${encodeURIComponent(SHARE_TEXT)}`),
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    },
    {
      name: 'Facebook',
      color: 'bg-[#1877F2]',
      action: () => openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}`),
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    },
    {
      name: 'LinkedIn',
      color: 'bg-[#0A66C2]',
      action: () => openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SHARE_URL)}`),
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    },
    {
      name: 'Reddit',
      color: 'bg-[#FF4500]',
      action: () => openShare(`https://reddit.com/submit?url=${encodeURIComponent(SHARE_URL)}&title=${encodeURIComponent(SHARE_TITLE)}`),
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
    },
    {
      name: 'WhatsApp',
      color: 'bg-[#25D366]',
      action: () => openShare(`https://api.whatsapp.com/send?text=${encodeURIComponent(SHARE_TEXT + ' ' + SHARE_URL)}`),
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    },
    {
      name: 'Email',
      color: 'bg-slate-600',
      action: () => { window.location.href = `mailto:?subject=${encodeURIComponent(SHARE_TITLE)}&body=${encodeURIComponent(SHARE_TEXT + '\n\n' + SHARE_URL)}`; setIsOpen(false); },
      icon: <Mail size={14} />
    },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-[60]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Share Panel */}
      <div className={`fixed bottom-36 md:bottom-24 right-4 md:right-6 z-[70] transition-all duration-300 ease-out ${
        isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      }`}>
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-5 w-[272px]">
          <div className="text-[10px] font-bold font-mono uppercase tracking-widest text-slate-400 mb-4">Share this tool</div>
          <div className="grid grid-cols-4 gap-y-4 gap-x-2">
            {platforms.map((p) => (
              <button
                key={p.name}
                onClick={p.action}
                className="flex flex-col items-center gap-1.5 cursor-pointer group"
              >
                <div className={`w-11 h-11 rounded-full ${p.color} flex items-center justify-center text-white shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-200`}>
                  {p.icon}
                </div>
                <span className="text-[9px] font-mono font-bold text-slate-400 group-hover:text-slate-700 transition-colors">{p.name}</span>
              </button>
            ))}
            {/* Copy Link */}
            <button
              onClick={handleCopy}
              className="flex flex-col items-center gap-1.5 cursor-pointer group"
            >
              <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-200 ${
                copied ? 'bg-emerald-500' : 'bg-indigo-500'
              }`}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </div>
              <span className="text-[9px] font-mono font-bold text-slate-400 group-hover:text-slate-700 transition-colors">
                {copied ? 'Copied!' : 'Copy Link'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-20 md:bottom-8 right-4 md:right-6 z-[70] w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer ${
          isOpen
            ? 'bg-slate-800 shadow-xl'
            : 'bg-gradient-to-tr from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 hover:shadow-xl hover:scale-105'
        }`}
        aria-label="Share"
      >
        {isOpen ? <X size={20} className="text-white" /> : <Share2 size={20} className="text-white" />}
      </button>
    </>
  );
}

const PRESETS = [
  {
    name: "Fed Average (2026)",
    tuition: 30000,
    hsWage: 40000,
    rate: 10,
    collegeWage: 80000,
    description: "Standard national averages. Shows the high school graduate leading by $2.7M at age 50 due to early compounding.",
    badge: "Benchmark"
  },
  {
    name: "Elite Ivy & Corporate",
    tuition: 65000,
    hsWage: 35000,
    rate: 10,
    collegeWage: 150000,
    description: "High tuition is offset by a lucrative corporate post-grad salary. College path catches up and breaks even by age 44.",
    badge: "High Growth"
  },
  {
    name: "Zero Tuition (Scholarship)",
    tuition: 0,
    hsWage: 40000,
    rate: 10,
    collegeWage: 80000,
    description: "College is free, but the student still foregoes 4 years of wages. Breaks even at age 37.",
    badge: "Free Tuition"
  },
  {
    name: "High School Hustler",
    tuition: 5000,
    hsWage: 55000,
    rate: 11,
    collegeWage: 70000,
    description: "Minimal tuition (e.g. trade school) and high entry wages, compounded at 11%. No college path dominates.",
    badge: "Early Trade"
  },
  {
    name: "The Underemployed Degree",
    tuition: 45000,
    hsWage: 40000,
    rate: 10,
    collegeWage: 52000,
    description: "Paying high tuition for a degree, but entering the workforce with a minimal wage premium. The workforce path remains ahead due to lost compounding years.",
    badge: "Underemployed"
  }
];

const CAREER_PATHS = [
  {
    name: "Investment Banker",
    tuition: 85000,
    hsWage: 40000,
    rate: 10,
    collegeWage: 120000,
    wageGrowth: 4,
    jumps: [
      { age: 24, bump: 60 },
      { age: 28, bump: 80 },
      { age: 35, bump: 100 },
    ],
    description: "High Ivy League tuition offset by extreme Wall Street bonuses and aggressive early-career title bumps.",
    badge: "Wall Street"
  },
  {
    name: "Tech Executive",
    tuition: 40000,
    hsWage: 40000,
    rate: 10,
    collegeWage: 80000,
    wageGrowth: 3,
    jumps: [
      { age: 26, bump: 30 },
      { age: 30, bump: 40 },
      { age: 35, bump: 50 },
    ],
    description: "Software engineering path. Major stock grants and promotions at ages 26, 30, and 35.",
    badge: "Big Tech"
  },
  {
    name: "Medical Attending",
    tuition: 60000,
    hsWage: 40000,
    rate: 10,
    collegeWage: 60000,
    wageGrowth: 2,
    jumps: [
      { age: 30, bump: 300 },
      { age: 40, bump: 50 },
    ],
    description: "Low wages during residency, massive 300% bump at age 30 (Attending), partner at 40.",
    badge: "Medicine"
  },
  {
    name: "Big Law Partner",
    tuition: 65000,
    hsWage: 40000,
    rate: 10,
    collegeWage: 120000,
    wageGrowth: 5,
    jumps: [
      { age: 32, bump: 150 }
    ],
    description: "Grinding as an associate with a massive equity/partner bump at age 32.",
    badge: "Law"
  }
];

function App() {
  // Navigation / Routing State
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (newPath) => {
    window.history.pushState({}, '', newPath);
    setPath(newPath);
    window.scrollTo(0, 0);
  };

  // Personal Calculator Slider States
  const [tuition, setTuition] = useState(30000);
  const [hsWage, setHsWage] = useState(40000);
  const [rate, setRate] = useState(10);
  const [collegeWage, setCollegeWage] = useState(80000);
  const [wageGrowth, setWageGrowth] = useState(3);
  const [jumps, setJumps] = useState([]);
  const [activePreset, setActivePreset] = useState("Fed Average (2026)");
  
  // Navigation & Carousel states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Carousel Drag to Scroll States
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragDistance(0);
    if (!carouselRef.current) return;
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragMove = (e) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    setDragDistance((prev) => prev + Math.abs(x - startX));
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };
  // Interactive Chart States
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const svgRef = useRef(null);
  const shareCardRef = useRef(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isSnapshotting, setIsSnapshotting] = useState(false);
  const [snapshotDone, setSnapshotDone] = useState('');

  const handleShareCapture = useCallback(async (action) => {
    if (!shareCardRef.current || isSnapshotting) return;
    setIsSnapshotting(true);
    try {
      await new Promise(r => setTimeout(r, 100)); // allow paints
      const options = {
        backgroundColor: '#ffffff',
        pixelRatio: 2,
        cacheBust: true,
      };

      if (action === 'download') {
        const dataUrl = await toPng(shareCardRef.current, options);
        const link = document.createElement('a');
        link.download = `college-roi-audit-${Date.now()}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setSnapshotDone('downloaded');
      } else if (action === 'copy') {
        try {
          const blob = await toBlob(shareCardRef.current, options);
          if (blob) {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            setSnapshotDone('copied');
          }
        } catch (copyErr) {
          console.warn('Clipboard write failed, falling back to download', copyErr);
          const dataUrl = await toPng(shareCardRef.current, options);
          const link = document.createElement('a');
          link.download = `college-roi-audit-${Date.now()}.png`;
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setSnapshotDone('downloaded');
        }
      }
      setTimeout(() => setSnapshotDone(''), 2500);
    } catch (err) {
      console.error('Chart snapshot failed:', err);
    } finally {
      setIsSnapshotting(false);
    }
  }, [isSnapshotting]);

  const handleApplyPreset = (preset) => {
    setTuition(preset.tuition);
    setHsWage(preset.hsWage);
    setRate(preset.rate);
    setCollegeWage(preset.collegeWage);
    setWageGrowth(preset.wageGrowth || 3);
    setJumps(preset.jumps || []);
    setActivePreset(preset.name);
  };

  // Math Calculations (Memoized)
  const results = useMemo(() => {
    const r = rate / 100;
    const g = wageGrowth / 100;

    // Calculate baseline wage/contribution levels at age 22 (t = 4) for UI details
    const hsCareerWage = hsWage * Math.pow(1 + g, 4);
    const hsContribution = hsCareerWage * 0.10;
    const collegePremium = Math.max(0, collegeWage - hsCareerWage);
    const collegeContribution = hsContribution + (0.50 * collegePremium);

    const data = [
      {
        year: 0,
        age: 18,
        balanceA: 0,
        balanceB: 0,
        investmentA: tuition + hsWage,
        investmentB: 0,
      }
    ];

    let balA = 0;
    let balB = 0;
    let totalInvestedA = 0;
    let totalInvestedB = 0;
    
    let currentHsWage = hsWage;
    let currentCollegeWage = collegeWage;

    for (let t = 1; t <= 32; t++) {
      const age = 18 + t;
      let invA = 0;
      let invB = 0;

      if (t > 1) {
        currentHsWage *= (1 + g);
      }
      
      if (t > 5) {
        const jump = jumps.find(j => j.age === age);
        if (jump && jump.bump > 0) {
          currentCollegeWage *= (1 + (jump.bump / 100));
        } else {
          currentCollegeWage *= (1 + g);
        }
      }

      if (t <= 4) {
        invA = tuition + currentHsWage;
        balA = (balA + invA) * (1 + r);
        invB = 0;
        balB = 0;
        totalInvestedA += invA;
      } else {
        invA = currentHsWage * 0.10;
        balA = (balA + invA) * (1 + r);
        
        const premium = Math.max(0, currentCollegeWage - currentHsWage);
        invB = (currentHsWage * 0.10) + (0.50 * premium);
        balB = (balB + invB) * (1 + r);
        
        totalInvestedA += invA;
        totalInvestedB += invB;
      }

      data.push({
        year: t,
        age,
        balanceA: Math.round(balA),
        balanceB: Math.round(balB),
        investmentA: Math.round(invA),
        investmentB: Math.round(invB),
      });
    }

    let breakEvenAge = null;
    for (let t = 5; t <= 32; t++) {
      if (data[t].balanceB > data[t].balanceA) {
        breakEvenAge = 18 + t;
        break;
      }
    }

    const finalA = data[32].balanceA;
    const finalB = data[32].balanceB;
    const delta = finalA - finalB;

    return {
      data,
      finalA,
      finalB,
      delta,
      hsCareerWage,
      collegePremium,
      hsContribution,
      collegeContribution,
      breakEvenAge,
      totalInvestedA,
      totalInvestedB
    };
  }, [tuition, hsWage, rate, collegeWage, wageGrowth, jumps]);

  const {
    data,
    finalA,
    finalB,
    delta,
    hsCareerWage,
    collegePremium,
    hsContribution,
    collegeContribution,
    breakEvenAge,
    totalInvestedA,
    totalInvestedB
  } = results;

  const manualJump = jumps.length === 1 ? jumps[0] : { age: 30, bump: 0 };
  const promotionBump = jumps.length > 1 ? 0 : manualJump.bump;
  const promotionAge = jumps.length > 1 ? 30 : manualJump.age;

  const handleManualBumpChange = (val) => {
    setJumps([{ age: promotionAge, bump: val }]);
    setActivePreset("");
  };
  const handleManualAgeChange = (val) => {
    setJumps([{ age: val, bump: promotionBump }]);
    setActivePreset("");
  };

  // Chart Coordinates mapping
  const chartWidth = 600;
  const chartHeight = 350;
  const paddingLeft = 70;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 40;

  const maxVal = Math.max(...data.map(d => Math.max(d.balanceA, d.balanceB)), 1000000);
  const magnitude = Math.pow(10, Math.floor(Math.log10(maxVal)));
  const roundedMax = Math.ceil(maxVal / (magnitude / 2)) * (magnitude / 2);

  const xOf = (age) => paddingLeft + ((age - 18) / 32) * (chartWidth - paddingLeft - paddingRight);
  const yOf = (val) => chartHeight - paddingBottom - (val / roundedMax) * (chartHeight - paddingTop - paddingBottom);

  const pathAD = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xOf(d.age)} ${yOf(d.balanceA)}`).join(' ');
  const areaAD = `${pathAD} L ${xOf(50)} ${chartHeight - paddingBottom} L ${xOf(18)} ${chartHeight - paddingBottom} Z`;

  const pathBD = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xOf(d.age)} ${yOf(d.balanceB)}`).join(' ');
  const areaBD = `${pathBD} L ${xOf(50)} ${chartHeight - paddingBottom} L ${xOf(18)} ${chartHeight - paddingBottom} Z`;

  const gridLines = useMemo(() => {
    const lines = [];
    const stepCount = 4;
    for (let i = 1; i <= stepCount; i++) {
      lines.push((roundedMax / stepCount) * i);
    }
    return lines;
  }, [roundedMax]);

  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX;
    const relativeX = (clientX - rect.left) / rect.width;
    
    const paddingLeftRatio = paddingLeft / chartWidth;
    const paddingRightRatio = paddingRight / chartWidth;
    const chartRatio = 1 - paddingLeftRatio - paddingRightRatio;
    
    const relativeChartX = (relativeX - paddingLeftRatio) / chartRatio;
    const ageIndex = Math.min(32, Math.max(0, Math.round(relativeChartX * 32)));
    setHoveredIndex(ageIndex);
  };

  const handleTouchMove = (e) => {
    if (!svgRef.current || !e.touches[0]) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.touches[0].clientX;
    const relativeX = (clientX - rect.left) / rect.width;
    
    const paddingLeftRatio = paddingLeft / chartWidth;
    const paddingRightRatio = paddingRight / chartWidth;
    const chartRatio = 1 - paddingLeftRatio - paddingRightRatio;
    
    const relativeChartX = (relativeX - paddingLeftRatio) / chartRatio;
    const ageIndex = Math.min(32, Math.max(0, Math.round(relativeChartX * 32)));
    setHoveredIndex(ageIndex);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const formatCurrency = (val, maxDecimals = 0) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: maxDecimals
    }).format(val);
  };

  const formatAbbreviation = (val) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 grid-pattern radial-glow pb-20 text-slate-900">
      
      {/* Unified Responsive Sticky Header */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { navigate('/'); setIsMenuOpen(false); }}>
            <div className="relative w-8 h-8 rounded bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center font-mono font-bold text-white text-sm tracking-tighter shadow-sm">
              S
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[9px] uppercase tracking-widest text-slate-500 font-extrabold font-mono">FINANCIAL FORECAST</span>
              <span className="text-sm font-bold tracking-tight font-mono text-slate-900">COLLEGE ROI AUDITOR</span>
            </div>
          </div>

          {/* Desktop Navigation tabs */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all duration-200 cursor-pointer whitespace-nowrap ${
                path === '/' || path === ''
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Personal Cost
            </button>
            <button
              onClick={() => navigate('/the-macro-fix')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all duration-200 cursor-pointer whitespace-nowrap ${
                path === '/the-macro-fix'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              The Macro Fix
            </button>
            <button
              onClick={() => navigate('/letter-to-the-left')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all duration-200 cursor-pointer whitespace-nowrap ${
                path === '/letter-to-the-left'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Letter to the Left
            </button>
            <button
              onClick={() => navigate('/letter-to-the-right')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all duration-200 cursor-pointer whitespace-nowrap ${
                path === '/letter-to-the-right'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Letter to the Right
            </button>
            <button
              onClick={() => navigate('/the-stress-test')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all duration-200 cursor-pointer whitespace-nowrap ${
                path === '/the-stress-test'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              The Stress Test
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-200 cursor-pointer"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white py-2 px-4 space-y-1 shadow-inner animate-fade-in">
            <button
              onClick={() => { navigate('/'); setIsMenuOpen(false); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold font-mono transition-all duration-200 ${
                path === '/' || path === ''
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Personal Cost
            </button>
            <button
              onClick={() => { navigate('/the-macro-fix'); setIsMenuOpen(false); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold font-mono transition-all duration-200 ${
                path === '/the-macro-fix'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              The Macro Fix
            </button>
            <button
              onClick={() => { navigate('/letter-to-the-left'); setIsMenuOpen(false); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold font-mono transition-all duration-200 ${
                path === '/letter-to-the-left'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Letter to the Left
            </button>
            <button
              onClick={() => { navigate('/letter-to-the-right'); setIsMenuOpen(false); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold font-mono transition-all duration-200 ${
                path === '/letter-to-the-right'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Letter to the Right
            </button>
            <button
              onClick={() => { navigate('/the-stress-test'); setIsMenuOpen(false); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold font-mono transition-all duration-200 ${
                path === '/the-stress-test'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              The Stress Test
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {path === '/the-stress-test' ? (
          <div className="space-y-10 animate-fade-in">
            {/* Header section */}
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-200 bg-amber-50 text-amber-700 text-xs font-bold mb-3 shadow-sm">
                <AlertTriangle size={13} /> Hostile Economic Attack
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-mono leading-none text-slate-900">
                The Stress Test
              </h1>
              <p className="mt-3 text-base sm:text-lg text-slate-500 max-w-3xl leading-relaxed font-medium">
                Dismantling the three most aggressive macroeconomic attacks against the Sovereign Equity plan.
              </p>
            </div>

            <div className="space-y-8">
              {/* Attack 1 */}
              <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500 rounded-l-2xl"></div>
                <h3 className="text-sm uppercase tracking-widest font-extrabold font-mono text-amber-600 mb-2">Hostile Attack 1: Housing Hyperinflation</h3>
                <h4 className="text-xl font-bold text-slate-900 mb-4">"If everyone has a $100k trust at age 26, it won't create wealth—it will just cause starter homes to inflate by exactly $100k, enriching Boomer sellers and private equity."</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider mb-1 block">The Neutralization</span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    This assumes the capital competes for the same hyper-inflated coastal housing supply. In reality, a 26-year-old with a $100k trust isn't going to buy a $1.5M shack in San Francisco—they are going to take that capital back to a dying rust-belt municipality or a rural hometown where $100k actually buys a house outright or serves as a massive, market-dominating down payment. It acts as a <span className="font-bold text-slate-900">decentralization engine</span>, pulling capital out of coastal mega-cities and injecting it directly into local tax bases that desperately need revitalization.
                  </p>
                </div>
              </div>

              {/* Attack 2 */}
              <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500 rounded-l-2xl"></div>
                <h3 className="text-sm uppercase tracking-widest font-extrabold font-mono text-amber-600 mb-2">Hostile Attack 2: The Oligopoly Handout</h3>
                <h4 className="text-xl font-bold text-slate-900 mb-4">"You are legally guaranteeing that BlackRock, Vanguard, and State Street receive $200 Billion in new AUM every single year. You are handing the 'Big Three' absolute voting power over America."</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider mb-1 block">The Neutralization</span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    BlackRock and Vanguard already own the boardrooms. More importantly, visionary founders like Jensen Huang, Elon Musk, and Mark Zuckerberg are already driving the AI revolution and the future of the American economy. If that concentration of power is already locked in by design, the government’s job shouldn't be to fight a losing, punitive battle against it—it should be to <span className="font-bold text-slate-900">hitch the working class to that rocket ship</span>. The EA plan doesn't create the power structure; it just democratizes the returns, letting poor kids ride the exact same compounding asset wave as the billionaires.
                  </p>
                </div>
              </div>

              {/* Attack 3 */}
              <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500 rounded-l-2xl"></div>
                <h3 className="text-sm uppercase tracking-widest font-extrabold font-mono text-amber-600 mb-2">Hostile Attack 3: The Destruction of Upward Mobility</h3>
                <h4 className="text-xl font-bold text-slate-900 mb-4">"By eliminating federal loans, private lenders will refuse to underwrite poor kids. You are legally barring the working class from attending top-tier, elite universities."</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider mb-1 block">The Neutralization</span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Private lenders are entirely profit-driven, which makes them highly rational. If a kid from a poor zip code has a 4.0 GPA, incredible SAT scores, and wants to study Engineering at MIT, private lenders will absolutely fight to underwrite that loan at a low interest rate because the ROI is practically guaranteed. The current federal system subsidizes <span className="italic text-slate-900">mediocrity</span> by blindly lending the exact same amount to a C-student studying a dead-end major as it does to an aerospace engineer. Private underwriting naturally filters for merit and high-GDP-producing degrees. And the ultra-rich? They already have their own velvet rope—this plan doesn't try to solve the existence of rich people; it stops bankrupting the working class to subsidize bloated college administrators.
                  </p>
                </div>
              </div>

              {/* Attack 4 */}
              <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500 rounded-l-2xl"></div>
                <h3 className="text-sm uppercase tracking-widest font-extrabold font-mono text-amber-600 mb-2">Hostile Attack 4: The Outlier CEO Trap</h3>
                <h4 className="text-xl font-bold text-slate-900 mb-4">"What if an outlier genius kid is destined to become the CEO of an S&P 500 company, but they get trapped in your 'blue-collar' index fund fantasy instead of going to Harvard?"</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider mb-1 block">The Neutralization</span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    This completely misunderstands both outlier success and the design of the Sovereign Equity plan. First, the most legendary S&P 500 CEOs and founders of our era—Bill Gates, Steve Jobs, Mark Zuckerberg—either dropped out of college or bypassed the traditional credentialing path because their raw talent couldn't be contained by a classroom. Second, this plan doesn't lock anyone into a blue-collar path; it provides a **liquid launchpad**. A kid with a $100k trust at age 26 has the ultimate risk-buffer. Instead of grinding in a cubicle for 10 years to pay off Ivy League debt, they can quit their job, move into a garage, and launch a startup or run for office. We don't trap geniuses—we give them the sovereign capital to bypass corporate gatekeepers.
                  </p>
                </div>
              </div>

              {/* Attack 5 */}
              <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500 rounded-l-2xl"></div>
                <h3 className="text-sm uppercase tracking-widest font-extrabold font-mono text-amber-600 mb-2">Hostile Attack 5: The Phantom Capital Fallacy</h3>
                <h4 className="text-xl font-bold text-slate-900 mb-4">"If a working-class kid doesn't go to college, they don't 'save' $50,000/year in tuition because they never had that cash in the first place—they would have funded it with debt. You cannot compound 'avoided debt' in the S&P 500."</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider mb-1 block">The Neutralization</span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    This is the crux of the debate: if you don't have the cash, how do you pay for college? You borrow it. By choosing college, you commit to starting your career at age 22 with <span className="font-bold text-slate-900">-$200,000 in net worth</span>. By choosing the workforce, you start at age 22 with <span className="font-bold text-slate-900">$0 in debt</span> and actual cash savings from your job. In corporate finance, a debt reduction of $200k is mathematically identical to a cash asset of $200k. The compound model simply sets the baseline at $0 to show the net wealth difference. Furthermore, under the Sovereign Equity policy, the government redirects the $50k it would have backed in student loans directly into the kid's locked S&P 500 trust. The capital isn't phantom—it's the exact same tax dollar, redirected from college administrators' salaries to the working class's balance sheets.
                  </p>
                </div>
              </div>
              {/* Attack 6 */}
              <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500 rounded-l-2xl"></div>
                <h3 className="text-sm uppercase tracking-widest font-extrabold font-mono text-amber-600 mb-2">Hostile Attack 6: The College Town Collapse</h3>
                <h4 className="text-xl font-bold text-slate-900 mb-4">"If millions of kids bypass traditional four-year degrees, the local economies of small college towns will face catastrophic collapse, causing mass bankruptcy and localized recessions."</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider mb-1 block">The Neutralization</span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    It is true that universities relying on trapping teenagers in debt to fund administrative bloat will face a reckoning, and their highly concentrated local economies will contract. This is creative destruction. However, this is not wealth destruction; it is <span className="font-bold text-slate-900">wealth redistribution</span>. Right now, billions of dollars are sucked out of rural towns, small cities, and working-class neighborhoods and funneled directly into these elite, isolated college towns. By keeping 18-year-olds in the workforce with their own capital, that money stops flowing to a handful of university zip codes and is instead injected directly back into their hometowns. The "collapse" of a college town's artificial, debt-subsidized economy is simply the revitalization of a thousand dying small towns across America that finally get to keep their youth and their capital.
                  </p>
                </div>
              </div>
            </div >


            {/* Call to Action Footer */}
            <div className="text-center pt-4">
              <button
                onClick={() => navigate('/the-macro-fix')}
                className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl font-bold font-mono text-sm transition-all duration-200 shadow-sm cursor-pointer hover:translate-y-[-1px]"
              >
                <ArrowRight size={16} className="rotate-180" />
                <span>Return to The Macro Fix</span>
              </button>
            </div>

          </div>
        ) : path === '/letter-to-the-right' ? (
          <div className="space-y-10 animate-fade-in">
            {/* Header section */}
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-200 bg-sky-50 text-sky-700 text-xs font-bold mb-3 shadow-sm">
                <Shield size={13} /> Conservative Policy Defense
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-mono leading-none text-slate-900">
                A Letter to the Right
              </h1>
              <p className="mt-3 text-base sm:text-lg text-slate-500 max-w-3xl leading-relaxed font-medium">
                Addressing conservative critiques on replacing the bloated federal student loan apparatus with free-market equity.
              </p>
            </div>

            <div className="space-y-8">
              {/* Critique 1 */}
              <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-sky-500 rounded-l-2xl"></div>
                <h3 className="text-sm uppercase tracking-widest font-extrabold font-mono text-sky-600 mb-2">Critique 1</h3>
                <h4 className="text-xl font-bold text-slate-900 mb-4">"This is a massive government entitlement. We should not be handing out $50,000 to every 18-year-old."</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider mb-1 block">The Reality</span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    The current left-wing demand is to cancel all student debt—a direct, liquid handout that costs taxpayers billions. The Equity Account is not a handout; it is a highly restricted, illiquid investment. By shifting from issuing $100 billion a year in toxic, subprime federal loans (which already lose 44 cents on the dollar) to a locked S&P 500 trust, the government eventually recaptures its outlay through capital gains taxes and massive corporate growth. It is the ultimate free-market alternative to perpetual bureaucratic welfare.
                  </p>
                </div>
              </div>

              {/* Critique 2 */}
              <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-sky-500 rounded-l-2xl"></div>
                <h3 className="text-sm uppercase tracking-widest font-extrabold font-mono text-sky-600 mb-2">Critique 2</h3>
                <h4 className="text-xl font-bold text-slate-900 mb-4">"If you give kids this safety net, they won't work. It destroys the incentive for labor."</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider mb-1 block">The Reality</span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    The exact opposite is true. The funds are locked behind a severe age-inverted penalty, meaning they cannot be used to fund a lazy lifestyle in a recipient's twenties. The only way to live well is to work. However, because their long-term retirement and baseline security are fundamentally handled by the trust, they do not become dependents of the state later in life. It forces short-term labor discipline while guaranteeing long-term fiscal independence from the government.
                  </p>
                </div>
              </div>

              {/* Critique 3 */}
              <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-sky-500 rounded-l-2xl"></div>
                <h3 className="text-sm uppercase tracking-widest font-extrabold font-mono text-sky-600 mb-2">Critique 3</h3>
                <h4 className="text-xl font-bold text-slate-900 mb-4">"We can't afford this. This is a massive deficit spend that expands the federal balance sheet."</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider mb-1 block">The Reality</span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    The current Department of Education is running a shadow deficit. They originate billions in loans that will never be repaid, creating massive, unbacked liabilities on the national balance sheet. An equity endowment caps the bleeding. It converts an open-ended bureaucratic sinkhole into a finite capital injection that grows alongside the private sector, vastly shrinking the size, scope, and administrative bloat of the federal education apparatus.
                  </p>
                </div>
              </div>

              {/* Critique 4 */}
              <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-sky-500 rounded-l-2xl"></div>
                <h3 className="text-sm uppercase tracking-widest font-extrabold font-mono text-sky-600 mb-2">Critique 4</h3>
                <h4 className="text-xl font-bold text-slate-900 mb-4">"Why not just privatize lending entirely and get the government out of it?"</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider mb-1 block">The Reality</span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    By providing a baseline $50k equity endowment, we *are* forcing the rest of the market into private underwriting. Currently, the federal government crowds out private capital by offering limitless, subsidized debt. By pivoting to an equity floor, any tuition exceeding that $50k must be covered by private lenders who will aggressively audit degree ROIs before issuing loans. This fundamentally restores market discipline to university pricing while converting a generation of dependents into a generation of capitalists.
                  </p>
                </div>
              </div>

              {/* Critique 5 */}
              <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-sky-500 rounded-l-2xl"></div>
                <h3 className="text-sm uppercase tracking-widest font-extrabold font-mono text-sky-600 mb-2">Critique 5</h3>
                <h4 className="text-xl font-bold text-slate-900 mb-4">"Why should we compromise with liberals to fix this? Let's just block student loan forgiveness and do nothing."</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider mb-1 block">The Reality</span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Doing nothing is exactly what allows the shadow deficit to explode. Currently, the system functions as a covert bailout to coastal universities, subsidized by the working-class taxpayer. Giving the next generation a free-market equity choice permanently shuts down the federal student loan spigot. It is politically viable across the aisle because it replaces the toxic student debt cycle with a system that actually creates asset-owning citizens, making it vastly superior to passing nothing and watching the fiscal hole deepen.
                  </p>
                </div>
              </div>

              {/* Critique 6 */}
              <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-sky-500 rounded-l-2xl"></div>
                <h3 className="text-sm uppercase tracking-widest font-extrabold font-mono text-sky-600 mb-2">Critique 6</h3>
                <h4 className="text-xl font-bold text-slate-900 mb-4">"If we don't push kids to go to college, university economies will collapse."</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider mb-1 block">The Reality</span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    That is a feature, not a bug. The current system systematically drains talent and capital from rural communities and working-class hometowns, funneling it directly into bloated coastal cities and university hubs. By giving 18-year-olds compounding capital, they can enter the trades or the local workforce immediately. Because they didn't take on massive debt, they can eventually use their trust to buy a house in their hometown, keeping their labor, families, and capital firmly rooted in their local community.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action Footer */}
            <div className="text-center pt-4">
              <button
                onClick={() => navigate('/the-macro-fix')}
                className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl font-bold font-mono text-sm transition-all duration-200 shadow-sm cursor-pointer hover:translate-y-[-1px]"
              >
                <ArrowRight size={16} className="rotate-180" />
                <span>Return to The Macro Fix</span>
              </button>
            </div>

          </div>
        ) : path === '/letter-to-the-left' ? (
          <div className="space-y-10 animate-fade-in">
            {/* Header section */}
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-bold mb-3 shadow-sm">
                <Briefcase size={13} /> Progressive Policy Defense
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-mono leading-none text-slate-900">
                A Letter to the Left
              </h1>
              <p className="mt-3 text-base sm:text-lg text-slate-500 max-w-3xl leading-relaxed font-medium">
                Addressing progressive critiques on transitioning from federal subprime student loans to universal sovereign equity.
              </p>
            </div>

            <div className="space-y-8">
              {/* Critique 1 */}
              <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500 rounded-l-2xl"></div>
                <h3 className="text-sm uppercase tracking-widest font-extrabold font-mono text-rose-600 mb-2">Critique 1</h3>
                <h4 className="text-xl font-bold text-slate-900 mb-4">"This is just a massive handout to Wall Street."</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider mb-1 block">The Reality</span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    By locking the capital exclusively in strictly regulated, ultra-low-fee, passive S&P 500 index funds, we are bypassing active Wall Street asset managers entirely. We are not paying exorbitant hedge fund fees; we are broadly capturing the growth of the American economy. Moreover, the current system is already a handout to a different, less efficient cartel: bloated university administrations that absorb federal debt without delivering proportional wage premiums.
                  </p>
                </div>
              </div>

              {/* Critique 2 */}
              <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500 rounded-l-2xl"></div>
                <h3 className="text-sm uppercase tracking-widest font-extrabold font-mono text-rose-600 mb-2">Critique 2</h3>
                <h4 className="text-xl font-bold text-slate-900 mb-4">"Fifty thousand dollars isn't nearly enough to cover a modern 4-year degree."</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider mb-1 block">The Reality</span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    By establishing a fixed, finite equity endowment, we break the university cartel's ability to endlessly inflate tuition. When institutions know the consumer is spending finite, compounding asset equity rather than signing blank debt checks, colleges will be forced to aggressively compete on price, driving tuition costs down to fit within the $50k baseline. If a premium institution still demands higher tuition, the gap will be filled by private underwriting—forcing private lenders to rigorously evaluate the student's actual degree ROI before issuing a loan, rather than blindly writing checks backed by the federal government.
                  </p>
                </div>
              </div>

              {/* Critique 3 */}
              <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500 rounded-l-2xl"></div>
                <h3 className="text-sm uppercase tracking-widest font-extrabold font-mono text-rose-600 mb-2">Critique 3</h3>
                <h4 className="text-xl font-bold text-slate-900 mb-4">"This widens inequality. Wealthy kids will let the trust compound, while working-class kids must drain it for tuition."</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider mb-1 block">The Reality</span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    The status quo already structurally devastates the working class by chaining them to a lifetime of compounding student debt, directly blocking homeownership and family formation. An equity trust guarantees that working-class citizens—whether they utilize the funds for an affordable degree or enter the workforce early—never start life in the red. It fundamentally democratizes capital, bringing the working class into the asset-owning class from day one, completely eradicating predatory debt servicing.
                  </p>
                </div>
              </div>

              {/* Critique 4 */}
              <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500 rounded-l-2xl"></div>
                <h3 className="text-sm uppercase tracking-widest font-extrabold font-mono text-rose-600 mb-2">Critique 4</h3>
                <h4 className="text-xl font-bold text-slate-900 mb-4">"You are forcing 18-year-olds to gamble their future on the stock market. A crash could wipe out an entire generation."</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider mb-1 block">The Reality</span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    The S&P 500 has never lost money over any rolling 20-year period in modern history. By structuring this with age-inverted penalty locks, we insulate young adults from short-term volatility and enforce long-term holding periods. Unlike the current debt system—where an economic downturn means immediate loan defaults, wage garnishment, and ruined credit scores—an equity trust simply rides out the dip, requiring zero monthly payments from a distressed beneficiary.
                  </p>
                </div>
              </div>

              {/* Critique 5 */}
              <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500 rounded-l-2xl"></div>
                <h3 className="text-sm uppercase tracking-widest font-extrabold font-mono text-rose-600 mb-2">Critique 5</h3>
                <h4 className="text-xl font-bold text-slate-900 mb-4">"A universal $50,000 grant is regressive. It ignores the wealth gap by giving the same amount to the child of a billionaire as a child in poverty."</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider mb-1 block">The Reality</span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Means-testing creates bureaucratic friction, stigmatization, and phase-out cliffs that routinely punish the middle class. A universal grant operates like Social Security—it guarantees absolute political durability. More importantly, $50k compounding at 10% is mathematically life-changing for a poverty-line family (creating a floor of millions in generational wealth), while it is statistically irrelevant to a billionaire's estate. The wealth gap is closed by establishing a massive absolute floor of capital ownership for the poorest deciles, not by means-testing the top 1%.
                  </p>
                </div>
              </div>

              {/* Critique 6 */}
              <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500 rounded-l-2xl"></div>
                <h3 className="text-sm uppercase tracking-widest font-extrabold font-mono text-rose-600 mb-2">Critique 6</h3>
                <h4 className="text-xl font-bold text-slate-900 mb-4">"This treats education purely as a financial calculation. College is a public good. Tying it to ROI kills the humanities."</h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider mb-1 block">The Reality</span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    The current system already structurally destroys the humanities by saddling arts majors with non-dischargeable debt they can mathematically never repay—forcing them into corporate jobs just to survive their loan payments. An equity trust actually protects the arts. Because the funds are an absolute grant, a student can choose to spend their trust on a humanities degree without signing up for lifelong indentured servitude. It restores the dignity of true academic choice by eliminating the trap of predatory loan servicing.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action Footer */}
            <div className="text-center pt-4">
              <button
                onClick={() => navigate('/the-macro-fix')}
                className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl font-bold font-mono text-sm transition-all duration-200 shadow-sm cursor-pointer hover:translate-y-[-1px]"
              >
                <ArrowRight size={16} className="rotate-180" />
                <span>Return to The Macro Fix</span>
              </button>
            </div>

          </div>
        ) : path === '/the-macro-fix' ? (
          <div className="space-y-10 animate-fade-in">
            {/* Header section */}
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-200 bg-rose-50 text-rose-700 text-xs font-bold mb-3 shadow-sm">
                <ShieldAlert size={13} /> CBO Student Loan Accounting Crisis
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-mono leading-none text-slate-900">
                The Federal Black Hole
              </h1>
              <p className="mt-3 text-base sm:text-lg text-slate-500 max-w-3xl leading-relaxed font-medium">
                The Government is Financing a Subprime Bubble.
              </p>
            </div>

            {/* Stark CBO Data Block */}
            <div className="rounded-2xl bg-white p-6 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
              <h3 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-widest mb-6">CBO Fair-Value Audit Projections</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2 border-l-2 border-rose-500 pl-4">
                  <span className="text-4xl sm:text-5xl font-black font-mono text-rose-600">44%</span>
                  <h4 className="text-sm font-bold text-slate-900">Subsidy Rate</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    The CBO calculates a 44% subsidy rate on Subsidized Student Loans. For every dollar lent, the taxpayer loses 44 cents due to defaults, write-offs, and delayed repayments.
                  </p>
                </div>
                
                <div className="space-y-2 border-l-2 border-amber-500 pl-4">
                  <span className="text-4xl sm:text-5xl font-black font-mono text-amber-600">17%+</span>
                  <h4 className="text-sm font-bold text-slate-900">Serious Delinquency</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Over 17% of active student loan borrowers are 90+ days delinquent. The debt load blocks young professionals from acquiring housing and forming households.
                  </p>
                </div>

                <div className="space-y-2 border-l-2 border-slate-400 pl-4">
                  <span className="text-2xl sm:text-3xl font-black font-mono block pt-2 text-slate-400">TOXIC BY DESIGN</span>
                  <h4 className="text-sm font-bold text-slate-900">Systemic Loss Loop</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    The current model is mathematically built to bleed billions while inflating university administration budgets and locking graduates in subprime liability.
                  </p>
                </div>
              </div>
            </div>

            {/* Architecture Comparison (Side-by-Side Cards) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Card: The Broken Debt Model */}
              <div className="rounded-2xl bg-white p-6 sm:p-8 border-t-4 border-t-rose-500 border border-slate-200 shadow-sm">
                <div className="flex items-center space-x-2 text-rose-600 mb-6">
                  <ShieldAlert size={20} />
                  <h3 className="text-lg font-bold font-mono uppercase tracking-wider text-slate-900">Current Path: Toxic Liability</h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-3 relative pb-6 border-l-2 border-slate-100 pl-6 ml-3">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center font-bold text-[8px] text-white">1</div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Taxpayer Debt Capital</h4>
                      <p className="text-xs text-slate-500 mt-1 font-medium">Government prints capital and floats subprime loans to teenagers with zero collateral requirements.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 relative pb-6 border-l-2 border-slate-100 pl-6 ml-3">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center font-bold text-[8px] text-white">2</div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Blank Check to Universities</h4>
                      <p className="text-xs text-slate-500 mt-1 font-medium">Universities inflate tuitions directly, expanding compliance structures and executive departments.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 relative pb-6 border-l-2 border-slate-100 pl-6 ml-3">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center font-bold text-[8px] text-white">3</div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">41.5% Underemployment Penalty</h4>
                      <p className="text-xs text-slate-500 mt-1 font-medium">Graduates enter generic job slots that do not require degrees, generating weak wage premiums.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 relative pb-6 border-l-2 border-slate-100 pl-6 ml-3">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center font-bold text-[8px] text-white">4</div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Debt Default Accumulation</h4>
                      <p className="text-xs text-slate-500 mt-1 font-medium">Interest compounding forces defaults, causing federal treasury losses and taxpayer bailouts.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 pl-6 ml-3 relative">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-rose-600 flex items-center justify-center font-bold text-[8px] text-white">5</div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Generational Economic Drag</h4>
                      <p className="text-xs text-slate-500 mt-1 font-medium">Severe drop in household formation, marriage, child-birth, and local investment portfolios.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Card: The EA Solution */}
              <div className="rounded-2xl bg-white p-6 sm:p-8 border-t-4 border-t-emerald-500 border border-slate-200 shadow-sm">
                <div className="flex items-center space-x-2 text-emerald-600 mb-6">
                  <Shield size={20} />
                  <h3 className="text-lg font-bold font-mono uppercase tracking-wider text-slate-900">The Fix: Sovereign Equity</h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-3 relative pb-6 border-l-2 border-slate-100 pl-6 ml-3">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-[8px] text-white">1</div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Taxpayer Equity Endowment (EA)</h4>
                      <p className="text-xs text-slate-500 mt-1 font-medium">A one-time $50,000 grant is placed in a tax-deferred trust at Age 18. It can be used for higher education if desired—but because students spend actual compounding assets rather than a blank debt check, it forces universities to defend tuition prices against real audits of their market ROI.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 relative pb-6 border-l-2 border-slate-100 pl-6 ml-3">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-[8px] text-white">2</div>
                    <div className="w-full">
                      <h4 className="text-sm font-bold text-slate-900">Age-Inverted Penalty Lock</h4>
                      <p className="text-xs text-slate-500 mt-1 font-medium mb-3">Funds are strictly locked in an S&P 500 index trust with a decaying early-withdrawal penalty structure designed to enforce long-term compounding:</p>
                      <div className="bg-emerald-50/50 rounded-lg p-3 text-[10px] sm:text-[11px] font-mono font-bold border border-emerald-100 space-y-1.5">
                        <div className="flex justify-between text-rose-600"><span>Ages 18-25:</span> <span>90% Penalty + Income Tax</span></div>
                        <div className="flex justify-between text-amber-600"><span>Ages 26-35:</span> <span>50% Penalty + Income Tax</span></div>
                        <div className="flex justify-between text-emerald-600"><span>Ages 36-50:</span> <span>20% Penalty + Income Tax</span></div>
                        <div className="flex justify-between text-slate-800 pt-2 border-t border-emerald-200/60 mt-1"><span>First-Time Home Purchase:</span> <span>0% Penalty</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 relative pb-6 border-l-2 border-slate-100 pl-6 ml-3">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-[8px] text-white">3</div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">0% Sovereign Default Risk</h4>
                      <p className="text-xs text-slate-500 mt-1 font-medium">Because this is structured as asset ownership (equity), there are no payments to track and zero default risks.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 relative pb-6 border-l-2 border-slate-100 pl-6 ml-3">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-[8px] text-white">4</div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Tax-Deferred Household Formation</h4>
                      <p className="text-xs text-slate-500 mt-1 font-medium">At 10% S&P returns, the $50k trust turns into $1.05M+ by age 50, providing liquidity for a primary residence or a massive retirement nest egg.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 pl-6 ml-3 relative">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-[8px] text-white">5</div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">State Revenue Recapture</h4>
                      <p className="text-xs text-slate-500 mt-1 font-medium">Government recovers the initial outlay through capital gains taxes and higher corporate growth taxes.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* The "Why Equity Beats Debt" Breakdown */}
            <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold font-mono text-slate-900 mb-6">Why Equity Beats Debt</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Shield size={20} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">1. Zero Servicing Friction</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Debt requires a massive apparatus of collection agencies, loan servicers, and income verification structures. An IRA-style Equity Trust is fully automated, locking capital with near-zero administrative friction.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Building size={20} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">2. True Economic Choice</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    The current federal model only subsidizes one rigid path: lending you money to go to school. The Equity Trust introduces genuine pro-choice autonomy, finally offering a smarter, debt-free compounding alternative for those entering the workforce early.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <TrendingUp size={20} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">3. Erasing the Federal Deficit</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    The current student loan program structurally loses 44 cents on every dollar lent. By pivoting to equity, the government stops accumulating toxic subprime debt and instead secures massive future tax revenue through capital gains and corporate growth.
                  </p>
                </div>

              </div>
            </div>

            {/* Call to Action Footer */}
            <div className="text-center pt-4">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold font-mono text-sm transition-all duration-200 shadow-sm cursor-pointer hover:translate-y-[-1px]"
              >
                <span>See what the system is costing you personally</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>
        ) : (
          <div className="space-y-10 animate-fade-in">
          
          {/* Headline Block */}
          <div className="text-center sm:text-left">
            <h1 id="main-title" className="text-3xl sm:text-5xl font-extrabold tracking-tight font-mono leading-none text-slate-900">
              The Compounding Choice Modeler
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-500 max-w-3xl leading-relaxed font-medium">
              Compare the long-term wealth projections of entering the workforce early versus investing in a college degree. Explore your path and find your own balance.
            </p>
            <div className="mt-4 p-3 bg-rose-50/80 border border-rose-100 rounded-lg max-w-3xl inline-flex items-start gap-2 text-left">
              <AlertTriangle size={16} className="text-rose-500 shrink-0 mt-0.5" />
              <p className="text-xs text-rose-700 leading-relaxed font-medium">
                <strong className="font-extrabold uppercase tracking-wider text-[10px] block mb-0.5">Mathematical Disclaimer</strong> 
                This model demonstrates gross compounding in a frictionless environment. It intentionally <strong>excludes</strong> marginal taxes, high-cost-of-living (HCOL) geographic traps, lifestyle creep, and the monthly cash-flow drain of servicing student debt—all of which heavily dilute the actual college premium in reality.
              </p>
            </div>
          </div>

          {/* Preset Carousel Block */}
          <div className="relative bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-extrabold font-mono flex items-center gap-1.5">
                <RotateCcw size={13} className="text-indigo-600" /> Scenario Presets
              </span>
              <span className="text-[10px] uppercase text-slate-400 font-mono font-bold tracking-wide flex items-center gap-1">
                Swipe to explore <ChevronRight size={12} />
              </span>
            </div>
            
            {/* Native Scroll Track */}
            <div 
              ref={carouselRef}
              onMouseDown={handleDragStart}
              onMouseLeave={handleDragEnd}
              onMouseUp={handleDragEnd}
              onMouseMove={handleDragMove}
              className={`flex overflow-x-auto hide-scrollbar gap-3 pb-2 -mx-1 px-1 select-none ${
                isDragging ? 'cursor-grabbing' : 'snap-x snap-mandatory cursor-grab'
              }`}
            >
              {PRESETS.map((preset) => {
                const isSelected = activePreset === preset.name;
                return (
                  <div key={preset.name} className="w-[85%] sm:w-[280px] shrink-0 snap-center">
                    <div 
                      onClick={() => {
                        if (dragDistance > 10) return;
                        handleApplyPreset(preset);
                      }}
                      className={`text-left p-4 rounded-xl transition-all duration-200 cursor-pointer border h-full flex flex-col ${
                        isSelected 
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md transform scale-[1.02]' 
                          : 'bg-slate-50 border-slate-200 hover:border-indigo-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-bold font-mono ${isSelected ? 'text-white' : 'text-slate-900'}`}>{preset.name}</span>
                        <span className={`text-[9px] uppercase px-2 py-0.5 rounded font-mono tracking-wide whitespace-nowrap ${
                          isSelected ? 'bg-white/20 text-white font-black' : 'bg-slate-200/80 text-slate-600 font-bold'
                        }`}>
                          {preset.badge}
                        </span>
                      </div>
                      <p className={`text-xs leading-relaxed flex-grow ${
                        isSelected ? 'text-indigo-100' : 'text-slate-500'
                      }`}>{preset.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Career Path Block */}
          <div className="relative bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm mt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3 border-b border-slate-100 pb-3">
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-extrabold font-mono flex items-center gap-1.5">
                <Rocket size={13} className="text-rose-500" /> Best-Case Scenarios
              </span>
              <span className="text-[9px] text-slate-400 font-mono italic">
                *AI-modeled pay raise curves (precise historical/demographic path data unavailable due to complexity)
              </span>
            </div>
            
            <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2 -mx-1 px-1">
              {CAREER_PATHS.map((preset) => {
                const isSelected = activePreset === preset.name;
                return (
                  <div key={preset.name} className="w-[85%] sm:w-[280px] shrink-0 snap-center">
                    <div 
                      onClick={() => handleApplyPreset(preset)}
                      className={`text-left p-4 rounded-xl transition-all duration-200 cursor-pointer border h-full flex flex-col ${
                        isSelected 
                          ? 'bg-rose-500 border-rose-500 text-white shadow-md transform scale-[1.02]' 
                          : 'bg-rose-50 border-rose-100 hover:border-rose-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-bold font-mono ${isSelected ? 'text-white' : 'text-slate-900'}`}>{preset.name}</span>
                        <span className={`text-[9px] uppercase px-2 py-0.5 rounded font-mono tracking-wide whitespace-nowrap ${
                          isSelected ? 'bg-white/20 text-white font-black' : 'bg-rose-200/80 text-rose-700 font-bold'
                        }`}>
                          {preset.badge}
                        </span>
                      </div>
                      <p className={`text-xs leading-relaxed flex-grow mb-3 ${
                        isSelected ? 'text-rose-100' : 'text-slate-500'
                      }`}>{preset.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mt-auto">
                        {preset.jumps.map((j, i) => (
                          <span key={i} className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                            isSelected ? 'bg-black/20 text-white' : 'bg-rose-200/50 text-rose-700'
                          }`}>
                            @{j.age}: +{j.bump}%
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hero Metric Block: Simple plain indicator */}
          <div className={`relative overflow-hidden rounded-2xl p-6 sm:p-10 border flex flex-col md:flex-row md:items-center md:justify-between gap-6 transition-colors duration-300 ${
            delta >= 0 
              ? 'bg-rose-50 border-rose-200' 
              : 'bg-emerald-50 border-emerald-200'
          }`}>
            <div className="relative z-10 w-full md:w-auto">
              <span className={`text-xs uppercase tracking-widest font-extrabold font-mono block mb-2 ${delta >= 0 ? 'text-rose-600' : 'text-emerald-700'}`}>Net Wealth Delta at Age 50</span>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                <span className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-mono leading-none ${delta >= 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
                  {formatCurrency(Math.abs(delta))}
                </span>
                <span className={`text-xs sm:text-sm font-extrabold font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-white border ${
                  delta >= 0 
                    ? 'text-rose-600 border-rose-200/60 shadow-xs' 
                    : 'text-emerald-700 border-emerald-200/60 shadow-xs'
                } inline-block whitespace-nowrap self-start sm:self-center`}>
                  {delta >= 0 ? "Workforce Surplus" : "College Surplus"}
                </span>
              </div>
              <p className={`mt-4 text-sm font-medium max-w-xl ${delta >= 0 ? 'text-rose-900' : 'text-emerald-900'}`}>
                {delta >= 0 
                  ? `With these inputs, the early workforce path leads. Starting investments early allows the power of compounding to stay ahead of the graduate's later wage premium.`
                  : `With these inputs, the college path leads. The graduate's post-grad wage premium is high enough to recover the tuition cost and the four-year delay in compounding.`
                }
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 w-full md:w-auto shrink-0 border-t border-slate-200 md:border-t-0 pt-6 md:pt-0">
              <div className="bg-white p-4 rounded-xl text-center md:text-left min-w-[170px] shadow-sm border border-slate-100">
                <span className="text-slate-500 text-[10px] uppercase font-extrabold font-mono tracking-wider block mb-1">Workforce Nest Egg</span>
                <span className="text-2xl font-black font-mono text-cyan-600">{formatAbbreviation(finalA)}</span>
              </div>
              <div className="bg-white p-4 rounded-xl text-center md:text-left min-w-[170px] shadow-sm border border-slate-100">
                <span className="text-slate-500 text-[10px] uppercase font-extrabold font-mono tracking-wider block mb-1">College Nest Egg</span>
                <span className="text-2xl font-black font-mono text-purple-600">{formatAbbreviation(finalB)}</span>
              </div>
            </div>
          </div>

          {/* Custom SVG Line Chart Card */}
          <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-slate-200 gap-3">
              <div>
                <h3 className="text-md font-bold font-mono flex items-center gap-2 text-slate-900">
                  <TrendingUp size={16} className="text-indigo-600" /> Compounding Trajectory
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Hover / drag over the chart to trace dynamic wealth balances by age.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block shadow-sm"></span> Workforce</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block shadow-sm"></span> College</span>
                </div>
                <button
                  onClick={() => { setHoveredIndex(null); setShowShareModal(true); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer border bg-slate-50 text-slate-500 border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200"
                >
                  <Camera size={12} /> Share Chart
                </button>
              </div>
            </div>

            {/* Chart SVG wrapper */}
            <div className="relative w-full h-[260px] sm:h-[350px]">
              
              {/* HTML Tooltip Overlay */}
              {hoveredIndex !== null && data[hoveredIndex] && (
                <div 
                  className="absolute top-4 p-3 bg-white border border-slate-200 rounded-xl shadow-lg pointer-events-none z-10 w-48 text-xs font-mono transition-all duration-75"
                  style={{
                    left: `${(xOf(data[hoveredIndex].age) / chartWidth) * 100}%`,
                    transform: `translateX(${hoveredIndex > 16 ? '-108%' : '8%'})`,
                  }}
                >
                  <div className="text-slate-500 mb-1.5 border-b border-slate-100 pb-1 flex justify-between font-bold">
                    <span>Age {data[hoveredIndex].age}</span>
                    <span>Year {data[hoveredIndex].year}</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-cyan-700 font-bold">
                      <span className="opacity-90">Workforce:</span>
                      <span>{formatCurrency(data[hoveredIndex].balanceA)}</span>
                    </div>
                    <div className="flex justify-between items-center text-purple-700 font-bold">
                      <span className="opacity-90">College:</span>
                      <span>{formatCurrency(data[hoveredIndex].balanceB)}</span>
                    </div>
                    <div className="flex justify-between items-center text-rose-600 pt-1.5 border-t border-slate-100 font-extrabold">
                      <span>Delta:</span>
                      <span>{formatCurrency(Math.abs(data[hoveredIndex].balanceA - data[hoveredIndex].balanceB))}</span>
                    </div>
                  </div>
                </div>
              )}

              <svg 
                ref={svgRef}
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-full cursor-crosshair overflow-visible"
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                onMouseLeave={handleMouseLeave}
              >
                <defs>
                  <linearGradient id="areaA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="areaB" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Gridlines */}
                {gridLines.map((line, idx) => (
                  <g key={idx}>
                    <line 
                      x1={paddingLeft} 
                      y1={yOf(line)} 
                      x2={chartWidth - paddingRight} 
                      y2={yOf(line)} 
                      stroke="#e2e8f0" 
                      strokeDasharray="4 4" 
                      strokeWidth="1"
                    />
                    <text 
                      x={paddingLeft - 8} 
                      y={yOf(line) + 4} 
                      fill="#64748b" 
                      fontSize="10" 
                      fontFamily="var(--font-mono)"
                      fontWeight="bold"
                      textAnchor="end"
                    >
                      {formatAbbreviation(line)}
                    </text>
                  </g>
                ))}

                {/* Vertical Age Gridlines */}
                {[18, 22, 26, 30, 34, 38, 42, 46, 50].map((age) => (
                  <g key={age}>
                    <line 
                      x1={xOf(age)} 
                      y1={paddingTop} 
                      x2={xOf(age)} 
                      y2={chartHeight - paddingBottom} 
                      stroke="#e2e8f0" 
                      strokeDasharray="2 4"
                      strokeWidth="1" 
                    />
                    <text 
                      x={xOf(age)} 
                      y={chartHeight - paddingBottom + 18} 
                      fill="#64748b" 
                      fontSize="10" 
                      fontFamily="var(--font-mono)"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {age === 18 ? "Age 18" : age === 50 ? "Age 50" : age}
                    </text>
                  </g>
                ))}

                {/* Chart Paths */}
                <path d={areaAD} fill="url(#areaA)" />
                <path d={areaBD} fill="url(#areaB)" />

                {/* Path B (College) Line */}
                <path 
                  d={pathBD} 
                  fill="none" 
                  stroke="#a855f7" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />

                {/* Path A (Workforce) Line */}
                <path 
                  d={pathAD} 
                  fill="none" 
                  stroke="#06b6d4" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />

                {/* Dynamic Vertical Tracker line */}
                {hoveredIndex !== null && data[hoveredIndex] && (
                  <g>
                    <line 
                      x1={xOf(data[hoveredIndex].age)} 
                      y1={paddingTop} 
                      x2={xOf(data[hoveredIndex].age)} 
                      y2={chartHeight - paddingBottom} 
                      stroke="#94a3b8" 
                      strokeWidth="1.5"
                    />
                    <circle 
                      cx={xOf(data[hoveredIndex].age)} 
                      cy={yOf(data[hoveredIndex].balanceA)} 
                      r="6" 
                      fill="#06b6d4" 
                      stroke="#ffffff" 
                      strokeWidth="2.5" 
                      className="shadow-sm"
                    />
                    <circle 
                      cx={xOf(data[hoveredIndex].age)} 
                      cy={yOf(data[hoveredIndex].balanceB)} 
                      r="6" 
                      fill="#a855f7" 
                      stroke="#ffffff" 
                      strokeWidth="2.5" 
                      className="shadow-sm"
                    />
                  </g>
                )}
              </svg>
            </div>

            {/* Chart Stats Footer Bar */}
            <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-extrabold text-slate-500 font-mono tracking-wider">Break-Even Analysis</span>
                <span className="text-sm font-bold font-mono text-slate-800 mt-1">
                  {breakEvenAge 
                    ? `Breaks Even at Age ${breakEvenAge}` 
                    : "Never Breaks Even by Age 50"
                  }
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase font-extrabold text-slate-500 font-mono tracking-wider">Compounding Lead Duration</span>
                <span className="text-sm font-bold font-mono text-slate-800 mt-1">
                  {breakEvenAge 
                    ? `Workforce leads for ${breakEvenAge - 18} years`
                    : "Workforce leads indefinitely"
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Split View Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Sliders */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-200 pb-4">
                  <h2 className="text-lg font-bold font-mono flex items-center gap-2 text-slate-900">
                    <Briefcase size={18} className="text-indigo-600" /> Modeler Inputs
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">Adjust parameters below to recalculate compounding returns.</p>
                </div>

                {/* Slider 1: Annual Tuition Cost */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="tuition-slider" className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                      <GraduationCap size={16} className="text-purple-600" /> Annual College Tuition
                    </label>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-400 font-mono font-bold">$</span>
                      <input
                        id="tuition-input"
                        type="number"
                        min="0"
                        max="100000"
                        step="1000"
                        value={tuition}
                        onChange={(e) => {
                          setTuition(Math.max(0, Math.min(100000, Number(e.target.value))));
                          setActivePreset("");
                        }}
                        className="w-24 px-2 py-1 text-xs text-right bg-slate-50 border border-slate-200 rounded font-mono focus:outline-none focus:border-indigo-500 font-bold text-slate-900"
                      />
                    </div>
                  </div>
                  <input
                    id="tuition-slider"
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={tuition}
                    onChange={(e) => {
                      setTuition(Number(e.target.value));
                      setActivePreset("");
                    }}
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono font-bold">
                    <span>$0/yr</span>
                    <span>Total: {formatCurrency(tuition * 4)} (4 years)</span>
                    <span>$100k/yr</span>
                  </div>
                </div>

                {/* Slider 2: Annual High School Wage */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="hs-wage-slider" className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                      <Briefcase size={16} className="text-cyan-700" /> Entry HS Wage (Foregone)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-400 font-mono font-bold">$</span>
                      <input
                        id="hs-wage-input"
                        type="number"
                        min="0"
                        max="100000"
                        step="1000"
                        value={hsWage}
                        onChange={(e) => {
                          setHsWage(Math.max(0, Math.min(100000, Number(e.target.value))));
                          setActivePreset("");
                        }}
                        className="w-24 px-2 py-1 text-xs text-right bg-slate-50 border border-slate-200 rounded font-mono focus:outline-none focus:border-indigo-500 font-bold text-slate-900"
                      />
                    </div>
                  </div>
                  <input
                    id="hs-wage-slider"
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={hsWage}
                    onChange={(e) => {
                      setHsWage(Number(e.target.value));
                      setActivePreset("");
                    }}
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono font-bold">
                    <span>$0/yr</span>
                    <span>Total Foregone: {formatCurrency(hsWage * 4)} (4 years)</span>
                    <span>$100k/yr</span>
                  </div>
                </div>

                {/* Slider 3: Annual Wage Growth */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="wage-growth-slider" className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                      <TrendingUp size={16} className="text-emerald-600" /> Annual Wage Growth
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        id="wage-growth-input"
                        type="number"
                        min="0"
                        max="10"
                        step="0.5"
                        value={wageGrowth}
                        onChange={(e) => {
                          setWageGrowth(Math.max(0, Math.min(10, Number(e.target.value))));
                          setActivePreset("");
                        }}
                        className="w-16 px-2 py-1 text-xs text-right bg-slate-50 border border-slate-200 rounded font-mono focus:outline-none focus:border-indigo-500 font-bold text-slate-900"
                      />
                      <span className="text-xs text-slate-400 font-mono font-bold">%</span>
                    </div>
                  </div>
                  <input
                    id="wage-growth-slider"
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={wageGrowth}
                    onChange={(e) => {
                      setWageGrowth(Number(e.target.value));
                      setActivePreset("");
                    }}
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono font-bold">
                    <span>0%</span>
                    <span>Compounds Annually</span>
                    <span>10%</span>
                  </div>
                </div>

                {/* Slider 4: S&P 500 Return */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="rate-slider" className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                      <TrendingUp size={16} className="text-amber-600" /> S&P 500 Market Return
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        id="rate-input"
                        type="number"
                        min="5"
                        max="15"
                        step="0.1"
                        value={rate}
                        onChange={(e) => {
                          setRate(Math.max(5, Math.min(15, Number(e.target.value))));
                          setActivePreset("");
                        }}
                        className="w-16 px-2 py-1 text-xs text-right bg-slate-50 border border-slate-200 rounded font-mono focus:outline-none focus:border-indigo-500 font-bold text-slate-900"
                      />
                      <span className="text-xs text-slate-400 font-mono font-bold">%</span>
                    </div>
                  </div>
                  <input
                    id="rate-slider"
                    type="range"
                    min="5"
                    max="15"
                    step="0.1"
                    value={rate}
                    onChange={(e) => {
                      setRate(Number(e.target.value));
                      setActivePreset("");
                    }}
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono font-bold">
                    <span>5.0%</span>
                    <span>Historical Avg: ~10%</span>
                    <span>15.0%</span>
                  </div>
                </div>

                {/* Slider 4: Post-Grad College Wage */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="college-wage-slider" className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                      <GraduationCap size={16} className="text-purple-600" /> Post-Grad College Wage
                    </label>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-400 font-mono font-bold">$</span>
                      <input
                        id="college-wage-input"
                        type="number"
                        min="30000"
                        max="200000"
                        step="1000"
                        value={collegeWage}
                        onChange={(e) => {
                          setCollegeWage(Math.max(30000, Math.min(200000, Number(e.target.value))));
                          setActivePreset("");
                        }}
                        className="w-24 px-2 py-1 text-xs text-right bg-slate-50 border border-slate-200 rounded font-mono focus:outline-none focus:border-indigo-500 font-bold text-slate-900"
                      />
                    </div>
                  </div>
                  <input
                    id="college-wage-slider"
                    type="range"
                    min="30000"
                    max="200000"
                    step="1000"
                    value={collegeWage}
                    onChange={(e) => {
                      setCollegeWage(Number(e.target.value));
                      setActivePreset("");
                    }}
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono font-bold">
                    <span>$30k/yr</span>
                    <span>Initial Premium (at Age 22): {formatCurrency(Math.max(0, collegeWage - (hsWage * Math.pow(1 + (wageGrowth / 100), 4))))}/yr</span>
                    <span>$200k/yr</span>
                  </div>
                </div>

                {/* ADVANCED: Promotion Windfall (College Path) */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4 mt-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-5">
                    <Rocket size={64} />
                  </div>
                  <h4 className="text-[10px] uppercase tracking-widest font-extrabold font-mono text-slate-500">Advanced: College Windfall</h4>
                  
                  {jumps.length > 1 ? (
                    <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg text-xs text-indigo-700 font-mono font-bold text-center mt-2">
                      Multiple career jumps applied by preset. Clear preset to manually adjust.
                    </div>
                  ) : (
                    <>
                      {/* Slider 6: Promotion Bump */}
                      <div className="space-y-2 relative z-10">
                        <div className="flex justify-between items-center">
                          <label htmlFor="promotion-bump-slider" className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                            <Rocket size={16} className="text-indigo-600" /> Mid-Career Salary Jump
                          </label>
                          <div className="flex items-center gap-1.5">
                            <input
                              id="promotion-bump-input"
                              type="number"
                              min="0"
                              max="100"
                              step="5"
                              value={promotionBump}
                              onChange={(e) => handleManualBumpChange(Math.max(0, Math.min(100, Number(e.target.value))))}
                              className="w-16 px-2 py-1 text-xs text-right bg-white border border-slate-200 rounded font-mono focus:outline-none focus:border-indigo-500 font-bold text-slate-900"
                            />
                            <span className="text-xs text-slate-400 font-mono font-bold">%</span>
                          </div>
                        </div>
                        <input
                          id="promotion-bump-slider"
                          type="range"
                          min="0"
                          max="100"
                          step="5"
                          value={promotionBump}
                          onChange={(e) => handleManualBumpChange(Number(e.target.value))}
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 font-mono font-bold">
                          <span>0%</span>
                          <span>Applies once at specific age</span>
                          <span>100%</span>
                        </div>
                      </div>

                      {/* Slider 7: Promotion Age */}
                      <div className={`space-y-2 relative z-10 transition-opacity duration-300 ${promotionBump === 0 ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                        <div className="flex justify-between items-center">
                          <label htmlFor="promotion-age-slider" className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                            <TrendingUp size={16} className="text-slate-400" /> Age of Promotion
                          </label>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-slate-400 font-mono font-bold">Age</span>
                            <input
                              id="promotion-age-input"
                              type="number"
                              min="24"
                              max="45"
                              step="1"
                              value={promotionAge}
                              onChange={(e) => handleManualAgeChange(Math.max(24, Math.min(45, Number(e.target.value))))}
                              className="w-16 px-2 py-1 text-xs text-right bg-white border border-slate-200 rounded font-mono focus:outline-none focus:border-indigo-500 font-bold text-slate-900"
                            />
                          </div>
                        </div>
                        <input
                          id="promotion-age-slider"
                          type="range"
                          min="24"
                          max="45"
                          step="1"
                          value={promotionAge}
                          onChange={(e) => handleManualAgeChange(Number(e.target.value))}
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 font-mono font-bold">
                          <span>Age 24</span>
                          <span>College Path Only</span>
                          <span>Age 45</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Calculations Breakdown Sub-Panel */}
              <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm">
                <h3 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-widest mb-4">Dynamic Compounding Rules</h3>
                
                <div className="space-y-4">
                  <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl shadow-2xs">
                    <span className="text-[10px] uppercase font-extrabold text-slate-500 font-mono block mb-1">Wage Growth Engine</span>
                    <span className="text-slate-600 text-xs font-medium block">All wages compound annually by <span className="font-bold text-slate-900">{wageGrowth}%</span>. The non-college path starts compounding at age 18. The college path starts compounding at age 22, giving the high school grad a 4-year head start on wage growth.</span>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl shadow-2xs">
                    <span className="text-[10px] uppercase font-extrabold text-slate-500 font-mono block mb-1">Workforce (Path A) Annual Invest</span>
                    <span className="text-slate-600 text-xs font-medium block">Invests <span className="font-bold text-slate-900">10%</span> of their dynamic compounded wage every year from age 22 to 50.</span>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl shadow-2xs">
                    <span className="text-[10px] uppercase font-extrabold text-slate-500 font-mono block mb-1">College (Path B) Annual Invest</span>
                    <span className="text-slate-600 text-xs font-medium block">Invests the baseline 10% PLUS <span className="font-bold text-slate-900">50% of the wage premium</span> (the amount earned over the non-college peer in any given year).</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Summaries & Highlights */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Detailed Path Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Workforce Card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden transition-all duration-200 hover:border-cyan-300 hover:shadow-md hover:-translate-y-px">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl" />
                  <div className="flex items-center space-x-2 text-cyan-600 mb-2">
                    <Briefcase size={16} />
                    <span className="text-xs uppercase font-extrabold tracking-widest font-mono">Path A: Workforce & Invest</span>
                  </div>
                  <div className="text-3xl font-extrabold font-mono text-slate-900">
                    {formatCurrency(finalA)}
                  </div>
                  <div className="mt-3 space-y-1.5 text-xs text-slate-500 border-t border-slate-100 pt-3 font-medium">
                    <div className="flex justify-between">
                      <span>Starting Cap (Age 22):</span>
                      <span className="font-bold font-mono text-slate-900">{formatCurrency(data[4].balanceA)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Age 22-50 Contribution:</span>
                      <span className="font-bold font-mono text-slate-900">{formatCurrency(hsContribution)}/yr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Net Capital Outlay:</span>
                      <span className="font-bold font-mono text-slate-900">{formatCurrency(totalInvestedA)}</span>
                    </div>
                  </div>
                </div>

                {/* College Card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden transition-all duration-200 hover:border-purple-300 hover:shadow-md hover:-translate-y-px">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl" />
                  <div className="flex items-center space-x-2 text-purple-600 mb-2">
                    <GraduationCap size={16} />
                    <span className="text-xs uppercase font-extrabold tracking-widest font-mono">Path B: College Graduate</span>
                  </div>
                  <div className="text-3xl font-extrabold font-mono text-slate-900">
                    {formatCurrency(finalB)}
                  </div>
                  <div className="mt-3 space-y-1.5 text-xs text-slate-500 border-t border-slate-100 pt-3 font-medium">
                    <div className="flex justify-between">
                      <span>Starting Cap (Age 22):</span>
                      <span className="font-bold font-mono text-slate-900">$0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Age 22-50 Contribution:</span>
                      <span className="font-bold font-mono text-slate-900">{formatCurrency(collegeContribution)}/yr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Net Capital Outlay:</span>
                      <span className="font-bold font-mono text-slate-900">{formatCurrency(totalInvestedB)}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Explanatory Note on Level Playing Field */}
              <div className="rounded-xl bg-slate-50 border border-slate-200/60 p-4 text-xs text-slate-500 leading-relaxed font-medium">
                <span className="font-bold text-slate-900 block mb-1">Understanding the Level Playing Field (Age 18-22 Math)</span>
                The starting capital at age 22 represents the <span className="font-bold text-slate-900">net worth differential</span> between both paths. The high school graduate path is credited with the total annual capital advantage (e.g., $70,000/yr), which is the sum of:
                <ul className="list-disc pl-4 mt-1 space-y-0.5">
                  <li><span className="font-bold text-slate-800">Avoided College Cost of Attendance:</span> The money saved by not paying university tuition, fees, and campus living/housing costs (set by the college cost slider).</li>
                  <li><span className="font-bold text-slate-800">Foregone Workforce Wages:</span> The actual wages earned by entering the workforce immediately (set by the high school wage slider).</li>
                </ul>
                <p className="mt-2 text-slate-400 font-mono">Formula: [Avoided College Costs + Earned Wages] compounded annually in the S&P 500 from age 18 to 22.</p>
              </div>

              {/* Additional analytical highlight cards */}
              <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm">
                <h4 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-widest mb-3">Compounding Dynamics Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono leading-relaxed text-slate-600">
                  <div className="p-3.5 bg-cyan-50/40 border border-cyan-100 rounded-xl space-y-2 shadow-2xs">
                    <div className="flex items-center text-cyan-700 gap-1.5 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 inline-block"></span>
                      Workforce Path Dominance
                    </div>
                    <p>
                      By saving <span className="text-slate-900 font-extrabold">{formatCurrency(tuition + hsWage)}/yr</span> from age 18 to 22, Path A accumulates <span className="text-slate-900 font-extrabold">{formatCurrency(data[4].balanceA)}</span> at age 22 before the college path has saved a single dollar. That initial nest egg compounds over 28 years with no additional deposits to yield over <span className="text-slate-900 font-extrabold">{formatCurrency(data[4].balanceA * Math.pow(1 + rate/100, 28))}</span> by age 50.
                    </p>
                  </div>
                  
                  <div className="p-3.5 bg-purple-50/40 border border-purple-100 rounded-xl space-y-2 shadow-2xs">
                    <div className="flex items-center text-purple-700 gap-1.5 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block"></span>
                      College Catch-Up Challenge
                    </div>
                    <p>
                      Because college grads start investing at age 22 with <span className="text-slate-900 font-extrabold">$0</span>, they must save <span className="text-slate-900 font-extrabold">{formatCurrency(collegeContribution)}/yr</span> (which represents a <span className="text-slate-900 font-extrabold">{formatCurrency(collegePremium)}</span> annual premium above high school earnings) in order to overtake Path A's compounding headstart.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Footer Area: Markdown highlighting Fed parameters */}
          <footer className="mt-16 pt-8 border-t border-slate-200">
            <h2 className="text-xl font-bold font-mono text-slate-900 mb-6 tracking-tight">Macroeconomic Reality & Data Parameters</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center space-x-2 text-rose-600">
                  <AlertTriangle size={18} />
                  <h3 className="text-sm font-bold font-mono uppercase tracking-wider">NY Fed Underemployment</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  According to the Federal Reserve Bank of New York, the recent graduate underemployment rate stands at <span className="text-slate-900 font-bold">41.5%</span>. This means over 4 in 10 grads work in roles that do not require a degree, generating a wage premium close to zero while still carrying tuition debt.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center space-x-2 text-indigo-600">
                  <TrendingUp size={18} />
                  <h3 className="text-sm font-bold font-mono uppercase tracking-wider">The 4-Year Compound Window</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Starting at age 18 vs 22 is a significant math variable. An investment at age 18 compounds for 32 years, yielding <span className="text-slate-900 font-bold">{(Math.pow(1 + rate/100, 32)).toFixed(1)}x</span> returns at a 10% rate. Starting at age 22 reduces this to only <span className="text-slate-900 font-bold">{(Math.pow(1 + rate/100, 28)).toFixed(1)}x</span> returns.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center space-x-2 text-cyan-700">
                  <DollarSign size={18} />
                  <h3 className="text-sm font-bold font-mono uppercase tracking-wider">Catch-up Math</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  To bridge the <span className="text-slate-900 font-bold">{formatCurrency(data[4].balanceA)}</span> deficit at age 22, college grads must invest <span className="text-slate-900 font-bold">4.5x</span> more than high school graduates annually. If the salary premium is invested at 50%, a graduate needs a post-grad starting salary of at least <span className="text-slate-900 font-bold">{formatCurrency(hsCareerWage + (hsContribution * 7))}</span> to break even.
                </p>
              </div>

            </div>

            {/* Read the Policy CTA */}
            <div className="mt-12 mb-4 text-center">
              <button
                onClick={() => {
                  navigate('/the-macro-fix');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold font-mono text-sm transition-all duration-200 shadow-lg cursor-pointer hover:-translate-y-1"
              >
                <span>Read The Policy Fix</span>
                <ArrowRight size={16} />
              </button>
              <p className="mt-4 text-xs text-slate-500 font-medium">Learn how we can replace federal student loans with sovereign equity.</p>
            </div>

            <div className="mt-12 text-center text-[10px] sm:text-xs text-slate-400 font-mono font-medium max-w-4xl mx-auto space-y-2 px-4">
              <p>
                * Default baseline wages ($40k entry, $80k graduate) and compounding rules are modeled using 2024-2026 macro-averages from the U.S. Bureau of Labor Statistics (BLS) and National Center for Education Statistics (NCES).
              </p>
              <p>
                * Market return default (10%) reflects the historical annualized average return of the S&P 500 index. Projections do not guarantee future stock market performances.
              </p>
              <p className="pt-4 border-t border-slate-200 mt-4">
                Built with React, Vite & Tailwind CSS. Designed for rapid macro-economic analysis.
              </p>
            </div>
          </footer>

          </div>
        )}
      </main>

      {/* Sticky Mobile Results Bar */}
      {path === '/' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-40 md:hidden p-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-mono font-bold text-slate-400">Workforce</span>
              <span className="text-sm font-bold font-mono text-cyan-600">{formatAbbreviation(finalA)}</span>
            </div>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-mono font-bold text-slate-400">College</span>
              <span className="text-sm font-bold font-mono text-purple-600">{formatAbbreviation(finalB)}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[8px] uppercase font-mono font-bold text-slate-400 block">Net Delta</span>
            <span className={`text-xs font-black font-mono px-2 py-1 rounded bg-slate-50 border ${
              delta >= 0 ? 'text-rose-600 border-rose-100 bg-rose-50/50' : 'text-emerald-700 border-emerald-100 bg-emerald-50/50'
            }`}>
              {formatAbbreviation(Math.abs(delta))} {delta >= 0 ? 'Workforce' : 'College'}
            </span>
          </div>
        </div>
      )}

      {/* Share Engine */}
      <ShareEngine />

      {/* Share Chart Lightbox Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center sm:p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => { setShowShareModal(false); setSnapshotDone(''); }} />

          {/* Modal Content — sheet-style on mobile, centered card on desktop */}
          <div className="relative z-10 bg-slate-100 rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto hide-scrollbar">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 sm:py-4 rounded-t-2xl flex items-center justify-between z-10">
              <div>
                <h3 className="text-xs sm:text-sm font-bold font-mono text-slate-900 flex items-center gap-2"><Camera size={14} className="text-indigo-600" /> Share Your Analysis</h3>
                <p className="text-[9px] sm:text-[10px] text-slate-400 font-mono mt-0.5">Preview your shareable chart card below</p>
              </div>
              <button onClick={() => { setShowShareModal(false); setSnapshotDone(''); }} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer">
                <X size={18} />
              </button>
            </div>

            {/* Share Card Preview — this is what gets captured */}
            <div className="p-3 sm:p-6">
              <div ref={shareCardRef} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Card Header */}
                <div className="px-4 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center font-mono font-bold text-white text-[10px] sm:text-xs">S</div>
                      <div>
                        <div className="text-[7px] sm:text-[8px] uppercase tracking-widest text-slate-400 font-extrabold font-mono">FINANCIAL FORECAST</div>
                        <div className="text-[10px] sm:text-xs font-bold font-mono text-slate-800">COLLEGE ROI AUDITOR</div>
                      </div>
                    </div>
                    <span className="text-[8px] sm:text-[9px] font-mono text-slate-400 font-medium">college-auditor.vercel.app</span>
                  </div>
                </div>

                {/* Modeler Inputs Grid */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-slate-50/50 border-b border-slate-100">
                  <div className="text-[8px] sm:text-[9px] uppercase font-extrabold text-slate-400 font-mono tracking-widest mb-2 sm:mb-3">Modeler Inputs</div>
                  <div className={`grid grid-cols-3 gap-2 sm:gap-3 ${jumps.length > 0 ? 'sm:grid-cols-6' : 'sm:grid-cols-5'}`}>
                    <div className="bg-white rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 border border-slate-100">
                      <div className="text-[7px] sm:text-[8px] uppercase font-bold text-slate-400 font-mono">Tuition/yr</div>
                      <div className="text-xs sm:text-sm font-black font-mono text-purple-600">{formatAbbreviation(tuition)}</div>
                    </div>
                    <div className="bg-white rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 border border-slate-100">
                      <div className="text-[7px] sm:text-[8px] uppercase font-bold text-slate-400 font-mono">HS Wage</div>
                      <div className="text-xs sm:text-sm font-black font-mono text-cyan-600">{formatAbbreviation(hsWage)}</div>
                    </div>
                    <div className="bg-white rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 border border-slate-100">
                      <div className="text-[7px] sm:text-[8px] uppercase font-bold text-slate-400 font-mono">College Wage</div>
                      <div className="text-xs sm:text-sm font-black font-mono text-purple-600">{formatAbbreviation(collegeWage)}</div>
                    </div>
                    <div className="bg-white rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 border border-slate-100">
                      <div className="text-[7px] sm:text-[8px] uppercase font-bold text-slate-400 font-mono">Market Return</div>
                      <div className="text-xs sm:text-sm font-black font-mono text-indigo-600">{rate}%</div>
                    </div>
                    <div className="bg-white rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 border border-slate-100">
                      <div className="text-[7px] sm:text-[8px] uppercase font-bold text-slate-400 font-mono">Wage Growth</div>
                      <div className="text-xs sm:text-sm font-black font-mono text-indigo-600">{wageGrowth}%</div>
                    </div>
                    {jumps.length > 0 && (
                      <div className="bg-indigo-50 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 border border-indigo-100 col-span-3 sm:col-span-1">
                        <div className="text-[7px] sm:text-[8px] uppercase font-bold text-indigo-400 font-mono">Milestones</div>
                        <div className="text-xs sm:text-sm font-black font-mono text-indigo-600 truncate">
                          {jumps.filter(j => j.bump > 0).map(j => `@${j.age}:+${j.bump}%`).join(', ')}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Chart */}
                <div className="px-3 sm:px-6 py-3 sm:py-4">
                  <div className="flex items-center justify-between mb-2 sm:mb-3 flex-wrap gap-1">
                    <span className="text-[9px] sm:text-[10px] uppercase font-extrabold text-slate-400 font-mono tracking-widest">Compounding (Age 18–50)</span>
                    <div className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-mono">
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-500 inline-block"></span> Workforce</span>
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500 inline-block"></span> College</span>
                    </div>
                  </div>
                  <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full">
                    <defs>
                      <linearGradient id="shareAreaA" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="shareAreaB" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {gridLines.map((line, idx) => (
                      <g key={idx}>
                        <line x1={paddingLeft} y1={yOf(line)} x2={chartWidth - paddingRight} y2={yOf(line)} stroke="#e2e8f0" strokeWidth="1" />
                        <text x={paddingLeft - 8} y={yOf(line) + 4} textAnchor="end" className="text-[10px] fill-slate-400 font-mono">{formatAbbreviation(line)}</text>
                      </g>
                    ))}
                    <line x1={paddingLeft} y1={chartHeight - paddingBottom} x2={chartWidth - paddingRight} y2={chartHeight - paddingBottom} stroke="#e2e8f0" strokeWidth="1" />
                    {data.filter((_, i) => i % 4 === 0).map((d) => (
                      <text key={d.age} x={xOf(d.age)} y={chartHeight - paddingBottom + 16} textAnchor="middle" className="text-[10px] fill-slate-400 font-mono">{d.age}</text>
                    ))}
                    <path d={areaAD} fill="url(#shareAreaA)" />
                    <path d={areaBD} fill="url(#shareAreaB)" />
                    <path d={pathBD} fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d={pathAD} fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Results Footer */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-slate-50/50 border-t border-slate-100">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                    <div>
                      <div className="text-[7px] sm:text-[8px] uppercase font-bold text-slate-400 font-mono">Workforce at 50</div>
                      <div className="text-sm sm:text-base font-black font-mono text-cyan-600">{formatAbbreviation(finalA)}</div>
                    </div>
                    <div>
                      <div className="text-[7px] sm:text-[8px] uppercase font-bold text-slate-400 font-mono">College at 50</div>
                      <div className="text-sm sm:text-base font-black font-mono text-purple-600">{formatAbbreviation(finalB)}</div>
                    </div>
                    <div>
                      <div className="text-[7px] sm:text-[8px] uppercase font-bold text-slate-400 font-mono">Net Delta</div>
                      <div className={`text-sm sm:text-base font-black font-mono ${delta >= 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {formatAbbreviation(Math.abs(delta))} {delta >= 0 ? 'Workforce' : 'College'}
                      </div>
                    </div>
                    <div>
                      <div className="text-[7px] sm:text-[8px] uppercase font-bold text-slate-400 font-mono">Break-Even</div>
                      <div className="text-sm sm:text-base font-black font-mono text-slate-800">
                        {breakEvenAge ? `Age ${breakEvenAge}` : 'Never'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-slate-200 px-4 sm:px-6 py-3 sm:py-4 rounded-b-2xl flex flex-col gap-3">
              {snapshotDone && (
                <div className="flex items-center justify-center gap-2 text-xs font-bold font-mono text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
                  <Check size={14} />
                  {snapshotDone === 'copied' ? 'Image copied to clipboard!' : 'Image downloaded!'}
                </div>
              )}
              <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-3 sm:justify-end">
                <button
                  onClick={() => handleShareCapture('copy')}
                  disabled={isSnapshotting}
                  className="flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider border border-slate-200 bg-white text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all duration-200 cursor-pointer disabled:opacity-50"
                >
                  <Copy size={14} /> Copy Image
                </button>
                <button
                  onClick={() => handleShareCapture('download')}
                  disabled={isSnapshotting}
                  className="flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-200 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {isSnapshotting ? (
                    <><svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25"/><path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg> Capturing...</>
                  ) : (
                    <><Download size={14} /> Download PNG</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
