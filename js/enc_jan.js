var enc_jan = function(txt) {
  var gug = ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"]

  // Left Block
  var first = txt.length == 8 ? 0 : txt[0];
  var enc = "_" + txt[0] + "*";
  var max = parseInt(txt.length / 2);
  for (var i = 1; i <= max; i++) {
    enc += gug[first][i - 1] + txt[i];
  };

  // Center Bar
  enc += "**";

  // Right Block
  var max = txt.length;
  for (var i = parseInt(txt.length / 2) + 1; i < max; i++) {
    enc += "R" + txt[i];
  };

  enc += "*";

  return enc;
}
