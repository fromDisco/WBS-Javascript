(function (window, document, $) {
    "use strict";
    $(function () {

        var $auswurf = $("#dictionary");
        $auswurf.empty("");

        $("#letter-a").on("click", output);
        $("#letter-b").on("click", output);
        $("#letter-c").on("click", output);
        $("#letter-e").on("click", output);

        $("#letter-f")
        .find("form")
        .on("submit", function (e) {
            e.preventDefault();
            $.get("f.php", $(this).serialize(), function(res){
                $auswurf.empty().append(res);
            });
        });

    });

    function output(el) {
        el.preventDefault();

        var $auswurf = $("#dictionary");
        $auswurf.empty("");
        var $target = $(el.target);

        // letter-a
        if ($target.parents("div").attr("id") === "letter-a") {
            $auswurf.load("a.html");
        }

        // letter-b
        if ($target.parents("div").attr("id") === "letter-b") {
            $.getJSON("b.json", function (data) {
                var daten = data;

                // Objekte durchlaufen /////////////////////////
                for (var key in daten) {
                    var neuerInhalt = [];
                    neuerInhalt.push("<div class='entry'>");

                    // Elemente durchlaufen  //////////////////
                    for (var terms in daten[key]) {

                        if (terms !== "term") {
                            // Array für quote erstellen //////////////
                            if (Array.isArray(daten[key][terms])/*  === true */) {
                                // zwischenspeicher für array
                                var arrayQuote = [];
                                // Array quote pushen
                                arrayQuote.push("<div class='quote'>");
                                for (var i = 0; i < daten[key][terms].length; i++) {
                                    arrayQuote.push("<div class='quote-line'>");
                                    arrayQuote.push(daten[key][terms][i]);
                                    arrayQuote.push("</div>"); // quote-line schließen
                                } // ende for-schleife
                                arrayQuote.push("</div>"); // class="quote" schließen
                            } // (Array.isArray(daten[key][terms]))
                            else {
                                neuerInhalt.push("<div class='" + terms + "'>" + daten[key][terms] + "</div>");
                            }
                        } // ende (if (terms !== "term")
                        else if (terms === "term") {
                            neuerInhalt.push("<h3 class='" + terms + "'>" + daten[key][terms] + "</h3>");
                        }
                    } // ende (var terms in daten[key])
                    neuerInhalt.push("</div>"); // "entry" schließen
                    //////////////////////////
                    var einfug = neuerInhalt.join("");
                    $auswurf.append(einfug);
                    if (arrayQuote.length > 0) {
                        var $definition = $(".entry").find($(".definition"));
                        $definition.append(arrayQuote.join(""));
                        arrayQuote.length = 0;
                        // $(".entry").last().class("definition").insert(arrayQuote.join(""));
                    }
                } // ende (var key in daten)
            }); // ende .getJSON
        } // ende letter-b


        // letter-c
        if ($target.parents("div").attr("id") === "letter-c") {
            $.getScript("c.js");
        }

        // letter-e
        // if ($target.parents("div").attr("id") === "letter-e") {

        //     var $targetText = $(el.target).text();
        //     $target.text()

        //     $.post("e.php", { term: $targetText }, function (res) {
        //         el.preventDefault();
        //         $auswurf.append(res);
        //     }, "html");
        // }

        // alternative die kürzer ist. Im href steht der komplette link inkl. des Query-Texts 
        $("#letter-e")
            .find("a")
            .on("click", function (e) {
                e.preventDefault();
                $.get(this.href, function (res) {
                    $out.empty().append(res);
                });
            });




        // letter-f
        // if ($target.parents("div").attr("id") === "letter-f") {

        //     var $inputText = $("#term").val();


        //     $.post("e.php", { term: $inputText }, function (res) {
        //         el.preventDefault();
        //         $auswurf.append(res);
        //     }, "html");
        // }




    } // ende output


}(window, document, jQuery));
/* 
<h3>E</h3>
<ul>
<li><a href="e.php?term=Eavesdrop">Eavesdrop</a></li>
<li><a href="e.php?term=Edible">Edible</a></li> */