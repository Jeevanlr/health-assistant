import React, { useState, useEffect } from 'react';

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const healthCards = [
    {
      id: 'diabetes',
      title: 'Diabetes Prediction',
      icon: '🩸',
      description: 'Monitor blood glucose levels and predict diabetes risk with AI',
      color: '#6366F1',
      lightColor: '#EEF2FF',
      route: '/pre-diabetes', // CHANGED: from '/diabetes' to '/pre-diabetes'
      
    },
    {
      id: 'heart',
      title: 'Heart Health',
      icon: '❤️',
      description: 'Comprehensive cardiovascular disease risk assessment',
      color: '#EF4444',
      lightColor: '#FEF2F2',
      route: '/pre-heart', // CHANGE THIS from '/heart' to '/pre-heart'
    },
     {
      id: 'parkinsons',
      title: "Parkinson's Detection",
      icon: '🧠',
      description: 'Early detection of Parkinson\'s disease symptoms',
      color: '#8B5CF6',
      lightColor: '#F5F3FF',
      route: '/pre-parkinsons', // CHANGE THIS from '/parkinsons' to '/pre-parkinsons'
    },
    {
      id: 'breast',
      title: 'Breast Cancer Screening',
      icon: '🎗️',
      description: 'Advanced breast cancer risk evaluation',
      color: '#EC4899',
      lightColor: '#FDF2F8',
      route: '/pre-breast', // CHANGE THIS from '/breast' to '/pre-breast'
    },
    {
      id: 'symptom',
      title: 'Symptom Analyzer',
      icon: '🔍',
      description: 'AI-powered multi-symptom disease prediction',
      color: '#14B8A6',
      lightColor: '#F0FDFA',
      route: '/symptom',
      
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FAFBFC',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0
      }}>
        <div style={{
          position: 'absolute',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
          top: '-80px',
          right: '-80px',
          animation: 'float 20s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)',
          bottom: '-40px',
          left: '-40px',
          animation: 'float 15s ease-in-out infinite reverse'
        }}></div>
      </div>

      {/* Hero Section */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: '24px 20px 16px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(250,251,252,0.9) 100%)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '25px',
            fontSize: 'clamp(10px, 1vw, 11px)',
            fontWeight: '600',
            marginBottom: '14px',
            boxShadow: '0 2px 12px rgba(99, 102, 241, 0.3)',
            animation: 'slideDown 0.6s ease-out'
          }}>
            <span>✨</span> Powered by Advanced AI
          </div>

          {/* Main Heading */}
          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 50px)',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '14px',
            background: 'linear-gradient(135deg, #1F2937 0%, #6366F1 50%, #EC4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'fadeIn 0.8s ease-out'
          }}>
            Your Health,<br />Reimagined
          </h1>

          <p style={{
            fontSize: 'clamp(12px, 1.8vw, 16px)',
            color: '#6B7280',
            maxWidth: '450px',
            margin: '0 auto 24px',
            lineHeight: '1.6',
            animation: 'fadeIn 1s ease-out'
          }}>
            Experience the future of healthcare with AI-powered predictions. 
            Get instant, accurate health insights in seconds.
          </p>

          {/* CTA Button */}
          <button style={{
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 30px',
            fontSize: 'clamp(12px, 1.8vw, 14px)',
            fontWeight: '700',
            borderRadius: '25px',
            cursor: 'pointer',
            boxShadow: '0 5px 15px rgba(99, 102, 241, 0.3)',
            transition: 'all 0.3s ease',
            animation: 'fadeIn 1.2s ease-out'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 5px 15px rgba(99, 102, 241, 0.3)';
          }}
          onClick={() => window.scrollTo({ top: 220, behavior: 'smooth' })}>
            Get Started Free →
          </button>
        </div>
      </div>

      {/* Health Cards Section */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '900px',
        margin: '0 auto',
        padding: '36px 20px'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '28px'
        }}>
          <h2 style={{
            fontSize: 'clamp(20px, 3vw, 32px)',
            fontWeight: '800',
            color: '#1F2937',
            marginBottom: '10px'
          }}>
            Choose Your Health Check
          </h2>
          <p style={{
            fontSize: 'clamp(12px, 1.8vw, 16px)',
            color: '#6B7280',
            maxWidth: '450px',
            margin: '0 auto'
          }}>
            Select any condition below to start your AI-powered health assessment
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px'
        }}>
          {healthCards.map((card, index) => (
            <div
              key={card.id}
              style={{
                position: 'relative',
                background: hoveredCard === index 
                  ? `linear-gradient(135deg, ${card.color} 0%, ${card.color}dd 100%)`
                  : 'white',
                borderRadius: '12px',
                padding: '22px 20px',
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: hoveredCard === index
                  ? `0 12px 28px ${card.color}40`
                  : '0 4px 15px rgba(0, 0, 0, 0.08)',
                transform: hoveredCard === index ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
                overflow: 'hidden',
                animation: `slideUp 0.6s ease-out ${index * 0.1}s backwards`
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => window.location.href = card.route}
            >
              {/* Background Pattern */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '200%',
                height: '200%',
                background: hoveredCard === index 
                  ? 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)'
                  : 'none',
                transition: 'all 0.5s ease'
              }}></div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Icon */}
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: hoveredCard === index ? 'rgba(255,255,255,0.2)' : card.lightColor,
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '26px',
                  marginBottom: '12px',
                  transition: 'all 0.4s ease',
                  transform: hoveredCard === index ? 'rotate(10deg) scale(1.1)' : 'rotate(0) scale(1)'
                }}>
                  {card.icon}
                </div>

                {/* Badge */}
                <div style={{
                  display: 'inline-block',
                  background: hoveredCard === index ? 'rgba(255,255,255,0.25)' : card.lightColor,
                  color: hoveredCard === index ? 'white' : card.color,
                  padding: '3px 10px',
                  borderRadius: '25px',
                  fontSize: '9px',
                  fontWeight: '700',
                  marginBottom: '10px',
                  transition: 'all 0.3s ease'
                }}>
                  {card.stats}
                </div>

                <h3 style={{
                  fontSize: 'clamp(16px, 2vw, 18px)',
                  fontWeight: '700',
                  color: hoveredCard === index ? 'white' : '#1F2937',
                  marginBottom: '8px',
                  transition: 'color 0.3s ease'
                }}>
                  {card.title}
                </h3>

                <p style={{
                  fontSize: 'clamp(10px, 1.2vw, 12px)',
                  color: hoveredCard === index ? 'rgba(255,255,255,0.9)' : '#6B7280',
                  lineHeight: '1.6',
                  marginBottom: '12px',
                  transition: 'color 0.3s ease'
                }}>
                  {card.description}
                </p>

                {/* Arrow */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: hoveredCard === index ? 'white' : card.color,
                  transition: 'all 0.3s ease'
                }}>
                  Start Analysis
                  <span style={{
                    transform: hoveredCard === index ? 'translateX(3px)' : 'translateX(0)',
                    transition: 'transform 0.3s ease',
                    fontSize: '14px'
                  }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Section */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        background: 'white',
        padding: '36px 20px',
        marginTop: '18px'
      }}>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px'
        }}>
          {[
            { icon: '⚡', title: 'Lightning Fast', desc: 'Get results in under 3 seconds' },
            { icon: '🔒', title: 'Completely Private', desc: 'Your data never leaves your device' },
            { icon: '🎯', title: 'Highly Accurate', desc: 'Trained on millions of data points' },
            
          ].map((feature, index) => (
            <div key={index} style={{
              textAlign: 'center',
              padding: '16px 14px',
              animation: `fadeIn 0.8s ease-out ${index * 0.15}s backwards`
            }}>
              <div style={{
                fontSize: '24px',
                marginBottom: '8px'
              }}>
                {feature.icon}
              </div>
              <h4 style={{
                fontSize: 'clamp(12px, 1.5vw, 14px)',
                fontWeight: '700',
                color: '#1F2937',
                marginBottom: '3px'
              }}>
                {feature.title}
              </h4>
              <p style={{
                fontSize: 'clamp(9px, 1vw, 10px)',
                color: '#6B7280',
                lineHeight: '1.5'
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '700px',
        margin: '0 auto 28px',
        padding: '0 20px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
          borderRadius: '12px',
          padding: 'clamp(12px, 2vw, 20px)',
          display: 'flex',
          alignItems: 'start',
          gap: '10px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{
            fontSize: '16px',
            flexShrink: 0
          }}>
            ⚠️
          </div>
          <div>
            <h4 style={{
              fontSize: 'clamp(12px, 1.8vw, 14px)',
              fontWeight: '700',
              color: '#92400E',
              marginBottom: '6px'
            }}>
              Important Medical Disclaimer
            </h4>
            <p style={{
              fontSize: 'clamp(9px, 1vw, 10px)',
              color: '#92400E',
              lineHeight: '1.7',
              margin: 0
            }}>
              This AI-powered tool provides health predictions for informational purposes only and should not replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical concerns and before making any health-related decisions.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(20px, -20px) rotate(120deg); }
          66% { transform: translate(-15px, 15px) rotate(240deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}