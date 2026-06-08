# Wayfinding App – Jaman

Dit project is een interactieve wayfinding-applicatie waarmee gebruikers eenvoudig hun weg kunnen vinden binnen een gebouw. De applicatie toont een kaart met locaties en berekent routes tussen verschillende punten zoals lokalen, ingangen en andere belangrijke plekken.

De applicatie is ontwikkeld als prototype binnen CMGT met als doel het verbeteren van navigatie binnen een gebouw.

---

## Functionaliteiten

- Zoeken van lokalen en locaties binnen het gebouw
- Tonen van locaties op een interactieve kaart
- Berekenen van routes tussen een start- en eindpunt
- Weergeven van de huidige GPS-locatie van de gebruiker
- Ondersteuning voor startlocaties via QR-codes
- Dynamische route-updates zonder herladen van de pagina
- Heatmap / druktevisualisatie (indien beschikbaar in prototype)

---

## Technische stack

- Frontend: React
- Backend: Node.js / API service
- Kaartfunctionaliteit: Leaflet / Mapbox (afhankelijk van implementatie)
- Communicatie: REST API
- Containerisatie: Docker

---

## Projectstructuur

- /frontend → React applicatie (UI, components)
- /backend → API (routes, data, logic)
- /assets → afbeeldingen en iconen
- /services → API calls

---

## Installatie zonder Docker

### 1. Repository clonen
git clone https://github.com/Stef-Buurman/Ja-Man-Sem-6.git
cd Ja-Man-Sem-6

### 2. Frontend starten
cd frontend
npm install
npm run dev

### 3. Backend starten (nieuwe terminal)
cd backend
npm install
npm run dev

⚠️ Let op:
- Beide servers moeten tegelijk draaien
- Backend moet gestart zijn voordat alle functies werken

---

## Installatie met Docker (aanbevolen)

### Vereisten
- Installeer Docker Desktop: https://www.docker.com/products/docker-desktop/
- Controleer installatie:
  docker -v

---

### Start project met Docker

Ga naar de root van het project en voer uit:

docker compose up --build

Dit doet automatisch:
- Frontend builden en starten
- Backend builden en starten
- Communicatie tussen frontend en backend instellen

---

### Stoppen van Docker
docker compose down

---

## Belangrijk

- Frontend is afhankelijk van backend
- API URL moet correct ingesteld zijn
- GPS en oriëntatie kunnen per device verschillen
- Docker maakt installatie eenvoudiger maar vereist correcte setup

---

## Toekomstige verbeteringen

- Frontend en backend scheiden in aparte repositories
- Docker verder documenteren en optimaliseren
- Eén startcommando zonder handmatige stappen
- Betere foutafhandeling en logging


# Ja-Man-Sem-6 – Definition of Done

# Definition of Done (DoD)

Het project is klaar wanneer aan de volgende punten is voldaan:

## Functionaliteit
- Alle afgesproken functionaliteiten werken correct.
- De applicatie werkt op desktop en mobiel.
- Navigatie, knoppen en formulieren werken zonder problemen.
- API- en databaseverbindingen functioneren goed.
- Belangrijke foutmeldingen worden correct afgehandeld.

## Codekwaliteit
- De code en documentatie zijn geschreven in het Engels.
- De afgesproken style guide is gevolgd.
- De code is overzichtelijk en onderhoudbaar.
- Ongebruikte code en imports zijn verwijderd.

## Testen
- Er zijn geen bekende kritieke bugs aanwezig.
- Functionaliteiten zijn getest vóór oplevering.
- De applicatie is getest in:
  - Google Chrome
  - Mozilla Firefox
  - Safari
- Responsive gedrag werkt op verschillende schermformaten.

## Beveiliging
- Invoer wordt gevalideerd op frontend en backend.
- Gevoelige gegevens worden veilig opgeslagen.
- Basisbeveiliging tegen veelvoorkomende kwetsbaarheden is toegepast, zoals:
  - SQL Injection

## Oplevering & Documentatie
- De productieversie draait zonder console errors.
- Een duidelijke README met installatie-instructies is aanwezig.
- Belangrijke keuzes en API’s zijn waar nodig gedocumenteerd.

## Acceptatie
Het project is afgerond wanneer:
- Aan alle bovenstaande punten is voldaan.
- De eindversie is goedgekeurd.
- Er geen kritieke problemen meer openstaan.
