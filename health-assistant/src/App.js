import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PreDiabetesScreening from './components/PreDiabetesScreening';
import PreHeartScreening from './components/PreHeartScreening';
import PreParkinsonScreening from './components/PreParkinsonScreening';
import PreBreastCancerScreening from './components/PreBreastCancerScreening';
import DiabetesForm from './components/DiabetesForm';
import HeartForm from './components/HeartForm';
import ParkinsonForm from './components/ParkisonForm';
import BreastCancerForm from './components/BreastCancerForm';
import SymptomForm from './components/SymptomForm';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pre-diabetes" element={<PreDiabetesScreening />} />
                <Route path="/pre-heart" element={<PreHeartScreening />} />
                <Route path="/pre-parkinsons" element={<PreParkinsonScreening />} />
                <Route path="/pre-breast" element={<PreBreastCancerScreening />} />
                <Route path="/diabetes" element={<DiabetesForm />} />
                <Route path="/heart" element={<HeartForm />} />
                <Route path="/parkinsons" element={<ParkinsonForm />} />
                <Route path="/breast" element={<BreastCancerForm />} />
                <Route path="/symptom" element={<SymptomForm />} />
            </Routes>
        </Router>
    );
}

export default App;