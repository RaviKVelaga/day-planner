var containerEl = $(".container");
var today = moment();
var hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

// Display's Date 
$("#currentDay").text(today.format("dddd, MMMM  Do"))

//Load the elements when page the page reloads everytime
$(function (event) {
    insertTimeBlocks();
    $(".saveBtn").on("click", function (event) {
        var desc = $(this).siblings('.description').val();
        var timeId = $(this).parent().find("p").attr('id');
        //Save to Local storage
        localStorage.setItem(timeId, desc);
    });
    trackTheTime();
});


function insertTimeBlocks() {

    var EachHour = 9;
    hours.forEach(hour => {
        var div = $('<div>');
        div.addClass("row  time-block");
        var p = $('<p>').addClass("hour  col-md-1").attr('id', 'hour_' + EachHour);
        var hoursFormat
        if (hour < 12 && hour > 8) { hoursFormat = hour + ":" + "00" + "-" + hour + ":" + "59" + "am"; }
        else { hoursFormat = hour + ":" + "00" + "-" + hour + ":" + "59" + "pm"; }

        p.text(hoursFormat);
        div.append(p);
        var textarea = $("<textarea>").addClass(" col-md-10  description");
        div.append(textarea);
        var button = $("<button>").addClass("btn col-md-1 saveBtn");
        var icon = $('<i>').addClass('fas fa-save');
        button.append(icon);
        div.append(button);
        containerEl.append(div);

        //retriving the description from local storage .
        var identifier = '#hour_' + EachHour + '+ .description';
        console.log(identifier);
        $(identifier).val(localStorage.getItem('hour_' + EachHour));

        EachHour++;

    });

}

function trackTheTime() {
    var now = moment().hour();

    $('.hour').each(function () {
        var blockTime = parseInt($(this).attr("id").split("hour_")[1]);

        if (blockTime === now) {
            $(this).siblings('.description').addClass("present");
            $(this).siblings('.description').removeClass("past");
            $(this).siblings('.description').removeClass("future");
        }
        else if (blockTime < now) {
            $(this).siblings('.description').addClass("past");
            $(this).siblings('.description').removeClass("future");
            $(this).siblings('.description').removeClass("present");
        }
        else if (blockTime > now) {
            $(this).siblings('.description').addClass("future");
            $(this).siblings('.description').removeClass("present");
            $(this).siblings('.description').removeClass("past");
        }
    });
}