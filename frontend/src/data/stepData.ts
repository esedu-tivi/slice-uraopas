// Käyttäjän tietotyyppi
export interface UserData {
  name: string;
  title: string;
  initials: string;
  graduation: string;
  completedSteps: number; // Kuinka monta vaihetta suoritettu
  totalSteps: number;     // Vaiheita yhteensä
}
// Yksittäisen kurssivaiheen tietotyyppi
export interface CourseStep {
  id: number;
  title: string;
  completed: boolean; // Onko vaihe suoritettu
  locked: boolean;    // Onko vaihe lukittu
  active?: boolean;   // Onko vaihe seuraavana vuorossa
}
// Materiaalin tietotyyppi (profiilisivu)
export interface Material {
  id: string;
  name: string;
  status: "valmis" | "kesken";
}
// Kirjautuneen käyttäjän tiedot
export const currentUser: UserData = {
  name: "Matti Meikäläinen",
  title: "Lähihoitaja",
  initials: "M",
  graduation: "Toukokuu 2026",
  completedSteps: 1, // 1/10 valmis
  totalSteps: 10,
};
// Kaikki 10 kurssivaihetta järjestyksessä
export const courseSteps: CourseStep[] = [
  { id: 1,  title: "VAHVUUDET JA VERKOSTO", completed: true,  locked: false },
  { id: 2,  title: "OMAT TAIDOT",       completed: false, locked: false, active: true },
  { id: 3,  title: "CV",                completed: false, locked: true  },
  { id: 4,  title: "TYÖHAKEMUS",        completed: false, locked: true  },
  { id: 5,  title: "HISSIPUHE",         completed: false, locked: true  },
  { id: 6,  title: "ITSEVARMUUS",       completed: false, locked: true  },
  { id: 7,  title: "HAASTATTELU",       completed: false, locked: true  },
  { id: 8,  title: "TYÖELÄMÄTAIDOT",    completed: false, locked: true  },
  { id: 9,  title: "URASUUNNITELMA",    completed: false, locked: true  },
  { id: 10, title: "VALMIS TYÖNHAKUUN", completed: false, locked: true  },
];
// Käyttäjän materiaalit — näkyy profiilisivulla
export const materials: Material[] = [
  { id: "cv",       name: "CV",               status: "kesken" },
  { id: "hakemus",  name: "Työhakemus",        status: "kesken" },
  { id: "hissi",    name: "Hissipuhe",         status: "kesken" },
  { id: "linkedin", name: "LinkedIn-profiili", status: "kesken" },
];
// Vaiheen 1 sisältö — teksti ja tehtävänanto
export const stepOneContent = {
  stepNumber: 1,
  title: "Vahvuudet ja verkosto",
  subtitle: "Tunnista omat vahvuutesi",
  description:
    `Tässä osiossa opit käydään läpi vahvuuksia ja niiden tunnistamista, sekä omaa verkostoasi.`,
  task1: {
    taskTitle: "Vahvuudet ja mahdollisuudet kehittyä",
    taskMaterial:
      `Mietitään ensimmäisenä omia ominaisuuksia. Millainen olet, millainen et ole ja miten voisit kehittää itseäsi.
    On hyvä olla tietoinen omista vahvuuksistaan, sekä mahdollisuuksista kehittyä. Vahvuudet tuovat voimaa ja itseluottamusta, mutta myös heikkouksien tunnistamisella on isoja hyötyjä. Kun tunnistat nämä, voit hyödyntää hyviä puoliasi ja kehittää itseäsi.
    Vahvuudet. Mieti hetki, mitä vahvuuksia sinulla on ja miten sinua on positiivisesti kuvailtu? Oletko hyvä ihmisten kanssa? Onko tarkka työ ja laatu sinulle erityisen tärkeää? Missä asioissa onnistuessasi sinulle tulee erityisen hyvä mieli? Otetaan esimerkkinä aurinkoinen persoona. Asiakaspalvelutyössä tällainen aito positiivisuus on rikkaus, jota on hankala pakottaa ja asiakkaiden kokemus on paljon siitä kiinni. Hyvä kokemus voi tehdä jopa reklamaation tehneestä tulevan kanta-asiakkaan.
    Heikkoudet. Missä et koe olevasi hyvä? Mitkä tilanteet aiheuttavat sinulle negatiivisia tunteita? Onko se asia johon voisit vaikuttaa? Oman osaamisen kasvattaminen voi jo kallistaa heikkoutta vahvuudeksi. Joskus se voi olla jokin konkreettinen asia, kuten kielitaito ja toisinaan monimutkaisempi ominaisuus kuten sosiaalinen kanssakäyminen.
    Itsensä kehitys. Kun tunnistat heikkoudet, voit myös löytää ratkaisuja. Voit pohtia itse, voisitko nujertaa itse heikkouden opettelemalla uusia taitoja tai haastamalla itseäsi. Voit myös pyytää apua. Onko jollain toisella ominaisuus jonka haluaisit oppia? Hän varmasti kertoo mielellään neuvoja, jos vain kysyt. Mikä olisikaan hienompaa, kuin tulla huomatuksi osaamisellaan, niin imartelevasti, että pyydetään kertomaan siitä lisää? Myös vahvuuksia voi kehittää. “Hei, tässä minä olen hyvä! Miten voisin hyödyntää tätä paremmin?”.
    Otetaan vielä tilanne, jossa huono käännetään hyväksi. Kiinnität paljon huomiota ympäristöösi ja olet ratkaisukeskeinen. Huomaat työpaikalla epäkohtia. Voit joko olla puuttumatta mihinkään ja nämä asiat jäävät vaivaamaan mieltäsi tai voit ottaa asiat puheeksi. Ehkä löydät ratkaisun ongelmaan joka hyödyttää itseäsi ja muita ympärilläsi.`,
    taskQuestion:`Tehtävät
    1. Kirjoita 5 itseäsi kuvaavaa vahvuutta. Nämä voivat olla omia havaintoja tai miten muut ovat sinua joskus kuvanneet.
    2. Kirjoita 2 kehityskohdetta.,
    3. Kirjoita kehitysidea tai suunnitelma yhteen vahvuuteen tai kehityskohteeseen.`,
    placeholder:
      "Kirjoita vastaus tähän.",
  },
  task2: {
    taskTitle: "Verkosto",
    taskMaterial: `Verkostoosi kuuluu perheenjäsenet ja sukulaiset, opettajat, aikaisemmat työpaikat, kaverit, harrastukset ja muut tutut kenen kanssa olet tai olet ollut tekemisissä.
    Se millaisen vaikutuksen olet antanut itsestäsi vaikuttaa todella paljon ja hyvä sana sinusta voi kantaa todella pitkälle. Jopa yli puolet työpaikoista löytyy tuttavan kautta. Pienikin vihje verkoston kautta on arvokas.
    Käy rohkeasti keskusteluja ympärillä oleviesi ihmisten kanssa. Saatat saada hyvää tietoa alallasi vallitsevasta työllistymistilanteesta. Vaikka tuntemasi ihmiset eivät olisi samalla alalla, voivat he tuntea jonkun joka on tai antaa yleisesti hyödyllisiä neuvoja työnhakuun. Muista kuitenkin, että ajat vaihtuvat ja työpaikkojen vaatimukset muuttuvat. Se mikä toimi joskus, ei välttämättä onnistuisi tänään.`,
    taskQuestion: `Tehtävät
    1. Pohdi hetki rauhassa omaa verkostoasi ja miten pitkälle se yltää. Miten yllättävistä paikoista saattaisit saada pienenkin hyödyn?
    2. Ota työnhaku puheeksi jonkun kanssa, josta koet voivasi saada apua. Voit myös kokeilla sellaista henkilöä josta et ole varma, saatat yllättyä. Voit esimerkiksi kertoa työnhaku tilanteestasi ja kysyä toisen kokemuksia tai vinkkejä.
    Tästä tehtävästä saat varmasti enemmän irti kun teet sen sinulle sopivana aikana, joten voit merkata sen jo valmiiksi.`
  }
};