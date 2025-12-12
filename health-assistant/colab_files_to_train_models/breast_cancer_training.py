import pandas as pd
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, classification_report
import pickle

# Load dataset from local CSV file
df = pd.read_csv('dataset/breastcancer.csv')

# Prepare features and target
# The dataset uses 'diagnosis' as the target column instead of 'label'
X = df.drop('diagnosis', axis=1)
y = df['diagnosis']

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=2)

# Train XGBoost model
model = XGBClassifier(use_label_encoder=False, eval_metric='logloss', random_state=42)
model.fit(X_train, y_train)

# Evaluate model
y_pred = model.predict(X_test)
print('Accuracy on test data =', accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))

# Save model
filename = 'breast_cancer_model.sav'
pickle.dump(model, open(filename, 'wb'))
