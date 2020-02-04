$(document).ready(function(){

  // Code
  var thisMonth = 0;
  var year = 2018;
  var baseMonth = moment(
    {
      year : year,
      month : thisMonth
    }
  );

  printMonth(baseMonth);
  printHoliday(baseMonth);




  //////////////////////////////////////////////////
  // F U N C T I O N S
  //////////////////////////////////////////////////

  // FX Add Zero
  function addZero(num) {
    if(num < 10) {
      return '0' + num;
    }
    return num;
  } // FX Add Zero

  // ------------------------------

  // FX Print Month
  function printMonth(month) {
    // Reset month on change
    $('.days').html('');
    // Dynamic Month Name
    $('.month-name').text(month.format('MMMM YYYY'));
    $('.month-name').attr('data-this-month', month.format('YYYY-MM'));

    // Days number in current Month
    var daysInMonth = month.daysInMonth();

    // Print all days in month "es. 1 January 2018"
    for (var i = 1; i <= daysInMonth; i++) {
      // Handlebars
      var source = $('#entry-template').html();
      var template = Handlebars.compile(source);
      var context = {
      day : i,
      month : month.format('MMMM'),
      'extended-date' : month.format('YYYY-MM') + '-' + addZero(i)
      };
      var html = template(context);
      $('.days').append(html);
    }
  } // FX Print Month

  // ------------------------------

  // FX Print Holiday
  function printHoliday(month) {
    $.ajax({
      url: 'https://flynn.boolean.careers/exercises/api/holidays',
      method: 'GET',
      data: {
        year: month.year(),
        month: month.month()
        },
      success: function(data) {
        var holidays = data.response;
        // Current Month holiday
        for (var i = 0; i < holidays.length; i++) {
          var thisHoliday = holidays[i];
          var thisHolidayDate = thisHoliday.date;

          // Check holiday in Month dates
          $('li[data="' + thisHolidayDate + '"]').addClass('holiday');
          $('li[data="' + thisHolidayDate + '"]').find('.holiday-name').append('- ' + thisHoliday.name);
        }
      }, // Success
      error: function() {
        alert('Errore!');
      } // Error
    }); // ajax
  } // FX Print Holiday

  // ------------------------------

  // FX Click Prev
  $('#prev').click(function() {
    var thisMonth = $('.month-name').attr('data-this-month');
    var date = moment(thisMonth).subtract(1, 'months');

    printMonth(date);
    printHoliday(date);
  }) // FX Click Prev

  // FX Click Next
  $('#next').click(function() {
    var thisMonth = $('.month-name').attr('data-this-month');
    var date = moment(thisMonth).add(1, 'months');

    printMonth(date);
    printHoliday(date);
  }) // FX Click Next


//////////
});
