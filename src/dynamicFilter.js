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

$j(".prmt_kpl2").children('select').change(function () {
  $j('#input_kpl1').val(null);
  selectieLijstKPL1.prop("selected", false);
  selectieLijstKPL1.show();
});


  $j('#input_kpl1').bind('change keyup', function () {
    var index = 0;
    delay(function () {
      FilterSelectList('input_kpl1', selectieLijstKPL1);
      CascadingPrompt(selectieLijstKPL1, selectieLijstKPL2, selectie_Allewaarden, index);
    }, 500);

  });


$j('#input_kpl2').bind('change keyup', function () {
var index = 1;
    delay(function () {
      FilterSelectList('input_kpl2', selectieLijstKPL2);
      CascadingPrompt(selectieLijstKPL2, selectieLijstKPL3, selectie_Allewaarden, index);
    }, 500);

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


  function CascadingPrompt(v_niv1, v_niv2, v_niv_alle, index) {

    var niv1 = v_niv1;
    var niv2 = v_niv2;
    var niv_alle = v_niv_alle;

    var arr_x = [];
    var arr_y = [];
    var arr_A = [];

    var x = niv1.map(function () {
      if ($j(this).css('display') !== 'none')
        return $j(this).val()
    }).get();
    arr_x.push(x)

    niv_alle.hide().filter(function () {
      if (arr_x[0].some(x => $j(this).text().indexOf(x) > -1)) { // some geeft een true of fals als er wordt voldaan aan de functie => pasop nieuwe syntax werkt niet in IE11 denk ik
        return $j(this).text();
      }
    }).show();

    // deze stap is nodig om alleen de rijen te grijpen die een display op none hebben staan en deze in arr_y te zetten
    var y = niv_alle.map(function () {
      if ($j(this).css('display') !== 'none')
        return $j(this).val();
    }).get();
    arr_y.push(y)

    //map functie loopt over arr_y en split de juiste waarde om deze later door te geven aan Niv2 
    var T = arr_y[0].map(function (val) { // val is de waarde van de option uit arr_y
      var split_Waarde = val.split('|');
      return split_Waarde[1]
    });
    arr_A.push(T);

    console.log(arr_A);

    niv2.hide().filter(function () {
      if (arr_A[0].some(x => $j(this).val().indexOf(x) > -1)) { // some geeft een true of fals als er wordt voldaan aan de functie => pasop nieuwe syntax werkt niet in IE11 denk ik
        return $j(this).text();
      }
    }).show();

  }

});

