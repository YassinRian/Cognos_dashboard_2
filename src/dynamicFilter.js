$j(document).ready(function () {

  // ******    variables  ******
  var selectieLijstKPL1 = $j(".prmt_kpl1").find("select > option");
  var kpl1_dropdown = $j(".prmt_kpl1");
  var selectieLijstKPL2 = $j(".prmt_kpl2").find("select > option");
  var selectieLijstKPL3 = $j(".prmt_kpl3").find("select > option");

  var selectieLijstKDR1 = $j(".prmt_kdr1").find("select > option");
  var selectieLijstKDR2 = $j(".prmt_kdr2").find("select > option");
  var selectieLijstKDR3 = $j(".prmt_kdr3").find("select > option");
  var selectie_Allewaarden_kpl = $j(".allewaarden_kpl").find("select > option");
  var selectie_Allewaarden_kdr = $j(".allewaarden_kdr").find("select > option");
  var bucketkpl = [];
  var bucketkdr = [];


//      **** INIT ****   //

  $j('#input_kpl1').bind('change keyup', function () {
    var index = 0;
    delay(function () {
      FilterSelectList('input_kpl1', selectieLijstKPL1);
      if (!sessionStorage['bucketkpl']) {
        $j(".selectie_kpl").html("");
      } else {
        $j(".selectie_kpl").html("Kostenplaats Organisatie 1: - " + sessionStorage.getItem('bucketkpl'))
      }
      console.log($j('#input_kpl1').val())
      CascadingPrompt(selectieLijstKPL1, selectieLijstKPL2, selectie_Allewaarden_kpl, index);
    }, 500);

  });


$j('#input_kpl2').bind('change keyup', function () {
var index = 1;
    delay(function () {
      FilterSelectList('input_kpl2', selectieLijstKPL2);
      $j(".selectie_kpl").html("Kostenplaats Organisatie 2: - " + sessionStorage.getItem('bucketkpl'))
      CascadingPrompt(selectieLijstKPL2, selectieLijstKPL3, selectie_Allewaarden_kpl, index);
      $j('#input_kpl1').val(null);
      selectieLijstKPL1.prop("selected", false);
      selectieLijstKPL1.show();
    }, 500);
  });


  $j('#input_kpl3').bind('change keyup', function () {
    var index = 1;
    delay(function () {
      FilterSelectList('input_kpl2', selectieLijstKPL2);
      $j(".selectie_kpl").html("Kostenplaats Organisatie 3: - " + sessionStorage.getItem('bucketkpl'))
      $j('#input_kpl1').val(null);
      $j('#input_kpl2').val(null);
      selectieLijstKPL1.prop("selected", false);
      selectieLijstKPL2.prop("selected", false);
      selectieLijstKPL1.show();
      selectieLijstKPL2.show();
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

    var var_input = $j.trim($j("#" + v_input).val().replace(/\s+/g, '').toUpperCase()); // input wordt ingelezen, spaties worden weggehaald en alles wordt naar kleine letters gezet.
    var var_selectieList = v_selectielist;
    var bucket = [];
    var res = 0;
    var notetext = $j(".notetext");
    sessionStorage.removeItem('bucketkpl');

    if (var_input.length === 0) { // als input leeg is dan zijn alle regels van niv1 zichtbaar
      var_selectieList.show().prop('selected', false);
    } else {
      var_selectieList.hide().filter(function () { // filter is een loop die alleen de waarden laat zien op basis van de gegeven criteria (de inwendige fuctie)
        if ($j(this).text().replace(/\u00A0/g, '').toUpperCase().indexOf(var_input) > -1) {
          bucket.push($j(this).text());
          bucketkpl = bucket.join(", ");
          sessionStorage.setItem('bucketkpl', bucketkpl);
        }
        return $j(this).text().replace(/\u00A0/g, '').toUpperCase().indexOf(var_input) > -1;
      }).show().prop('selected', true);
    }

// verbergt dropdown als niet "bestaande waarde" wordt geselecteerd
    if (bucket === "" && var_input !== "") {
      kpl1_dropdown.hide()
      notetext.css("display","block")
      //notetext.text("Selecteer bestaande waarden")
    } else {
      notetext.css("display","none");
      kpl1_dropdown.show();
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

