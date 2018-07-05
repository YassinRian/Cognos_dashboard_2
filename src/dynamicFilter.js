$j(document).ready(function () {

  // ******    variables  ******
  var selectieLijstJaar = $j(".prmt_jaar").find("select > option");
  var selectieLijstKPL1 = $j(".prmt_kpl1").find("select > option");
  var selectieLijstKPL2 = $j(".prmt_kpl2").find("select > option");
  var selectieLijstKPL3 = $j(".prmt_kpl3").find("select > option");

  var selectieLijstKDR1 = $j(".prmt_kdr1").find("select > option");
  var selectieLijstKDR2 = $j(".prmt_kdr2").find("select > option");
  var selectieLijstKDR3 = $j(".prmt_kdr3").find("select > option");
  var selectie_Allewaarden_kpl = $j(".allewaarden_kpl").find("select > option");
  var selectie_Allewaarden_kdr = $j(".allewaarden_kdr").find("select > option");

  var arrObj = {
    bucketKPL : [],
    bucketKDR : [],
    bucketJaar : []
}



//      **** INIT ****   //


  $j('#input_jaar').bind('change keyup', function () {
    delay(function () {
      sessionStorage.removeItem('bucketJaar');
      FilterSelectList('input_jaar', selectieLijstJaar, 'Jaar', 'prmt_jaar');
      if (!sessionStorage['bucketJaar']) {
        $j(".selectie_jaar").html("");
      } else {
        $j(".selectie_jaar").html("Jaar: - " + sessionStorage.getItem('bucketJaar'))
      }
    }, 500);

  });

  $j('#input_kpl1').bind('change keyup', function () {
    delay(function () {
      sessionStorage.removeItem('bucketkpl');
      FilterSelectList('input_kpl1', selectieLijstKPL1, 'KPL', 'prmt_kpl1');
      if (!sessionStorage['bucketkpl']) {
        $j(".selectie_kpl").html("");
      } else {
        $j(".selectie_kpl").html("Kostenplaats Organisatie 1: - " + sessionStorage.getItem('bucketkpl'))
      }
      CascadingPrompt(selectieLijstKPL1, selectieLijstKPL2, selectie_Allewaarden_kpl);
    }, 500);

  });


$j('#input_kpl2').bind('change keyup', function () {
    delay(function () {
      sessionStorage.removeItem('bucketkpl');
      FilterSelectList('input_kpl2', selectieLijstKPL2, 'KPL');
      $j(".selectie_kpl").html("Kostenplaats Organisatie 2: - " + sessionStorage.getItem('bucketkpl'))
      CascadingPrompt(selectieLijstKPL2, selectieLijstKPL3, selectie_Allewaarden_kpl);
      $j('#input_kpl1').val(null);
      selectieLijstKPL1.prop("selected", false).show();
    }, 500);
  });


  $j('#input_kpl3').bind('change keyup', function () {
    delay(function () {
      sessionStorage.removeItem('bucketkpl');
      FilterSelectList('input_kpl2', selectieLijstKPL2);
      $j(".selectie_kpl").html("Kostenplaats Organisatie 3: - " + sessionStorage.getItem('bucketkpl'))
      $j('#input_kpl1').val(null);
      $j('#input_kpl2').val(null);
      selectieLijstKPL1.prop("selected", false).show();
      selectieLijstKPL2.prop("selected", false).show();
    }, 500);
  });


    $j('#input_kdr1').bind('change keyup', function () {
      delay(function () {
        sessionStorage.removeItem('bucketkdr');
        FilterSelectList('input_kdr1', selectieLijstKDR1);
        if (!sessionStorage['bucketkdr']) {
          $j(".selectie_kdr").html("");
        } else {
          $j(".selectie_kdr").html("Kostendrager Organisatie 1: - " + sessionStorage.getItem('bucketkdr'))
        }
        CascadingPrompt(selectieLijstKDR1, selectieLijstKDR2, selectie_Allewaarden_kdr);
      }, 500);

    });


    $j('#input_kdr2').bind('change keyup', function () {
      delay(function () {
        sessionStorage.removeItem('bucketkdr');
        FilterSelectList('input_kdr2', selectieLijstKDR2);
        $j(".selectie_kdr").html("Kostendrager Organisatie 2: - " + sessionStorage.getItem('bucketkdr'))
        CascadingPrompt(selectieLijstKDR2, selectieLijstKDR3, selectie_Allewaarden_kdr);
        $j('#input_kdr1').val(null);
        selectieLijstKDR1.prop("selected", false).show();
      }, 500);
    });


    $j('#input_kdr3').bind('change keyup', function () {
      delay(function () {
        sessionStorage.removeItem('bucketkdr');
        FilterSelectList('input_kdr2', selectieLijstKDR2);
        $j(".selectie_kdr").html("Kostendrager Organisatie 3: - " + sessionStorage.getItem('bucketkdr'))
        $j('#input_kdr1').val(null);
        $j('#input_kdr2').val(null);
        selectieLijstKDR1.prop("selected", false).show();
        selectieLijstKDR2.prop("selected", false).show();
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


  function FilterSelectList(v_input, v_selectielist, v_type, v_prompt) {

    var var_input = $j.trim($j("#" + v_input).val().replace(/\s+/g, '').toUpperCase()); // input wordt ingelezen, spaties worden weggehaald en alles wordt naar kleine letters gezet.
    var var_selectieList = v_selectielist;
    var var_prompt = $j("." + v_prompt);
    var bucket = [];
    var notetext = $j(".notetext" + v_type);
    var typePrmt = v_type;

    if (var_input.length === 0) { // als input leeg is dan zijn alle regels van niv1 zichtbaar
      var_selectieList.show().prop('selected', false);
    } else {
      var_selectieList.hide().filter(function () { // filter is een loop die alleen de waarden laat zien op basis van de gegeven criteria (de inwendige fuctie)
        switch (typePrmt) {
          case 'KPL':
             if ($j(this).text().replace(/\u00A0/g, '').toUpperCase().indexOf(var_input) > -1) {
                    bucket.push($j(this).text());
                    arrObj.bucketKPL = bucket.join(", ");
                    sessionStorage.setItem('bucketkpl', arrObj.bucketKPL);
                  }            
            break;
          case 'KDR':
            if ($j(this).text().replace(/\u00A0/g, '').toUpperCase().indexOf(var_input) > -1) {
              bucket.push($j(this).text());
              arrObj.bucketKDR = bucket.join(", ");
              sessionStorage.setItem('bucketkdr', arrObj.bucketKDR);
            }
            break;
          case 'Jaar':
            if ($j(this).text().replace(/\u00A0/g, '').toUpperCase().indexOf(var_input) > -1) {
              bucket.push($j(this).text());
              arrObj.bucketJaar = bucket.join(", ");
              sessionStorage.setItem('bucketJaar', arrObj.bucketJaar);
              break;
        }
      }
        return $j(this).text().replace(/\u00A0/g, '').toUpperCase().indexOf(var_input) > -1;
      }).show().prop('selected', true);
    }
    

// verbergt dropdown als niet "bestaande waarde" wordt geselecteerd
    if (bucket.length === 0 && var_input !== "") {
      var_prompt.hide()
      notetext.css("display","block")
    } else {
      notetext.css("display","none");
      var_prompt.show();
    }

  } // function closure


  function CascadingPrompt(v_niv1, v_niv2, v_niv_alle) {

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

    niv2.hide().filter(function () {
      if (arr_A[0].some(x => $j(this).val().indexOf(x) > -1)) { // some geeft een true of fals als er wordt voldaan aan de functie => pasop nieuwe syntax werkt niet in IE11 denk ik
        return $j(this).text();
      }
    }).show();

  }

});

