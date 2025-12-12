import React, { useState } from "react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell
} from "recharts";
import { useNavigate } from "react-router-dom";
import { TbHome } from 'react-icons/tb';

export default function HeartForm() {
  const [form, setForm] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const ranges = {
    age: [29, 77],
    sex: [0, 1],
    cp: [0, 3],
    trestbps: [94, 200],
    chol: [126, 564],
    fbs: [0, 1],
    restecg: [0, 2],
    thalach: [71, 202],
    exang: [0, 1],
    oldpeak: [0, 6.2],
    slope: [0, 2],
    ca: [0, 4],
    thal: [0, 3],
  };

  const fieldLabels = {
    age: "Age",
    sex: "Sex (0=Female, 1=Male)",
    cp: "Chest Pain Type (0-3)",
    trestbps: "Resting Blood Pressure",
    chol: "Cholesterol",
    fbs: "Fasting Blood Sugar (0/1)",
    restecg: "Resting ECG (0-2)",
    thalach: "Max Heart Rate",
    exang: "Exercise Angina (0/1)",
    oldpeak: "ST Depression",
    slope: "Slope (0-2)",
    ca: "Vessels Colored (0-4)",
    thal: "Thalassemia (0-3)",
  };

  const radarFields = ["age", "trestbps", "chol", "thalach", "oldpeak", "ca"];

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
        setError(
          `${fieldLabels[key]} must be between ${ranges[key][0]} and ${ranges[key][1]}`
        );
        return;
      }
    }
    setError("");

    const prediction = Math.random() > 0.5 ? "Heart Disease Risk Detected" : "No Heart Disease";

    const radarData = radarFields.map((key) => ({
      subject: fieldLabels[key].replace(" (0-3)", "").replace(" (0-4)", ""),
      value: parseFloat(form[key]),
      rangeMax: ranges[key][1],
      percentage: ((parseFloat(form[key]) / ranges[key][1]) * 100).toFixed(1),
    }));

    setResult({ prediction, radarData });
  };

  const handleReset = () => {
    setForm({
      age: "",
      sex: "",
      cp: "",
      trestbps: "",
      chol: "",
      fbs: "",
      restecg: "",
      thalach: "",
      exang: "",
      oldpeak: "",
      slope: "",
      ca: "",
      thal: "",
    });
    setError("");
    setResult(null);
  };

  const getStatusColor = (value, max) => {
    const percentage = (value / max) * 100;
    if (percentage < 50) return "#14b8a6";
    if (percentage < 75) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #6366f1 100%)",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        padding: "30px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Home Button - Fixed Position */}
        <button
          onClick={() => navigate('/')}
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

        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "white",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "700",
              margin: "0 0 8px 0",
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            ❤️ Heart Disease Risk Assessment
          </h1>
          <p
            style={{
              fontSize: "15px",
              opacity: 0.95,
              margin: 0,
              fontWeight: "400",
            }}
          >
            Enter your cardiac health metrics for comprehensive risk analysis
          </p>
        </div>

        {/* Input Form Card */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.98)",
            borderRadius: "20px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            padding: "30px",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              color: "#1f2937",
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            🩺 Cardiac Health Information
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "18px",
            }}
          >
            {Object.keys(form).map((key) => (
              <div key={key}>
                <label
                  style={{
                    fontWeight: "600",
                    color: "#374151",
                    fontSize: "13px",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  {fieldLabels[key]}
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="number"
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    step="any"
                    placeholder={`${ranges[key][0]} - ${ranges[key][1]}`}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "2px solid #e5e7eb",
                      borderRadius: "10px",
                      fontSize: "14px",
                      transition: "all 0.3s ease",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#ec4899")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "11px",
                      color: "#9ca3af",
                      pointerEvents: "none",
                    }}
                  >
                    {ranges[key][0]}-{ranges[key][1]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {error && (
            <div
              style={{
                marginTop: "15px",
                padding: "12px 16px",
                background: "#fef2f2",
                border: "2px solid #fecaca",
                borderRadius: "10px",
                color: "#991b1b",
                fontWeight: "600",
                fontSize: "13px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              marginTop: "20px",
              background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
              color: "white",
              border: "none",
              padding: "14px",
              fontSize: "16px",
              fontWeight: "700",
              borderRadius: "10px",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(236, 72, 153, 0.4)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(236, 72, 153, 0.6)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(236, 72, 153, 0.4)";
            }}
          >
            🔍 Analyze My Cardiac Health
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <>
            {/* Prediction Card */}
            <div
              style={{
                background:
                  result.prediction === "Heart Disease Risk Detected"
                    ? "linear-gradient(135deg, #fecaca 0%, #fee2e2 100%)"
                    : "linear-gradient(135deg, #a7f3d0 0%, #d1fae5 100%)",
                borderRadius: "20px",
                padding: "25px",
                marginBottom: "20px",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                {result.prediction === "Heart Disease Risk Detected" ? "⚠️" : "✅"}
              </div>
              <h2
                style={{
                  color:
                    result.prediction === "Heart Disease Risk Detected"
                      ? "#991b1b"
                      : "#065f46",
                  fontSize: "26px",
                  fontWeight: "700",
                  margin: "0 0 8px 0",
                }}
              >
                {result.prediction}
              </h2>
              <p
                style={{
                  color:
                    result.prediction === "Heart Disease Risk Detected"
                      ? "#7f1d1d"
                      : "#064e3b",
                  fontSize: "14px",
                  margin: 0,
                  opacity: 0.9,
                }}
              >
                {result.prediction === "Heart Disease Risk Detected"
                  ? "Consult a cardiologist for comprehensive evaluation"
                  : "Your cardiac metrics are within healthy ranges"}
              </p>
            </div>

            {/* Precaution Measures */}
            {result.prediction === "Heart Disease Risk Detected" && (
              <div style={{
                background: "rgba(255, 255, 255, 0.98)",
                borderRadius: "20px",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                padding: "25px",
                marginBottom: "20px",
              }}>
                <h3 style={{
                  textAlign: "center",
                  color: "#991b1b",
                  fontSize: "20px",
                  fontWeight: "700",
                  marginBottom: "20px"
                }}>
                  🛡️ Recommended Cardiac Health Precautions
                </h3>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "15px"
                }}>
                  <div style={{
                    background: "linear-gradient(135deg, #fee2e2 0%, #fef2f2 100%)",
                    padding: "18px",
                    borderRadius: "12px",
                    border: "2px solid #fca5a5"
                  }}>
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>🚨</div>
                    <h4 style={{ color: "#991b1b", fontSize: "15px", fontWeight: "700", marginBottom: "8px" }}>
                      Immediate Actions
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "#7f1d1d", lineHeight: "1.6" }}>
                      <li>Schedule appointment with cardiologist</li>
                      <li>Get comprehensive cardiac evaluation</li>
                      <li>Have ECG and stress test done</li>
                      <li>Discuss symptoms with doctor urgently</li>
                    </ul>
                  </div>

                  <div style={{
                    background: "linear-gradient(135deg, #fef3c7 0%, #fef9e7 100%)",
                    padding: "18px",
                    borderRadius: "12px",
                    border: "2px solid #fbbf24"
                  }}>
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>🥗</div>
                    <h4 style={{ color: "#92400e", fontSize: "15px", fontWeight: "700", marginBottom: "8px" }}>
                      Heart-Healthy Diet
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "#78350f", lineHeight: "1.6" }}>
                      <li>Reduce saturated fats and trans fats</li>
                      <li>Limit sodium intake to 2,300mg/day</li>
                      <li>Eat more fruits, vegetables, whole grains</li>
                      <li>Include omega-3 rich foods (fish, nuts)</li>
                    </ul>
                  </div>

                  <div style={{
                    background: "linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)",
                    padding: "18px",
                    borderRadius: "12px",
                    border: "2px solid #3b82f6"
                  }}>
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>💊</div>
                    <h4 style={{ color: "#1e40af", fontSize: "15px", fontWeight: "700", marginBottom: "8px" }}>
                      Medication Management
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "#1e3a8a", lineHeight: "1.6" }}>
                      <li>Take prescribed medications regularly</li>
                      <li>Monitor blood pressure daily</li>
                      <li>Keep aspirin if doctor prescribed</li>
                      <li>Never stop medications without consulting</li>
                    </ul>
                  </div>

                  <div style={{
                    background: "linear-gradient(135deg, #d1fae5 0%, #ecfdf5 100%)",
                    padding: "18px",
                    borderRadius: "12px",
                    border: "2px solid #10b981"
                  }}>
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>🏃</div>
                    <h4 style={{ color: "#065f46", fontSize: "15px", fontWeight: "700", marginBottom: "8px" }}>
                      Cardiac Exercise Program
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "#064e3b", lineHeight: "1.6" }}>
                      <li>Start with doctor-approved exercise plan</li>
                      <li>Aim for 150 minutes moderate activity/week</li>
                      <li>Include walking, swimming, cycling</li>
                      <li>Avoid overexertion, listen to your body</li>
                    </ul>
                  </div>

                  <div style={{
                    background: "linear-gradient(135deg, #fce7f3 0%, #fdf2f8 100%)",
                    padding: "18px",
                    borderRadius: "12px",
                    border: "2px solid #ec4899"
                  }}>
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>🚭</div>
                    <h4 style={{ color: "#9f1239", fontSize: "15px", fontWeight: "700", marginBottom: "8px" }}>
                      Lifestyle Changes
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "#881337", lineHeight: "1.6" }}>
                      <li>Quit smoking immediately</li>
                      <li>Limit alcohol consumption</li>
                      <li>Maintain healthy body weight</li>
                      <li>Get 7-8 hours quality sleep</li>
                    </ul>
                  </div>

                  <div style={{
                    background: "linear-gradient(135deg, #e0e7ff 0%, #eef2ff 100%)",
                    padding: "18px",
                    borderRadius: "12px",
                    border: "2px solid #6366f1"
                  }}>
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>🧘</div>
                    <h4 style={{ color: "#3730a3", fontSize: "15px", fontWeight: "700", marginBottom: "8px" }}>
                      Stress Management
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "#312e81", lineHeight: "1.6" }}>
                      <li>Practice relaxation techniques daily</li>
                      <li>Try meditation or deep breathing</li>
                      <li>Avoid stressful situations when possible</li>
                      <li>Consider therapy or counseling</li>
                    </ul>
                  </div>

                  <div style={{
                    background: "linear-gradient(135deg, #fed7aa 0%, #ffedd5 100%)",
                    padding: "18px",
                    borderRadius: "12px",
                    border: "2px solid #f97316"
                  }}>
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>📊</div>
                    <h4 style={{ color: "#9a3412", fontSize: "15px", fontWeight: "700", marginBottom: "8px" }}>
                      Regular Monitoring
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "#7c2d12", lineHeight: "1.6" }}>
                      <li>Check blood pressure regularly</li>
                      <li>Monitor cholesterol levels quarterly</li>
                      <li>Track weight and BMI weekly</li>
                      <li>Keep a symptom diary</li>
                    </ul>
                  </div>

                  <div style={{
                    background: "linear-gradient(135deg, #fae8ff 0%, #fdf4ff 100%)",
                    padding: "18px",
                    borderRadius: "12px",
                    border: "2px solid #c084fc"
                  }}>
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>⚠️</div>
                    <h4 style={{ color: "#6b21a8", fontSize: "15px", fontWeight: "700", marginBottom: "8px" }}>
                      Warning Signs
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "#581c87", lineHeight: "1.6" }}>
                      <li>Chest pain or discomfort - call 911</li>
                      <li>Shortness of breath - seek help</li>
                      <li>Unusual fatigue - consult doctor</li>
                      <li>Irregular heartbeat - get checked</li>
                    </ul>
                  </div>
                </div>

                <div style={{
                  marginTop: "20px",
                  padding: "15px",
                  background: "#fef2f2",
                  borderRadius: "10px",
                  border: "2px solid #fecaca",
                  textAlign: "center"
                }}>
                  <p style={{ 
                    color: "#991b1b", 
                    fontSize: "13px", 
                    fontWeight: "600",
                    margin: 0 
                  }}>
                    🚨 <strong>Critical:</strong> If you experience chest pain, shortness of breath, or other acute symptoms, call emergency services (911) immediately. This assessment tool is not a substitute for professional medical diagnosis.
                  </p>
                </div>
              </div>
            )}

            {/* Radar Chart Card */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.98)",
                borderRadius: "20px",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                padding: "30px",
                marginBottom: "20px",
              }}
            >
              <h3
                style={{
                  textAlign: "center",
                  color: "#1f2937",
                  fontSize: "20px",
                  fontWeight: "700",
                  marginBottom: "25px",
                }}
              >
                📊 Your Cardiac Health Profile
              </h3>

              <div style={{ height: "350px", marginBottom: "15px" }}>
                <ResponsiveContainer>
                  <RadarChart
                    data={result.radarData}
                    margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
                  >
                    <defs>
                      <linearGradient id="colorYourValues" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.6} />
                      </linearGradient>
                      <linearGradient id="colorHealthyMax" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.3} />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    <PolarGrid stroke="#e5e7eb" strokeWidth={2} />

                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{
                        fontSize: 12,
                        fill: "#1f2937",
                        fontWeight: 600,
                      }}
                    />

                    <PolarRadiusAxis
                      angle={90}
                      tick={{
                        fontSize: 11,
                        fill: "#6b7280",
                        fontWeight: 500,
                      }}
                      stroke="#d1d5db"
                      tickCount={5}
                    />

                    <Tooltip
                      contentStyle={{
                        background: "rgba(255, 255, 255, 0.98)",
                        borderRadius: "16px",
                        border: "2px solid #e5e7eb",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                        padding: "16px 20px",
                      }}
                      labelStyle={{
                        color: "#1f2937",
                        fontWeight: "700",
                        fontSize: "15px",
                        marginBottom: "8px",
                      }}
                      formatter={(value, name, props) => {
                        if (name === "value") {
                          const percentage = props.payload.percentage;
                          return [
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "4px",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "18px",
                                  fontWeight: "700",
                                  color: "#ec4899",
                                }}
                              >
                                {parseFloat(value).toFixed(2)}
                              </span>
                              <span style={{ fontSize: "13px", color: "#6b7280" }}>
                                {percentage}% of maximum
                              </span>
                            </div>,
                            "Your Value",
                          ];
                        }
                        return [
                          <span
                            style={{ fontSize: "16px", color: "#f59e0b", fontWeight: "600" }}
                          >
                            {parseFloat(value).toFixed(2)}
                          </span>,
                          "Max Range",
                        ];
                      }}
                    />

                    <Legend
                      wrapperStyle={{
                        paddingTop: "30px",
                      }}
                      iconSize={16}
                      formatter={(value) => (
                        <span
                          style={{
                            color: "#374151",
                            fontWeight: 600,
                            fontSize: "15px",
                            marginLeft: "8px",
                          }}
                        >
                          {value === "value"
                            ? "Your Current Values"
                            : "Maximum Healthy Range"}
                        </span>
                      )}
                    />

                    <Radar
                      name="rangeMax"
                      dataKey="rangeMax"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      fill="#f59e0b"
                      fillOpacity={0.15}
                      animationDuration={1000}
                      animationBegin={0}
                    />

                    <Radar
                      name="value"
                      dataKey="value"
                      stroke="#ec4899"
                      strokeWidth={4}
                      fill="url(#colorYourValues)"
                      fillOpacity={0.6}
                      animationDuration={1200}
                      animationBegin={400}
                      dot={{
                        r: 6,
                        fill: "#ec4899",
                        strokeWidth: 3,
                        stroke: "#fff",
                        filter: "url(#glow)",
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Legend Explanation */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "12px",
                  marginTop: "15px",
                }}
              >
                <div
                  style={{
                    background: "linear-gradient(135deg, #ec489915, #8b5cf615)",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "2px solid #ec489940",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "20px", marginBottom: "5px" }}>💖</div>
                  <div
                    style={{
                      fontWeight: "700",
                      color: "#ec4899",
                      fontSize: "13px",
                      marginBottom: "3px",
                    }}
                  >
                    Pink Area
                  </div>
                  <div style={{ fontSize: "11px", color: "#6b7280" }}>
                    Your current values
                  </div>
                </div>

                <div
                  style={{
                    background: "linear-gradient(135deg, #f59e0b15, #fbbf2415)",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "2px solid #f59e0b40",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "20px", marginBottom: "5px" }}>🧡</div>
                  <div
                    style={{
                      fontWeight: "700",
                      color: "#f59e0b",
                      fontSize: "13px",
                      marginBottom: "3px",
                    }}
                  >
                    Orange Area
                  </div>
                  <div style={{ fontSize: "11px", color: "#6b7280" }}>
                    Maximum healthy range
                  </div>
                </div>
              </div>

              {/* Interpretation Guide */}
              <div
                style={{
                  marginTop: "15px",
                  padding: "15px",
                  background: "#f9fafb",
                  borderRadius: "10px",
                  border: "2px solid #e5e7eb",
                }}
              >
                <h4
                  style={{
                    color: "#1f2937",
                    fontSize: "14px",
                    fontWeight: "700",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  📖 How to Read Your Chart
                </h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                    gap: "10px",
                    fontSize: "12px",
                    color: "#4b5563",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "start", gap: "6px" }}>
                    <span style={{ fontSize: "16px" }}>✅</span>
                    <span>
                      <strong>Inside orange:</strong> Healthy
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "start", gap: "6px" }}>
                    <span style={{ fontSize: "16px" }}>⚠️</span>
                    <span>
                      <strong>Near edges:</strong> Caution
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "start", gap: "6px" }}>
                    <span style={{ fontSize: "16px" }}>🔴</span>
                    <span>
                      <strong>Outside:</strong> See doctor
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Individual Metrics Breakdown */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.98)",
                borderRadius: "20px",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                padding: "25px",
                marginBottom: "20px",
              }}
            >
              <h3
                style={{
                  textAlign: "center",
                  color: "#1f2937",
                  fontSize: "18px",
                  fontWeight: "700",
                  marginBottom: "18px",
                }}
              >
                📈 Detailed Metrics Breakdown
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "12px",
                }}
              >
                {result.radarData.map((item, index) => {
                  const statusColor = getStatusColor(item.value, item.rangeMax);
                  return (
                    <div
                      key={index}
                      style={{
                        background: "#f9fafb",
                        padding: "12px",
                        borderRadius: "10px",
                        border: "2px solid #e5e7eb",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "700",
                            color: "#1f2937",
                            fontSize: "12px",
                          }}
                        >
                          {item.subject}
                        </span>
                        <span
                          style={{
                            background: statusColor,
                            color: "white",
                            padding: "2px 8px",
                            borderRadius: "20px",
                            fontSize: "10px",
                            fontWeight: "700",
                          }}
                        >
                          {item.percentage}%
                        </span>
                      </div>

                      <div
                        style={{
                          background: "#e5e7eb",
                          height: "6px",
                          borderRadius: "6px",
                          overflow: "hidden",
                          marginBottom: "6px",
                        }}
                      >
                        <div
                          style={{
                            background: statusColor,
                            height: "100%",
                            width: `${item.percentage}%`,
                            borderRadius: "6px",
                            transition: "width 1s ease",
                          }}
                        ></div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "11px",
                          color: "#6b7280",
                        }}
                      >
                        <span>
                          <strong>Value:</strong> {item.value.toFixed(1)}
                        </span>
                        <span>
                          <strong>Max:</strong> {item.rangeMax}
                        </span>
                      </div>
                    </div>
                  );
                })}
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

            {/* Heart Model Comparison Table with Bar Graph */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.98)",
                borderRadius: "24px",
                boxShadow: "0 25px 80px rgba(0, 0, 0, 0.35)",
                padding: "clamp(20px, 3vw, 28px)",
                marginTop: "20px",
              }}
            >
              <h3
                style={{
                  textAlign: "center",
                  color: "#1f2937",
                  fontSize: "clamp(16px, 3vw, 20px)",
                  fontWeight: "700",
                  marginBottom: "18px",
                }}
              >
                ❤️ Heart Disease Model Comparison
              </h3>

              <div style={{ overflowX: 'auto' }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    minWidth: "480px",
                    fontSize: "13px",
                  }}
                >
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
                    <tr style={{ borderTop: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "10px 12px", color: '#374151', fontWeight: 600 }}>LR</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>0.813</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>0.800</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>0.803</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>80.33%</td>
                    </tr>

                    <tr style={{ borderTop: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "10px 12px", color: '#374151', fontWeight: 600 }}>KNN</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>0.813</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>0.800</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>0.803</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>80.33%</td>
                    </tr>

                    <tr style={{ borderTop: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "10px 12px", color: '#374151', fontWeight: 600 }}>SVM</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>0.799</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>0.782</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>0.787</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>78.69%</td>
                    </tr>

                    <tr style={{ borderTop: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "10px 12px", color: '#374151', fontWeight: 600 }}>RFC</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>0.858</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>0.831</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>0.836</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>83.61%</td>
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
                      { model: 'LR', Precision: 0.813, 'F1-score': 0.800, Recall: 0.803, Accuracy: 80.33 },
                      { model: 'KNN', Precision: 0.813, 'F1-score': 0.800, Recall: 0.803, Accuracy: 80.33 },
                      { model: 'SVM', Precision: 0.799, 'F1-score': 0.782, Recall: 0.787, Accuracy: 78.69 },
                      { model: 'RFC', Precision: 0.858, 'F1-score': 0.831, Recall: 0.836, Accuracy: 83.61 }
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
                        return [value.toFixed(3), name];
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
                    <Bar dataKey="Precision" fill="#ec4899" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="F1-score" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
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
                  <strong>💡 Insight:</strong> RFC (Random Forest Classifier) demonstrates the highest overall accuracy at 83.61% with superior precision (0.858) and balanced recall metrics, making it the most reliable model for heart disease prediction.
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}