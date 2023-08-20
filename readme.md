# Automatisierter PDF-Download von Webseiten

Dieses Skript wurde entwickelt, um PDF-Dateien von einer Webseite automatisiert herunterzuladen. Es verwendet Node.js und die Bibliotheken Axios und jsdom, um HTTP-Anfragen durchzuführen und mit dem DOM der Webseite zu interagieren.

## Funktionsweise

Das Skript lädt die Webseite von "<https://www.sva.de/de/unsere-standorte>" herunter und analysiert sie mithilfe des JSDOM-Objekts, um Links zu PDF-Dateien zu finden. Die PDF-Links werden anhand der Klasse "fal fa-file-pdf" gesucht, die auf Font Awesome-Icons für PDF-Dateien hinweist. Für jeden gefundenen Link wird überprüft, ob es sich um einen Anker-Link (A-Tag) handelt und ob der Link auf eine PDF-Datei verweist. Wenn diese Bedingungen erfüllt sind, wird die PDF-Datei als Arraybuffer heruntergeladen und die URL sowie der Pfad zur PDF-Datei werden in der Konsole ausgegeben und local gespeicher.

## Verwendung

1. Stelle sicher, dass du Node.js auf deinem System installiert hast.
2. Installiere die Abhängigkeiten, indem du im Terminal deines Projekts den Befehl `npm install` ausführst.
3. Füge den obenstehenden Code in eine JavaScript-Datei, z. B. "script.js".
4. Führe das Skript aus, indem du im Terminal den Befehl `node script.js` eingibst.
