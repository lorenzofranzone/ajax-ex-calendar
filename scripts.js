$(document).ready(function(){

  // Code
  // January
  var jan = moment('2018-01');
  console.log(jan);

  // Days Number in month
  var daysInJan = jan.daysInMonth();
  console.log(daysInJan);

  $.ajax({
    url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
    method: "GET",
    // SUCCESS
    success: function (data) {
      var source = $("#entry-template").html();
      var template = Handlebars.compile(source);
      for (var i = 1; i <= daysInJan; i++) {
        var context = { body: i + ' Gennaio' };
        var html = template(context);
        $('ul').append(html);
      }
    },
    // ERROR
    error: function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. " + errore);
    }
  });




  //////////////////////////////////////////////////
  // F U N C T I O N S
  //////////////////////////////////////////////////



//////////
});
