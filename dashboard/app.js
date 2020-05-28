$( document ).ready(function() {

  //////////////////////////////////////////////////////////////////////////////
  // PREPARE DATA
  //////////////////////////////////////////////////////////////////////////////

var summaryData = {};

getCountries();
 function getCountries(){
      $.getJSON( "https://api.covid19api.com/summary", function( data ) {
        summaryData = data;
         $("#Date").html(data.Countries[0].Date);
        populateSummary(data.Global);
        populateCountries(data.Countries);
      }).fail(function(jqXHR, textStatus, errorThrown){
        setTimeout(getCountries(), 3000);
      });
  }

function populateSummary(obj){
    $("#NewConfirmed").text(obj.NewConfirmed)
    $("#TotalConfirmed").text(obj.TotalConfirmed)
    $("#NewDeaths").text(obj.NewDeaths)
    $("#TotalDeaths").text(obj.TotalDeaths)
    $("#NewRecovered").text(obj.NewRecovered)
    $("#TotalRecovered").text(obj.TotalRecovered)
}

  /**
   * Country/state list on the right
   */

  function populateCountries(list) {
    var table = $("#areas tbody");
    table.find(".area").remove();
    for (var i = 0; i < list.length; i++) {
      var area = list[i];
      var tr = $("<tr>").addClass("area").data("areaid", area.CountryCode).appendTo(table);
      $("<td class='countryName'>").appendTo(tr).data("areaid", area.CountryCode).html(area.Country);
      $("<td class='newConfirmed'>").addClass("value").appendTo(tr).html(area.NewConfirmed);
      $("<td class='totalConfirmed'>").addClass("value").appendTo(tr).html(area.TotalConfirmed);
      $("<td class='newDeaths'>").addClass("value").appendTo(tr).html(area.NewDeaths);
      $("<td class='totalDeaths'>").addClass("value").appendTo(tr).html(area.TotalDeaths);
      $("<td class='newRecovered'>").addClass("value").appendTo(tr).html(area.NewRecovered);
      $("<td class='totalRecovered'>").addClass("value").appendTo(tr).html(area.TotalRecovered);

    }
    $("#areas").DataTable({
      "paging": false,
      "select": true
    }).column("1")
      .order("desc")
      .draw();;
  }
});
