var algo_sb_a;
var algo_sb_b;
var algo_sb_c;

function algo_search_binary()
{
  switch (algo_state)
  {
    case 0:
      algo_comparisons = 0;
      algo_sb_a = 0
      algo_sb_b = algo_data.length - 1;
      break;

    case 1:
      var row = algo_add_row();
      algo_hilight("find", algo_sb_c, algo_sb_c);
      row.show("slow", algo_finished);
      return;

    case 2:
      algo_sb_b = algo_sb_c - 1;
      break;

    case 3:
      algo_sb_a = algo_sb_c + 1;
      break;
  }

  if (algo_sb_a > algo_sb_b)
  {
    algo_state_str = "Cannot find";
    var row = algo_add_row();
    row.show("slow", algo_finished);
    return;
  }

  algo_sb_c = Math.floor((algo_sb_a + algo_sb_b) / 2);
  algo_comparisons = algo_comparisons + 1;

  var picked = algo_data[algo_sb_c];
  if (picked == algo_search_target)
  {
    algo_state = 1;
    algo_state_str = "Found";
  }
  else if (picked > algo_search_target)
  {
    algo_state = 2;
    algo_state_str = "Too high";
  }
  else
  {
    algo_state = 3;
    algo_state_str = "Too low";
  }

  var row = algo_add_row();
  algo_hilight("range", algo_sb_a, algo_sb_b,
               "examine", algo_sb_c);
  row.show("slow", algo_search_binary);
}
