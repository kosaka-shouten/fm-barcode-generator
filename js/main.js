$(function(){
  $("#datepicker").datepicker().datepicker("setDate", "today");
});

var calc_checkdigit = function(data){
  var sum = 0;
  var v = data;
  for(i=0; i<12; i++){
    var n = v%10;
    v = parseInt(v/10);
    sum += n*Math.pow(3, (i+1)%2);
  }

  return (10-sum%10)%10;
}

var enc_barcode = function(){
  var error_chk = function(){
    if(data.length == 8 && date == ""){
      alert("date error.");
      return;
    }

    if(data.length == 8 && hour == ""){
      alert("hour error.");
      return;
    }

    if(data.length != 8 && data.length != 12){
      alert("digits error.");
      return;
    }

    return true;
  }

  var calc_date00 = function(date){
    var t = new Date(date);
    var s = Math.floor(t.getTime()/1000);
    var d = Math.floor(s/(60*60*24));

    return (d+35)%100;
  }

  var form = document.forms.info;
  var date = form.date.value;
  var data = form.data.value;
  var hour = form.hour.value;

  if (!error_chk()) return

  var data12 = data.length == 8 ? "" + data + calc_date00(date) + hour : "" + data;
  var cd = calc_checkdigit(data12);
  var code = ""+data12+cd;

  var cd3 = (cd%9).toString(3);
  var fontColorSet = ["#000", "#00f", "#0f0"];
  var backColorSet = ["#fff", "#f00", "#ff0"];
  var barcode = "<span class='ean13_font' style='color:" + fontColorSet[cd3%10] + "; background-color:" + backColorSet[parseInt(cd3/10)] + ";'>" + enc_jan(code) + "<i class='material-icons' onClick='$(this).parent().remove()'>clear</i></span>";
  $("#barcode").append(barcode);
}
