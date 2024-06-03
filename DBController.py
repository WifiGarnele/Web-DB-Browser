import sqlite3

class DBController:

    def __init__(self, datei):
        self.connection=sqlite3.connect(datei)
        self.cursor=self.connection.cursor()


    def tabellenAusgeben(self):
        self.cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tabellen=self.cursor.fetchall()
        db_struktur={}

        for tabelle in tabellen:
            sql_string=f"PRAGMA table_info({tabelle[0]})"
            print(sql_string)
            self.cursor.execute(sql_string)
            spalten=self.cursor.fetchall()
            db_struktur[tabelle[0]]=spalten
            #print(spalten)
            #print(db_struktur)
        return db_struktur

    def schliessen(self):
        self.cursor.close()
        self.connection.close()


