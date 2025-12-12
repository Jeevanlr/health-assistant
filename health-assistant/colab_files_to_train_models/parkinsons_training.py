import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report
import pickle

# Load dataset
df = pd.read_csv('dataset/parkinsons.csv')

# Drop non-numeric 'name' column
df = df.drop('name', axis=1)

# Prepare features and target
X = df.drop('status', axis=1)
y = df['status']

# Split data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train SVM model
model = SVC(kernel='linear', random_state=42)
model.fit(X_train_scaled, y_train)

# Evaluate model
y_pred = model.predict(X_test_scaled)
print('Accuracy:', accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))

# Save model and scaler
with open('parkinsons_model.sav', 'wb') as f:
    pickle.dump(model, f)

with open('parkinsons_scaler.sav', 'wb') as f:
    pickle.dump(scaler, f)
