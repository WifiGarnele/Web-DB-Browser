from DBController import DBController
from flask import Flask, jsonify, request
from flask_cors import CORS
import tempfile
import os
app = Flask(__name__)
CORS(app)
datei=None

@app.route("/upload", methods=["POST", "GET"])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "Keine Datei in der Anfrage gefunden"}), 400

    global  datei
    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "Keine Datei ausgewählt"}), 400

    print(file.filename)

    print(file)

    try:
        temp_dir = tempfile.gettempdir()
        temp_file_path = os.path.join(temp_dir, file.filename)
        file.save(temp_file_path)

        datei=temp_file_path
        db=DBController(datei)

        print(db.tabellenAusgeben())
        db.schliessen()
        #os.remove(temp_file_path)

        return jsonify({"message": "Datei erfolgreich hochgeladen!"})
    except Exception as e:
        print(e)
        return jsonify({"error": "Falscher Dateityp"}), 400

@app.route("/tabellen", methods=["GET"])
def tabellenAusgeben():

    try:
        global datei
        print(datei)
        db = DBController(datei)
        tabellen = db.tabellenAusgeben()
        #print(tabellen)
        db.schliessen()

        return jsonify(tabellen)

    except Exception as e:
        print(e)
        print("Fehler beim Ausgeben der Tabellen")
        return jsonify({"error": "Fehler beim Ausgeben der Tabellen"}), 500

@app.route("/neueTabelle", methods=["POST", "GET"])
def tabelleErstellen():
    req=request.get_json()
    print("request")
    print(req)
    tabellenName=req.get("tabellenName")
    print(tabellenName)
    spalten=req.get("spalten")
    print(spalten)
    return jsonify({"message": "Erfolg!"})


if __name__ == '__main__':
    app.run(debug=True, port=3002)