$j(document).ready(function () {

  var selectieLijstKPL2  = $j(".prmt_kpl2").find('select option');

/*
  var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();
*/

  function FilterSelectList(v_input, v_selectieList) {


    var var_input = $j.trim($j("#" + v_input).val().toLowerCase()); // input wordt ingelezen, spaties worden weggehaald en alles wordt naar kleine letters gezet.
    var var_selectieList = $j("." + v_selectieList).find('select option');

    if (var_input.length === 0) { // als input leeg is dan zijn alle regels van niv1 zichtbaar
      var_selectieList.show();
    } else {
      var_selectieList.hide().filter(function () { // filter is een loop die alleen de waarden laat zien op basis van de gegeven criteria (de inwendige fuctie)
        return $j(this).text().toLowerCase().indexOf(var_input) > -1;
      }).show();

    }

  } // function closure


  $j('#input_kpl2').bind('change keyup', function () {

    console.log("hallo Yassin");

    FilterSelectList('input_kpl2', 'prmt_kpl2')

/*    delay(function () {
      FilterSelectList('input_kpl2', 'prmt_kpl2')
    }, 500); 
*/
  });

});
