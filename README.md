

# Chat alkalmazás
> *Készült a **MATE** gazdaságinformatikus szakának*
> ***Hálózati architektúrák és protokollok** tantárgy feladataként*

Készítette: **Nádházy György** (RKBXXM)

### Platform:
>[Ubuntu Linux](https://ubuntu.com/)
> [Node.JS](https://nodejs.org/en/)

### Felhasznát csomagok
> [node.JS net](https://nodejs.org/api/net.html)
> [node-datetime](https://www.npmjs.com/package/node-datetime)

### Felhasznált anyagok

 - Az órán elhangzott hálózati ismeretek
 - Az órán elkészített hasonló alkalmazás bemutatása
 - felhasznált csomagok dokumentációja
 -- [node-datetime dokumentáció](https://www.npmjs.com/package/node-datetime#methods)
 -- [node.JS net](https://nodejs.org/api/net.html)
 - Stackoverflow: 
 -- Hogyan formázzuk a dátumot node-datetime csomaggal ([link](https://stackoverflow.com/questions/38182501/how-to-get-current-datetime-with-format-y-m-d-hms-using-node-datetime-library))
 -- `console.log` szövegek színezése ([link](https://stackoverflow.com/a/41407246/15366989))

### Használat

szerver  indítása (a szerver a 3000-es tcp porton várja a csatlakozást)

    node ChatSzerver.js

kliens  indítása (a kliens a localhost 3000-es tcp portájar kapcsolódik)

    node ChatKliens.js

### Az alkalmazások működése

A szerver és a kliens indítása után a két alkalmazás között kapcsolat jön létre, így bármelyik alkalmazás `stdin` (jellemzően billentyűzet) érkező adatot a másik félnek továbbítja, ami azt megjeleníti. A két mikroalkalmazás a kapcsolat felépítési részben különbözik (szerver: várja a kliens kapcsolódást a 3000-es porton: `szerver.listen(3000);`, a kliens kapcsolódik a localhost 3000-es portjára: `socket.connect(3000, 'localhost');`) ugyanazt a módszert használja viszont az adatok fogadására és küldésére.  A szerver a küldéskor, illetve fogadáskor kiegészíti egy timestamp-pel az üzeneteket:

            var dt = dateTime.create();
            var fdt = dt.format('Y-m-d H:M:S');
            data  = fdt + " --> " + buffer.toString();

### Fejlesztés lépései

 1. Feladat értelmezése
 2. Specifikáció készítés:
 -- 
 3. 

 

