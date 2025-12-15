"""WSGI entry point for Gunicorn. Imports Flask app from health-assistant."""
import sys
import os
import importlib.util

# Get the absolute path to app.py in health-assistant directory
app_path = os.path.join(os.path.dirname(__file__), 'health-assistant', 'app.py')

# Load the app module explicitly
spec = importlib.util.spec_from_file_location("app", app_path)
app_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(app_module)

# Export the Flask app instance for gunicorn
app = app_module.app

if __name__ == '__main__':
    app.run()

