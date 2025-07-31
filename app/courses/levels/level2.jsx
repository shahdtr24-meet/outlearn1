import { router } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Level2Rome() {
  const [showLevel2, setShowLevel2] = useState(false);
  const [showRome, setShowRome] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Trigger animations with delays
    setTimeout(() => setShowLevel2(true), 500);
    setTimeout(() => setShowRome(true), 2000);
    
    // Generate particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(45deg, #1a1a2e, #16213e, #0f3460, #e94560)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 8s ease infinite',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      
      {/* Animated Background Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: '4px',
            height: '4px',
            background: '#fff',
            borderRadius: '50%',
            animation: `twinkle ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            opacity: 0.7,
          }}
        />
      ))}

      {/* Rotating Geometric Shapes */}
      <div style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        border: '2px solid rgba(255,255,255,0.2)',
        borderRadius: '50%',
        animation: 'rotate 20s linear infinite',
        top: '20%',
        left: '10%',
      }} />
      
      <div style={{
        position: 'absolute',
        width: '150px',
        height: '150px',
        border: '3px solid rgba(233, 69, 96, 0.4)',
        transform: 'rotate(45deg)',
        animation: 'counterRotate 15s linear infinite',
        bottom: '20%',
        right: '15%',
      }} />

      {/* Go Back Arrow */}
      <div style={{
        position: 'absolute',
        top: '30px',
        left: '30px',
        zIndex: 20,
        cursor: 'pointer',
        transform: showLevel2 ? 'translateX(0) scale(1)' : 'translateX(-100px) scale(0)',
        opacity: showLevel2 ? 1 : 0,
        transition: 'all 1s ease-out 2s',
      }}
      onClick={() => router.push('/course')}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.2) rotate(-5deg)';
        e.target.style.filter = 'drop-shadow(0 0 20px #e94560)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1) rotate(0deg)';
        e.target.style.filter = 'drop-shadow(0 0 10px rgba(233,69,96,0.5))';
      }}>
        <div style={{
          width: '70px',
          height: '70px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(233,69,96,0.3))',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid rgba(255,255,255,0.5)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          filter: 'drop-shadow(0 0 15px rgba(233,69,96,0.7))',
          animation: 'arrowPulse 3s ease-in-out infinite',
          boxShadow: '0 0 20px rgba(233,69,96,0.4), inset 0 0 20px rgba(255,255,255,0.1)',
        }}>
          {/* Arrow made of multiple elements for better visibility */}
          <div style={{
            position: 'relative',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Arrow shaft */}
            <div style={{
              width: '20px',
              height: '4px',
              background: 'linear-gradient(90deg, #fff, #ffd700)',
              borderRadius: '2px',
              boxShadow: '0 0 10px rgba(255,255,255,0.8)',
              position: 'absolute',
              left: '5px',
            }} />
            {/* Arrow head top */}
            <div style={{
              width: '0',
              height: '0',
              borderTop: '8px solid transparent',
              borderBottom: '8px solid transparent',
              borderRight: '12px solid #fff',
              position: 'absolute',
              left: '0px',
              filter: 'drop-shadow(0 0 8px rgba(255,255,255,1))',
            }} />
            {/* Arrow head glow */}
            <div style={{
              width: '0',
              height: '0',
              borderTop: '10px solid transparent',
              borderBottom: '10px solid transparent',
              borderRight: '15px solid rgba(255,215,0,0.6)',
              position: 'absolute',
              left: '-2px',
              filter: 'blur(2px)',
            }} />
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div style={{
        textAlign: 'center',
        zIndex: 10,
        position: 'relative',
      }}>
        
        {/* LEVEL 2 INCOMING */}
        <div style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          color: '#fff',
          textShadow: '0 0 20px #e94560, 0 0 40px #e94560',
          marginBottom: '2rem',
          transform: showLevel2 ? 'translateY(0) scale(1)' : 'translateY(-100px) scale(0.5)',
          opacity: showLevel2 ? 1 : 0,
          transition: 'all 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          animation: showLevel2 ? 'pulse 2s ease-in-out infinite alternate' : 'none',
        }}>
          LEVEL 2
        </div>

        <div style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #ff6b6b, #ffd93d, #6bcf7f, #4ecdc4, #45b7d1)',
          backgroundSize: '300% 300%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'gradientText 3s ease infinite, bounce 1s ease-in-out infinite alternate',
          marginBottom: '3rem',
          transform: showLevel2 ? 'translateX(0)' : 'translateX(-200px)',
          opacity: showLevel2 ? 1 : 0,
          transition: 'all 1.2s ease-out 0.5s',
        }}>
          INCOMING
        </div>

        {/* Separator Line */}
        <div style={{
          width: showLevel2 ? '300px' : '0px',
          height: '4px',
          background: 'linear-gradient(90deg, transparent, #e94560, #fff, #e94560, transparent)',
          margin: '0 auto 3rem auto',
          transition: 'width 2s ease-out 1s',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
            animation: showLevel2 ? 'shimmer 2s ease-in-out infinite' : 'none',
          }} />
        </div>

        {/* ROME WASN'T BUILT IN A DAY */}
        <div style={{
          fontSize: '1.8rem',
          color: '#fff',
          fontStyle: 'italic',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          transform: showRome ? 'translateY(0) rotateX(0deg)' : 'translateY(50px) rotateX(90deg)',
          opacity: showRome ? 1 : 0,
          transition: 'all 1.5s ease-out',
          perspective: '1000px',
          marginBottom: '1rem',
        }}>
          ROME WASN'T BUILT
        </div>

        <div style={{
          fontSize: '2.2rem',
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #ffd700, #ffed4e, #fff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          transform: showRome ? 'scale(1) rotateY(0deg)' : 'scale(0.3) rotateY(180deg)',
          opacity: showRome ? 1 : 0,
          transition: 'all 1.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s',
          animation: showRome ? 'glow 3s ease-in-out infinite alternate' : 'none',
        }}>
          IN A DAY
        </div>
      </div>

      {/* Floating Orbs */}
      <div style={{
        position: 'absolute',
        width: '60px',
        height: '60px',
        background: 'radial-gradient(circle, rgba(233,69,96,0.8), transparent)',
        borderRadius: '50%',
        top: '30%',
        right: '20%',
        animation: 'float 6s ease-in-out infinite',
        filter: 'blur(1px)',
      }} />
      
      <div style={{
        position: 'absolute',
        width: '40px',
        height: '40px',
        background: 'radial-gradient(circle, rgba(255,215,0,0.6), transparent)',
        borderRadius: '50%',
        bottom: '40%',
        left: '25%',
        animation: 'float 8s ease-in-out infinite reverse',
        filter: 'blur(2px)',
      }} />

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        
        @keyframes bounce {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-10px); }
        }
        
        @keyframes gradientText {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes glow {
          0% { text-shadow: 0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #ffd700; }
          100% { text-shadow: 0 0 20px #ffd700, 0 0 30px #ffd700, 0 0 40px #ffd700; }
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes counterRotate {
          0% { transform: rotate(45deg); }
          100% { transform: rotate(-315deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes arrowPulse {
          0%, 100% { 
            box-shadow: 0 0 15px rgba(233,69,96,0.3), inset 0 0 15px rgba(255,255,255,0.1); 
          }
          50% { 
            box-shadow: 0 0 25px rgba(233,69,96,0.6), inset 0 0 25px rgba(255,255,255,0.2); 
          }
        }
        
        @media (max-width: 768px) {
          div[style*="fontSize: '4rem'"] {
            font-size: 2.5rem !important;
          }
          div[style*="fontSize: '2.5rem'"] {
            font-size: 1.8rem !important;
          }
          div[style*="fontSize: '1.8rem'"] {
            font-size: 1.3rem !important;
          }
          div[style*="fontSize: '2.2rem'"] {
            font-size: 1.6rem !important;
          }
        }
      `}</style>
    </div>
  );
}