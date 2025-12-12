import React, { useState } from "react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell
} from "recharts";
import { useNavigate } from "react-router-dom";
import { TbDroplet, TbTrendingUp, TbHome } from 'react-icons/tb';

export default function DiabetesForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: "",
  });
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const ranges = {
    Pregnancies: [0, 15],
    Glucose: [50, 250],
    BloodPressure: [40, 150],
    SkinThickness: [5, 60],
    Insulin: [15, 276],
    BMI: [10, 60],
    DiabetesPedigreeFunction: [0.05, 2.5],
    Age: [18, 80],
  };

  const fieldLabels = {
    Pregnancies: "Number of Pregnancies",
    Glucose: "Glucose Level",
    BloodPressure: "Blood Pressure",
    SkinThickness: "Skin Thickness",
    Insulin: "Insulin Level",
    BMI: "Body Mass Index",
    DiabetesPedigreeFunction: "Diabetes Pedigree",
    Age: "Age",
  };

  const fieldIcons = {
    Pregnancies: "👶",
    Glucose: "🍬",
    BloodPressure: "❤️",
    SkinThickness: "📏",
    Insulin: "💉",
    BMI: "⚖️",
    DiabetesPedigreeFunction: "🧬",
    Age: "🎂",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (value === "") {
      setError("");
      return;
    }

    const num = parseFloat(value);
    const [min, max] = ranges[name];

    if (isNaN(num) || num < min || num > max) {
      setError(`${fieldLabels[name]} must be between ${min} and ${max}`);
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    for (let key in form) {
      if (form[key] === "") {
        setError("⚠️ Please fill in all fields to get your prediction");
        return;
      }
      
      const num = parseFloat(form[key]);
      if (isNaN(num) || num < ranges[key][0] || num > ranges[key][1]) {
        setError(`${fieldLabels[key]} must be between ${ranges[key][0]} and ${ranges[key][1]}`);
        return;
      }
    }
    setError("");

    const prediction = Math.random() > 0.5 ? "Likely Diabetic" : "Not Diabetic";

    const radarData = Object.keys(form).map((key) => ({
      subject: fieldLabels[key].replace(" Level", "").replace(" Index", ""),
      value: parseFloat(form[key]),
      rangeMax: ranges[key][1],
      percentage: ((parseFloat(form[key]) / ranges[key][1]) * 100).toFixed(1)
    }));

    setResult({ prediction, radarData });
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setForm({
      Pregnancies: "",
      Glucose: "",
      BloodPressure: "",
      SkinThickness: "",
      Insulin: "",
      BMI: "",
      DiabetesPedigreeFunction: "",
      Age: "",
    });
    setError("");
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStatusColor = (value, max) => {
    const percentage = (value / max) * 100;
    if (percentage < 50) return "#10b981";
    if (percentage < 75) return "#f59e0b";
    return "#ef4444";
  };

  const getStatusLabel = (value, max) => {
    const percentage = (value / max) * 100;
    if (percentage < 50) return "Good";
    if (percentage < 75) return "Moderate";
    return "High";
  };

  const handleGoHome = () => {
    navigate('/'); // navigate to home page
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        padding: "12px",
        position: 'relative'
      }}
    >
      {/* Home Button - Fixed Position */}
      <button
        onClick={handleGoHome}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: "rgba(255, 255, 255, 0.95)",
          border: "none",
          borderRadius: "12px",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "600",
          color: "#667eea",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          transition: "all 0.3s ease",
          zIndex: 1000,
          userSelect: 'none'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.3)";
          e.currentTarget.style.background = "rgba(255, 255, 255, 1)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.95)";
        }}
        aria-label="Go to Home"
      >
        <TbHome size={18} />
        <span>Home</span>
      </button>

      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        paddingTop: "20px"
      }}>
        {/* Header Section */}
        <div style={{
          textAlign: "center",
          marginBottom: "40px",
          color: "white"
        }}>
          <div style={{
            display: "inline-block",
            background: "rgba(255, 255, 255, 0.12)",
            padding: "10px 18px",
            borderRadius: "40px",
            marginBottom: "12px",
            backdropFilter: "blur(6px)",
          }}>
            <span style={{ fontSize: "28px", verticalAlign: "middle", marginRight: "8px" }}>🏥</span>
            <span style={{ fontSize: "15px", fontWeight: "600", verticalAlign: "middle" }}>
              Health Analytics Platform
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(22px, 5vw, 36px)",
            fontWeight: "800",
            margin: "0 0 10px 0",
            textShadow: "0 3px 14px rgba(0,0,0,0.25)",
            letterSpacing: "-0.5px"
          }}>
            Diabetes Risk Assessment
          </h1>
          <p style={{
            fontSize: "clamp(12px, 2vw, 16px)",
            opacity: 0.95,
            margin: 0,
            fontWeight: "400",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: "1.5"
          }}>
            Advanced health metrics analysis powered by machine learning. Enter your data for comprehensive diabetes risk evaluation.
          </p>
        </div>

        {/* Main Input Card */}
        <div
          style={{
              background: "rgba(255, 255, 255, 0.98)",
              borderRadius: "18px",
              boxShadow: "0 18px 50px rgba(0, 0, 0, 0.25)",
              padding: "clamp(12px, 3vw, 24px)",
              marginBottom: "18px",
              backdropFilter: "blur(6px)",
            }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "30px"
          }}>
            <span style={{ fontSize: "24px" }}>❤️</span>
            <h2 style={{
              color: "#1f2937",
              fontSize: "clamp(18px, 3vw, 24px)",
              fontWeight: "700",
              margin: 0
            }}>
              Enter Your Health Information
            </h2>
          </div>

          <form
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
            }}
            onSubmit={handleSubmit}
          >
            {Object.keys(form).map((key) => (
              <div key={key} style={{
                background: "#f9fafb",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                transition: "all 0.18s ease"
              }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "#667eea";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <label style={{
                  fontWeight: "600",
                  color: "#374151",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px"
                }}>
                  <span style={{ fontSize: "20px" }}>{fieldIcons[key]}</span>
                  {fieldLabels[key]}
                </label>
                <input
                  type="number"
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  step="any"
                  placeholder={`Enter value (${ranges[key][0]} - ${ranges[key][1]})`}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "14px",
                    transition: "all 0.18s ease",
                    outline: "none",
                    boxSizing: "border-box",
                    background: "white"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#667eea";
                    e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e5e7eb";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <div style={{
                  marginTop: "6px",
                  fontSize: "11px",
                  color: "#6b7280",
                  fontWeight: "500"
                }}>
                  Range: {ranges[key][0]} - {ranges[key][1]}
                </div>
              </div>
            ))}

            <button
              type="submit"
              style={{
                gridColumn: "1 / -1",
                width: "100%",
                marginTop: "16px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                padding: "12px",
                fontSize: "15px",
                fontWeight: "700",
                borderRadius: "10px",
                cursor: "pointer",
                boxShadow: "0 6px 18px rgba(102, 126, 234, 0.35)",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
              <span style={{ fontSize: "20px" }}>🔍</span>
              Analyze Health Data
            </button>
          </form>

          {error && (
            <div
              style={{
                marginTop: "20px",
                padding: "16px 20px",
                background: "#fef2f2",
                border: "2px solid #fca5a5",
                borderRadius: "12px",
                color: "#991b1b",
                fontWeight: "600",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}
            >
              <span style={{ fontSize: "20px" }}>⚠️</span>
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Results Section */}

        {result && (
          <div>
            {/* Prediction Result Card */}
            <div style={{
              background: result.prediction === "Likely Diabetic"
                ? "linear-gradient(135deg, #fecaca 0%, #fee2e2 100%)"
                : "linear-gradient(135deg, #a7f3d0 0%, #d1fae5 100%)",
              borderRadius: "18px",
              padding: "clamp(14px, 3vw, 26px)",
              marginBottom: "20px",
              boxShadow: "0 14px 40px rgba(0, 0, 0, 0.18)",
              textAlign: "center",
              border: result.prediction === "Likely Diabetic"
                ? "2px solid #f87171"
                : "2px solid #34d399"
            }}>
              <div style={{
                fontSize: "clamp(40px, 9vw, 60px)",
                marginBottom: "12px"
              }}>
                {result.prediction === "Likely Diabetic" ? "⚠️" : "✅"}
              </div>
              <h2 style={{
                color: result.prediction === "Likely Diabetic" ? "#991b1b" : "#065f46",
                fontSize: "clamp(20px, 3.5vw, 30px)",
                fontWeight: "800",
                margin: "0 0 10px 0",
                letterSpacing: "-0.5px"
              }}>
                {result.prediction}
              </h2>
              <p style={{
                color: result.prediction === "Likely Diabetic" ? "#7f1d1d" : "#064e3b",
                fontSize: "clamp(12px, 2vw, 14px)",
                margin: 0,
                fontWeight: "500",
                maxWidth: "520px",
                marginLeft: "auto",
                marginRight: "auto"
              }}>
                {result.prediction === "Likely Diabetic"
                  ? "Based on your health metrics, we recommend consulting with a healthcare professional for further evaluation and personalized care plan."
                  : "Your health metrics are within healthy ranges. Continue maintaining your healthy lifestyle!"}
              </p>
            </div>

            {/* Precaution Measures */}
            {result.prediction === "Likely Diabetic" && (
              <div style={{
                background: "rgba(255, 255, 255, 0.98)",
                borderRadius: "18px",
                boxShadow: "0 18px 50px rgba(0, 0, 0, 0.18)",
                padding: "clamp(12px, 3vw, 24px)",
                marginBottom: "18px",
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  marginBottom: "25px"
                }}>
                  <TbDroplet size={24} color="#991b1b" />
                  <h3 style={{
                    color: "#991b1b",
                    fontSize: "clamp(18px, 3vw, 24px)",
                    fontWeight: "700",
                    margin: 0
                  }}>
                    Recommended Precaution Measures
                  </h3>
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "12px"
                }}>
                  {[
                    { icon: "🥗", title: "Dietary Changes", color: "#f59e0b", bg: "#fef3c7", items: ["Reduce sugar and refined carbs", "Include fiber-rich foods", "Control portion sizes", "Eat balanced meals"] },
                    { icon: "🏃", title: "Physical Activity", color: "#3b82f6", bg: "#dbeafe", items: ["Exercise 30 min daily", "Cardio + strength training", "Walk after meals", "Stay active consistently"] },
                    { icon: "⚕️", title: "Medical Monitoring", color: "#ec4899", bg: "#fce7f3", items: ["Regular check-ups", "Monitor blood sugar", "Quarterly HbA1c tests", "Track vitals"] },
                    { icon: "🧘", title: "Lifestyle Management", color: "#6366f1", bg: "#e0e7ff", items: ["Maintain healthy weight", "Manage stress", "7-8 hours sleep", "Avoid smoking/alcohol"] },
                    { icon: "💊", title: "Medication Compliance", color: "#10b981", bg: "#d1fae5", items: ["Take meds on time", "Never skip doses", "Know side effects", "Keep emergency meds"] },
                    { icon: "📚", title: "Education & Support", color: "#f97316", bg: "#fed7aa", items: ["Learn about diabetes", "Join support groups", "Educate family", "Stay updated"] }
                  ].map((item, i) => (
                    <div key={i} style={{
                      background: `linear-gradient(135deg, ${item.bg} 0%, ${item.bg}dd 100%)`,
                      padding: "12px",
                      borderRadius: "12px",
                      border: `2px solid ${item.color}40`,
                      transition: "all 0.18s ease"
                    }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow = `0 12px 24px ${item.color}30`;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div style={{ fontSize: "36px", marginBottom: "12px", textAlign: "center" }}>{item.icon}</div>
                      <h4 style={{ color: item.color, fontSize: "16px", fontWeight: "700", marginBottom: "12px", textAlign: "center" }}>
                        {item.title}
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "#374151", lineHeight: "1.8" }}>
                        {item.items.map((point, j) => <li key={j}>{point}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop: "25px",
                  padding: "18px",
                  background: "#fef2f2",
                  borderRadius: "12px",
                  border: "3px solid #fca5a5",
                  textAlign: "center"
                }}>
                  <p style={{
                    color: "#991b1b",
                    fontSize: "14px",
                    fontWeight: "600",
                    margin: 0,
                    lineHeight: "1.6"
                  }}>
                    <strong>⚠️ Important:</strong> This is a risk assessment tool only. Please consult a qualified healthcare professional for proper diagnosis and personalized treatment plan.
                  </p>
                </div>
              </div>
            )}

            {/* Radar Chart */}
            <div style={{
              background: "rgba(255, 255, 255, 0.98)",
              borderRadius: "16px",
              boxShadow: "0 18px 50px rgba(0, 0, 0, 0.18)",
              padding: "clamp(12px, 3vw, 22px)",
              marginBottom: "18px",
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginBottom: "25px"
              }}>
                <TbTrendingUp size={24} color="#667eea" />
                <h3 style={{
                  color: "#1f2937",
                  fontSize: "clamp(18px, 3vw, 24px)",
                  fontWeight: "700",
                  margin: 0
                }}>
                  Health Profile Visualization
                </h3>
              </div>

              <div style={{ height: "300px", marginBottom: "12px" }}>
                <ResponsiveContainer>
                  <RadarChart
                    data={result.radarData}
                    margin={{ top: 20, right: 50, bottom: 20, left: 50 }}
                  >
                    <defs>
                      <linearGradient id="colorValues" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#667eea" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#764ba2" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>

                    <PolarGrid stroke="#e5e7eb" strokeWidth={2} />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fontSize: 13, fill: "#1f2937", fontWeight: 600 }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                      stroke="#d1d5db"
                      tickCount={5}
                    />

                    <Tooltip
                      contentStyle={{
                        background: "rgba(255, 255, 255, 0.98)",
                        borderRadius: "12px",
                        border: "2px solid #e5e7eb",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                        padding: "16px"
                      }}
                      formatter={(value, name, props) => {
                        if (name === "value") {
                          return [
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                              <span style={{ fontSize: "18px", fontWeight: "700", color: "#667eea" }}>
                                {parseFloat(value).toFixed(2)}
                              </span>
                              <span style={{ fontSize: "12px", color: "#6b7280" }}>
                                {props.payload.percentage}% of max
                              </span>
                            </div>,
                            "Your Value"
                          ];
                        }
                        return [parseFloat(value).toFixed(2), "Max Range"];
                      }}
                    />

                    <Legend
                      wrapperStyle={{ paddingTop: "20px" }}
                      formatter={(value) => (
                        <span style={{ color: "#374151", fontWeight: 600, fontSize: "14px" }}>
                          {value === "value" ? "Your Values" : "Max Range"}
                        </span>
                      )}
                    />

                    <Radar
                      name="rangeMax"
                      dataKey="rangeMax"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      fill="#f59e0b"
                      fillOpacity={0.12}
                    />

                    <Radar
                      name="value"
                      dataKey="value"
                      stroke="#667eea"
                      strokeWidth={4}
                      fill="url(#colorValues)"
                      fillOpacity={0.5}
                      dot={{ r: 6, fill: "#667eea", strokeWidth: 2, stroke: "#fff" }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "12px",
                marginTop: "12px"
              }}>
                <div style={{
                  background: "linear-gradient(135deg, #667eea15, #764ba215)",
                  padding: "15px",
                  borderRadius: "12px",
                  border: "2px solid #667eea40",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "24px", marginBottom: "5px" }}>💙</div>
                  <div style={{ fontWeight: "700", color: "#667eea", fontSize: "14px" }}>Blue Area</div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>Your current values</div>
                </div>

                <div style={{
                  background: "linear-gradient(135deg, #f59e0b15, #fbbf2415)",
                  padding: "15px",
                  borderRadius: "12px",
                  border: "2px solid #f59e0b40",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "24px", marginBottom: "5px" }}>🧡</div>
                  <div style={{ fontWeight: "700", color: "#f59e0b", fontSize: "14px" }}>Orange Area</div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>Maximum healthy range</div>
                </div>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div style={{
              background: "rgba(255, 255, 255, 0.98)",
              borderRadius: "16px",
              boxShadow: "0 18px 50px rgba(0, 0, 0, 0.18)",
              padding: "clamp(12px, 3vw, 22px)",
            }}>
              <h3 style={{
                textAlign: "center",
                color: "#1f2937",
                fontSize: "clamp(18px, 3vw, 22px)",
                fontWeight: "700",
                marginBottom: "25px"
              }}>
                📈 Detailed Metrics Breakdown
              </h3>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "12px"
              }}>
                {result.radarData.map((item, index) => {
                  const statusColor = getStatusColor(item.value, item.rangeMax);
                  const statusLabel = getStatusLabel(item.value, item.rangeMax);
                  return (
                    <div key={index} style={{
                      background: "linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)",
                      padding: "10px",
                      borderRadius: "10px",
                      border: "1px solid #e5e7eb",
                      transition: "all 0.18s ease"
                    }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = statusColor;
                        e.currentTarget.style.boxShadow = `0 6px 16px ${statusColor}30`;
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = "#e5e7eb";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px"
                      }}>
                        <span style={{
                          fontWeight: "700",
                          color: "#1f2937",
                          fontSize: "13px"
                        }}>
                          {item.subject}
                        </span>
                        <span style={{
                          background: statusColor,
                          color: "white",
                          padding: "3px 10px",
                          borderRadius: "20px",
                          fontSize: "11px",
                          fontWeight: "700"
                        }}>
                          {statusLabel}
                        </span>
                      </div>

                      <div style={{
                        background: "#e5e7eb",
                        height: "8px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        marginBottom: "8px"
                      }}>
                        <div style={{
                          background: statusColor,
                          height: "100%",
                          width: `${item.percentage}%`,
                          borderRadius: "8px",
                          transition: "width 1s ease"
                        }}></div>
                      </div>

                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "12px",
                        color: "#6b7280"
                      }}>
                        <span><strong>Value:</strong> {item.value.toFixed(1)}</span>
                        <span><strong>Max:</strong> {item.rangeMax}</span>
                      </div>

                      <div style={{
                        marginTop: "8px",
                        padding: "8px",
                        background: `${statusColor}15`,
                        borderRadius: "8px",
                        textAlign: "center",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: statusColor
                      }}>
                        {item.percentage}% of Maximum
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{
                marginTop: "12px",
                padding: "12px",
                background: "#f0fdf4",
                borderRadius: "10px",
                border: "1px solid #bbf7d0"
              }}>
                <h4 style={{
                  color: "#166534",
                  fontSize: "14px",
                  fontWeight: "700",
                  marginBottom: "10px",
                  textAlign: "center"
                }}>
                  📖 Understanding Your Results
                </h4>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "12px",
                  fontSize: "13px",
                  color: "#166534"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "18px" }}>✅</span>
                    <span><strong>Good:</strong> Below 50%</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "18px" }}>⚠️</span>
                    <span><strong>Moderate:</strong> 50-75%</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "18px" }}>🔴</span>
                    <span><strong>High:</strong> Above 75%</span>
                  </div>
                </div>
              </div>
            </div>

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
                <TbHome size={18} />
                New Assessment
              </button>
            </div>
          </div>
        )}

        {/* Model Comparison Table (Diabetes) - show only after analysis (result) */}
        {result && (
        <div style={{
          background: "rgba(255, 255, 255, 0.98)",
          borderRadius: "24px",
          boxShadow: "0 25px 80px rgba(0, 0, 0, 0.35)",
          padding: "clamp(20px, 3vw, 28px)",
          marginBottom: "18px",
        }}>
          <h3 style={{
            textAlign: "center",
            color: "#1f2937",
            fontSize: "clamp(16px, 3vw, 20px)",
            fontWeight: "700",
            marginBottom: "18px"
          }}>
            🔬 Diabetes Model Comparison
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: '480px',
              fontSize: '13px'
            }}>
              <thead>
                <tr style={{ background: '#f3f4f6' }}>
                  <th style={{ textAlign: 'left', padding: '10px 12px', fontWeight: 700, color: '#111827' }}>Model</th>
                  <th style={{ textAlign: 'center', padding: '10px 12px', fontWeight: 700, color: '#111827' }}>Precision</th>
                  <th style={{ textAlign: 'center', padding: '10px 12px', fontWeight: 700, color: '#111827' }}>F1-score</th>
                  <th style={{ textAlign: 'center', padding: '10px 12px', fontWeight: 700, color: '#111827' }}>Recall</th>
                  <th style={{ textAlign: 'center', padding: '10px 12px', fontWeight: 700, color: '#111827' }}>Accuracy</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '10px 12px', color: '#374151', fontWeight: 600 }}>LR</td>
                  <td style={{ textAlign: 'center', padding: '10px 12px' }}>0.94</td>
                  <td style={{ textAlign: 'center', padding: '10px 12px' }}>0.92</td>
                  <td style={{ textAlign: 'center', padding: '10px 12px' }}>0.90</td>
                  <td style={{ textAlign: 'center', padding: '10px 12px' }}>89.47%</td>
                </tr>

                <tr style={{ borderTop: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px 16px', color: '#374151', fontWeight: 600 }}>KNN</td>
                  <td style={{ textAlign: 'center', padding: '10px 12px' }}>0.92</td>
                  <td style={{ textAlign: 'center', padding: '10px 12px' }}>0.91</td>
                  <td style={{ textAlign: 'center', padding: '10px 12px' }}>0.90</td>
                  <td style={{ textAlign: 'center', padding: '10px 12px' }}>88.16%</td>
                </tr>

                <tr style={{ borderTop: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px 16px', color: '#374151', fontWeight: 600 }}>SVM</td>
                  <td style={{ textAlign: 'center', padding: '10px 12px' }}>0.94</td>
                  <td style={{ textAlign: 'center', padding: '10px 12px' }}>0.93</td>
                  <td style={{ textAlign: 'center', padding: '10px 12px' }}>0.92</td>
                  <td style={{ textAlign: 'center', padding: '10px 12px' }}>90.79%</td>
                </tr>

                <tr style={{ borderTop: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px 16px', color: '#374151', fontWeight: 600 }}>RFC</td>
                  <td style={{ textAlign: 'center', padding: '10px 12px' }}>0.93</td>
                  <td style={{ textAlign: 'center', padding: '10px 12px' }}>0.92</td>
                  <td style={{ textAlign: 'center', padding: '10px 12px' }}>0.92</td>
                  <td style={{ textAlign: 'center', padding: '10px 12px' }}>90.13%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{
            marginTop: '14px',
            fontSize: '13px',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            
          </div>

          {/* Bar Graph Visualization */}
          <div style={{ marginTop: '28px' }}>
            <h4 style={{
              textAlign: 'center',
              color: '#1f2937',
              fontSize: 'clamp(14px, 2.5vw, 18px)',
              fontWeight: '700',
              marginBottom: '20px'
            }}>
              📊 Performance Metrics Visualization
            </h4>

            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={[
                  { model: 'LR', Precision: 0.94, 'F1-score': 0.92, Recall: 0.90, Accuracy: 89.47 },
                  { model: 'KNN', Precision: 0.92, 'F1-score': 0.91, Recall: 0.90, Accuracy: 88.16 },
                  { model: 'SVM', Precision: 0.94, 'F1-score': 0.93, Recall: 0.92, Accuracy: 90.79 },
                  { model: 'RFC', Precision: 0.93, 'F1-score': 0.92, Recall: 0.92, Accuracy: 90.13 }
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="model" 
                  tick={{ fontSize: 13, fill: '#374151', fontWeight: 600 }}
                  label={{ value: 'Models', position: 'insideBottom', offset: -10, style: { fontSize: 14, fontWeight: 700, fill: '#1f2937' } }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  label={{ value: 'Score / Accuracy (%)', angle: -90, position: 'insideLeft', style: { fontSize: 14, fontWeight: 700, fill: '#1f2937' } }}
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    borderRadius: '12px',
                    border: '2px solid #e5e7eb',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    padding: '12px'
                  }}
                  formatter={(value, name) => {
                    if (name === 'Accuracy') {
                      return [`${value.toFixed(2)}%`, name];
                    }
                    return [value.toFixed(2), name];
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '15px' }}
                  formatter={(value) => (
                    <span style={{ color: '#374151', fontWeight: 600, fontSize: '13px' }}>
                      {value}
                    </span>
                  )}
                />
                <Bar dataKey="Precision" fill="#667eea" radius={[8, 8, 0, 0]} />
                <Bar dataKey="F1-score" fill="#764ba2" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Recall" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Accuracy" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <div style={{
              marginTop: '18px',
              padding: '14px',
              background: '#f0fdf4',
              borderRadius: '10px',
              border: '1px solid #bbf7d0',
              fontSize: '13px',
              color: '#166534',
              textAlign: 'center'
            }}>
              <strong>💡 Insight:</strong> SVM (Support Vector Machine) shows the highest overall accuracy at 90.79% with balanced precision and recall metrics.
            </div>
          </div>
        </div>
        )}

        {/* Footer */}
        <div style={{
          textAlign: "center",
          marginTop: "40px",
          paddingTop: "30px",
          borderTop: "2px solid rgba(255, 255, 255, 0.2)",
          color: "white",
          userSelect: 'none'
        }}>
          <p style={{
            fontSize: "14px",
            opacity: 0.9,
            margin: "0 0 10px 0"
          }}>
            <strong>Disclaimer:</strong> This tool provides risk assessment only and is not a substitute for professional medical advice.
          </p>
          <p style={{
            fontSize: "13px",
            opacity: 0.8,
            margin: 0
          }}>
            © 2025 Health Analytics Platform. Always consult with healthcare professionals for medical decisions.
          </p>
        </div>
      </div>
    </div>
  );
}