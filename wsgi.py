"""WSGI entry point for Gunicorn. Imports Flask app from health-assistant."""
import sys
import os

# Add health-assistant directory to path so gunicorn can find and import the app
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'health-assistant'))

# Import the Flask app instance
from app import app

if __name__ == '__main__':
    app.run()
