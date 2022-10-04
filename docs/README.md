# Spletno programiranje 2020/2021

Dokumentacija lastnega projekta pri predmetu **Spletno programiranje** v študijskem letu **2020/2021**.

# Domača stran

Na prvi spletni strani imamo v navigacijski vrstici povezave do ostalih spletnih strani, v glavnem je namen index spletne strani, da uporabnika seznani, s čim se sploh bavimo(prodaja proteinov) in zakaj naj izbere prav nas pri nakupu proteinov in sportnih oblacil. Ko poscrollamo dol, lahko vidimo, da je na strani implemntiram js, ki da lepo animacijo potovanja teksta po ekranu. Na dnu je uporabniku postavljeno vprasanje, ali je ze clan spletne aplikacije ali pa še ne. Ob pritisku na gumb se lahko uporabnik kar takoj ali registrira ali pa se prijavi v aplikacijo.

# Checkout

## Prva stran

Na prvi strani uporabnik lahko spreminja količino izdelkov, ki jih je v spletnem katalogu dodal v 
košarico. Unovči lahko tudi kodo za popust, ki spremeni končno ceno. Gumb **Nazaj** ga odpelje na spletni
katalog, gumb **Na naslednji korak** pa ga odpelje na drugo stran.

## Druga stran

Na drugi strani prijavljen uporabnik lahko za naslov dostave uporabi privzeti naslov, ki ga ima shranjenega
na profilu ali pa izbere drug naslov, ki ga vnese v petih poljih (Ime, Priimek, Naslov, Mesto in Poštna številka).
Neprijavljen uporabnik mora tu vnesti naslov v petih poljih. Tako prijavljen kot neprijavljen uporabnik
morata nato zbrati še način dostave in način plačila ter ob izbiri kartice izpolniti podatke o kartici. 
Gumb **Nazaj** nas odpelje nazaj na prvo stran, s klikom na gumb **Končajte z nakupom** pa zaključimo nakup.

# Kontakt

Na spletni strani je forma, kjer lahko uporabnik administratorju napiše sporočilo glede izdelkov, spletne strani, lokacij trgovni, možnosti prevzema ali česar koli drugega kar mu pade na pamet, na spletni strani je tudi tabela, ki prikazuje lokacije trgovin in ali je v njim možnost prevzema naročila ter tudi zemljevid,kjer so lokacije trgovin prikazane.

# Prijava in registracija

## Prijava

Na strani prijave je ustvarjena forma za prijavo, ki zahteva vnos elektronske pošte in gesla. Ob morebitnem napačnem vnosu v vnosna polja se izpiše opozorilo 'Napačno uporabniško ime ali geslo!'. Ponuja tudi direktno povezavo do registracije v primeru, da obiskovalec še ni registriran. Skok na registracijo omogoča klik na besedilo 'Še niste registrirani?'. Stran ima podprt tudi problem pozabljenega gesla.Če je obiskovalec morda pozabil geslo lahko klikne na povezavo 'Pozabljeno geslo' in odpre se mu popup okno, v katerega vpiše svojo elektronsko pošto in nato sledi navodilom prek dobljenega sporočila.

## Registracija

Na strani registracije je ustvarjena forma za registracijo, ki zahteva vnos imena in priimka, elektronske pošte ter gesla. Ob morebitnem vnosu neustreznega imena se izpiše opozorilo 'Prosim vnesite veljavno ime!', ob morebitnem neustreznem vnosu priimka se izpiše opozorilo 'Prosim vnesite veljaven priimek!', ob morebitnem neustreznem vnosu elektronskega naslova se izpiše opozorilo 'Prosim vnesite veljaven e-mail naslov!' in ob morebitnem neustreznem vnosu gesla se izpiše opozorilo 'Geslo mora imeti vsaj eno majhno črko, eno veliko črko, en znak, eno število in dolgo mora biti vsaj 8 znakov!'. Obiskovalec mora prebrati in se strinjati s pogoji uporabe spletne strani Beljakovine.si, ta lahko prebere na povezavi s klikom na 'pogoji uporabe'. Če se s pogoji strinja mora obkljukati checkbox ob pogojih uporabe. Obiskovalec se lahko naroči tudi na obveščanje prek e-mail sporočil. To stori tako, da obkljuka checkbox ob 'Strinjam se, da me obveščate o aktualni ponudbi in akcijah.'.

# Dodajanje izdelka

Na strani dodajanje izdelka je ustvarjena froma za dodajanje izdelka. Do te strani lahko dostopa samo admin. Izdelku se mora dodati ime izdelka, cena (€), admin mora izbrati kategorijo izdelka, sledi opis izdelka ter mnenje strokovnjaka. Izdelku je potrebno dodati še vsaj eno sliko.

# Pregled in urejanje elementa

Na strani izdelka se vidi njegovo ime, ceno, opis, oceno strokovnjaka in slika. Z gumbom uredi izdelek pa je omomgočeno urejanje izdelka. Pri tem preveri, da je cena številka in da je ocena med 1 in 5.

# Izpis seznama elementov in master/detail vzorec

Na strani izdelki se ipise seznam vseh izdelkov, s klikom na izdelek pa se odpre tudi podroben pogled tega izdelka. Pri vsakem izdelku v seznamu je izpisno ime, cena in prikazana slika. V podrobnejšem pogledu pa se nam izpiše tudi ocena strokovnjaka in opis izdelka.

# Iskanje

Na strani izdelki, ob izpisu izdelkov je možno na vrhu strani vpisati niz in stran poišče izdelke, ki imajo v imenu izdelka vsebovan iskani niz.

# Brisanje

Na strani posameznega izdelka je gumb Odstrani izdelek, ki izbriše izdelek in nas preusmeri nazaj na seznam izdelkov.

# Kalkulator

## Kalkulator za maksimalen dnevni vnos kalorij

Na začetku strani kalkulator je ustvarjena forma, ki obiskovalcu izračuna maksimalen dnevni vnos kalorij. Obiskovalec vnese svojo starost, svoj spol, svojo telesno višino (v centimetrih) ter težo (v kilogramih). Ob kliku na gumb 'Izračunaj' se izpiše maksimalen dnevni vnos kalorij za uporabnika.

## API števec kalorij
Na spodnje delu strani *Kalkulator* se nahaja števec kalorij, kjer vpiše uporabnik ime hrane v angleščini in ob pristisku na gumb **Pridobi podatke** se mu pokaže tabela, kjer je zapisana hranilna vrednost te hrane. 

# Profil

Na strani *Profil* lahko uporabnik gleda in spreminja svoje podatke ali pa se odjavi s spletne strani. Stran ima 3 oddelke: 
> *Profil*, kjer lahko uporabnik gleda in spreminja Ime, Priimek, Uporabniško ime, e-naslov, datum rojstva, svoj stalni in poštni naslov,
> *Sprememba gesla*, kjer lahko uporabnik spreminja svoje geslo,
> *Zgodovina nakupov*, kjer lahko uporabnik gleda svoja pretekla naročila.

## API
Na strani *kalkulator* je uporabljen API za pridobivanje hranilne vrednosti vpisane hrane.
[https://api.edamam.com/api/food-database/v2/parser]
