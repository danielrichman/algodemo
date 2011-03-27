var algo_sort_bubble_swapped_something;

function algo_sort_bubble()
{
  switch (algo_state)
  {
    case 0:
      algo_state = 1;
      algo_pass = 0;
      algo_comparisons = 0;
      algo_swaps = 0;

    case 1:
      if (algo_pass != 0)
      {
        algo_step = "";
        algo_update_info();
        algo_clear_hilight();
      }

      algo_pass = algo_pass + 1;

      algo_sort_bubble_swapped_something = false;
      algo_state = 2;

      algo_add_row().show("slow", algo_sort_bubble);
      algo_step = 1;
      return;

    case 2:
      algo_comparisons = algo_comparisons + 1;
      algo_update_info();

      algo_hilight("compare", algo_step - 1, algo_step);

      if (algo_sort_direction)
        do_swap = (algo_data[algo_step - 1] > algo_data[algo_step]);
      else
        do_swap = (algo_data[algo_step - 1] < algo_data[algo_step]);

      if (do_swap)
      {
        algo_state = 3;
      }
      else
      {
        algo_step = algo_step + 1;
      }
      break;

    case 3:
      algo_sort_bubble_swapped_something = true;
      algo_swaps = algo_swaps + 1;
      algo_update_info();

      var s = algo_data[algo_step];
      algo_data[algo_step] = algo_data[algo_step - 1];
      algo_data[algo_step - 1] = s;

      algo_update_data(algo_step - 1);
      algo_update_data(algo_step);

      algo_hilight("swap", algo_step - 1, algo_step);

      algo_step = algo_step + 1;
      algo_state = 2;
      break;

    case 4:
      algo_step = "";
      algo_update_info();
      algo_clear_hilight();
      algo_finished();
      return;
  }

  if (algo_step == algo_data.length)
  {
    if (algo_sort_bubble_swapped_something)
      algo_state = 1;
    else
      algo_state = 4;
  }

  setTimeout(algo_sort_bubble, 400);
}

function algo_sort_shuttle()
{
  var pass_finished = false;

  switch (algo_state)
  {
    case 0:
      algo_state = 1;
      algo_pass = 0;
      algo_comparisons = 0;
      algo_swaps = 0;

    case 1:
      if (algo_pass != 0)
      {
        algo_step = "";
        algo_update_info();
        algo_clear_hilight();
      }

      algo_pass = algo_pass + 1;
      algo_state = 2;

      algo_add_row().show("slow", algo_sort_shuttle);
      algo_step = 1;
      return;

    case 2:
      var a = algo_pass - (algo_step - 1);

      algo_comparisons = algo_comparisons + 1;
      algo_update_info();

      algo_hilight("compare", a - 1, a);

      if (algo_sort_direction)
        do_swap = (algo_data[a - 1] > algo_data[a]);
      else
        do_swap = (algo_data[a - 1] < algo_data[a]);

      if (do_swap)
      {
        algo_state = 3;
      }
      else
      {
        pass_finished = true;
      }
      break;

    case 3:
      var a = algo_pass - (algo_step - 1);

      algo_swaps = algo_swaps + 1;
      algo_update_info();

      var s = algo_data[a];
      algo_data[a] = algo_data[a - 1];
      algo_data[a - 1] = s;

      algo_update_data(a - 1);
      algo_update_data(a);

      algo_hilight("swap", a - 1, a);

      algo_step = algo_step + 1;

      if (algo_step == (algo_pass + 1))
      {
        pass_finished = true;
      }
      else
      {
        algo_state = 2;
      }
      break;

    case 4:
      algo_step = "";
      algo_update_info();
      algo_clear_hilight();
      algo_finished();
      return;
  }

  if (pass_finished)
  {
    if (algo_pass == (algo_data.length - 1))
      algo_state = 4;
    else
      algo_state = 1;
  }

  setTimeout(algo_sort_shuttle, 400);
}
