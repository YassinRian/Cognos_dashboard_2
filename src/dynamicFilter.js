$j(document).ready(function () {

  // ******    variables  ******
  var selectieLijstKPL1 = $j(".prmt_kpl1").find('select option');
  var selectieLijstKPL2 = $j(".prmt_kpl2").find('select option');
  var selectieLijstKPL3 = $j(".prmt_kpl3").find('select option');

  var selectieLijstKDR1 = $j(".prmt_kdr1").find('select option');
  var selectieLijstKDR2 = $j(".prmt_kdr2").find('select option');
  var selectieLijstKDR3 = $j(".prmt_kdr3").find('select option');
  var selectie_Allewaarden = $j(".allewaarden").find('select option');

//              **** INIT ****
$j('#input_kpl2').bind('change keyup', function () {

    delay(function () {
      FilterSelectList('input_kpl2', selectieLijstKPL2)
    }, 500);
    cascadingLogic(selectieLijstKPL2, selectieLijstKPL3, 'selectie');

  });


//             *****  functies  ******
  var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();


  function FilterSelectList(v_input, v_selectielist) {

    var var_input = $j.trim($j("#" + v_input).val().toLowerCase()); // input wordt ingelezen, spaties worden weggehaald en alles wordt naar kleine letters gezet.
    var var_selectieList = v_selectielist;

    if (var_input.length === 0) { // als input leeg is dan zijn alle regels van niv1 zichtbaar
      var_selectieList.show();
    } else {
      var_selectieList.hide().filter(function () { // filter is een loop die alleen de waarden laat zien op basis van de gegeven criteria (de inwendige fuctie)
        return $j(this).text().toLowerCase().indexOf(var_input) > -1;
      }).show();

    }

  } // function closure


function cascadingLogic (v_niv_alle, v_niv1, v_niv2, v_niv3) {

var niv1 = v_niv1;
var niv2 = v_niv2;
var niv3 = v_niv3;
var niv_alle = v_niv_alle;

var arr_x = [];
var arr_y = [];
var 
  // map functie doet een loop over alle waarden die zichtbaar zijn en pakt de val op
  var x = niv1.map(function () {
    if ($j(this).css('display') !== 'none')
      return $j(this).val() //extract de "value" onderdeel
  }).get();

  var arr_x = []; // declaratie van een lege array
  arr_x.push(x) // toevoegen van de val waarden in de array
  //console.log(arr_x[0]); // test 

  // hier komt de filtering van Alle waarden => elke waarde in de array wordt gecheckt met de text uit options_alle 
  var z = niv_alle.hide().filter(function () {
    if (arr_x[0].some(x => $j(this).text().indexOf(x) > -1)) { // some geeft een true of fals als er wordt voldaan aan de functie => pasop nieuwe syntax werkt niet in IE11 denk ik
      return $j(this).text();
    }
  }).show();
  //console.log(z); test

  // map functie doet een loop over alle waarden uit de PRMT_alle die zichtbaar zijn en pakt de text waarde op en geeft het door aan variable Y
  var y = niv_alle.map(function () {
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

  // hier komt de filtering van Niv2 waarden => elke waarde (x) in arr_A wordt gecheckt met de text uit Niv2 ( $(this).val() ) option waarde
  var z = niv2.hide().filter(function () {
    if (arr_A[0].some(x => $j(this).val().indexOf(x) > -1)) { // some geeft een true of fals als er wordt voldaan aan de functie => pasop nieuwe syntax werkt niet in IE11 denk ik
      return $j(this).text();
    }
  }).show();



  
}

});

