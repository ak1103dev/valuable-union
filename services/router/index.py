from flask import Flask, request, jsonify
from controller import send

app = Flask(__name__)

@app.route('/')
def server():
  return 'Welcome to server'

@app.route('/users', methods=['POST'])
def register():
  data = request.form.to_dict()
  send('user.register', data)
  return jsonify(data), 201
