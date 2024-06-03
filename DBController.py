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

    def tabelleErstellen(self, req):
        tabellenName=req.get("tabellenName")
        print(tabellenName)
        spalten=req.get("spalten")
        print(spalten)
        createBefehl=f"CREATE TABLE {tabellenName}("
        spaltenBefehl=""
        pk=[]
        PKBefehl="PRIMARY KEY("
        for spalte in spalten:
            spaltenBefehl=spaltenBefehl+f"{spalte.get("name")} {spalte.get("typ")}, "
            if (spalte.get("PK")==1):
                pk.append(spalte)

        for i in range (0,len(pk)):
            PKBefehl = PKBefehl + f"{pk[i].get("name")}"
            if (i<len(pk)-1):
                PKBefehl=PKBefehl+","



        createBefehl=createBefehl+" "+spaltenBefehl+""+PKBefehl+"));"
        print(createBefehl)
        self.cursor.execute(createBefehl)
        self.connection.commit()

    def schliessen(self):
        self.cursor.close()
        self.connection.close()


