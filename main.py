from DBController import DBController
from flask import Flask, jsonify, request, send_file, make_response
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
    db = DBController(datei)
    db.tabelleErstellen(req)
    db.schliessen()
    return jsonify({"message": "Erfolg!"})

@app.route("/datei", methods=["GET"])
def sendDatei():
    print(datei)
    return send_file(datei, as_attachment=True)


@app.route("/dateiname", methods=["GET"])
def sendDateiname():
    global datei

    print(datei)
    dateiname = os.path.basename(datei)
    os.remove(datei)
    datei = None
    return jsonify(dateiname)

@app.route("/sql", methods=["POST", "GET"])
def sqlAusfuehren():
    req=request.get_json()

    query=req.get("query")
    db=DBController(datei)
    ergebnis=db.ausfuehren(query)
    print(ergebnis)
    return jsonify({"ergebnis": ergebnis})




if __name__ == '__main__':
    app.run(debug=True, port=3002)