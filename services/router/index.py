from flask import Flask

app = Flask(__name__)

@app.route('/')
def server():
  return 'Welcome to server'