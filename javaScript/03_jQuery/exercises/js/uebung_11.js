//////////////////////////////////////////////
// Funktionen
//////////////////////////////////////////////



//////////////////////////////////////////////
// Window-Objekt
//////////////////////////////////////////////


(function (window, document, $) {
    "use strict";
    $(function () {

        function zufall(max) {
            return Math.floor(Math.random() * max);
        }

        var $uebersicht = $("#uebersicht");
        function uebersicht (daten) {
            var html2 = "";
            for(var key in daten) {
                html2 += "<ul>";
                html2 += "<li>" + key + " <a href='#'>mehr lesen</a></li>";
                html2 += "</ul>";
            }
            return html2;
        }


        /* 
            2. Erzeugen Sie eine HTML-Datei uebung_11.html. Legen Sie in 
            der HTML-Datei einen container div#zitat an. Wenn die Seite im Browser geladen wird fordern Sie die in Aufgabe 1 erzeugte Datei über einen Ajax-Request an und geben ein zufälliges Zitate mit Author und allen zugehörigen Daten im div#zitat aus:
        
            <h2>Versuchungen sollte man nachgeben. Wer weiß, ob sie wiederkommen!</h2>
            <p><strong>Oscar Wilde</strong>Oscar Fingal O’Flahertie Wills Wilde war ein irischer Schriftsteller, der sich nach Schulzeit und Studium in Dublin und Oxford in London niederließ</p>
            <ul>
            <li>Geboren: 16. Oktober 1854, Westland Row, Dublin, Irland</li>
            <li>Gestorben: 30. November 1900, Dritte Französische Republik</li>
            </ul> 
        */
        var $zitat = $("#zitat");
        $.ajax({
            url: "data/uebung_11.json",
            dataType: "json",
            success: function (data) {
                var html = "";
                var daten = data;
                var personen = Object.keys(daten);
                var person = personen[zufall(personen.length)];
                var zitate = daten[person].Zitate;

                html += "<h2>" + zitate[zufall(zitate.length)] + "</h2>";
                html += "<p><strong>" + person + " </strong>" + daten[person].Vita + "</p>";
                html += "<ul>";
                html += "<li>Geboren: " + daten[person].Geboren + "</li>";
                html += "<li>Gestorben: " + daten[person].Gestorben + "</li>";

                html += "</ul>";
                $zitat.append(html);
                $uebersicht
                .empty()
                .append(uebersicht(daten))
                .find("a")
                .on("click", function(e) {
                    e.preventDefault();
                    var html3 = "";
                    var autor = $(e.target).parent().contents().first().text().trim();
                    var $info = $("#info");
                    var zitate = daten[autor].Zitate;

                    html3 += "<ul>";
                    html3 += "<h2>" + zitate[zufall(zitate.length)] + "</h2>";
                    html3 += "<p><strong>" + autor + " </strong>" + daten[autor].Vita + "</p>";
                    html3 += "<li>Geboren: " + daten[autor].Geboren + "</li>";
                    html3 += "<li>Gestorben: " + daten[autor].Gestorben + "</li>";
                    html3 += "</ul>";

                    $info.append(html3);

                })
                ;


                //////////////////////////////
                // Aufgabe 3
                //////////////////////////////
                /*
                3. Erweitern Sie die Datei uebung_11.html dahingehend das Sie zusätzlich zur zufälligen Ausgabe aus Aufgabe 2 eine ul#authoren in einem div#uebersicht erzeugen. Beim laden der Seite wird zu der bereits zufällig erzeugen Zitat eine Liste aller Authoren erzeugt:
                <ul>
                <li>Oscar Wilde<a href="#">mehr lesen</a></li>
                <li>Albert Einstein<a href="#">mehr lesen</a></li>
                <li>Goethe<a href="#">mehr lesen</a></li>
                <li>René Descartes<a href="#">mehr lesen</a></li>
                </ul> 
                */
                uebersicht(daten);
            } // ende success 
        }) // Ende $.ajax
    });
}(window, document, jQuery));






//////////////////////////////
// Aufgabe 3
//////////////////////////////
/* 
4. Binden Sie an die Hyperlinks in der in Aufgabe 3 erzeugten Liste einen Klick-Eventhandler. Wird der Link mehr lesen gedrückt geben Sie alle Informationen zum Author und alle Zitate in einem neu erzeugten div#info aus.
*/



/* 

1. Erzeugen Sie aus den Rohdaten, siehe unten, eine JSON-Datei <ubeung_11.json>.
Die Namen der Authoren sind Eigenschaften im Objekt die ein weiteres Objekt enthalten. 
Die Zitate nach den Daten liegen in jedem Author-Objekt als Array.
https://jsonlint.com/




4. Binden Sie an die Hyperlinks in der in Aufgabe 3 erzeugten Liste einen Klick-Eventhandler. Wird der Link mehr lesen gedrückt geben Sie alle Informationen zum Author und alle Zitate in einem neu erzeugten div#info aus.

//------------------------------------------------------------------------------
//Rohdaten:
//------------------------------------------------------------------------------

--- Oscar Wilde
Geboren: 16. Oktober 1854, Westland Row, Dublin, Irland
Gestorben: 30. November 1900, Dritte Französische Republik
Oscar Fingal O’Flahertie Wills Wilde war ein irischer Schriftsteller, der sich nach Schulzeit und Studium in Dublin und Oxford in London niederließ


Die Anzahl unserer Neider bestätigt unsere Fähigkeiten.

Versuchungen sollte man nachgeben. Wer weiß, ob sie wiederkommen!

Auf seine eigene Art zu denken ist nicht selbstsüchtig. Wer nicht auf seine eigene Art denkt, denkt überhaupt nicht.

Jeder von uns ist sein eigener Teufel, und wir machen uns diese Welt zur Hölle.


--- Albert Einstein
Geboren:  14. März 1879 in Ulm, Württemberg, Deutsches Reich
Gestorben: 18. April 1955 in Princeton, New Jersey, Vereinigte Staaten
Seine Forschungen zur Struktur von Materie, Raum und Zeit sowie dem Wesen der Gravitation veränderten maßgeblich das physikalische Weltbild. Er gilt daher als einer der bedeutendsten Physiker der Menschheit.


Zwei Dinge sind unendlich, das Universum und die menschliche Dummheit, aber bei dem Universum bin ich mir noch nicht ganz sicher.

Wenn ein unordentlicher Schreibtisch einen unordentlichen Geist repräsentiert, was sagt dann ein leerer Schreibtisch über den Menschen, der ihn benutzt aus?

Ich bin nicht sicher, mit welchen Waffen der dritte Weltkrieg ausgetragen wird,aber im vierten Weltkrieg werden sie mit Stöcken und Steinen kämpfen.

Phantasie ist wichtiger als Wissen, denn Wissen ist begrenzt.


--- Johann Wolfgang von Goethe
Geboren: 28. August 1749, Goethe-Haus, Frankfurt am Main
Gestorben: 22. März 1832, Weimar
Johann Wolfgang von Goethe, 1782 geadelt, war ein deutscher Dichter und Naturforscher. Er gilt als einer der bedeutendsten Schöpfer deutschsprachiger Dichtung


Wer sich den Gesetzen nicht fügen will, muss die Gegend verlassen, wo sie gelten.

Es hört doch jeder nur, was er versteht.

Es ist nicht genug zu wissen - man muss auch anwenden. Es ist nicht genug zu wollen - man muss auch tun.

    
Nichts ist schrecklicher als ein Lehrer, der nicht mehr weiß als das, was die Schüler wissen sollen.


--- René Descartes
Geboren: 31. März 1596, Descartes, Frankreich
Gestorben: 11. Februar 1650, Stockholm, Schweden
René Descartes war ein französischer Philosoph, Mathematiker und Naturwissenschaftler


Dubium sapientiae initium. 
Zweifel ist der Weisheit Anfang.

Ich könnte nicht an Projekten arbeiten, die nur deshalb für einige nützlich sind, weil sie anderen schaden.

Die nur ganz langsam gehen, aber immer den rechten Weg verfolgen, können viel weiter kommen als die, welche laufen und auf Abwege geraten.

Der Zweifel ist der Weisheit Anfang. */