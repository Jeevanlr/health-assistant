import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import pickle

# Load datasets
symptom_data = pd.read_csv('dataset/symptoms/dataset.csv')
symptom_severity = pd.read_csv('dataset/symptoms/Symptom-severity.csv')


# Get all unique symptoms and their weights
severity_dict = dict(zip(symptom_severity['Symptom'], symptom_severity['weight']))
all_symptoms = sorted(severity_dict.keys())

# Encode symptoms for each row using severity weights
X = []
for _, row in symptom_data.iterrows():
    symptoms = [str(row[f'Symptom_{i}']).strip() for i in range(1, 18)]
    symptoms = [s for s in symptoms if s and s != 'nan']
    x_row = [severity_dict[s] if s in symptoms else 0 for s in all_symptoms]
    X.append(x_row)
X = pd.DataFrame(X, columns=all_symptoms)

y = symptom_data['Disease']

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train classifier
clf = RandomForestClassifier(n_estimators=200, random_state=42)
clf.fit(X_train, y_train)


# Save model
with open('saved_models/symptom_disease_model.sav', 'wb') as f:
    pickle.dump({'model': clf, 'symptoms': all_symptoms, 'severity_dict': severity_dict}, f)

# Print accuracy
print('Train accuracy:', clf.score(X_train, y_train))
print('Test accuracy:', clf.score(X_test, y_test))
