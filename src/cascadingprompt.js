

$j(document).ready(function () {
  var options = $j("select#PRMT_niv1 option");
  var options_alle = $j("select#PRMT_alle option");
  var options_niv2 = $j("select#PRMT_niv2 option");

  $j("input").on('keyup', function () {
    var input = $j.trim($j(this).val().toLowerCase()); // haalt spaties weg en zet alles naar kleine letters
    if (input.length === 0) { // als input leeg is dan zijn alle regels van niv1 zichtbaar
      options.show();
    } else {
      options.hide().filter(function () { // filter is een loop die alleen de waarden laat zien op basis van de gegeven criteria (de inwendige fuctie)
        return $j(this).text().toLowerCase().indexOf(input) > -1;
      }).show();
    }

    // map functie doet een loop over alle waarden die zichtbaar zijn en pakt de val op
    var x = options.map(function () {
      if ($j(this).css('display') !== 'none')
        return $j(this).val() //extract de "value" onderdeel
    }).get();

    var arr_x = []; // declaratie van een lege array
    arr_x.push(x) // toevoegen van de val waarden in de array
    //console.log(arr_x[0]); // test 

    // hier komt de filtering van Alle waarden => elke waarde in de array wordt gecheckt met de text uit options_alle 
    var z = options_alle.hide().filter(function () {
      if (arr_x[0].some(x => $j(this).text().indexOf(x) > -1)) { // some geeft een true of fals als er wordt voldaan aan de functie => pasop nieuwe syntax werkt niet in IE11 denk ik
        return $j(this).text();
      }
    }).show();
    //console.log(z); test

    // map functie doet een loop over alle waarden uit de PRMT_alle die zichtbaar zijn en pakt de text waarde op en geeft het door aan variable Y
    var y = options_alle.map(function () {
      if ($j(this).css('display') !== 'none')
        return $j(this).val()
    }).get();

    var arr_y = []; // declaratie van een lege array
    arr_y.push(y) // toevoegen van de val waarden in de array
    //console.log(arr_y[0]); // test

    //map functie loopt over arr_y en split de juiste waarde om deze later door te geven aan Niv2 
    var T = arr_y[0].map(function (val) { // val is de waarde van de option uit arr_y
      var split_Waarde = val.split('|');
      return split_Waarde[1]
    });

    var arr_A = [];
    arr_A.push(T);
    console.log(arr_A[0]);

    // hier komt de filtering van Niv2 waarden => elke waarde (x) in arr_A wordt gecheckt met de text uit Niv2 ( $(this).val() ) option waarde
    var z = options_niv2.hide().filter(function () {
      if (arr_A[0].some(x => $j(this).val().indexOf(x) > -1)) { // some geeft een true of fals als er wordt voldaan aan de functie => pasop nieuwe syntax werkt niet in IE11 denk ik
        return $j(this).text();
      }
    }).show();
    //console.log(z); test

  });

});
