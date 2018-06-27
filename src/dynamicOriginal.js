/*
  
  $x(document).ready(function(){


var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
    clearTimeout(timer);
  timer = setTimeout(callback, ms);
    };
})();





function FilterSelectList(selectOption, filterId, noteClass, selectTextClass)
{
    var filter = $x("#" + filterId).val().replace(/\s+/g, '').toUpperCase();
    var res = 0;
    var selectoption = $x("." + selectOption);
    var dropdown = selectoption.find('select');
    var notetext = $x("." + noteClass);
    var selecttext = $x("." + selectTextClass);
    var options = selectoption.find('option');
		var bucket = " ";

    options.each(function(){
       var search = $x(this).text().replace(/\u00A0/g,'').toUpperCase();
       if ( search.indexOf(filter) == -1 ) {
        $x(this).css('display', 'none')
        res++;     
        }
     else
     { 
       if( filter.length === 0 )
       {
    $x(this).css("display", 'block').prop('selected', false);
  } else {
    $x(this).css("display", 'block').prop('selected', true);  
       
  }
        bucket += $x(this).text() + ','
     }

    });


		if (res == options.length) {
    dropdown.hide()
    		notetext.text("selecteer bestaande waarden")
    	}
     	else
      {

    notetext.text("");     		
  dropdown.show();
         	}

		if ( filter.length === 0 )
			{
    bucket = [];
  selecttext.html( bucket )

			}
      else
      {
    selecttext.html(bucket)

  }

  }



$x('#input_jaar').bind('change keyup', function () {

    delay(function () {
      FilterSelectList('prmt_jaar', 'input_jaar', 'note_jaar', 'selectie_jaar')
    }, 500);
  });


$x('#input_kdr').bind('change keyup', function () {

    delay(function () {

      FilterSelectList('prmt_kostendrager', 'input_kdr', 'note_kdr', 'selectie_kdr')

    }, 500);
  });


$x('#input_kpl').bind('change keyup', function () {

    delay(function () {
      FilterSelectList('prmt_kostenplaats', 'input_kpl', 'note_kpl', 'selectie_kpl')
    }, 500);
  });


});
*/
