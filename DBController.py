import sqlite3

class DBController:

    def __init__(self, datei):
        self.connection=sqlite3.connect(datei)
        self.cursor=self.connection.cursor()

    def spaltenAusgeben(self):
        self.cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tabellen=self.cursor.fetchall()
        print(tabellen)

