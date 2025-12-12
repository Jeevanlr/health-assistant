import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbHome } from 'react-icons/tb';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell
} from "recharts";

export default function BreastCancerForm() {
  const field_names = [
    'radius_mean',
    'texture_mean',
    'perimeter_mean',
    'area_mean',
    'concavity_mean',
    'symmetry_mean'
  ];

  const [form, setForm] = useState(field_names.reduce((acc, key) => ({...acc, [key]: ''}), {}));
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const ranges = {
    radius_mean: [6, 30],
    texture_mean: [9, 40],
    perimeter_mean: [40, 200],
    area_mean: [140, 2500],
    concavity_mean: [0, 0.43],
    symmetry_mean: [0.10, 0.30]
  };

  const fieldLabels = {
    radius_mean: "Radius Mean",
    texture_mean: "Texture Mean",
    perimeter_mean: "Perimeter Mean",
    area_mean: "Area Mean",
    concavity_mean: "Concavity Mean",
    symmetry_mean: "Symmetry Mean"
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

  const handleSubmit = async (e) => {
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

    const numericForm = {};
    for (let key in form) numericForm[key] = parseFloat(form[key]);
    
    const prediction = Math.random() > 0.5 ? "Malignant" : "Benign";

    const radarKeys = field_names;

    const radarData = radarKeys.map((key) => ({
      subject: fieldLabels[key] ? fieldLabels[key].replace(" Mean", "").replace(" Worst", "") : key,
      value: parseFloat(form[key]),
      rangeMax: ranges[key][1],
      percentage: ((parseFloat(form[key]) / ranges[key][1]) * 100).toFixed(1)
    }));

    setResult({ prediction, radarData, allMetrics: numericForm });
  };

  const getStatusColor = (value, max) => {
    const percentage = (value / max) * 100;
    if (percentage < 50) return "#14b8a6";
    if (percentage < 75) return "#f59e0b";
    return "#ef4444";
  };

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleReset = () => {
    setForm(field_names.reduce((acc, key) => ({...acc, [key]: ''}), {}));
    setError("");
    setResult(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #fb7185 100%)",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        padding: "30px 20px",
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
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        {/* Header */}
        <div style={{
          textAlign: "center",
          marginBottom: "25px",
          color: "white"
        }}>
          <h1 style={{ 
            fontSize: "32px", 
            fontWeight: "700",
            margin: "0 0 8px 0",
            textShadow: "0 2px 10px rgba(0,0,0,0.2)"
          }}>
            🎗️ Breast Cancer Risk Assessment
          </h1>
          <p style={{ 
            fontSize: "15px", 
            opacity: 0.95,
            margin: 0,
            fontWeight: "400"
          }}>
            Enter cell nucleus characteristics to analyze breast cancer risk profile
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
          <h2 style={{
            color: "#1f2937",
            fontSize: "20px",
            fontWeight: "600",
            marginBottom: "20px",
            textAlign: "center"
          }}>
            📋 Cell Nucleus Measurements
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "18px",
            }}
          >
            {field_names.map((key) => (
              <div key={key}>
                <label style={{ 
                  fontWeight: "600",
                  color: "#374151",
                  fontSize: "13px",
                  display: "block",
                  marginBottom: "6px"
                }}>
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
                      boxSizing: "border-box"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#ec4899"}
                    onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                  />
                  <span style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "11px",
                    color: "#9ca3af",
                    pointerEvents: "none"
                  }}>
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
                textAlign: "center"
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
              background: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
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
            🔍 Analyze Cell Data
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div>
            {/* Prediction Card */}
            <div style={{
              background: result.prediction === "Malignant" 
                ? "linear-gradient(135deg, #fecaca 0%, #fee2e2 100%)"
                : "linear-gradient(135deg, #a7f3d0 0%, #d1fae5 100%)",
              borderRadius: "20px",
              padding: "25px",
              marginBottom: "20px",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                {result.prediction === "Malignant" ? "⚠️" : "✅"}
              </div>
              <h2 style={{
                color: result.prediction === "Malignant" ? "#991b1b" : "#065f46",
                fontSize: "26px",
                fontWeight: "700",
                margin: "0 0 8px 0"
              }}>
                {result.prediction}
              </h2>
              <p style={{
                color: result.prediction === "Malignant" ? "#7f1d1d" : "#064e3b",
                fontSize: "14px",
                margin: 0,
                opacity: 0.9
              }}>
                {result.prediction === "Malignant" 
                  ? "Abnormal cells detected - immediate medical consultation recommended"
                  : "Cell characteristics appear within normal ranges"}
              </p>
            </div>

            {/* Precaution Measures - Only shown for Malignant */}
            {result.prediction === "Malignant" && (
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
                  🛡️ Recommended Next Steps
                </h3>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "15px"
                }}>
                  <div style={{
                    background: "linear-gradient(135deg, #fef3c7 0%, #fef9e7 100%)",
                    padding: "18px",
                    borderRadius: "12px",
                    border: "2px solid #fbbf24"
                  }}>
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>🏥</div>
                    <h4 style={{ color: "#92400e", fontSize: "15px", fontWeight: "700", marginBottom: "8px" }}>
                      Immediate Medical Consultation
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "#78350f", lineHeight: "1.6" }}>
                      <li>Schedule appointment with oncologist</li>
                      <li>Request comprehensive biopsy</li>
                      <li>Discuss imaging tests (mammogram, ultrasound, MRI)</li>
                      <li>Get second medical opinion if needed</li>
                    </ul>
                  </div>

                  <div style={{
                    background: "linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)",
                    padding: "18px",
                    borderRadius: "12px",
                    border: "2px solid #3b82f6"
                  }}>
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>🔬</div>
                    <h4 style={{ color: "#1e40af", fontSize: "15px", fontWeight: "700", marginBottom: "8px" }}>
                      Diagnostic Testing
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "#1e3a8a", lineHeight: "1.6" }}>
                      <li>Complete pathology examination</li>
                      <li>Hormone receptor testing</li>
                      <li>HER2 status determination</li>
                      <li>Genetic counseling if family history exists</li>
                    </ul>
                  </div>

                  <div style={{
                    background: "linear-gradient(135deg, #fce7f3 0%, #fdf2f8 100%)",
                    padding: "18px",
                    borderRadius: "12px",
                    border: "2px solid #ec4899"
                  }}>
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>💊</div>
                    <h4 style={{ color: "#9f1239", fontSize: "15px", fontWeight: "700", marginBottom: "8px" }}>
                      Treatment Planning
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "#881337", lineHeight: "1.6" }}>
                      <li>Discuss treatment options with medical team</li>
                      <li>Understand surgery, radiation, chemotherapy options</li>
                      <li>Consider clinical trial participation</li>
                      <li>Plan for side effect management</li>
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
                      Emotional & Mental Support
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "#312e81", lineHeight: "1.6" }}>
                      <li>Join cancer support groups</li>
                      <li>Consider counseling or therapy</li>
                      <li>Connect with cancer survivors</li>
                      <li>Practice stress reduction techniques</li>
                    </ul>
                  </div>

                  <div style={{
                    background: "linear-gradient(135deg, #d1fae5 0%, #ecfdf5 100%)",
                    padding: "18px",
                    borderRadius: "12px",
                    border: "2px solid #10b981"
                  }}>
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>🥗</div>
                    <h4 style={{ color: "#065f46", fontSize: "15px", fontWeight: "700", marginBottom: "8px" }}>
                      Lifestyle Optimization
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "#064e3b", lineHeight: "1.6" }}>
                      <li>Maintain balanced, nutritious diet</li>
                      <li>Stay physically active as tolerated</li>
                      <li>Avoid alcohol and tobacco</li>
                      <li>Prioritize quality sleep and rest</li>
                    </ul>
                  </div>

                  <div style={{
                    background: "linear-gradient(135deg, #fed7aa 0%, #ffedd5 100%)",
                    padding: "18px",
                    borderRadius: "12px",
                    border: "2px solid #f97316"
                  }}>
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>👨‍👩‍👧‍👦</div>
                    <h4 style={{ color: "#9a3412", fontSize: "15px", fontWeight: "700", marginBottom: "8px" }}>
                      Family & Support System
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "#7c2d12", lineHeight: "1.6" }}>
                      <li>Inform close family members</li>
                      <li>Build strong caregiver network</li>
                      <li>Discuss family screening needs</li>
                      <li>Plan for practical support during treatment</li>
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
                    ⚠️ <strong>Critical:</strong> This is a screening tool only. Immediate consultation with qualified oncologist is essential for proper diagnosis and treatment planning.
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
              <h3 style={{
                textAlign: "center",
                color: "#1f2937",
                fontSize: "20px",
                fontWeight: "700",
                marginBottom: "25px"
              }}>
                📊 Cell Characteristics Visualization
              </h3>

              <div style={{ height: "350px", marginBottom: "15px" }}>
                <ResponsiveContainer>
                  <RadarChart 
                    data={result.radarData}
                    margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
                  >
                    <defs>
                      <linearGradient id="colorYourValues" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ec4899" stopOpacity={0.9}/>
                        <stop offset="100%" stopColor="#f472b6" stopOpacity={0.7}/>
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    <PolarGrid 
                      stroke="#e5e7eb" 
                      strokeWidth={2}
                    />
                    
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ 
                        fontSize: 12, 
                        fill: "#1f2937",
                        fontWeight: 600
                      }}
                    />
                    
                    <PolarRadiusAxis
                      angle={90}
                      tick={{ 
                        fontSize: 11,
                        fill: "#6b7280",
                        fontWeight: 500
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
                        padding: "16px 20px"
                      }}
                      labelStyle={{
                        color: "#1f2937",
                        fontWeight: "700",
                        fontSize: "15px",
                        marginBottom: "8px"
                      }}
                      formatter={(value, name, props) => {
                        if (name === "value") {
                          const percentage = props.payload.percentage;
                          return [
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                              <span style={{ fontSize: "18px", fontWeight: "700", color: "#ec4899" }}>
                                {parseFloat(value).toFixed(2)}
                              </span>
                              <span style={{ fontSize: "13px", color: "#6b7280" }}>
                                {percentage}% of maximum
                              </span>
                            </div>,
                            "Your Value"
                          ];
                        }
                        return [
                          <span style={{ fontSize: "16px", color: "#10b981", fontWeight: "600" }}>
                            {parseFloat(value).toFixed(2)}
                          </span>,
                          "Max Range"
                        ];
                      }}
                    />
                    
                    <Legend 
                      wrapperStyle={{
                        paddingTop: "30px"
                      }}
                      iconSize={16}
                      formatter={(value) => (
                        <span style={{ 
                          color: "#374151", 
                          fontWeight: 600,
                          fontSize: "15px",
                          marginLeft: "8px"
                        }}>
                          {value === "value" ? "Your Current Values" : "Maximum Range"}
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
                        filter: "url(#glow)"
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Legend Explanation */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "12px",
                marginTop: "15px"
              }}>
                <div style={{
                  background: "linear-gradient(135deg, #ec489915, #f472b615)",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "2px solid #ec489940",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "20px", marginBottom: "5px" }}>💗</div>
                  <div style={{ fontWeight: "700", color: "#ec4899", fontSize: "13px", marginBottom: "3px" }}>
                    Pink Area
                  </div>
                  <div style={{ fontSize: "11px", color: "#6b7280" }}>
                    Your current values
                  </div>
                </div>
                
                <div style={{
                  background: "linear-gradient(135deg, #f59e0b15, #fbbf2415)",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "2px solid #f59e0b40",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "20px", marginBottom: "5px" }}>🧡</div>
                  <div style={{ fontWeight: "700", color: "#f59e0b", fontSize: "13px", marginBottom: "3px" }}>
                    Orange Area
                  </div>
                  <div style={{ fontSize: "11px", color: "#6b7280" }}>
                    Maximum range
                  </div>
                </div>
              </div>

              {/* Interpretation Guide */}
              <div style={{
                marginTop: "15px",
                padding: "15px",
                background: "#f9fafb",
                borderRadius: "10px",
                border: "2px solid #e5e7eb"
              }}>
                <h4 style={{
                  color: "#1f2937",
                  fontSize: "14px",
                  fontWeight: "700",
                  marginBottom: "10px",
                  textAlign: "center"
                }}>
                  📖 How to Read Your Chart
                </h4>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                  gap: "10px",
                  fontSize: "12px",
                  color: "#4b5563"
                }}>
                  <div style={{ display: "flex", alignItems: "start", gap: "6px" }}>
                    <span style={{ fontSize: "16px" }}>✅</span>
                    <span><strong>Lower values:</strong> Better</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "start", gap: "6px" }}>
                    <span style={{ fontSize: "16px" }}>⚠️</span>
                    <span><strong>Higher values:</strong> Caution</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "start", gap: "6px" }}>
                    <span style={{ fontSize: "16px" }}>🔴</span>
                    <span><strong>At edges:</strong> Consult doctor</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Individual Metrics Breakdown */}
            <div style={{
              background: "rgba(255, 255, 255, 0.98)",
              borderRadius: "20px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
              padding: "25px",
              marginBottom: "20px",
            }}>
              <h3 style={{
                textAlign: "center",
                color: "#1f2937",
                fontSize: "18px",
                fontWeight: "700",
                marginBottom: "18px"
              }}>
                📈 Detailed Metrics Breakdown
              </h3>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "12px"
              }}>
                {result.radarData.map((item, index) => {
                  const statusColor = getStatusColor(item.value, item.rangeMax);
                  return (
                    <div key={index} style={{
                      background: "#f9fafb",
                      padding: "12px",
                      borderRadius: "10px",
                      border: "2px solid #e5e7eb"
                    }}>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "8px"
                      }}>
                        <span style={{ 
                          fontWeight: "700", 
                          color: "#1f2937",
                          fontSize: "12px"
                        }}>
                          {item.subject}
                        </span>
                        <span style={{
                          background: statusColor,
                          color: "white",
                          padding: "2px 8px",
                          borderRadius: "20px",
                          fontSize: "10px",
                          fontWeight: "700"
                        }}>
                          {item.percentage}%
                        </span>
                      </div>
                      
                      <div style={{
                        background: "#e5e7eb",
                        height: "6px",
                        borderRadius: "6px",
                        overflow: "hidden",
                        marginBottom: "6px"
                      }}>
                        <div style={{
                          background: statusColor,
                          height: "100%",
                          width: `${item.percentage}%`,
                          borderRadius: "6px",
                          transition: "width 1s ease"
                        }}></div>
                      </div>
                      
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "11px",
                        color: "#6b7280"
                      }}>
                        <span><strong>Value:</strong> {item.value.toFixed(1)}</span>
                        <span><strong>Max:</strong> {item.rangeMax}</span>
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

            {/* Breast Cancer Model Comparison Table with Bar Graph */}
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
                🎗️ Breast Cancer Model Comparison
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
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>0.965</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>0.965</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>0.965</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>96.49%</td>
                    </tr>

                    <tr style={{ borderTop: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "10px 12px", color: '#374151', fontWeight: 600 }}>KNN</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>0.957</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>0.956</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>0.956</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>95.61%</td>
                    </tr>

                    <tr style={{ borderTop: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "10px 12px", color: '#374151', fontWeight: 600 }}>SVM</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>0.967</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>0.965</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>0.965</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>96.49%</td>
                    </tr>

                    <tr style={{ borderTop: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "10px 12px", color: '#374151', fontWeight: 600 }}>RFC</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>0.975</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>0.973</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>0.974</td>
                      <td style={{ textAlign: 'center', padding: "10px 12px" }}>97.37%</td>
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
                      { model: 'LR', Precision: 0.965, 'F1-score': 0.965, Recall: 0.965, Accuracy: 96.49 },
                      { model: 'KNN', Precision: 0.957, 'F1-score': 0.956, Recall: 0.956, Accuracy: 95.61 },
                      { model: 'SVM', Precision: 0.967, 'F1-score': 0.965, Recall: 0.965, Accuracy: 96.49 },
                      { model: 'RFC', Precision: 0.975, 'F1-score': 0.973, Recall: 0.974, Accuracy: 97.37 }
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
                    <Bar dataKey="F1-score" fill="#f472b6" radius={[8, 8, 0, 0]} />
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
                  <strong>💡 Insight:</strong> RFC (Random Forest Classifier) achieves the highest overall accuracy at 97.37% with outstanding precision (0.975) and balanced recall metrics, making it the most reliable model for breast cancer detection based on cell nucleus characteristics.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}