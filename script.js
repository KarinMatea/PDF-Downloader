// Wir importieren die notwendigen Module.
const axios = require('axios');
const { JSDOM } = require('jsdom');
const fs = require('fs');   
const path = require('path');    

async function downloadPDFs() {
  try {
    // Ein HTTP GET-Request um deren Inhalte abzurufen
    const response = await axios.get('https://www.sva.de/de/unsere-standorte');
    
    // JSDOM-Objekt wird erstellt, um den heruntergeladenen HTML-Inhalt zu verarbeiten und zu analysieren
    const dom = new JSDOM(response.data);
    
    // Hier suchen wir nach allen HTML-Elementen
    const iconElements = dom.window.document.querySelectorAll('.fal.fa-file-pdf');

    for (const iconElement of iconElements) {
      // Das parentElemet des PDF-Icons wird abgerufen
      const parentElement = iconElement.parentElement;

      // Überprüfen, ob das parentElement ein A-Tag (Hyperlink) ist
      if (parentElement && parentElement.tagName === 'A') {

        const href = parentElement.getAttribute('href');

        // Sicherstellen, dass der Link auf eine PDF-Datei zeigt
        if (href && href.endsWith('.pdf')) {
          // Vollständige URL zur PDF-Datei
          const pdfURL = new URL(href, 'https://www.sva.de/de/unsere-standorte');
          
          // Wir laden die PDF-Datei mit axios herunter und speichern die Daten als Arraybuffer
          const pdfResponse = await axios.get(pdfURL.toString(), { responseType: 'arraybuffer' });

          // Den Dateinamen aus der URL extrahieren.
          const filename = path.basename(pdfURL.pathname);

          // PDF-Datei wird mit 'fs' modul lokal gespeichert
          fs.writeFileSync(filename, pdfResponse.data);
          
          // Rückmeldung geben, dass die PDF-Datei erfolgreich heruntergeladen und gespeichert wurde.
          console.log(`Heruntergeladet und gespeichert: ${pdfURL} as ${filename}`);
        }
      }
    }
  } catch (error) {
    // Wenn während des Prozesses ein Fehler auftritt, wird eine Fehlermeldung ausgegeben
    console.error('Ups, da ist was schiefgelaufen:', error.message);
  }
}

// Funktion, um die PDFs herunterzuladen und zu speichern
downloadPDFs();
