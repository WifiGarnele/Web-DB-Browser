import sqlite3
from flask import session

class DBController:

    def __init__(self, datei):
        self.connection=sqlite3.connect(datei)
        self.cursor=self.connection.cursor()


    def tabellenAusgeben(self):
        self.cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tabellen=self.cursor.fetchall()

        return tabellen

