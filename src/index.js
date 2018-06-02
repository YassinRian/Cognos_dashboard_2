
$j(document).ready(function() {

  var toggleFlag = true;

  $j(".row3").append($j(".prmt_jaar"));
  $j(".row4").append($j(".prmt_kostenplaats"));
  $j(".row5").append($j(".prmt_kostendrager"));

  // components
  $j(".boxa.tab1").append($j(".comp_bullet_kpl"));
  $j(".boxa.tab2").append($j(".comp_meerjaren_perc_kpl"));
  $j(".boxa.tab3").append($j(".comp_meerjaren_abs_kpl"));
  
  $j(".boxb.tab1").append($j(".comp_bullet_kdr"));
  $j(".boxb.tab2").append($j(".comp_meerjaren_perc_kdr"));
  $j(".boxb.tab3").append($j(".comp_meerjaren_abs_kdr"));

  $j(".boxc.tab1").append($j(".comp_lijn_kpl"));
  $j(".boxc.tab2").append($j(".comp_tabel_kpl"));
  
  $j(".boxd.tab1").append($j(".comp_lijn_kdr"));
  $j(".boxd.tab2").append($j(".comp_tabel_kdr"));


  $j('.prmt_jaar').find('option').slice(0, 2).remove();
  $j('.prmt_kostenplaats').find('option').slice(0, 2).remove(); // aanpassen ..dient geen remove te zijn maar hide denk ik


  $j('.content, .sidebar, .header, .subheader, .footer').hide();
  $j('.topRow').hide();
  $j('.pageFooter').hide();

  if (!sessionStorage['init']) {

    $j('body').prepend("<div class='spinner'><div class ='container'><div class ='item item-1'></div><div class = 'item item-2'></div><div class='item item-3'></div><div class ='item item-4'></div></div></div>");
    $j('body').css('visibility', 'visible')
    $j(".mainViewerTable").css("visibility", "visible");

    setTimeout(function () {

      $j('.spinner').remove();
      $j('.header, .subheader, .content, .footer').fadeIn(2500);

    }, 1500);

  } else {

    setTimeout(function () {
      $j('body').css('visibility', 'visible');
      $j(".mainViewerTable").css("visibility", "visible").fadeIn(1000);
      $j('.content, .header, .subheader, .footer').fadeIn(2000);
    }, 150);

  }

  $j(".button.sb").click(function (event) {
    event.preventDefault();

    $j(".sidebar").animate({
      width: "toggle"
    });

    var op = (toggleFlag) ? 0.2 : 1;
    $j('.content, .subheader, .footer').css({ 'opacity': op, 'transition': 'opacity 0.7s' });
    toggleFlag = !toggleFlag;

    event.stopPropagation();

    // einde button.sb
  });

  $j(".sidebar").click(function (e) {
    e.stopPropagation();
  });

  $j(document).click(function (e) {

    if ($j('.sidebar').css('display') !== 'none') {
      $j(".sidebar").animate({
        width: "toggle"
      });

      var op = (toggleFlag) ? 0.2 : 1;
      $j('.content, .subheader, .footer').css({ 'opacity': op, 'transition': 'opacity 0.7s' });
      toggleFlag = !toggleFlag;

    } else {
      e.stopPropagation();
    }

  });


  $j(".button.prmt").click(function (event) {
    event.preventDefault();

    $j(".mainViewerTable").fadeOut(1000);
    sessionStorage.setItem('init', 1);
    var oCR = cognos.Report.getReport("_THIS_");
    oCR.sendRequest(cognos.Report.Action.REPROMPT);

    // einde button.prmt
  });


  $j(".baten").on("click", function () {
    var iframe = document.createElement('iframe');
    iframe.src = "https://cognos-ontwikkeling.denhaag.nl/ibmcognos/cgi-bin/cognosisapi.dll?b_action=cognosViewer&ui.action=run&ui.object=CAMID(%22Haagnet%3au%3a19c7760545dd164f9fbadf6d8830de2f%22)%2ffolder%5b%40name%3d%27Persoonlijke%20mappen%27%5d%2ffolder%5b%40name%3d%27BudgetUitputiing%20Package%27%5d%2ffolder%5b%40name%3d%27Yassin%27%5d%2freport%5b%40name%3d%27Baten_dashboard_issuePrompt%27%5d&ui.name=Baten_dashboard_issuePrompt&run.outputFormat=&run.prompt=true"
    $j(".wrapper").css("visibility", "hidden");
    document.body.appendChild(iframe);
  });

});
