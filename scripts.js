$(document).ready(function(){

  // Code
  // Current Month
  var thisMonth = moment('2018-01-01');
  console.log(thisMonth);
  $('.month-name').text(thisMonth.format('MMMM YYYY'));


  // Template list month
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < 31; i++) {
    // Current Y M D
    var dayObj = {
      year : thisMonth.year(),
      month: thisMonth.month(),
      day : i+1
    }

    // Current month
    var thisDate = moment(dayObj);
    var context = {
      singleDay : thisDate.format('DD MMMM'),
      'extended-date' : thisDate.format('YYYY-MM-DD')
    };
    var html = template(context);
    $('ul').append(html);
  }



  $.ajax({
    url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
    method: "GET",
    // SUCCESS
    success: function (data) {
      holidays(data.response);

        // ciclare tutti i giorni del mese

        // verificare dall'API le chiavi "date"

        // se presente una "date" appendere il valore della chiave "name"
        // sul giorno corrispondente nell'html
    },
    // ERROR
    error: function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. " + errore);
    }
  });




  //////////////////////////////////////////////////
  // F U N C T I O N S
  //////////////////////////////////////////////////

  // FX holidays
  function holidays(monthHolydays) {
    for (var i = 0; i < monthHolydays.length; i++) {
      var holiday = monthHolydays[i];
      var listItems = $('.month-day[data="'+holiday.date + '"]');
      listItems.addClass('holiday');
      listItems.text(listItems.text() + ' - ' + holiday.name);
    }
  }

//////////
});
