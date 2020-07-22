$(function() {
    $("#datepicker").datepicker().datepicker("setDate", "today");
});

var calc_checkdigit = function(data) {
    var sum = 0;
    for (i = 0; i < data.length; i++) {
        sum += data[data.length - i - 1] * Math.pow(3, (i + 1) % 2);
    }

    return (10 - sum % 10) % 10;
}

var enc_barcode = function() {
    var error_chk = function() {
        if (data.length == 8 && date == "") {
            alert("date error.");
            return;
        }

        if (data.length == 8 && hour == "") {
            alert("hour error.");
            return;
        }

        if (data.length != 8 && data.length != 12 && data.length != 13) {
            alert("digits error.");
            return;
        }

        return true;
    }

    var calc_date00 = function(date) {
        var t = new Date(date);
        var n = Date.parse(t.getFullYear() + "/01/01");
        var x = (t - n) / 1000 / 60 / 60 / 24;
        x = Math.floor(x);

        return ("0" + (x % 100 + 1)).slice(-2);
    }

    var form = document.forms.info;
    var date = form.date.value;
    var data = form.data.value;
    var hour = form.hour.value;

    if (!error_chk()) return

    var data12 = data.length == 8 ? "" + data + calc_date00(date) + hour : "" + data.substr(0, 12);
    var cd = calc_checkdigit(data12);
    var code = (data.length == 8 && form.enable_shortjan.checked) ? data.substr(0, 7) + calc_checkdigit(data.substr(0, 7)) : "" + data12 + cd;

    var csn = (code % 1000 % 16).toString(4);
    var fontColorSet = ["#000", "#00f", "#0df", "#0f0"];
    var backColorSet = ["#fff", "#f00", "#f90", "#ff0"];
    var barcode = "<span class='ean13_font' style='color:" + fontColorSet[csn % 10] + "; background-color:" + backColorSet[parseInt(csn / 10)] + ";'>" + enc_jan(code) + "<span class='material-icons' onClick='$(this).parent().remove()'>clear</span><span class='material-icons' onClick=\"navigator.clipboard.writeText('" + code + "')\">content_copy</span></span>";
    $("#barcode").append(barcode);
    $('input[name="data"]').val(code);
}