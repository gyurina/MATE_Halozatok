

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

kliens  indítása (a kliens a localhost 3000-es tcp portjára kapcsolódik)

    node ChatKliens.js

### Az alkalmazások működése

A szerver és a kliens indítása után a két alkalmazás között kapcsolat jön létre, így bármelyik alkalmazás `stdin` (jellemzően billentyűzet) érkező adatot a másik félnek továbbítja, ami azt megjeleníti. A két mikroalkalmazás a kapcsolat felépítési részben különbözik (szerver: várja a kliens kapcsolódást a 3000-es porton: `szerver.listen(3000);`, a kliens kapcsolódik a localhost 3000-es portjára: `socket.connect(3000, 'localhost');`) ugyanazt a módszert használja viszont az adatok fogadására és küldésére.  A szerver a küldéskor, illetve fogadáskor kiegészíti egy timestamp-pel az üzeneteket:

```javascript
var dt = dateTime.create();
var fdt = dt.format('Y-m-d H:M:S');
data  = fdt + " --> " + buffer.toString();
```
### Fejlesztés lépései

 1. Feladat értelmezése
 - Egy szerver-kliens chat alkalmazás készítése Node.JS segítségével, ahol mindkét fél tud a másiknak üzenetet küldeni
 2. Specifikáció készítés:
 - két "modul" elkészítése szükséges
 - szerver feladatai:
 -- egy megadott port (jelen esetben a 3000-es) figyelése, kliens csatlakozásra várakozás
 -- fogadni a kliens csatlakozását
 -- jelezni a kliensnek a sikeres csatlakozást
 -- a szerver konzolon megjeleníteni, hogy klienscsatlakozás történt
 -- a konzolon begépelt üzenetet elküldeni a kliensnek
 -- fogadni a klienstől érkező üzeneteket és azokat megjeleníteni a konzolon
 -- ha a kliens kapcsolat megszakad, az a konzolon megjeleníteni
- kliens feladatai:
-- csatlakozni a szerverhez
-- a szervertől érkező üzenetek megjelenítése
-- üzenet küldése a szervernek
 3. Programozás
A programozás során a [TDD](https://hu.wikipedia.org/wiki/Tesztvez%C3%A9relt_fejleszt%C3%A9s) módszertant használtam. 
Első lépésben a szerver fejlesztését kezdtem annak kialakításával, hogy a szerver képes legyen kapcsolatot fogadni:
```javascript
var net = require(net);
var szerver =  net.createServer (function(socket) {
        console.log('kliens csatlakozott (' + socket.remoteAddress + ":" + socket.remotePort + ")
");
socket.on('end', function() {
        console.log('kliens lecsatlakozott');
        });
});
szerver.listen(3000);
```
Ez könnyen tesztelhető volt a 

    telnet localhost 3000
paranccsal. Ekkor a szerver  kliens csatlakozott / kliens lecsatlakozott üzenet jelent meg a konzolon

Következő lépésben a klienstől érkező üzenetek megjelenítése történt:
```javascript
        socket.on('data', function(data) {
                console.log(data);
                });
```
Majd az `stdin`-en érkező üzenet küldése készült el.
```javascript
process.stdin.on('data', function (buffer) {
                data  = buffer.toString();
                socket.write(data);
                });
```

Ezzel a szerver el is készült. Egy kis csinosítás érdekében még hozzátettem a `node-datetime` modult, hogy a küldött és érkező üzenetek esetében a pontos idő is megjelenítésre kerüljön:
```javascript
var dateTime = require('node-datetime');
               var dt = dateTime.create();
               var fdt = dt.format('Y-m-d H:M:S');
               data  = fdt + "->" + data;
```

Illetve egy további kis kiegészítésként próbáltam színezni a kommunikációs üzeneteket:
```javascript
 console.log('\x1b[31m%s\x1b[0m','kliens letcsatlakozott');
```
Ehhez semmilyen kiegészítő nem volt szükséges.

Ezután a kliens készítése már nem igényelt túl sok egyedi dolgot, ugyanis a küldés és a fogadás megegyezik, csak a kapcsolat felépítése szükséges:
```javascript
var socket = net.Socket();
socket.connect(3000, 'localhost');
socket.on('connect', function() {});
```

És ezzel el is készült az alkalmazás.
