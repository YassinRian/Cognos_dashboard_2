$j(document).ready(function() {
  var toggleFlag = true;

  /// begin - filters functies
  $j(".row3").append($j(".prmt_jaar"));
  $j(".row41").append($j(".prmt_kpl1"));
  $j(".row42").append($j(".prmt_kpl2"));
  $j(".row43").append($j(".prmt_kpl3"));
  $j(".row51").append($j(".prmt_kdr1"));
  $j(".row52").append($j(".prmt_kdr2"));
  $j(".row53").append($j(".prmt_kdr3"));

  // kleine opmaak prompts
  $j(".prmt_jaar")
    .find("option")
    .slice(0, 2)
    .hide();

  /// einde - filters functies

  /// componenten functies
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

  // voor baten
  /*
    $j(".box.a").append($j(".comp_meerjaren_abs_kpl"));
    $j(".box.b").append($j(".comp_meerjaren_abs_kdr"));

    $j(".boxc.tab1").append($j(".comp_lijn_kpl"));
    $j(".boxc.tab2").append($j(".comp_tabel_kpl"));

    $j(".boxd.tab1").append($j(".comp_lijn_kdr"));
    $j(".boxd.tab2").append($j(".comp_tabel_kdr"));

*/

  /// einde - componenten functies

  /// begin - functies lading van dashboard pagina

  //$j('.username').append( cognos.Report.getReport("_THIS_")._io.rvMainWnd.m_bannerToolbar.m_specification.S[0].T.E )

  $j(".content, .sidebar, .header, .subheader, .footer").hide();
  $j(".topRow").hide();
  $j(".pageFooter").hide();

  if (!sessionStorage["init"]) {
    // initiele lading
    $j("body").prepend(
      "<div class='spinner'><div class ='container'><div class ='item item-1'></div><div class = 'item item-2'></div><div class='item item-3'></div><div class ='item item-4'></div></div></div>"
    );
    $j("body").css("visibility", "visible");
    $j(".mainViewerTable").css("visibility", "visible");

    setTimeout(function() {
      $j(".spinner").remove();
      $j(".header, .subheader, .content, .footer").fadeIn(1500);
    }, 1500);
  } else {
    setTimeout(function() {
      $j("body").css("visibility", "visible");
      $j(".mainViewerTable")
        .css("visibility", "visible")
        .fadeIn(1000);
      $j(".content, .header, .subheader, .footer").fadeIn(2000);
    }, 150);
  }

  /// einde - functies lading van dashboard pagina

  /// begin - sidebar functie

  // button voor sidebar
  $j(".buttonsb").click(function(event) {
    event.preventDefault();

    $j(".sidebar").animate({
      width: "toggle"
    });

    var op = toggleFlag ? 0.2 : 1;
    $j(".content, .subheader, .footer").css({
      opacity: op,
      transition: "opacity 0.7s"
    });
    toggleFlag = !toggleFlag;

    event.stopPropagation();
  });
  // einde button.sb

  // nodig van sidebar geen event te maken
  $j(".sidebar").click(function(e) {
    e.stopPropagation();
  });

  $j(document).click(function(e) {
    if ($j(".sidebar").css("display") !== "none") {
      $j(".sidebar").animate({
        width: "toggle"
      });

      var op = toggleFlag ? 0.2 : 1;
      $j(".content, .subheader, .footer").css({
        opacity: op,
        transition: "opacity 0.7s"
      });
      toggleFlag = !toggleFlag;
    } else {
      e.stopPropagation();
    }
  });

  /// einde - sidebar functie

  /// begin - filter button in sidebar

  $j(".button.prmt").click(function(event) {
    event.preventDefault();

    $j(".mainViewerTable").fadeOut(1000);
    sessionStorage.setItem("init", 1);
    var oCR = cognos.Report.getReport("_THIS_");
    oCR.sendRequest(cognos.Report.Action.REPROMPT);

    // einde button.prmt
  });

  /// einde - filter button in sidebar

  /// oproepen van Iframe
  $j(".baten").on("click", function() {
    var iframe = document.createElement("iframe");
    iframe.src =
      "https://cognos-ontwikkeling.denhaag.nl/ibmcognos/cgi-bin/cognosisapi.dll?b_action=cognosViewer&ui.action=run&ui.object=CAMID(%22Haagnet%3au%3a19c7760545dd164f9fbadf6d8830de2f%22)%2ffolder%5b%40name%3d%27Persoonlijke%20mappen%27%5d%2ffolder%5b%40name%3d%27BudgetUitputiing%20Package%27%5d%2ffolder%5b%40name%3d%27Yassin%27%5d%2freport%5b%40name%3d%27Baten_dashboard_issuePrompt%27%5d&ui.name=Baten_dashboard_issuePrompt&run.outputFormat=&run.prompt=true";
    $j(".wrapper").css("visibility", "hidden");
    document.body.appendChild(iframe);
  });

  /// einde oproepen van Iframe

  ///
  $j(".pdf").on("click", function() {
    setTimeout(function() {
      window.print();
    }, 100);
  });

  $j(".tabel").on("click", function() {
    $j(".content")
      .removeClass("content1")
      .addClass("content2");
  });
  $j(".lijn").on("click", function() {
    $j(".content")
      .removeClass("content2")
      .addClass("content1");
  });
});
