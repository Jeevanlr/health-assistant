import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbHome } from 'react-icons/tb';

const SYMPTOM_LABELS = [
  "Fever", "Cough", "Headache", "Fatigue",
  "Nausea", "Chest Pain", "Dizziness", "Sore Throat"
];

const SYMPTOM_DESCRIPTIONS = {
  "Fever": { left: "No fever", mid: "Mild fever", right: "High fever" },
  "Cough": { left: "No cough", mid: "Mild cough", right: "Severe cough" },
  "Headache": { left: "No pain", mid: "Mild pain", right: "Severe pain" },
  "Fatigue": { left: "Energetic", mid: "Tired", right: "Exhausted" },
  "Nausea": { left: "No nausea", mid: "Slight nausea", right: "Severe nausea" },
  "Chest Pain": { left: "No pain", mid: "Mild pain", right: "Severe pain" },
  "Dizziness": { left: "None", mid: "Mild", right: "Severe" },
  "Sore Throat": { left: "No pain", mid: "Mild pain", right: "Severe pain" }
};

export default function SymptomForm() {
  const [values, setValues] = useState(
    SYMPTOM_LABELS.reduce((acc, label) => {
      acc[label.toLowerCase().replace(" ", "_")] = 0;
      return acc;
    }, {})
  );
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: parseFloat(value) });
  };

  const handleSubmit = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const avgValue = Object.values(values).reduce((a, b) => a + b, 0) / Object.values(values).length;
      if (avgValue > 6) {
        setResult("High risk - Please consult a healthcare professional immediately");
      } else if (avgValue > 3) {
        setResult("Moderate symptoms - Consider scheduling a doctor's appointment");
      } else {
        setResult("Mild symptoms - Monitor your condition and rest");
      }
      setLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setValues(
      SYMPTOM_LABELS.reduce((acc, label) => {
        acc[label.toLowerCase().replace(" ", "_")] = 0;
        return acc;
      }, {})
    );
    setResult(null);
    setLoading(false);
  };

  const getSliderBackground = (value) => {
    const percentage = (value / 10) * 100;
    return `linear-gradient(90deg, #1a73e8 ${percentage}%, #d1d5db ${percentage}%)`;
  };

  return (
    <div style={styles.container}>
      {/* Home Button - top-right fixed (matches other forms) */}
      <button
        onClick={() => navigate('/')}
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
          color: '#667eea',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
          zIndex: 1000,
          userSelect: 'none'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
        }}
        aria-label="Go to Home"
      >
        <TbHome size={18} />
        <span>Home</span>
      </button>
      <div style={styles.header}>
        <div style={styles.iconWrapper}>🩺</div>
        <h1 style={styles.title}>Symptom Prediction</h1>
        <p style={styles.subtitle}>Adjust the sliders to indicate your symptom severity</p>
      </div>

      <div style={styles.formContainer}>
        {SYMPTOM_LABELS.map((label) => {
          const fieldName = label.toLowerCase().replace(" ", "_");
          const descriptions = SYMPTOM_DESCRIPTIONS[label];

          return (
            <div key={label} style={styles.sliderGroup}>
              <label style={styles.label}>{label}</label>

              <div style={styles.rangeLabels}>
                <span style={styles.rangeLabel}>{descriptions.left}</span>
                <span style={styles.rangeLabelMid}>{descriptions.mid}</span>
                <span style={styles.rangeLabel}>{descriptions.right}</span>
              </div>

              <input
                type="range"
                name={fieldName}
                min="0"
                max="10"
                step="1"
                value={values[fieldName]}
                onChange={(e) => handleChange(fieldName, e.target.value)}
                style={{
                  ...styles.slider,
                  background: getSliderBackground(values[fieldName])
                }}
              />
            </div>
          );
        })}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer"
          }}
          onMouseOver={(e) => !loading && (e.target.style.backgroundColor = "#1557b0")}
          onMouseOut={(e) => !loading && (e.target.style.backgroundColor = "#1a73e8")}
        >
          {loading ? "Analyzing..." : "Predict"}
        </button>
      </div>

      {/* 🩺 Enhanced Result Box */}
      {result && (
        <div
          style={{
            ...styles.resultBox,
            borderColor:
              result.includes("High risk") ? "#e53935" :
              result.includes("Moderate") ? "#fb8c00" : "#1a73e8",
            backgroundColor:
              result.includes("High risk") ? "#fdecea" :
              result.includes("Moderate") ? "#fff4e5" : "#e8f0fe",
          }}
        >
          <div style={styles.resultHeader}>
            <span
              style={{
                ...styles.resultIcon,
                backgroundColor:
                  result.includes("High risk") ? "#e53935" :
                  result.includes("Moderate") ? "#fb8c00" : "#1a73e8",
              }}
            >
              {result.includes("High risk") ? "⚠️" :
              result.includes("Moderate") ? "🩺" : "😊"}
            </span>
            <h3 style={styles.resultTitle}>Health Analysis Result</h3>
          </div>

          <p style={styles.resultText}>{result}</p>

          <ul style={styles.resultTips}>
            {result.includes("High risk") && (
              <>
                <li>Seek immediate medical attention.</li>
                <li>Stay hydrated and monitor your temperature closely.</li>
                <li>Avoid self-medication without consulting a doctor.</li>
              </>
            )}
            {result.includes("Moderate") && (
              <>
                <li>Schedule a doctor's appointment soon.</li>
                <li>Ensure proper rest and a balanced diet.</li>
                <li>Monitor symptoms for any worsening trends.</li>
              </>
            )}
            {result.includes("Mild") && (
              <>
                <li>Take adequate rest and drink plenty of fluids.</li>
                <li>Maintain a healthy routine with sleep and nutrition.</li>
                <li>If symptoms persist for 2–3 days, consider a check-up.</li>
              </>
            )}
          </ul>

          {/* Reset/New Assessment Button */}
          <div style={{
            display: "flex",
            gap: "12px",
            marginTop: "20px",
            flexWrap: "wrap",
            justifyContent: "center"
          }}>
            <button
              onClick={handleReset}
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                padding: "10px 20px",
                fontSize: "14px",
                fontWeight: "700",
                borderRadius: "10px",
                cursor: "pointer",
                boxShadow: "0 6px 18px rgba(102, 126, 234, 0.35)",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.6)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.4)";
              }}
            >
              🔄 New Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "30px auto",
    padding: "0 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  iconWrapper: {
    fontSize: "48px",
    marginBottom: "10px",
  },
  title: {
    color: "#1a73e8",
    fontSize: "32px",
    margin: "10px 0",
    fontWeight: "600",
  },
  subtitle: {
    color: "#5f6368",
    fontSize: "14px",
    margin: 0,
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  sliderGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#202124",
  },
  rangeLabels: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    position: "relative",
  },
  rangeLabel: {
    fontSize: "13px",
    color: "#5f6368",
    width: "33%",
    textAlign: "center",
  },
  rangeLabelMid: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "13px",
    color: "#5f6368",
  },
  slider: {
    width: "100%",
    height: "10px",
    borderRadius: "10px",
    outline: "none",
    appearance: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  button: {
    backgroundColor: "#1a73e8",
    color: "#fff",
    padding: "14px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "background 0.3s ease",
    marginTop: "10px",
  },

  // 🌟 Enhanced Result Box
  resultBox: {
    marginTop: "25px",
    padding: "25px",
    borderRadius: "14px",
    border: "2px solid",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    animation: "fadeIn 0.5s ease-in-out",
  },
  resultHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "10px",
  },
  resultIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    color: "#fff",
    fontSize: "20px",
  },
  resultTitle: {
    color: "#202124",
    fontSize: "18px",
    margin: 0,
    fontWeight: "700",
  },
  resultText: {
    color: "#333",
    fontSize: "16px",
    margin: "5px 0 10px 0",
    lineHeight: "1.6",
  },
  resultTips: {
    margin: 0,
    paddingLeft: "18px",
    color: "#444",
    fontSize: "14px",
    lineHeight: "1.6",
    listStyleType: "disc",
  },
};

// 🎨 Slider Thumb Styling
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #1a73e8;
    cursor: pointer;
    border: 3px solid #ffffff;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  }

  input[type="range"]::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #1a73e8;
    cursor: pointer;
    border: 3px solid #ffffff;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  }
`;
document.head.appendChild(styleSheet);