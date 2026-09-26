# Slice-Uraopas
Uraopas projekti Slicelle
Sivustolla voit valmistautua työnhakuun tehtäviä tekemällä

Projektin avaus:
  Kloonaa projekti komennolla: git clone "https://github.com/esedu-tivi/slice-uraopas.git"
  Navigoi projektin frontend ja backend kansioon (cd "kansio" siirtyy kansioon ja cd .. ulommas), joissa molemmissa asennetaan riippuvuudet komennolla: "npm install"
  Projektin kehityksen voit aloittaa komennoilla:
    Frontend: npm run dev
    Backend: npm start
    Nämä löytyvät myös package.json tiedostosta.
  Backend tarvitsee .env tiedoston, johon tarvitaan muuttuja muodossa "MONGODB_URI". Tällä otetaan yhteys tällä hetkellä henkilökohtaiseen MongonDB:een tietokantaan.
  Projektin pitäisi näin olla valmis kehitykseen paikallisesti.

Projektin hostaus Renderissä.
  Luo uusi "Web service".
  Lisää projektin linkki osioon "Public Git Repository".
  Valitse branch josta Render hakee tietonsa.
  "Build Command": npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend
  "Start Command": cd backend && npm start
  Lisää vielä "Environment Variables" osioon .env kansiosta muuttuja "MONGODB_URI".
  Projektin pitäisi toimia suoraan näillä ohjeilla.


Projektin keskeneräisiä hommia.
  Sivu ei tällä hetkellä varmista oikeuksia eikä token pohjaista kirjautumista ole.
  Sivun materiaalit puutuu kohdasta kolme eteenpäin.
  Valmennus osio on tyhjä. Alunperin puhetta oli valmentavasta tekoälystä, mutta sinne voi keksiä jotain muuta tilalle.
  Materiaali sivut on kovakoodattu. Osioiden lisääntyessä kannattaa tehdä sivua dynaamisemmaksi.
  Lisää ominaisuuksia materiaaleihin, esimerkiksi pelejä?
  Sivun rekisteröitymisen voisi miettiä uudelleen. Ehkä opettaja voisi luoda oppilaille tunnukset?
