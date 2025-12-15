from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


# ---------------- COMMON DICTIONARIES ----------------
# Diabetes Fields
DIABETES_LABELS = [
    "Pregnancies", "Glucose", "Blood Pressure", "Skin Thickness",
    "Insulin", "BMI", "Diabetes Pedigree", "Age"
]
DIABETES_MAX = {
    "Pregnancies": 15, "Glucose": 250, "Blood Pressure": 150,
    "Skin Thickness": 60, "Insulin": 276, "BMI": 60,
    "Diabetes Pedigree": 2.5, "Age": 80
}

# Heart Fields
HEART_LABELS = [
    "Age", "Sex (1=Male)", "Chest Pain Type", "Resting BP",
    "Cholesterol", "Fasting Blood Sugar", "Max Heart Rate", "Exercise Angina"
]
HEART_MAX = {
    "Age": 80, "Sex (1=Male)": 1, "Chest Pain Type": 4, "Resting BP": 200,
    "Cholesterol": 600, "Fasting Blood Sugar": 200,
    "Max Heart Rate": 220, "Exercise Angina": 1
}

# Parkinson's Fields
PARKINSON_LABELS = [
    "MDVP:Fo(Hz)", "MDVP:Fhi(Hz)", "MDVP:Flo(Hz)",
    "Jitter(%)", "Shimmer", "NHR", "HNR", "RPDE"
]
PARKINSON_MAX = {
    "MDVP:Fo(Hz)": 300, "MDVP:Fhi(Hz)": 400, "MDVP:Flo(Hz)": 150,
    "Jitter(%)": 1, "Shimmer": 1, "NHR": 0.3, "HNR": 40, "RPDE": 1
}

# Breast Cancer Fields
BREAST_LABELS = [
    "Mean Radius", "Mean Texture", "Mean Smoothness", "Mean Compactness",
    "Mean Symmetry", "Mean Concavity", "Mean Area", "Mean Perimeter"
]
BREAST_MAX = {
    "Mean Radius": 30, "Mean Texture": 40, "Mean Smoothness": 0.2,
    "Mean Compactness": 1, "Mean Symmetry": 0.5, "Mean Concavity": 1,
    "Mean Area": 2500, "Mean Perimeter": 200
}

# Symptom Checker Fields
SYMPTOM_LABELS = [
    "Fever", "Cough", "Headache", "Fatigue",
    "Nausea", "Chest Pain", "Dizziness", "Sore Throat"
]
SYMPTOM_MAX = {
    "Fever": 104, "Cough": 10, "Headache": 10, "Fatigue": 10,
    "Nausea": 10, "Chest Pain": 10, "Dizziness": 10, "Sore Throat": 10
}


# ------------------ HOME ------------------
@app.route('/')
def home():
    return jsonify({"message": "Health Prediction API running successfully"})


# ------------------ PRE-DIABETES SCREENING ------------------
@app.route('/predict/pre-diabetes', methods=['POST'])
def predict_pre_diabetes():
    try:
        data = request.json
        age = float(data.get('age', 0))
        bmi = float(data.get('bmi', 0))
        glucose = float(data.get('glucose', 0))
        
        risk_score = 0
        
        if age < 40:
            risk_score += 5
        elif age < 50:
            risk_score += 10
        elif age < 60:
            risk_score += 15
        else:
            risk_score += 25
        
        if bmi < 25:
            risk_score += 5
        elif bmi < 30:
            risk_score += 15
        elif bmi < 35:
            risk_score += 25
        else:
            risk_score += 35
        
        if glucose < 100:
            risk_score += 5
        elif glucose < 126:
            risk_score += 20
        elif glucose < 180:
            risk_score += 30
        else:
            risk_score += 40
        
        risk_percentage = min(100, risk_score)
        
        if risk_percentage <= 30:
            risk_level = "Low"
        elif risk_percentage <= 50:
            risk_level = "Moderate"
        else:
            risk_level = "High"
        
        return jsonify({
            "risk_percentage": risk_percentage,
            "risk_level": risk_level,
            "values": {"age": age, "bmi": bmi, "glucose": glucose}
        })
    except Exception as e:
        print("Error in predict_pre_diabetes:", e)
        return jsonify({"error": "Invalid input"}), 400


# ------------------ PRE-HEART SCREENING ------------------
@app.route('/predict/pre-heart', methods=['POST'])
def predict_pre_heart():
    try:
        data = request.json
        age = float(data.get('age', 0))
        cholesterol = float(data.get('cholesterol', 0))
        blood_pressure = float(data.get('blood_pressure', 0))
        heart_rate = float(data.get('heart_rate', 0))
        
        risk_score = 0
        
        if age < 40:
            risk_score += 5
        elif age < 50:
            risk_score += 10
        elif age < 60:
            risk_score += 20
        else:
            risk_score += 30
        
        if cholesterol < 200:
            risk_score += 5
        elif cholesterol < 240:
            risk_score += 15
        elif cholesterol < 300:
            risk_score += 25
        else:
            risk_score += 35
        
        if blood_pressure < 120:
            risk_score += 5
        elif blood_pressure < 140:
            risk_score += 10
        elif blood_pressure < 160:
            risk_score += 18
        else:
            risk_score += 25
        
        if 60 <= heart_rate <= 100:
            risk_score += 2
        elif heart_rate < 60 or heart_rate > 120:
            risk_score += 10
        else:
            risk_score += 5
        
        risk_percentage = min(100, risk_score)
        
        if risk_percentage <= 30:
            risk_level = "Low"
        elif risk_percentage <= 50:
            risk_level = "Moderate"
        else:
            risk_level = "High"
        
        return jsonify({
            "risk_percentage": risk_percentage,
            "risk_level": risk_level,
            "values": {
                "age": age,
                "cholesterol": cholesterol,
                "blood_pressure": blood_pressure,
                "heart_rate": heart_rate
            }
        })
    except Exception as e:
        print("Error in predict_pre_heart:", e)
        return jsonify({"error": "Invalid input"}), 400


# ------------------ PRE-PARKINSON'S SCREENING ------------------
@app.route('/predict/pre-parkinsons', methods=['POST'])
def predict_pre_parkinsons():
    try:
        data = request.json
        age = float(data.get('age', 0))
        tremor_severity = float(data.get('tremor_severity', 0))
        movement_difficulty = float(data.get('movement_difficulty', 0))
        voice_changes = float(data.get('voice_changes', 0))
        
        risk_score = 0
        
        if age < 50:
            risk_score += 5
        elif age < 60:
            risk_score += 10
        elif age < 70:
            risk_score += 15
        else:
            risk_score += 25
        
        if tremor_severity < 2:
            risk_score += 0
        elif tremor_severity < 4:
            risk_score += 10
        elif tremor_severity < 7:
            risk_score += 20
        else:
            risk_score += 30
        
        if movement_difficulty < 3:
            risk_score += 0
        elif movement_difficulty < 5:
            risk_score += 10
        elif movement_difficulty < 7:
            risk_score += 18
        else:
            risk_score += 25
        
        if voice_changes < 3:
            risk_score += 0
        elif voice_changes < 5:
            risk_score += 8
        elif voice_changes < 7:
            risk_score += 15
        else:
            risk_score += 20
        
        risk_percentage = min(100, risk_score)
        
        if risk_percentage <= 30:
            risk_level = "Low"
        elif risk_percentage <= 50:
            risk_level = "Moderate"
        else:
            risk_level = "High"
        
        return jsonify({
            "risk_percentage": risk_percentage,
            "risk_level": risk_level,
            "values": {
                "age": age,
                "tremor_severity": tremor_severity,
                "movement_difficulty": movement_difficulty,
                "voice_changes": voice_changes
            }
        })
    except Exception as e:
        print("Error in predict_pre_parkinsons:", e)
        return jsonify({"error": "Invalid input"}), 400


# ------------------ PRE-BREAST CANCER SCREENING ------------------
@app.route('/predict/pre-breast', methods=['POST'])
def predict_pre_breast():
    try:
        data = request.json
        age = float(data.get('age', 0))
        family_history = float(data.get('family_history', 0))
        lump_detected = float(data.get('lump_detected', 0))
        pain_level = float(data.get('pain_level', 0))
        
        risk_score = 0
        
        # Age factor (0-30 points)
        if age < 30:
            risk_score += 5
        elif age < 40:
            risk_score += 10
        elif age < 50:
            risk_score += 15
        elif age < 60:
            risk_score += 20
        else:
            risk_score += 30
        
        # Family history factor (0-35 points)
        if family_history == 1:
            risk_score += 35
        else:
            risk_score += 0
        
        # Lump detected factor (0-30 points)
        if lump_detected == 1:
            risk_score += 30
        else:
            risk_score += 0
        
        # Pain level factor (0-5 points)
        if pain_level < 3:
            risk_score += 0
        elif pain_level < 6:
            risk_score += 2
        else:
            risk_score += 5
        
        risk_percentage = min(100, risk_score)
        
        if risk_percentage <= 30:
            risk_level = "Low"
        elif risk_percentage <= 50:
            risk_level = "Moderate"
        else:
            risk_level = "High"
        
        return jsonify({
            "risk_percentage": risk_percentage,
            "risk_level": risk_level,
            "values": {
                "age": age,
                "family_history": family_history,
                "lump_detected": lump_detected,
                "pain_level": pain_level
            }
        })
    except Exception as e:
        print("Error in predict_pre_breast:", e)
        return jsonify({"error": "Invalid input"}), 400


# ------------------ DIABETES ------------------
@app.route('/predict/diabetes', methods=['POST'])
def predict_diabetes():
    try:
        data = request.json
        values = {k: float(data.get(k.lower().replace(" ", "_"), 0)) for k in DIABETES_LABELS}

        score = 0
        if values["Glucose"] >= 140:
            score += 1
        if values["BMI"] >= 30:
            score += 1
        if values["Diabetes Pedigree"] >= 1.2:
            score += 1

        if score >= 2:
            prediction = "Diabetic (High risk)"
        elif score == 1:
            prediction = "At Risk (Caution)"
        else:
            prediction = "Not Diabetic"

        return jsonify({"prediction": prediction, "values": values})
    except Exception as e:
        print("Error in predict_diabetes:", e)
        return jsonify({"error": "Invalid input"}), 400


# ------------------ HEART ------------------
@app.route('/predict/heart', methods=['POST'])
def predict_heart():
    try:
        data = request.json
        values = {k: float(data.get(k.lower().replace(" ", "_").replace("(1=male)", "sex"), 0)) for k in HEART_LABELS}

        score = 0
        if values["Cholesterol"] > 240:
            score += 1
        if values["Resting BP"] > 140:
            score += 1
        if values["Max Heart Rate"] < 120:
            score += 1

        if score >= 2:
            prediction = "High Risk of Heart Disease"
        elif score == 1:
            prediction = "Moderate Risk"
        else:
            prediction = "Normal"

        return jsonify({"prediction": prediction, "values": values})
    except Exception as e:
        print("Error in predict_heart:", e)
        return jsonify({"error": "Invalid input"}), 400


# ------------------ PARKINSON ------------------
@app.route('/predict/parkinsons', methods=['POST'])
def predict_parkinsons():
    try:
        data = request.json
        values = {k: float(data.get(k.lower().replace(":", "_").replace("(", "").replace(")", ""), 0)) for k in PARKINSON_LABELS}

        if values["Jitter(%)"] > 0.3 or values["NHR"] > 0.1:
            prediction = "Parkinson's Detected"
        else:
            prediction = "No Parkinson's Signs"

        return jsonify({"prediction": prediction, "values": values})
    except Exception as e:
        print("Error in predict_parkinsons:", e)
        return jsonify({"error": "Invalid input"}), 400


# ------------------ BREAST CANCER ------------------
@app.route('/predict/breast', methods=['POST'])
def predict_breast():
    try:
        data = request.json
        values = {k: float(data.get(k.lower().replace(" ", "_"), 0)) for k in BREAST_LABELS}

        if values["Mean Radius"] > 15 or values["Mean Compactness"] > 0.3:
            prediction = "Malignant (High Risk)"
        else:
            prediction = "Benign (Low Risk)"

        return jsonify({"prediction": prediction, "values": values})
    except Exception as e:
        print("Error in predict_breast:", e)
        return jsonify({"error": "Invalid input"}), 400


# ------------------ SYMPTOM ------------------
@app.route('/predict/symptom', methods=['POST'])
def predict_symptom():
    try:
        data = request.json
        values = {k: float(data.get(k.lower().replace(" ", "_"), 0)) for k in SYMPTOM_LABELS}

        total = sum(values.values())
        if total > 40:
            prediction = "Severe Symptoms — Seek Medical Help"
        elif total > 20:
            prediction = "Moderate Symptoms"
        else:
            prediction = "Mild Symptoms"

        return jsonify({"prediction": prediction, "values": values})
    except Exception as e:
        print("Error in predict_symptom:", e)
        return jsonify({"error": "Invalid input"}), 400


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
<<<<<<< HEAD
    logger.info(f"Starting Health Assistant API on port {port}")
    # Use gunicorn in production, Flask dev server locally
    app.run(debug=False, host='0.0.0.0', port=port, threaded=True)
=======
    app.run(debug=False, host='0.0.0.0', port=port)
>>>>>>> parent of f227261 (Feature: add logging, health check, and API documentation endpoints)
