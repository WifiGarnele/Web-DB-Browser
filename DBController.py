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
            #print(sql_string)
            self.cursor.execute(sql_string)
            spalten=self.cursor.fetchall()
            #print(spalten)


            fk_string=f"PRAGMA foreign_key_list({tabelle[0]})"
            self.cursor.execute(fk_string)
            foreign_keys = self.cursor.fetchall()
            for fk in foreign_keys:
                for i in range(0, len(spalten)):
                    if(spalten[i][1]==fk[3]):
                        print("gleich")
                        print(spalten[i][1])
                        print(fk[3])
                        if(spalten[i][5]==0):
                            temp = list(spalten[i])
                            temp[5] = -1
                            spalten[i]=tuple(temp)


            db_struktur[tabelle[0]] = spalten

        print(db_struktur)
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



    def ausfuehren(self, query):
        #self.connection.row_factory=sqlite3.Row
        self.cursor.execute(query)
        rows = self.cursor.fetchall()
        column_names = [description[0] for description in self.cursor.description]
        print(column_names)
        ergebnis=[]
        for row in rows:
            ergebnis.append({column_names[idx]: value for idx, value in enumerate(row)})
        print(ergebnis)
        return ergebnis

    def schliessen(self):
        self.cursor.close()
        self.connection.close()


