/**
 * Funkcionalni testi
 */
(async function beljakovine() {
    // Knjižnice
    const { exec } = require("child_process");
    const { describe, it, after, before } = require("mocha");
    const { Builder, By, until } = require("selenium-webdriver");
    const chrome = require("selenium-webdriver/chrome");
    const expect = require("chai").expect;
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    
    // Parametri
    let aplikacijaUrl = "https://beljakovine.herokuapp.com/";
    let seleniumStreznikUrl = "http://localhost:4445/wd/hub";
    let brskalnik, jwtZeton;
  
    const axios = require('axios').create({
      baseURL: aplikacijaUrl + "api/",
      timeout: 5000
    });
    
    // Obvladovanje napak
    process.on("unhandledRejection", (napaka) => {
        console.log(napaka);
    });
  
    // Počakaj določeno število sekund na zahtevani element na strani
    let pocakajStranNalozena = async (brskalnik, casVS, xpath) => {
      await brskalnik.wait(() => {
          return brskalnik.findElements(By.xpath(xpath)).then(elementi => {
          return elementi[0];
        });
      }, casVS * 1000, `Stran se ni naložila v ${casVS} s.`);
    };
    // describe: 6
    // context: 5
    // it: 20
    try {
  
      before(() => {
        brskalnik = new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options()
          .addArguments("start-maximized")
          .addArguments("disable-infobars")
          .addArguments("allow-insecure-localhost")
          .addArguments("allow-running-insecure-content")
          )
          .usingServer(seleniumStreznikUrl)
          .build();
        });
        
        describe("Registracija novega uporabnika", function() {
          this.timeout(30 * 1000);
          before(async function() { await brskalnik.get(aplikacijaUrl); });
    
          it("prijava uporabnika", async function() {
            let povezava = await brskalnik.findElement(
              By.xpath("//a[contains(text(), 'Prijava')]"));
            expect(povezava).to.not.be.empty;
            await povezava.click();
          });
    
          it("izbira registracije", async function() {
            await pocakajStranNalozena(brskalnik, 10,
              "//button[contains(text(), 'Prijava')]");
            let povezava = await brskalnik.findElement(
              By.xpath("//a[contains(text(), 'registrirani')]"));
            expect(povezava).to.not.be.empty;
            await povezava.click();
          });
    
          it("vnos podatkov uporabnika", async function() {
            await pocakajStranNalozena(brskalnik, 10,
              "//button[contains(text(), 'Registracija')]");
            let ime = await brskalnik.findElement(By.id("fname"));
            expect(ime).to.not.be.empty;
            ime.sendKeys("Janez");
            let priimek = await brskalnik.findElement(By.id("lname"));
            expect(priimek).to.not.be.empty;
            priimek.sendKeys("Kranjski");
            let email = await brskalnik.findElement(
              By.id("email"));
            expect(email).to.not.be.empty;
            email.sendKeys("janez46@kranjski.net");
            let geslo = await brskalnik.findElement(By.id("psw"));
            expect(geslo).to.not.be.empty;
            geslo.sendKeys("Geslo123!");
            brskalnik.findElement(
              By.xpath("//button[contains(text(), 'Registracija')]")).click();
          });
    
          it("preveri ali je uporabnik prijavljen", async function() {
            await pocakajStranNalozena(brskalnik, 10, "//h1");
            let uporabnik = await brskalnik.findElement(
                By.xpath("//a[contains(text(), 'JANEZ')]"));
            expect(uporabnik).to.not.be.empty;
          });

          it("pridobi JWT žeton", async function() {
            await pocakajStranNalozena(brskalnik, 10, "//h1");
            const { localStorage, sessionStorage } = (new JSDOM(``, { url: "https://beljakovine.herokuapp.com" })).window;
            jwtZeton = await brskalnik.executeScript(function() {
              return localStorage.getItem('beljakovine-zeton');
            });
            expect(jwtZeton).to.not.be.empty;
          });
    
        });
  
      describe("Informacije o izdelku", function() {
        this.timeout(60 * 1000 + 1000);
        before(() => { brskalnik.get(aplikacijaUrl); });

        context("izberi informacije o izdelku", function() {

            it("izberi izdelke", async function() {
                await pocakajStranNalozena(brskalnik, 10, "//h1");
                let povezava = await brskalnik.findElement(
                    By.xpath("//a[contains(text(), 'Izdelki')]")
                );
                expect(povezava).to.not.be.empty;
                await povezava.click();
            });
            
            it("izberi informacije o izdelku", async function() {
              await pocakajStranNalozena(brskalnik, 10, "//h5");
              let povezava = await brskalnik.findElement(By.css(".slike-katalog"));
              expect(povezava).to.not.be.empty;
              await povezava.click();
            });
        });

  
        context("ustreznost podatkov na strani z informacijami", function() {
          it("naslov strani", async function() {
            await pocakajStranNalozena(brskalnik, 10, "//h1");
            let naslov = await brskalnik.findElement(By.css("h3"));
            expect(naslov).to.not.be.empty;
            await naslov.getText().then(function(vsebina) {
              expect(vsebina).to.be.equal("Opis:");
            });
          });
  
          it("besedilo za dodajanje v košarico", async function() {
            let besedilo = await brskalnik.findElement(
              By.xpath("//button[contains(text(), 'Dodaj')]")
            );
            expect(besedilo).to.not.be.empty;
            await besedilo.getText().then(function(vsebina) {
                expect(vsebina).to.be.equal("Dodaj v košarico");
            });
          });
  
        });
      });

      describe("Iskanje izdelkov", function() {
        this.timeout(30 * 1000);
        before(() => { brskalnik.get(aplikacijaUrl); });
        
        it("izberi izdelke", async function() {
            await pocakajStranNalozena(brskalnik, 10, "//h1");
            let povezava = await brskalnik.findElement(
                By.xpath("//a[contains(text(), 'Izdelki')]")
            );
            expect(povezava).to.not.be.empty;
            await povezava.click();
        });

        it("vpis iskalnega niza", async function() {
          await pocakajStranNalozena(brskalnik, 10, "//h5");
          let iskalnik = await brskalnik.findElement(By.css("#search_input"));
          expect(iskalnik).to.not.be.empty;
          iskalnik.sendKeys("light digest");
        });
  
        it("obstaja le en izdelek s tem imenom", async function() {
          //await pocakajStranNalozena(brskalnik, 10, "//div[@style='display: none']");
          setTimeout(async function(){
            let proteini = await brskalnik.findElements(By.css("div:not([style*='display:none;']) .card"));
            expect(proteini).to.be.an("array").to.have.length(1);
          }, 1000);
        });
        
      });
  
      describe("Podrobnosti izdelka", function() {
        this.timeout(30 * 1000);
        before(() => { brskalnik.get(aplikacijaUrl); });
        
        it("izberi izdelke", async function() {
            await pocakajStranNalozena(brskalnik, 10, "//h1");
            let povezava = await brskalnik.findElement(
                By.xpath("//a[contains(text(), 'Izdelki')]")
            );
            expect(povezava).to.not.be.empty;
            await povezava.click();
        });

        it("podrobnosti Vegan chocko proteinov", async function() {
          await pocakajStranNalozena(brskalnik, 10, "//h5");
          let povezava = await brskalnik.findElement(
            By.xpath("//a[contains(text(), 'Vegan chocko proteini')]"));
          expect(povezava).to.not.be.empty;
          await povezava.click();
        });
  
        it("naziv izdelka", async function() {
          await pocakajStranNalozena(brskalnik, 10, "//h1");
          let naslov = await brskalnik.findElement(By.css("h2"));
          expect(naslov).to.not.be.empty;
        });
        
        it("cana izdelka", async function() {
          let cena = await brskalnik.findElement(By.css("h1"));
          expect(cena).to.not.be.empty;
        });

        it("opis izdelka", async function() {
          let opis = await brskalnik.findElement(By.css("#opis"));
          expect(opis).to.not.be.empty;
        });
      });
  
  
      describe("Kalkulator", async function() {
          this.timeout(30 * 1000);
          before(async function() { await brskalnik.get(aplikacijaUrl); });
          
          it("izberi kalkulator", async function() {
            await pocakajStranNalozena(brskalnik, 10, "//h1");
            let povezava = await brskalnik.findElement(
                By.xpath("//a[contains(text(), 'Kalkulator')]")
            );
            expect(povezava).to.not.be.empty;
            await povezava.click();
          });

          context("ustreznost podatkov na kalkulatroju", function() {
              it("starost", async function() {
                await pocakajStranNalozena(brskalnik, 10, "//label");
                let starost = await brskalnik.findElement(
                  By.xpath("//label[contains(text(), 'Starost:')]"));
                expect(starost).to.not.be.empty;
              });
      
              it("višina", async function() {
                  await pocakajStranNalozena(brskalnik, 10, "//label");
                  let visina = await brskalnik.findElement(
                    By.xpath("//label[contains(text(), 'Višina:')]"));
                  expect(visina).to.not.be.empty;
              });
      
              it("teža", async function() {
                  await pocakajStranNalozena(brskalnik, 10, "//label");
                  let teza = await brskalnik.findElement(
                    By.xpath("//label[contains(text(), 'Teža:')]"));
                  expect(teza).to.not.be.empty;
              });
          });
          context("ustrezen izračun kalkulatorja", function() {
            it("vnos podatkov", async function() {
                let starost = await brskalnik.findElement(By.id("age"));
                expect(starost).to.not.be.empty;
                let visina = await brskalnik.findElement(By.id("height-cm"));
                expect(visina).to.not.be.empty;
                let teza = await brskalnik.findElement(By.id("weight"));
                expect(teza).to.not.be.empty;
                brskalnik.findElement(By.css("#calc")).click();
            });
    
            it("preverjanje izračuna", async function() {
                let rezultat = await brskalnik.findElement(By.css("#results"));
                expect(rezultat).to.not.be.empty;
                expect(await rezultat.getText()).to.be.equal("Vaš maksimalni dnevni vnos kalorij znaša: 1898.");
            });
          });
      });

      describe("Profil", async function() {
        this.timeout(30 * 1000);
        before(function() { brskalnik.get(aplikacijaUrl); });
        
        context("izberi profil", function() {
            it("izberi dropdown", async function() {
                await pocakajStranNalozena(brskalnik, 10, "//h1");
                let povezava = await brskalnik.findElement(By.css("#jePrijavljen"));
                expect(povezava).to.not.be.empty;
                await povezava.click();
            });
            it("izberi dropdown profil", async function() {
                let povezava = await brskalnik.findElement(
                    By.xpath("//a[contains(text(), 'Profil')]"));
                expect(povezava).to.not.be.empty;
                await povezava.click();
            });
        });

        context("spreminjanje podatkov na profilu", function() {
            it("profil", async function() {
              await pocakajStranNalozena(brskalnik, 10, "//h3");
              let profil = await brskalnik.findElement(By.css("h3"));
              expect(profil).to.not.be.empty;
              await profil.click();
            });

            it("uredi ime", async function() {
                let ime = await brskalnik.findElement(By.css("#ime"));
                expect(ime).to.not.be.empty;
                await ime.sendKeys("a")
            });

            it("potrdi urejanje", async function() {
                let btn = await brskalnik.findElement(By.css("#updateInfoButton"));
                expect(btn).to.not.be.empty;
                await btn.click();
            });

            it("preveri uspesnost", async function() {
                let uporabnik = await brskalnik.findElement(
                    By.xpath("//a[contains(text(), 'JANEZ')]"));
                expect(uporabnik).to.not.be.empty;
            });
        });
      });
  
      describe("Izbris uporabnika", async function() {
        this.timeout(30 * 1000);
        before(function() { brskalnik.get(aplikacijaUrl); });
  
        it("preveri ali je uporabnik prijavljen", async function() {
          await pocakajStranNalozena(brskalnik, 10, "//h1");
          jwtZeton = await brskalnik.executeScript(function() {
            return localStorage.getItem('beljakovine-zeton');
          });
          expect(jwtZeton).to.not.be.empty;
        });

        context("izberi profil", function() {
            it("izberi dropdown", async function() {
                await pocakajStranNalozena(brskalnik, 10, "//h1");
                let povezava = await brskalnik.findElement(By.css("#jePrijavljen"));
                expect(povezava).to.not.be.empty;
                await povezava.click();
            });
            it("izberi dropdown profil", async function() {
                let povezava = await brskalnik.findElement(
                    By.xpath("//a[contains(text(), 'Profil')]"));
                expect(povezava).to.not.be.empty;
                await povezava.click();
            });
        });

        context("izbrisi profil", function() {
            it("zahtevaj gumb za izbris", async function() {
              let odjava = await brskalnik.findElement(By.css("#izbris"));
              expect(odjava).to.not.be.empty;
              await odjava.click();
            });
      
            it("preveri ali je uporabnik izbrisan", async function() {
                await pocakajStranNalozena(brskalnik, 10, "//h2");
                jwtZeton = await brskalnik.executeScript(function() {
                  return localStorage.getItem('beljakovine-zeton');
                });
                expect(jwtZeton).to.be.null;
            });
            
        });
      });

      /* describe("Izbris uporabnika", async function() {
        it("izbriši uporabnika iz podatkovne baze", async function() {
            let dockerAtlasBrisiUporabnika = 
                "docker exec -i sp-beljakovine-mongodb bash -c " + "\"mongo " + 
                "\\\"mongodb+srv://beljakovine-qfwjv.mongodb.net/Beljakovine\\\" " + 
                "--username uporabnik --password Vf6SARJtwF359c1v --eval " + 
                "'db.Uporabniki.remove({email: \\\"janez24@kranjski.net\\\"})'" + "\"";
            exec(dockerAtlasBrisiUporabnika).on("close", (koda) => {
              expect(koda).to.be.equal(0);
            });
        });
      }); */
  
      after(async () => {
        brskalnik.quit();
      });
  
    } catch (napaka) {
      console.log("Med testom je prišlo do napake!");
    }
  })();