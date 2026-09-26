# Slice-Uraopas
Uraopas projekti Slicelle
Sivustolla voit valmistautua työnhakuun tehtäviä tekemällä

## Teknologiat

Projektissa käytetään:

- React
- TypeScript
- Vite
- Tailwind CSS
- Material UI (MUI)
- lucide-react
- TanStack React Query
- Node.js
- Express
- MongoDB
- Mongoose

## Projektin rakenne

```text
slice-uraopas/
├── frontend/
│   └── src/
│       ├── components/   # Uudelleenkäytettävät käyttöliittymäkomponentit
│       ├── data/         # Sovelluksen data ja tyyppimääritykset
│       └── pages/        # Sovelluksen eri näkymät
│
└── backend/
    ├── config/           # Tietokantayhteyden asetukset
    ├── models/           # MongoDB:n tietomallit
    ├── requests/         # REST-pyyntöjä testausta varten
    └── routes/           # Backendin API-reitit
```

## Frontend

Frontend on toteutettu Reactilla, TypeScriptillä, Vitellä ja Tailwind CSS:llä.

Frontendin pääosat sijaitsevat `frontend/src`-kansiossa:

- `components/` sisältää uudelleenkäytettäviä käyttöliittymäkomponentteja.
- `pages/` sisältää sovelluksen eri näkymät.
- `data/` sisältää sovelluksen tietoja ja TypeScript-tyyppimäärityksiä.

Sovelluksen näkymien hallinta on toteutettu `App.tsx`-tiedostossa. Käyttäjä voi siirtyä esimerkiksi etusivun, profiilin, kirjautumisen ja uraoppaan vaiheiden välillä.

## Backend

Backend on toteutettu Node.js:n ja Expressin avulla. Backend vastaa API-rajapinnoista, käyttäjätietojen käsittelystä ja yhteydestä MongoDB-tietokantaan.

Backendin pääosat sijaitsevat `backend`-kansiossa:

- `server.js` käynnistää Express-palvelimen ja määrittää API-reitit sekä frontendin tarjoamisen.
- `config/` sisältää tietokantayhteyden asetukset.
- `models/` sisältää MongoDB:n kanssa käytettävät Mongoose-tietomallit.
- `routes/` sisältää API-reitit käyttäjien ja kirjautumisen käsittelyyn.
- `requests/` sisältää REST-pyyntöjä API:n testaamista varten.

Backend käyttää MongoDB-tietokantaa, johon muodostetaan yhteys Mongoose-kirjaston avulla. Tietokannan yhteysosoite määritellään ympäristömuuttujalla `MONGODB_URI`.

## Käyttöliittymä ja komponenttikirjastot

Frontendin käyttöliittymän tyylittelyssä käytetään Tailwind CSS:ää. 

Projektissa käytetään myös Material UI (MUI) -komponenttikirjastoa. MUI-komponentteja käytetään esimerkiksi rekisteröitymisnäkymän salasanakentän ohjeessa sekä `StepTwoView`-näkymässä.

Projektissa käytetään lisäksi `lucide-react`-kirjastoa kuvakkeisiin.

## Käyttäjän rekisteröityminen ja kirjautuminen

Käyttäjä voi luoda uuden käyttäjätunnuksen rekisteröitymällä ja kirjautua sen jälkeen sovellukseen.

### Rekisteröityminen

Rekisteröitymisessä frontend lähettää käyttäjän tiedot backendille:

`POST /api/auth/register`

Backend tarkistaa, ettei käyttäjänimi ole jo käytössä, ja tallentaa uuden käyttäjän MongoDB-tietokantaan.

Salasana tallennetaan tietokantaan bcryptillä hajautettuna.

### Kirjautuminen

Kirjautumisessa frontend lähettää käyttäjänimen ja salasanan backendille:

`POST /api/auth/login`

Backend etsii käyttäjän käyttäjänimen perusteella ja tarkistaa salasanan bcryptillä. Onnistuneen kirjautumisen yhteydessä frontend saa käyttäjän ID:n ja käyttäjän etenemistiedot.

Frontend säilyttää kirjautuneen käyttäjän tiedot sovelluksen tilassa ja käyttää niitä esimerkiksi profiilin ja uraoppaan etenemisen näyttämiseen.

### Kirjautumisen rajoitukset

Projektissa ei tällä hetkellä käytetä token-pohjaista kirjautumista tai erillistä käyttäjän oikeuksien tarkistamista API-kutsuissa.

## Käyttäjätiedot ja etenemisen tallennus

Kirjautumisen yhteydessä frontend saa käyttäjän ID:n. Profiilinäkymä käyttää tätä ID:tä käyttäjän tietojen hakemiseen backendistä:

`GET /api/users/:id`

Backend hakee käyttäjän MongoDB-tietokannasta ID:n perusteella. Salasanaa ei palauteta käyttäjätietojen mukana.

Käyttäjän uraoppaan eteneminen tallennetaan käyttäjän `progress`-tietoihin. Etenemistä voidaan päivittää backendin kautta:

`PATCH /api/auth/progress/:step`

Pyynnössä välitetään käyttäjän käyttäjänimi sekä päivitettävän vaiheen tiedot. Backend päivittää kyseisen vaiheen tiedot MongoDB-tietokantaan.

Tällä hetkellä etenemistä seurataan vaiheiden `stepOne` ja `stepTwo` osalta. Etenemistietoihin tallennetaan vaiheiden ja niiden tehtävien suorittamisen tila sekä tehtäviin annetut vastaukset.

## Projektin avaus
- Kloonaa projekti komennolla: git clone "https://github.com/esedu-tivi/slice-uraopas.git"
- Navigoi projektin frontend ja backend kansioon (cd "kansio" siirtyy kansioon ja cd .. ulommas), joissa molemmissa asennetaan riippuvuudet komennolla: "npm install"
- Projektin kehityksen voit aloittaa komennoilla:
    Frontend: npm run dev
    Backend: npm start
    Nämä löytyvät myös package.json tiedostosta.
- Backend tarvitsee .env tiedoston, johon tarvitaan muuttuja muodossa "MONGODB_URI". Tällä otetaan yhteys tällä hetkellä henkilökohtaiseen MongonDB:een tietokantaan.
- Projektin pitäisi näin olla valmis kehitykseen paikallisesti.

## Projektin hostaus Renderissä
- Luo uusi "Web service".
- Lisää projektin linkki osioon "Public Git Repository".
- Valitse branch josta Render hakee tietonsa.
- "Build Command": npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend
- "Start Command": cd backend && npm start
- Lisää vielä "Environment Variables" osioon .env kansiosta muuttuja "MONGODB_URI".

## Projektin keskeneräisiä asioita ja kehitysideoita
- Sivu ei tällä hetkellä varmista oikeuksia eikä token pohjaista kirjautumista ole.
- Sivun materiaalit puutuu kohdasta kolme eteenpäin.
- Valmennus osio on tyhjä. Alunperin puhetta oli valmentavasta tekoälystä, mutta sinne voi keksiä jotain muuta tilalle.
- Materiaali sivut on kovakoodattu. Osioiden lisääntyessä kannattaa tehdä sivua dynaamisemmaksi.
- Lisää ominaisuuksia materiaaleihin, esimerkiksi pelejä?
- Sivun rekisteröitymisen voisi miettiä uudelleen. Ehkä opettaja voisi luoda oppilaille tunnukset?
