/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║           CINEMATIC ANNIVERSARY LOVE STORY WEBSITE            ║
 * ╠═══════════════════════════════════════════════════════════════╣
 * ║                                                               ║
 * ║  HOW TO PERSONALIZE:                                          ║
 * ║  1. Edit the CONFIG object below with your own content        ║
 * ║  2. Replace placeholder photos by swapping PlaceholderImage   ║
 * ║     components with <img src="your-photo.jpg" /> tags         ║
 * ║  3. Run `npm run build` to generate a single index.html       ║
 * ║                                                               ║
 * ╚═══════════════════════════════════════════════════════════════╝
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// ═══════════════════════════════════════════════════════════════
// CONFIG — Edit this ONE object to personalize the entire site
// ═══════════════════════════════════════════════════════════════

const CONFIG = {
  // ── NAMES & DATES ──
  partnerName: "My Love",
  yourName: "Edikan",
  weddingDate: "2021-02-13", // YYYY-MM-DD format

  // ── HERO SECTION ──
  heroTitle: "Every Day With You\nIs My Favorite Day",
  heroSubtitle: "A journey written in heartbeats, celebrated in love",

  // ── TIMELINE (minimum 7 milestones) ──
  timeline: [
    {
      date: "Oct 2018",
      title: "The Day We Met",
      description: "A chance encounter that rewrote the stars. One look, one smile, and the universe shifted.",
      emoji: "✨",
      photo: "/photos/timeline-1.jpg",
    },
    {
      date: "August 2019",
      title: "Our First Date",
      description: "Nervous laughter, stolen glances, and a conversation that made time disappear completely.",
      emoji: "💕",
      photo: "/photos/timeline-2.jpg",
    },
    {
      date: "February 2021",
      title: "Our Wedding Day",
      description: "The most beautiful day of our lives. Every vow a promise, every dance a memory forever kept.",
      emoji: "💒",
      photo: "/photos/timeline-5.jpg",
    },
    {
      date: "December 2021",
      title: "Our First Christmas Together",
      description: "Our first Christmas as husband and wife. The tree, the laughter, the warmth of knowing this was just the beginning of forever.",
      emoji: "🎄",
      photo: "/photos/timeline-6.jpg",
    },
    {
      date: "February 2022",
      title: "First Anniversary",
      description: "One year of marriage, a lifetime of gratitude. We celebrated by simply being together.",
      emoji: "🥂",
      photo: "/photos/timeline-7.jpg",
    },
    {
      date: "Today",
      title: "Still Falling",
      description: "Every morning I wake up more in love than the day before. This is just the beginning.",
      emoji: "💑",
      photo: "/photos/timeline-8.jpg",
    },
  ],

  // ── PHOTO BOOK (6 polaroid cards) ──
  photoBook: [
    { caption: "Wearing my heart (and my tee)", backText: "You wear my heart better than any tee. Always have, always will.", emoji: "📸", gradient: "from-rose-blush/40 to-gold-light/30" },
    { caption: "Love Multiplied", backText: "Every day our love finds new ways to multiply. You are the reason.", emoji: "🌅", gradient: "from-gold-light/40 to-rose-blush/20" },
    { caption: "Eyes Only For You", backText: "In every room, in every crowd, my eyes always find their way back to you.", emoji: "😂", gradient: "from-rose-blush/30 to-cream-dark/40" },
    { caption: "Our little outing", backText: "The best adventures are the ones where it's just us and the world fades away.", emoji: "🗺️", gradient: "from-gold/20 to-rose-blush/30" },
    { caption: "My Partner in Everything", backText: "In every plan, every dream, every quiet moment — you are my partner in all of it.", emoji: "💃", gradient: "from-rose-blush/40 to-gold/20" },
    { caption: "The joy that keeps giving", backText: "You are the gift that never stops giving. Pure, boundless joy.", emoji: "💕", gradient: "from-gold-light/30 to-rose-blush/40" },
  ],

  // ── HANDWRITTEN LETTER ──
  letterText: `My darling,

Happy anniversary.

I’ve been thinking today about all the versions of you I’ve been blessed enough to know in these 5 years.

The woman who laughs so hard she can’t breathe. The woman who talks to God like He’s her closest friend, because He is.

The woman who forgives faster than most people apologize. The woman who has held this family together with a kind of love that doesn’t ask for credit.

I’ve known all of those women. And I’ve loved every single one.

You make the people around you feel safe. Not just physically safe, but safe enough to be themselves.

I am not the man I was when I met you. I am better.

So today I want to celebrate you. Not just us, not just our marriage, not just the milestone. You. The woman behind everything good in my life. My answered prayer.

I love you more than these words can hold.

I am forever grateful to God.

Here's to forever and a day more.`,

  letterSignOff: "With all my love, always and forever",

  // ── LOVE LETTERS ("Open When..." envelopes, 6 cards) ──
  loveLetters: [
    { label: "Open when you need a smile", message: "Remember that time we couldn't stop laughing over absolutely nothing? That's the magic of us. Your smile is my sunshine, and I hope this reminder brings one to your face right now. I love you endlessly." },
    { label: "Open when you miss me", message: "Close your eyes. Feel that warmth in your chest? That's me, loving you from wherever I am. Distance is just space, our hearts are never apart. I'm always with you, in every heartbeat." },
    { label: "Open when you need courage", message: "You are the bravest, most incredible person I know. Whatever you're facing, remember: you've overcome every challenge before, and you'll conquer this one too. I believe in you with everything I am." },
    { label: "Open when you can't sleep", message: "Imagine my arms around you right now. Breathe slowly. You are safe, you are loved, you are enough. Let my love be your lullaby tonight. Sweet dreams, my darling." },
    { label: "Open when you need to remember", message: "You are loved beyond measure. You are appreciated more than words can express. You are the best thing that has ever happened to me. Never forget that, not for a single moment." },
    { label: "Open when you want to feel loved", message: "You want to feel loved? Darling, you ARE love. You radiate it, you inspire it, you deserve every ounce of it. I love you today, tomorrow, and for every day that follows. God loves you too." },
    { label: "Open when you feel invisible", message: "I see you. I see the quiet sacrifices you make when nobody is watching. I see the way you hold everything together and make it look effortless. You are not invisible. You are the most seen, most known, most cherished person in my world." },
    { label: "Open when you doubt yourself", message: "I wish you could see yourself through my eyes for just one minute. You would never doubt yourself again. You are brilliant, capable, and so much stronger than you give yourself credit for. The woman I married can do anything." },
    { label: "Open when you need to laugh", message: "Just remember that I chose to spend my entire life with you knowing full well how you sing in the shower. That is commitment. That is devotion. That is a man deeply, foolishly, joyfully in love. You're welcome. Please ignore me, I know you can sing. 🏃🏾‍➡️" },
    { label: "Open when you want to know why I love you", message: "It's the way you care too much about everything. The way you pray like God is sitting right next to you. The way you fight for the people you love without thinking twice. I don't love you for one reason. I love you for every reason and for no reason at all. You are simply mine, and I am simply yours." },
  ],

  // ── REASONS I LOVE YOU (25 reasons) ──
  reasons: [
    "The way your eyes crinkle when you really laugh",
    "How you always know exactly what to say",
    "Your incredible strength, even when you don't see it",
    "How you always save the last bite for me",
    "The way you make ordinary moments feel extraordinary",
    "Your unwavering kindness to everyone you meet",
    "How you dance when you think nobody's watching",
    "The sound of your voice first thing in the morning",
    "Your passion for the things you love",
    "The way you hold my hand just a little tighter in crowds",
    "Your courage to be vulnerable with me",
    "The way you light up every room you walk into",
    "How you remember the little things I mention in passing",
    "Your ability to make me feel like the luckiest person alive",
    "The warmth of your hugs, they feel like coming home",
    "How you challenge me to be a better person",
    "Your infectious optimism, even on hard days",
    "The way you look at me like I'm your whole world",
    "How you pray for this family like a warrior",
    "The way you forgive faster than most people apologize",
    "Your stubborn refusal to give up on the people you love",
    "How safe I feel when it's just us and the world goes quiet",
    "The way you mother our children like it's what you were born to do",
    "How you still give me butterflies after all this time",
    "Simply this: you chose me, and you keep choosing me every day",
  ],

  // ── QUIZ (minimum 4 questions) ──
  quiz: [
    {
      question: "When was the first time I spoke to you?",
      options: ["September 2018", "October 2018", "October 2019", "September 2019"],
      correct: 1,
    },
    {
      question: "You always come to me every Sunday after service for something, what was that?",
      options: ["Pictures", "Movies", "Books", "Money"],
      correct: 0,
    },
    {
      question: "Where have you had the most memorable time with me?",
      options: ["Uyo", "Ikeja", "Abeokuta", "New York"],
      correct: 0,
    },
    {
      question: "What song did I sing on the day I proposed to you?",
      options: ["Perfect — Ed Sheeran", "All of Me — John Legend", "Runnin' Home to You — Grant Gustin", "Thinking Out Loud — Ed Sheeran"],
      correct: 2,
    },
    {
      question: "What's my favourite thing about you?",
      options: ["Your smile", "Your laugh", "Your kindness", "Everything — I can't choose just one"],
      correct: 3,
    },
  ],

  // ── SPIN WHEEL PRIZES (8 love coupons) ──
  wheelPrizes: [
    "Breakfast in Bed",
    "Movie Night\n(Your Pick!)",
    "Full Body\nMassage",
    "Love Letter\nOn Demand",
    "Day Trip\nAdventure",
    "Homemade\nDinner Date",
    "Slow Dance\nIn the Kitchen",
    "Wish Granted\n(Anything!)",
  ],

  // ── FINAL SURPRISE ──
  surpriseTitle: "Happy Anniversary & Valentine's!",
  surpriseText: "Every love story is beautiful, but ours is my absolute favorite. Thank you for being my partner, my best friend, and my forever person.",
  surpriseGift: "Your real surprise is waiting... check under your pillow tonight 💛",
};

// ═══════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getDaysSince(dateStr: string): number {
  const start = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

// ═══════════════════════════════════════════════════════════════
// CUSTOM HOOKS
// ═══════════════════════════════════════════════════════════════

function useScrollReveal(options?: { threshold?: number; rootMargin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function useSwipe(
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
  threshold = 50
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;

    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const onEnd = (e: TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - startX;
      const deltaY = e.changedTouches[0].clientY - startY;

      // Only trigger if horizontal swipe is dominant
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
        if (deltaX > 0) onSwipeRight();
        else onSwipeLeft();
      }
    };

    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchend', onEnd);
    };
  }, [onSwipeLeft, onSwipeRight, threshold]);

  return ref;
}

function useCountUp(target: number, duration: number, shouldStart: boolean) {
  const [count, setCount] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!shouldStart || hasStarted.current) return;
    hasStarted.current = true;

    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [shouldStart, target, duration]);

  return count;
}

// ═══════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════

function SectionDivider() {
  return (
    <div className="flex items-center justify-center my-20 md:my-24 px-8 max-w-md mx-auto">
      <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent to-gold/30" />
      <span className="mx-4 text-gold/50 text-sm">✦</span>
      <div className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent to-gold/30" />
    </div>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`text-center mb-10 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <span className="font-cormorant text-xs font-medium tracking-[0.4em] uppercase text-gold-dark block mb-3">
        {label}
      </span>
      <h2 className="font-playfair text-[clamp(2rem,6vw,3rem)] font-normal text-warm-brown-dark leading-tight">
        {title}
      </h2>
      <div className="w-16 h-[1.5px] bg-gold/50 mx-auto mt-4" />
    </div>
  );
}

function PlaceholderImage({
  emoji,
  aspectRatio = '4/3',
  gradient = 'from-rose-blush/30 to-gold-light/20',
  className = '',
}: {
  emoji: string;
  aspectRatio?: string;
  gradient?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative bg-gradient-to-br ${gradient} rounded-lg overflow-hidden flex flex-col items-center justify-center ${className}`}
      style={{ aspectRatio }}
    >
      <span className="text-4xl mb-2">{emoji}</span>
      <span className="text-warm-brown-medium text-xs font-cormorant italic">Your photo here</span>
    </div>
  );
}

function FloatingHearts() {
  const hearts = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${randomBetween(5, 95)}%`,
      size: randomBetween(10, 22),
      duration: `${randomBetween(18, 30)}s`,
      delay: `${randomBetween(0, 20)}s`,
      opacity: randomBetween(0.08, 0.2),
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute animate-float-heart"
          style={{
            left: h.left,
            bottom: '-20px',
            fontSize: `${h.size}px`,
            '--duration': h.duration,
            '--delay': h.delay,
            '--max-opacity': `${h.opacity}`,
            animationDelay: h.delay,
          } as React.CSSProperties}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

function ConfettiBurst({ active }: { active: boolean }) {
  const pieces = useMemo(() => {
    const colors = ['#C9A96E', '#B76E79', '#E8B4B8', '#FFF8F0', '#8B3A4A', '#E8C99B'];
    return Array.from({ length: 55 }, (_, i) => ({
      id: i,
      x: `${randomBetween(-30, 30)}vw`,
      xEnd: `${randomBetween(-40, 40)}vw`,
      rotation: `${randomBetween(360, 1080)}deg`,
      color: colors[i % colors.length],
      duration: `${randomBetween(2.5, 3.5)}s`,
      delay: `${randomBetween(0, 0.5)}s`,
      size: randomBetween(6, 12),
      isCircle: Math.random() > 0.5,
    }));
  }, []);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute left-1/2 top-0"
          style={{
            width: `${p.size}px`,
            height: p.isCircle ? `${p.size}px` : `${p.size * 0.6}px`,
            borderRadius: p.isCircle ? '50%' : '2px',
            backgroundColor: p.color,
            '--x': p.x,
            '--x-end': p.xEnd,
            '--rotation': p.rotation,
            animation: `confettiFall ${p.duration} ease-in ${p.delay} forwards`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 0: PRELOADER
// ═══════════════════════════════════════════════════════════════

function Preloader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hidePreloader = () => {
      setTimeout(() => {
        setVisible(false);
        setTimeout(onComplete, 600);
      }, 800);
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(hidePreloader);
    } else {
      setTimeout(hidePreloader, 2000);
    }
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-cream flex flex-col items-center justify-center transition-opacity duration-600 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <span
        className="text-5xl text-rose mb-6"
        style={{ animation: 'preloaderPulse 1.4s ease-in-out infinite' }}
      >
        ♥
      </span>
      <p className="font-cormorant italic text-warm-brown-medium text-sm tracking-wide">
        Loading your love story...
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 1: ENVELOPE INTRO
// ═══════════════════════════════════════════════════════════════

function EnvelopeIntro({ onOpen }: { onOpen: () => void }) {
  const [state, setState] = useState<'closed' | 'opening' | 'open'>('closed');

  const handleTap = () => {
    if (state !== 'closed') return;
    setState('opening');
    setTimeout(() => {
      setState('open');
      setTimeout(onOpen, 800);
    }, 2000);
  };

  const sparkles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const distance = randomBetween(60, 140);
      return {
        id: i,
        txEnd: `${Math.cos(angle) * distance}px`,
        tyEnd: `${Math.sin(angle) * distance}px`,
        delay: `${0.5 + randomBetween(0, 0.3)}s`,
      };
    });
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[90] bg-cream bg-dot-pattern flex flex-col items-center justify-center cursor-pointer ${
        state === 'open' ? 'pointer-events-none' : ''
      }`}
      style={{
        animation: state === 'open' ? 'overlayFadeOut 800ms ease-out forwards' : undefined,
      }}
      onClick={handleTap}
    >
      {/* Envelope */}
      <div className="relative" style={{ width: '320px', height: '220px' }}>
        {/* Envelope body */}
        <div
          className="absolute inset-0 rounded-md"
          style={{
            background: 'linear-gradient(135deg, #FBF3EB 0%, #FFF8F0 50%, #FBF3EB 100%)',
            boxShadow: '0 16px 48px rgba(44, 24, 16, 0.15), 0 6px 16px rgba(44, 24, 16, 0.10)',
            border: '1px solid rgba(201, 169, 110, 0.2)',
          }}
        />

        {/* Letter inside */}
        <div
          className="absolute left-4 right-4 bottom-4 top-8 rounded-sm flex items-center justify-center"
          style={{
            background: '#FFFDFB',
            border: '1px solid rgba(201, 169, 110, 0.15)',
            animation: state === 'opening' ? 'letterSlideUp 800ms ease-out 700ms both' : undefined,
            opacity: state === 'opening' ? undefined : 0.6,
            transform: state === 'closed' ? 'translateY(20%)' : undefined,
          }}
        >
          <span className="font-dancing text-warm-brown text-base text-center px-4 leading-relaxed">
            For my Valentine,<br />with all my heart...
          </span>
        </div>

        {/* Envelope flap */}
        <div
          className="absolute left-0 right-0 top-0"
          style={{
            height: '110px',
            clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
            background: 'linear-gradient(180deg, #F5EDE3 0%, #FBF3EB 100%)',
            borderBottom: '1px solid rgba(201, 169, 110, 0.15)',
            transformOrigin: 'top center',
            animation: state === 'opening' ? 'envelopeFlapOpen 600ms ease-out forwards' : undefined,
            zIndex: 2,
          }}
        />

        {/* Wax seal */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center"
          style={{
            top: '55px',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #C47878, #8B3A4A)',
            boxShadow: '0 4px 12px rgba(139, 58, 74, 0.4), inset 0 -2px 4px rgba(0,0,0,0.15)',
            animation: state === 'opening' ? 'sealShrink 400ms ease-in 300ms both' : undefined,
          }}
        >
          <span className="text-cream text-lg">♥</span>
        </div>

        {/* Sparkles */}
        {state === 'opening' &&
          sparkles.map((s) => (
            <span
              key={s.id}
              className="absolute left-1/2 z-20 text-gold text-sm"
              style={{
                top: '75px',
                '--tx-end': s.txEnd,
                '--ty-end': s.tyEnd,
                animation: `sparkle 600ms ease-out ${s.delay} both`,
              } as React.CSSProperties}
            >
              ✦
            </span>
          ))}
      </div>

      {/* Tap text */}
      <p
        className={`mt-10 font-cormorant text-warm-brown-medium text-sm italic animate-pulse-glow ${
          state !== 'closed' ? 'opacity-0' : ''
        } transition-opacity duration-300`}
      >
        Tap to open
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 2: HERO
// ═══════════════════════════════════════════════════════════════

function HeroSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const days = getDaysSince(CONFIG.weddingDate);
  const count = useCountUp(days, 2000, isVisible);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      {/* Concentric circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full border border-gold/[0.12] absolute" />
        <div className="w-[700px] h-[700px] rounded-full border border-gold/[0.08] absolute" />
      </div>

      <div
        className={`relative z-10 text-center max-w-md mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Label */}
        <span className="font-cormorant text-xs font-medium tracking-[0.4em] uppercase text-gold-dark block mb-6">
          Happy Anniversary & Happy Valentine's
        </span>

        {/* Title */}
        <h1 className="font-playfair text-[clamp(2.5rem,9vw,4.5rem)] font-bold text-warm-brown-dark leading-[1.1] mb-5 whitespace-pre-line">
          {CONFIG.heroTitle}
        </h1>

        {/* Divider */}
        <div className="w-16 h-[1.5px] bg-gold/50 mx-auto mb-5" />

        {/* Subtitle */}
        <p className="font-cormorant italic text-warm-brown text-lg mb-10">
          {CONFIG.heroSubtitle}
        </p>

        {/* Day Counter Card */}
        <div className="glass rounded-2xl p-6 mb-10 inline-block">
          <span className="font-cormorant text-xs font-medium tracking-[0.35em] uppercase text-gold-dark block mb-2">
            Days of Love
          </span>
          <span className="font-playfair text-[clamp(2.5rem,8vw,4rem)] font-bold text-warm-brown-dark block leading-none">
            {formatNumber(count)}
          </span>
          <span className="font-cormorant italic text-warm-brown-medium text-sm mt-2 block">
            ...and counting
          </span>
        </div>

        {/* Hero photo */}
        <img
          src="/photos/hero.jpg"
          alt="Us"
          className="w-full max-w-sm mx-auto rounded-xl shadow-lg object-cover"
          style={{ aspectRatio: '16/9' }}
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce-gentle">
        <span className="font-cormorant text-[0.7rem] tracking-[0.35em] uppercase text-warm-brown-medium">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent" />
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 3: TIMELINE
// ═══════════════════════════════════════════════════════════════

function TimelineSection() {
  return (
    <section className="px-6 py-16 max-w-md mx-auto">
      <SectionHeader label="Chapter by Chapter" title="Our Timeline" />

      <div className="relative ml-4">
        {/* Vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/30 to-transparent" />

        {CONFIG.timeline.map((item, i) => (
          <TimelineItem key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
}: {
  item: (typeof CONFIG.timeline)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div ref={ref} className="relative pl-8 pb-12 last:pb-0">
      {/* Dot */}
      <div
        className={`absolute left-0 top-1 w-4 h-4 rounded-full -translate-x-1/2 transition-all duration-700 border-2 ${
          isVisible
            ? 'bg-rose border-rose scale-100'
            : 'bg-cream border-gold/30 scale-75'
        }`}
      />

      <div
        className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionDelay: `${index * 80}ms` }}
      >
        {/* Date */}
        <span className="font-cormorant text-xs font-medium tracking-[0.35em] uppercase text-gold-dark block mb-1">
          {item.date}
        </span>

        {/* Title */}
        <h3 className="font-playfair text-xl text-warm-brown-dark mb-2">{item.title}</h3>

        {/* Description */}
        <p className="font-cormorant italic text-warm-brown text-base leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Photo */}
        {item.photo ? (
          <img
            src={item.photo}
            alt={item.title}
            className="max-w-[320px] rounded-lg shadow-md object-cover"
            style={{ aspectRatio: '4/3' }}
          />
        ) : (
          <PlaceholderImage
            emoji={item.emoji}
            aspectRatio="4/3"
            gradient="from-rose-blush/25 to-gold-light/15"
            className="max-w-[320px] shadow-md"
          />
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 4: PHOTO BOOK (Polaroid Gallery)
// ═══════════════════════════════════════════════════════════════

function PhotoBookSection() {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section className="px-6 py-16 max-w-md mx-auto">
      <SectionHeader label="Tap to Reveal" title="Our Moments" />
      <p className="text-center font-cormorant italic text-warm-brown-medium text-sm mb-8">
        Tap each photo to flip it
      </p>

      <div className="grid grid-cols-2 gap-4">
        {CONFIG.photoBook.map((photo, i) => (
          <PolaroidCard
            key={i}
            photo={photo}
            index={i}
            isFlipped={flipped === i}
            onFlip={() => setFlipped(flipped === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}

function PolaroidCard({
  photo,
  index,
  isFlipped,
  onFlip,
}: {
  photo: (typeof CONFIG.photoBook)[number];
  index: number;
  isFlipped: boolean;
  onFlip: () => void;
}) {
  const { ref, isVisible } = useScrollReveal();
  const rotation = useMemo(() => randomBetween(-3, 3), []);

  return (
    <div
      ref={ref}
      className={`perspective-1000 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
        transform: isVisible ? `rotate(${rotation}deg)` : `rotate(${rotation}deg) translateY(40px)`,
      }}
    >
      <div
        className={`preserve-3d cursor-pointer transition-transform duration-700`}
        style={{
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transformStyle: 'preserve-3d',
        }}
        onClick={onFlip}
      >
        {/* Front */}
        <div
          className="backface-hidden bg-white rounded-sm p-2 pb-10 relative"
          style={{
            boxShadow: '0 4px 20px rgba(44, 24, 16, 0.12)',
            backfaceVisibility: 'hidden',
          }}
        >
          <img
            src={`/photos/polaroid-${index + 1}.jpg`}
            alt={photo.caption}
            className="w-full rounded-sm object-cover"
            style={{ aspectRatio: '1/1' }}
          />
          <span className="absolute bottom-3 left-0 right-0 text-center font-dancing text-warm-brown text-sm">
            {photo.caption}
          </span>
        </div>

        {/* Back */}
        <div
          className="backface-hidden absolute inset-0 bg-white rounded-sm flex flex-col items-center justify-center p-4"
          style={{
            boxShadow: '0 4px 20px rgba(44, 24, 16, 0.12)',
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          <span className="text-3xl mb-3">♥</span>
          <p className="font-cormorant italic text-rose text-center text-sm leading-relaxed">
            {photo.backText}
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 5: HANDWRITTEN LETTER
// ═══════════════════════════════════════════════════════════════

function HandwrittenLetterSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const hasTyped = useRef(false);

  useEffect(() => {
    if (!isVisible || hasTyped.current) return;
    hasTyped.current = true;
    setIsTyping(true);

    const text = CONFIG.letterText;
    let i = 0;

    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 22);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={ref} className="px-6 py-16 max-w-md mx-auto">
      <SectionHeader label="Written from the Heart" title="My Letter to You" />

      <div className="glass rounded-2xl p-6 md:p-8 notebook-lines relative">
        {/* Invisible full text for sizing */}
        <div className="invisible absolute inset-0 p-6 md:p-8 font-dancing text-[1.15rem] leading-[2] whitespace-pre-wrap">
          {CONFIG.letterText}
          <br /><br />
          {CONFIG.letterSignOff}
          <br />
          — {CONFIG.yourName} ♥
        </div>

        {/* Visible typing text */}
        <div className="font-dancing text-warm-brown-dark text-[1.15rem] leading-[2] whitespace-pre-wrap min-h-[200px]">
          {displayedText}
          {isTyping && (
            <span
              className="inline-block w-0.5 h-5 bg-rose ml-0.5 align-middle animate-cursor-blink"
            />
          )}
          {!isTyping && displayedText.length === CONFIG.letterText.length && (
            <>
              <br /><br />
              <span className="text-warm-brown italic">{CONFIG.letterSignOff}</span>
              <br />
              <span className="text-warm-brown">— {CONFIG.yourName} ♥</span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 6: LOVE LETTERS ("Open When..." Envelopes)
// ═══════════════════════════════════════════════════════════════

function LoveLettersSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-6 py-16 max-w-md mx-auto">
      <SectionHeader label="Just for You" title="Love Letters" />

      <div className="space-y-3">
        {CONFIG.loveLetters.map((letter, i) => (
          <LoveLetterCard
            key={i}
            letter={letter}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}

function LoveLetterCard({
  letter,
  index,
  isOpen,
  onToggle,
}: {
  letter: (typeof CONFIG.loveLetters)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`glass-card rounded-xl overflow-hidden cursor-pointer transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
      onClick={onToggle}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <span className="text-xl">{isOpen ? '💌' : '✉️'}</span>
          <div>
            <p className="font-cormorant text-warm-brown-dark text-base font-medium">
              {letter.label}
            </p>
            <span className="font-cormorant text-warm-brown-medium text-sm italic">
              {isOpen ? 'Tap to close' : 'Tap to read'}
            </span>
          </div>
        </div>
        <span className={`arrow-rotate text-gold text-sm ${isOpen ? 'open' : ''}`}>▼</span>
      </div>

      {/* Content */}
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        <div className="px-4 pb-4">
          <div className="w-12 h-px bg-gold/30 mb-4" />
          <p className="font-cormorant italic text-warm-brown text-base leading-relaxed">
            {letter.message}
          </p>
          <p className="font-dancing text-rose text-sm mt-4">
            With all my love, {CONFIG.yourName} ♥
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 7: REASONS I LOVE YOU (Carousel)
// ═══════════════════════════════════════════════════════════════

function ReasonsCarouselSection() {
  const [current, setCurrent] = useState(0);
  const [, setDirection] = useState<'left' | 'right'>('right');
  const total = CONFIG.reasons.length;

  const goNext = useCallback(() => {
    setDirection('right');
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setDirection('left');
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  const swipeRef = useSwipe(goNext, goPrev);

  return (
    <section className="px-6 py-16 max-w-md mx-auto">
      <SectionHeader label="An Infinite List" title="Reasons I Love You" />

      <div ref={swipeRef} className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden min-h-[200px]">
        {/* Watermark number */}
        <span className="absolute top-4 right-6 font-playfair text-[5rem] font-bold text-warm-brown-dark/[0.05] leading-none select-none">
          #{current + 1}
        </span>

        {/* Reason text */}
        <div className="relative z-10 flex items-center justify-center min-h-[120px] py-4">
          <p
            key={current}
            className="font-cormorant italic text-warm-brown-dark text-center text-lg leading-relaxed reason-enter"
          >
            "{CONFIG.reasons[current]}"
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="w-11 h-11 rounded-full border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/10 active:scale-95 transition-all"
            aria-label="Previous reason"
          >
            ←
          </button>
          <span className="font-cormorant text-warm-brown-medium text-sm">
            {current + 1} of {total}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="w-11 h-11 rounded-full border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/10 active:scale-95 transition-all"
            aria-label="Next reason"
          >
            →
          </button>
        </div>
      </div>

      <p className="text-center font-cormorant italic text-warm-brown-medium text-sm mt-6">
        ...and a million more I haven't written yet
      </p>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 8: QUIZ
// ═══════════════════════════════════════════════════════════════

function QuizSection() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const totalQ = CONFIG.quiz.length;
  const question = CONFIG.quiz[currentQ];

  const handleSelect = (optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);

    if (optionIndex === question.correct) {
      setScore((s) => s + 1);
    }

    setTimeout(() => {
      if (currentQ < totalQ - 1) {
        setCurrentQ((q) => q + 1);
        setSelected(null);
      } else {
        setShowResult(true);
        setConfetti(true);
        setTimeout(() => setConfetti(false), 4000);
      }
    }, 1200);
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
  };

  return (
    <section className="px-6 py-16 max-w-md mx-auto">
      <SectionHeader label="Let's Play" title="Our Love Quiz" />

      <ConfettiBurst active={confetti} />

      {!showResult ? (
        <>
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {CONFIG.quiz.map((_, i) => (
              <div
                key={i}
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: i <= currentQ ? '28px' : '12px',
                  backgroundColor: i < currentQ ? '#B76E79' : i === currentQ ? '#C9A96E' : 'rgba(201, 169, 110, 0.2)',
                }}
              />
            ))}
          </div>

          {/* Question card */}
          <div className="glass rounded-2xl p-6">
            <p className="font-playfair text-warm-brown-dark text-center text-lg mb-6">
              {question.question}
            </p>

            <div className="space-y-3">
              {question.options.map((option, i) => {
                let stateClass = '';
                if (selected !== null) {
                  if (i === question.correct) stateClass = 'correct';
                  else if (i === selected) stateClass = 'wrong';
                  else stateClass = 'faded';
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={selected !== null}
                    className={`quiz-option ${stateClass} w-full text-left p-4 rounded-xl border border-gold/25 bg-white/50 font-cormorant text-warm-brown text-base transition-all hover:bg-white/70 hover:border-gold/40 disabled:cursor-default`}
                  >
                    <span className="text-gold mr-2 text-sm">{String.fromCharCode(65 + i)}.</span>
                    {option}
                    {selected !== null && i === question.correct && (
                      <span className="float-right text-rose-warm">✓</span>
                    )}
                    {selected === i && i !== question.correct && (
                      <span className="float-right text-rose">✗</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        /* Result */
        <div className="glass rounded-2xl p-8 text-center">
          <span className="font-playfair text-[3rem] font-bold text-warm-brown-dark block mb-2">
            {score}/{totalQ}
          </span>
          <p className="font-cormorant italic text-warm-brown text-lg mb-6">
            {score === totalQ
              ? "Perfect score! You know our love story by heart 💛"
              : score >= totalQ / 2
              ? "So close! You know us well 💕"
              : "Let's make more memories to remember! 💕"}
          </p>
          <button
            onClick={resetQuiz}
            className="px-6 py-3 rounded-full bg-rose text-white font-cormorant text-base tracking-wider hover:bg-rose-deep active:scale-95 transition-all shadow-md hover:shadow-lg"
          >
            Play Again
          </button>
        </div>
      )}
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 9: LOVE WHEEL (Spin to Win)
// ═══════════════════════════════════════════════════════════════

function LoveWheelSection() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<SVGSVGElement>(null);

  const segments = CONFIG.wheelPrizes;
  const segmentAngle = 360 / segments.length;

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    // Spin 4-6 full rotations plus a random landing position
    const totalRotation = rotation + 1440 + randomBetween(180, 720);
    setRotation(totalRotation);

    setTimeout(() => {
      setSpinning(false);
      // Derive the winner from where the wheel actually stops
      // Segment 0 starts at top (12 o'clock) and goes clockwise
      const normalizedAngle = ((totalRotation % 360) + 360) % 360;
      const winningIndex = Math.floor(normalizedAngle / segmentAngle) % segments.length;
      setResult(segments[winningIndex].replace('\n', ' '));
    }, 3800);
  };

  return (
    <section className="px-6 py-16 max-w-md mx-auto">
      <SectionHeader label="Feeling Lucky?" title="Love Wheel" />

      <div className="flex flex-col items-center">
        {/* Pointer */}
        <div className="text-rose text-2xl mb-[-8px] z-10 relative" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>
          ▼
        </div>

        {/* Wheel */}
        <svg
          ref={wheelRef}
          viewBox="0 0 280 280"
          className="w-[280px] h-[280px]"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? 'transform 3.8s cubic-bezier(0.17, 0.67, 0.12, 0.99)'
              : undefined,
          }}
        >
          {segments.map((prize, i) => {
            const startAngle = i * segmentAngle;
            const endAngle = startAngle + segmentAngle;
            const startRad = (Math.PI / 180) * (startAngle - 90);
            const endRad = (Math.PI / 180) * (endAngle - 90);
            const x1 = 140 + 130 * Math.cos(startRad);
            const y1 = 140 + 130 * Math.sin(startRad);
            const x2 = 140 + 130 * Math.cos(endRad);
            const y2 = 140 + 130 * Math.sin(endRad);
            const largeArc = segmentAngle > 180 ? 1 : 0;
            const midAngle = startAngle + segmentAngle / 2;
            const midRad = (Math.PI / 180) * (midAngle - 90);
            const textX = 140 + 80 * Math.cos(midRad);
            const textY = 140 + 80 * Math.sin(midRad);
            const colors = ['#FFF8F0', '#F5E6E8', '#FFF8F0', '#F5E6E8', '#FFF8F0', '#F5E6E8', '#FFF8F0', '#F5E6E8'];

            return (
              <g key={i}>
                <path
                  d={`M 140 140 L ${x1} ${y1} A 130 130 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill={colors[i % colors.length]}
                  stroke="#C9A96E"
                  strokeWidth="0.5"
                />
                <text
                  x={textX}
                  y={textY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${midAngle}, ${textX}, ${textY})`}
                  className="font-cormorant"
                  style={{ fontSize: '11px', fill: '#6B4F3E' }}
                >
                  {prize.split('\n').map((line, li) => (
                    <tspan key={li} x={textX} dy={li === 0 ? 0 : 11}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
          {/* Center circle */}
          <circle cx="140" cy="140" r="22" fill="#B76E79" stroke="#C9A96E" strokeWidth="1" />
          <text x="140" y="140" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: '14px', fill: '#FFF8F0' }}>
            ♥
          </text>
        </svg>

        {/* Spin button */}
        <button
          onClick={spin}
          disabled={spinning}
          className="mt-6 px-8 py-3 rounded-full bg-rose text-white font-cormorant text-base tracking-wider shadow-lg hover:bg-rose-deep hover:shadow-xl active:scale-95 transition-all disabled:opacity-60 disabled:cursor-default"
        >
          {spinning ? 'Spinning...' : 'Spin the Wheel'}
        </button>

        {/* Result */}
        {result && (
          <div className="glass rounded-2xl p-6 mt-6 text-center animate-fade-in-up">
            <span className="text-2xl mb-2 block">🎉</span>
            <p className="font-playfair text-warm-brown-dark text-lg mb-1">You won!</p>
            <p className="font-cormorant italic text-rose text-lg">{result}</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 10: FINAL SURPRISE
// ═══════════════════════════════════════════════════════════════

function FinalSurpriseSection() {
  const [revealed, setRevealed] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const handleReveal = () => {
    if (revealed) return;
    setRevealed(true);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 4000);
  };

  return (
    <section className="px-6 py-16 max-w-md mx-auto">
      <SectionHeader label="One More Thing..." title="A Surprise for You" />

      <ConfettiBurst active={confetti} />

      <div className="flex flex-col items-center">
        {!revealed ? (
          /* Gift box */
          <div
            className="cursor-pointer flex flex-col items-center"
            onClick={handleReveal}
          >
            <div
              className="w-[140px] h-[140px] rounded-2xl flex items-center justify-center animate-heartbeat"
              style={{
                background: 'linear-gradient(135deg, #B76E79, #C9A96E)',
                boxShadow: '0 12px 40px rgba(183, 110, 121, 0.35), 0 4px 12px rgba(183, 110, 121, 0.15)',
              }}
            >
              <span className="text-5xl">🎁</span>
            </div>
            <p className="font-cormorant italic text-warm-brown-medium text-sm mt-4 animate-pulse-glow">
              Tap to unwrap
            </p>
          </div>
        ) : (
          /* Reveal card */
          <div className="glass rounded-2xl p-8 text-center animate-fade-in-up w-full">
            <span className="text-4xl mb-4 block">💛</span>
            <h3 className="font-playfair text-2xl text-warm-brown-dark mb-4">
              {CONFIG.surpriseTitle}
            </h3>
            <p className="font-cormorant italic text-warm-brown text-base leading-relaxed mb-6">
              {CONFIG.surpriseText}
            </p>
            <div className="w-16 h-[1.5px] bg-gold/50 mx-auto mb-6" />
            <p className="font-cormorant text-warm-brown-dark text-base leading-relaxed">
              {CONFIG.surpriseGift}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 12: FOOTER
// ═══════════════════════════════════════════════════════════════

function FooterSection() {
  return (
    <footer className="px-6 py-16 max-w-md mx-auto text-center">
      <div className="w-24 h-[1.5px] bg-gold/40 mx-auto mb-8" />
      <p className="font-cormorant text-xs font-medium tracking-[0.4em] uppercase text-gold-dark mb-4">
        {CONFIG.yourName} & {CONFIG.partnerName}
      </p>
      <p className="font-cormorant italic text-warm-brown-medium text-sm mb-2">
        Made with love, for the love of my life
      </p>
      <p className="font-cormorant text-warm-brown-medium text-xs mb-4">
        February 13 & 14 — Our Anniversary & Valentine's
      </p>
      <span className="text-rose text-lg animate-heartbeat inline-block">♥</span>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  return (
    <div className="relative bg-cream bg-dot-pattern min-h-screen">
      {/* Preloader */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Envelope */}
      {preloaderDone && !envelopeOpen && (
        <EnvelopeIntro onOpen={() => setEnvelopeOpen(true)} />
      )}

      {/* Floating Hearts (always present) */}
      <FloatingHearts />

      {/* Main Content */}
      <main
        className={`relative z-10 transition-opacity duration-1000 ${
          envelopeOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <HeroSection />
        <SectionDivider />
        <TimelineSection />
        <SectionDivider />
        <PhotoBookSection />
        <SectionDivider />
        <HandwrittenLetterSection />
        <SectionDivider />
        <LoveLettersSection />
        <SectionDivider />
        <ReasonsCarouselSection />
        <SectionDivider />
        <QuizSection />
        <SectionDivider />
        <LoveWheelSection />
        <SectionDivider />
        <FinalSurpriseSection />
        <SectionDivider />
        <FooterSection />
      </main>
    </div>
  );
}

export default App;
