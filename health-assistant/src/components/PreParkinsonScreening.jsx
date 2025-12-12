import React, { useState } from 'react';

export default function PreParkinsonScreening() {
  const [formData, setFormData] = useState({
    age: '',
    tremor_severity: '',
    movement_difficulty: '',
    voice_changes: ''
  });
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const ranges = {
    age: [30, 90],
    tremor_severity: [0, 10],
    movement_difficulty: [0, 10],
    voice_changes: [0, 10]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (value === '') {
      setError('');
      return;
    }

    const num = parseFloat(value);
    const [min, max] = ranges[name];

    if (isNaN(num) || num < min || num > max) {
      setError(`${name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, ' ')} must be between ${min} and ${max}`);
    } else {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    for (let key in formData) {
      if (formData[key] === '') {
        setError('⚠️ Please fill in all fields');
        return;
      }

      const num = parseFloat(formData[key]);
      if (isNaN(num) || num < ranges[key][0] || num > ranges[key][1]) {
        setError(`${key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')} must be between ${ranges[key][0]} and ${ranges[key][1]}`);
        return;
      }
    }

    setError('');
    setLoading(true);

    try {
      // Call backend API
      const response = await fetch('http://192.168.1.17:5000/predict/pre-parkinsons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: parseFloat(formData.age),
          tremor_severity: parseFloat(formData.tremor_severity),
          movement_difficulty: parseFloat(formData.movement_difficulty),
          voice_changes: parseFloat(formData.voice_changes)
        })
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.risk_percentage);
      } else {
        setError(data.error || 'Failed to calculate risk');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const handleProceedToDetailed = () => {
    window.location.href = '/parkinsons';
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleReset = () => {
    setFormData({ age: '', tremor_severity: '', movement_difficulty: '', voice_changes: '' });
    setError('');
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getRiskLevel = (percentage) => {
    if (percentage <= 30) return { level: 'Low', color: '#10b981', bg: '#d1fae5' };
    if (percentage <= 50) return { level: 'Moderate', color: '#f59e0b', bg: '#fef3c7' };
    return { level: 'High', color: '#ef4444', bg: '#fecaca' };
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #7c3aed 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      padding: '12px',
      position: 'relative'
    }}>
      {/* Home Button */}
      <button
        onClick={handleGoHome}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'rgba(255, 255, 255, 0.95)',
          border: 'none',
          borderRadius: '12px',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
          color: '#8b5cf6',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
          zIndex: 1000
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        }}
      >
        🏠 Home
      </button>

      <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '20px' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: 'white'
        }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.12)',
            padding: '10px 18px',
            borderRadius: '40px',
            marginBottom: '12px',
            backdropFilter: 'blur(6px)'
          }}>
            <span style={{ fontSize: '28px', marginRight: '8px' }}>🧠</span>
            <span style={{ fontSize: '15px', fontWeight: '600' }}>
              Quick Parkinson's Risk Screening
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(24px, 5vw, 38px)',
            fontWeight: '800',
            margin: '0 0 10px 0',
            textShadow: '0 3px 14px rgba(0,0,0,0.25)'
          }}>
            Neurological Risk Assessment
          </h1>
          <p style={{
            fontSize: 'clamp(13px, 2vw, 16px)',
            opacity: 0.95,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.5'
          }}>
            Quick 4-question screening to assess your Parkinson's disease risk. Takes less than 30 seconds.
          </p>
        </div>

        {/* Screening Form */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.98)',
          borderRadius: '18px',
          boxShadow: '0 18px 50px rgba(0, 0, 0, 0.25)',
          padding: 'clamp(20px, 3vw, 30px)',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '25px'
          }}>
            <span style={{ fontSize: '28px' }}>📋</span>
            <h2 style={{
              color: '#1f2937',
              fontSize: 'clamp(18px, 3vw, 24px)',
              fontWeight: '700',
              margin: 0
            }}>
              Quick Screening Questions
            </h2>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {/* Age */}
            <div style={{
              background: '#f9fafb',
              padding: '16px',
              borderRadius: '12px',
              border: '2px solid #e5e7eb',
              transition: 'all 0.2s ease'
            }}>
              <label style={{
                fontWeight: '600',
                color: '#374151',
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px'
              }}>
                <span style={{ fontSize: '24px' }}>🎂</span>
                What is your age?
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age (30-90)"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  opacity: loading ? 0.6 : 1
                }}
                onFocus={(e) => e.target.style.borderColor = '#8b5cf6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              <div style={{
                marginTop: '8px',
                fontSize: '12px',
                color: '#6b7280'
              }}>
                Range: 30 - 90 years
              </div>
            </div>

            {/* Tremor Severity */}
            <div style={{
              background: '#f9fafb',
              padding: '16px',
              borderRadius: '12px',
              border: '2px solid #e5e7eb',
              transition: 'all 0.2s ease'
            }}>
              <label style={{
                fontWeight: '600',
                color: '#374151',
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px'
              }}>
                <span style={{ fontSize: '24px' }}>🤚</span>
                Rate your tremor severity (0 = none, 10 = severe)
              </label>
              <input
                type="number"
                name="tremor_severity"
                value={formData.tremor_severity}
                onChange={handleChange}
                placeholder="Enter tremor severity (0-10)"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  opacity: loading ? 0.6 : 1
                }}
                onFocus={(e) => e.target.style.borderColor = '#8b5cf6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              <div style={{
                marginTop: '8px',
                fontSize: '12px',
                color: '#6b7280'
              }}>
                Range: 0 (no tremor) - 10 (severe tremor)
              </div>
            </div>

            {/* Movement Difficulty */}
            <div style={{
              background: '#f9fafb',
              padding: '16px',
              borderRadius: '12px',
              border: '2px solid #e5e7eb',
              transition: 'all 0.2s ease'
            }}>
              <label style={{
                fontWeight: '600',
                color: '#374151',
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px'
              }}>
                <span style={{ fontSize: '24px' }}>🚶</span>
                Rate your movement difficulty (0 = easy, 10 = very difficult)
              </label>
              <input
                type="number"
                name="movement_difficulty"
                value={formData.movement_difficulty}
                onChange={handleChange}
                placeholder="Enter movement difficulty (0-10)"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  opacity: loading ? 0.6 : 1
                }}
                onFocus={(e) => e.target.style.borderColor = '#8b5cf6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              <div style={{
                marginTop: '8px',
                fontSize: '12px',
                color: '#6b7280'
              }}>
                Range: 0 (no difficulty) - 10 (extreme difficulty)
              </div>
            </div>

            {/* Voice Changes */}
            <div style={{
              background: '#f9fafb',
              padding: '16px',
              borderRadius: '12px',
              border: '2px solid #e5e7eb',
              transition: 'all 0.2s ease'
            }}>
              <label style={{
                fontWeight: '600',
                color: '#374151',
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px'
              }}>
                <span style={{ fontSize: '24px' }}>🎤</span>
                Rate your voice changes (0 = normal, 10 = significant changes)
              </label>
              <input
                type="number"
                name="voice_changes"
                value={formData.voice_changes}
                onChange={handleChange}
                placeholder="Enter voice changes (0-10)"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  opacity: loading ? 0.6 : 1
                }}
                onFocus={(e) => e.target.style.borderColor = '#8b5cf6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              <div style={{
                marginTop: '8px',
                fontSize: '12px',
                color: '#6b7280'
              }}>
                Range: 0 (no changes) - 10 (severe voice changes)
              </div>
            </div>

            {error && (
              <div style={{
                padding: '14px',
                background: '#fef2f2',
                border: '2px solid #fca5a5',
                borderRadius: '10px',
                color: '#991b1b',
                fontWeight: '600',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span>⚠️</span>
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                background: loading 
                  ? '#9ca3af' 
                  : 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                color: 'white',
                border: 'none',
                padding: '14px',
                fontSize: '16px',
                fontWeight: '700',
                borderRadius: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 6px 20px rgba(139, 92, 246, 0.4)',
                transition: 'all 0.3s ease',
                opacity: loading ? 0.7 : 1
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.6)';
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.4)';
                }
              }}
            >
              {loading ? '⏳ Calculating...' : '🔍 Calculate Risk Score'}
            </button>
          </div>
        </div>

        {/* Results */}
        {result !== null && (
          <>
            {/* Risk Score Display */}
            <div style={{
              background: `linear-gradient(135deg, ${getRiskLevel(result).bg} 0%, ${getRiskLevel(result).bg}dd 100%)`,
              borderRadius: '18px',
              padding: 'clamp(20px, 3vw, 30px)',
              marginBottom: '20px',
              boxShadow: '0 14px 40px rgba(0, 0, 0, 0.18)',
              textAlign: 'center',
              border: `3px solid ${getRiskLevel(result).color}`
            }}>
              <div style={{ fontSize: 'clamp(50px, 10vw, 80px)', marginBottom: '15px' }}>
                {result <= 30 ? '✅' : result <= 50 ? '⚠️' : '🚨'}
              </div>
              <h2 style={{
                color: getRiskLevel(result).color,
                fontSize: 'clamp(24px, 4vw, 36px)',
                fontWeight: '800',
                margin: '0 0 10px 0'
              }}>
                {result.toFixed(1)}% Risk Score
              </h2>
              <div style={{
                display: 'inline-block',
                background: getRiskLevel(result).color,
                color: 'white',
                padding: '8px 24px',
                borderRadius: '25px',
                fontSize: '18px',
                fontWeight: '700',
                marginBottom: '15px'
              }}>
                {getRiskLevel(result).level} Risk
              </div>
              <p style={{
                color: getRiskLevel(result).color,
                fontSize: 'clamp(13px, 2vw, 15px)',
                margin: 0,
                fontWeight: '500',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
                lineHeight: '1.6'
              }}>
                {result <= 50
                  ? 'Your preliminary screening shows low to moderate neurological risk. Continue monitoring symptoms and maintain regular check-ups.'
                  : 'Your preliminary screening indicates elevated neurological risk. We recommend proceeding with a comprehensive voice analysis assessment.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '15px',
              flexDirection: result > 50 ? 'column' : 'row',
              marginBottom: '20px'
            }}>
              {result > 50 && (
                <button
                  onClick={handleProceedToDetailed}
                  style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '16px',
                    fontSize: '16px',
                    fontWeight: '700',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(239, 68, 68, 0.4)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.6)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.4)';
                  }}
                >
                  <span style={{ fontSize: '20px' }}>🏥</span>
                  Proceed to Detailed Voice Analysis
                </button>
              )}

              <button
                onClick={handleReset}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#8b5cf6',
                  border: '2px solid #8b5cf6',
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: '600',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  flex: 1
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#8b5cf6';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                  e.currentTarget.style.color = '#8b5cf6';
                }}
              >
                🔄 Take Test Again
              </button>
            </div>

            {/* Information Box */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.98)',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
            }}>
              <h3 style={{
                color: '#1f2937',
                fontSize: '18px',
                fontWeight: '700',
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{ fontSize: '24px' }}>💡</span>
                Understanding Your Results
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontSize: '14px',
                color: '#4b5563',
                lineHeight: '1.6'
              }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                  <span style={{ fontSize: '18px', flexShrink: 0 }}>✅</span>
                  <span><strong>Low Risk (0-30%):</strong> Excellent! Continue monitoring symptoms.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                  <span style={{ fontSize: '18px', flexShrink: 0 }}>⚠️</span>
                  <span><strong>Moderate Risk (31-50%):</strong> Watch for symptom progression.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                  <span style={{ fontSize: '18px', flexShrink: 0 }}>🚨</span>
                  <span><strong>High Risk (51-100%):</strong> Detailed voice analysis recommended.</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Disclaimer */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          color: 'white',
          fontSize: '13px',
          textAlign: 'center',
          lineHeight: '1.6'
        }}>
          <strong>⚠️ Medical Disclaimer:</strong> This is a preliminary screening tool and not a diagnostic test. Always consult healthcare professionals for medical advice and proper neurological evaluation.
        </div>
      </div>
    </div>
  );
}