import secrets
from DBController import DBController
from flask import Flask, jsonify, request, session
from flask_cors import CORS
import sqlite3
import tempfile
import os


app = Flask(__name__)
app.secret_key = secrets.token_bytes(16)
CORS(app)


@app.route("/upload", methods=["POST", "GET"])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "Keine Datei in der Anfrage gefunden"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "Keine Datei ausgewählt"}), 400

    print(file.filename)

    print(file)

    try:
        temp_dir = tempfile.gettempdir()
        temp_file_path = os.path.join(temp_dir, file.filename)
        file.save(temp_file_path)
        session["file"] = temp_file_path
        db=DBController(temp_file_path)
        db.spaltenAusgeben()
        #os.remove(temp_file_path)
    except Exception as e:
        print(e)
    return jsonify({"message": "Datei erfolgreich hochgeladen!"})


if __name__ == '__main__':
    app.run(debug=True, port=3002)