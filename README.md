# Spletno programiranje 2020/2021

Lastni projekt pri predmetu **Spletno programiranje** v študijskem letu **2020/2021**.


## 1. LP

### Osnutek aplikacije in wireframe model

Za projekt pri predmetu Spletno programiranje smo si izbrali izdelavo napredne spletne trgovine za vse
fitnes navdušence. V naši trgovini lahko stranke izbirajo med najbolj kvalitetnimi izdelki za fitnes.
Če naši obiskovalci želijo, se lahko tudi prijavijo med uporabnike in si s tem olajšajo nakupovanje.
Ponujamo tudi kalkulator kalorij! S pomočjo tega si lahko kdorkoli izračuna, koliko kalorij naj bi
pojedel na dan.

### Uporabniki

#### Neprijavljen uporabnik

Neprijavljen uporabnik lahko brska po spletnem katalogu izdelkov, ne mora pa naročati izdelkov. Vsak neprijavljen uporabnik ima pravico do prijave in
registracije.

#### Prijavljen uporabnik

Prijavljen uporabnik lahko brska po katalogu, naroča izdelka in ureja svoj profil.
Lahko si ogleda zgodovino svojih nakupov.

#### Admin

Admin ima možnost dodajanja, brisanja in urejanja izdelka. Na strani kataloga ima gumb **Dodaj izdelek**, s klikom nanj se mu
odpre posebna stran za dodajanje izdelka. Tam lahko vnese ime, ceno, sliko in opis izdelka. Na strani izdelka se adminu
prikažeta gumba **Izbriši izdelek** in **Uredi izdelek**. Ob pritisku na prvi gumb se izdelek zbriše iz podatkovne baze,
ob kliku na drugega pa se mu odpre posebna stran za urejanje izdelka, ki je zelo podobna tisti za dodajanje, le da so
polja že izpolnjena. Na zavihku /kuponi lahko pregleduje, dodaja in briše kupone. 

## 2. LP

### Dovoljeni vnosi za vnosna polja

#### Prijava

Na strani prijave, se s pomočjo regularnih izrazov preverjata e-mail naslov in geslo. Elektronska pošta se preverja s pomočjo regularnega izraza: '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$', ki omogoča naslove tudi s številkami ali pa sestavljene iz več delov (npr.: aa1234@student.uni-lj.si). Geslo se preverja s pomočjo regularnega izraza: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})'. Ta regularni izraz zahteva, da je geslo sestavljeno iz vsaj ene majhne črke, ene velike črke, enega znaka ter ene številke. Dolžina gesla mora biti vsaj 8 znakov. Na enak način se vnosna polja preverjajo pri prijavi na vhodni strani.

#### Registracija

Na strani prijave, se s pomočjo regularnih izrazov preverjajo ime, priimek, e-mail naslov in geslo. Ime in priimek se preverjata s pomočjo regularnega izraza: '^[a-zA-Z]+$', ki je omejujoč samo v primerih res nesprejetih imen in priimkov (npr.: ".._č?$"). Elektronska pošta se preverja s pomočjo regularnega izraza: '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$', ki omogoča naslove tudi s številkami ali pa sestavljene iz več delov (npr.: aa1234@student.uni-lj.si). Geslo se preverja s pomočjo regularnega izraza: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})'. Ta regularni izraz zahteva, da je geslo sestavljeno iz vsaj ene majhne črke, ene velike črke, enega znaka ter ene številke. Dolžina gesla mora biti vsaj 8 znakov. Na enak način se vnosna polja preverjajo pri registraciji na vhodni strani.

#### Sporočilo za administratorja

Na strani kontankt, kjer lahko uporabnik vidi lokacijo trgovin in tudi možen prevzem, ima na voljo za izpolnit formular, kjer se njegova vnosna polja preverjajo na strani odjemalca s pomočjo regularnega izraza in sicer za ime in priimek: RegExp('^[a-zA-Z]+$'), email: RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$'), ki omogoče naslove tudi s številkami ali pa sestavljene iz več delov (npr.: aa123@student.uni-lj.si). Vsebina sporočila se preverja samo če je vnosno poljo prazno(potem opozori uporabnika naj vnese sporočilo).

#### Profil

Na strani profil, kjer lahko uporabnik posodablja svoje podatke, se s pomočjo regularnih izrazov preverja vnose. Preverja se ime in priimek z regularnim izrazom: '^[a-zA-Z]+$', preverja se tudi email z regularnim izrazom: '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$'. Preverja pa se tudi vnosno polje za posodabljanje gesla uporabnika. In sicer z regularnim izrazom: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})'.

#### Kuponi
Na strani kuponi, kjer lahko admin dodaja in briše kupone, se s pomočjo regularnih izrazov preverajajo vnosi v treh poljih. V vnosnem polju **Niz kupona** so dovoljene številke in črke angleške abecede (velike in male). V vnosnem polju **Popust** so dovoljena števila od 1 do 99. V vnosnem polju **Datum poteka** so dovoljeni vnosi oblike "YYYY-MM-DD". YYYY predstavlja letnico, sestavljeno iz 4 števk, prva števka mora biti večja ali enaka 2. MM predstavlja mesec, veljavna so števila od 01 do 12. DD prestavlja dan v mesecu, dovoljena so števila od 01 do 29. 

### Delovanje spletne strani na različnih napravah
1. Zelo velike naprave (>=1200px, npr.: Desktop)
2. Velik naprave (>=992px, npr.: iPad)
3. Srednje velike naprave (>=768px, npr.: iPhoneX)

### Zunanja knjižnica npm

#### node-sessionstorage
To zunanjo knjižnico uporabljamo za pomoč pri shranjevanju session storage-a. Pomaga nam pri prijavi uporabnikov, prikaz profila prijavljenega uporabnika in zgodovino njegovih nakupov. Uporabljamo metode .setItem, .getItem in .removeItem, s katerimi shranjujemo, kličemo in brišemo predvsem id uporabnika. S pomočjo te knjižnice simuliramo seje. 

## 3. LP

#### Povezava na aplikacijo na Heroku

https://beljakovine.herokuapp.com/

#### Navodila za namestitev in zagon aplikacija

1. Prestavite se v željeno mapo
2. $ git clone https://github.com/sp-2020-2021/LP-25.git
3. $ cd LP-25\Beljakovine.si
4. $ npm install
5. $ docker-compose up --no-start
6. $ docker start sp-beljakovine-mongodb
7. $ nodemon
8. V brskalniku odprite http://localhost:3000/

## 4. LP

SPA aplikacija na eni strani

#### Povezava na aplikacijo na Heroku

https://beljakovine.herokuapp.com/

#### Navodila za namestitev in zagon aplikacija

1.  Prestavite se v željeno mapo
2.  $ git clone https://github.com/sp-2020-2021/LP-25.git
3.  $ cd LP-25\Beljakovine.si
4.  $ npm install
5.  $ docker-compose up --no-start
6.  $ docker start sp-beljakovine-mongodb
7.  $ nodemon
8.  Odprite nov terminal
9.  $ cd LP-25\Beljakovine.si\app_public
10. $ npm install
11. $ ng serve
12. V brskalniku odprite http://localhost:4200/

## 5. LP

Varnostno zaščitena progresivna aplikacija

#### Povezava na aplikacijo na Heroku

https://beljakovine.herokuapp.com/

#### Navodila za namestitev in zagon aplikacija

1.  Prestavite se v željeno mapo
2.  $ git clone https://github.com/sp-2020-2021/LP-25.git
3.  $ cd LP-25\Beljakovine.si
4.  $ npm install
5.  $ docker-compose up --no-start
6.  $ docker start sp-beljakovine-mongodb
7.  $ nodemon
8.  Odprite nov terminal

##### navadna aplikacija
9.  $ cd LP-25\Beljakovine.si\app_public
10. $ npm install
11. $ ng serve
12. V brskalniku odprite http://localhost:4200/

##### PWA aplikacija z delujočim cache-iranjem
9. $ cd LP-25\Beljakovine.si\app_public
10. $ npm install
11. $ npm run build-docker-test


#### Različni uporabniki spletne stani

Spletna stran razlikuje med tremi tipi uporabnikov.

1. Gost

Gost je neprijavljen porabnik, ki lahko brska med izdelki na katalogu izdelkov, lahko dostopa do kalkulatorja in računanja z njim. Dostopni sta mu tudi začetna stran ter kontakt, kjer si lahko ogleduje trgovine na zemljevidu ali pa pošlje sporočilo administratorjem.

2. Prijavljen uporabnik

Prijavljen uporabnik lahko dela vse, kar lahko dela gost. Lahko pa tudi dostopa do svojega profila in si tam spreminja ime, priimek, elektronski naslov, geslo. Ogleda si lahko tudi svojo zgodovino nakupov in si jo pobriše. Na katalogu izdelkov lahko dodaja izdelke v košarico in zaključi nakup.

3. Admin

Administrator ali admin lahko dostopa do vseh strani na spletnem portalu in tudi do strani, ki so ostalim uporabnikom skrite. Lahko pride do strani /kuponi, kjer dodaja ali briše kupone. Lahko dostopa do strani /db kjer v podatkovno bazo uvozi začetne podatke. Na tej povezavi lahko admin tudi izbriše vse podatke iz podatkovne baze. Pri kontaktu lahko admin dodaja ali pa briše lokacije trgovin. Na katalogu izdelkov se mu na koncu izdelkov prikaže opcija za dodajanje izdelka, pravtako lahko izdelek spreminja. Na strani izdelka mu lahko spremeni ime, oceno (zvezdice), ceno in opis izdelka. Izdelek lahko tudi izbriše iz podatkovne baze.

#### Varnostna tveganja

1. Cross-Domain Misconfiguration

Do tega varnostnega tveganja pride, ker se iz aplikacije, ki teče na portu 4200 povezujemo na api, ki teče na portu 3000.

2. X-Frame-Options Header Not Set

V app.js je bil dodan res.header("X-Frame-Options", "Deny").

3. Application Error Disclosure

Tveganje se pojavi na povezavi localhost/3000/db/uporabniki. Povezava /db je namenjena zgolj testiranju in ni zavarovana.

4. Cross-Domain JavaScript Source File Inclusion

To tveganje povzroča zunanja knjižnica, ki je potrebna za delovanje Bootstrapa in na njo nimamo vpliva. (Bil je narejen update na najnovejšo verzijo).

5. Incomplete or No Cache-control and Pragma HTTP Header Set

Test je našel pot do produkcijske verzije aplikacije. Testiranje smo izvedli na lokalni ravni. Ko bo aplikacija dostopna javno do teh tveganj ne bo prihajalo.

6. Server Leaks Information via "X-Powered-By" HTTP Response Header Field(s)

V app.js smo dodali kodo, ki jo je predložil profesor v skripti. Error se še vedno ne obdela.

7. X-Content-Type-Options Header Missing

V app.js smo dodali kodo, ki jo je predložil profesor v skripti. Error se še vedno ne obdela. (nosniff)

#### Lighthouse

Osredotočili smo se na PWA aplikacijo. Edina stvar, ki negativno vpliva na PWA delovanje je, da se http promet ne preusmeri na https (gre za lokalno testiranje). V produkcijski aplikaciji je ta težava odpravljena.

Performance je bil najslabše ocenjen parameter. Razlog za to je, da SPA aplikacija ob začetnem vstopu na stran izvede ogromno GET poizvedb, kar vpliva na čas nalaganja začetne strani.