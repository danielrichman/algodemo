var algo_data_num = 2;

function algo_data_num_adj(add)
{
  if (add)
  {
    if (algo_data_num == 9)
      return;

    algo_data_num = algo_data_num + 1;
    $("#algo_data_" + algo_data_num).show("slow");

    if (algo_data_num == 9)
      $("#algo_data_add").hide("slow");

    if (algo_data_num == 3)
      $("#algo_data_sub").show("slow");
  }
  else
  {
    if (algo_data_num == 2)
      return;

    $("#algo_data_" + algo_data_num).hide("slow");
    algo_data_num = algo_data_num - 1;

    if (algo_data_num == 8)
      $("#algo_data_add").show("slow");

    if (algo_data_num == 2)
      $("#algo_data_sub").hide("slow");
  }

  algo_form_check();
}

var algo_type = 1;

function algo_chosen()
{
  switch ($('#algo_name').val())
  {
    case "algo_sort_bubble":
    case "algo_sort_shuttle":
      if (algo_type != 1)
      {
        algo_type = 1;

        $("#algo_option_search").fadeOut("slow");
        $("#algo_option_sort").delay(400).fadeIn("slow");
      }
      break;

    case "algo_search_binary":
      if (algo_type != 2)
      {
        algo_type = 2;

        $("#algo_option_sort").fadeOut("slow");
        $("#algo_option_search").delay(400).fadeIn("slow")
      }
      break;
  }

  algo_form_check();
}

function algo_form_is_valid()
{
  var last_value = undefined;

  for (var i = 1; i <= algo_data_num; i++)
  {
    var strvalue = $('#algo_data_' + i).val();
    var value = parseInt(strvalue, 10);

    if (isNaN(value) || value.toString() != strvalue)
      return false;

    if ($('#algo_name').val() == "algo_search_binary")
    {
      if (last_value != undefined && value < last_value)
        return false;

      last_value = value;
    }
  }

  if ($('#algo_name').val() == "algo_search_binary")
  {
    var strvalue = $('#algo_search_target').val();
    var value = parseInt(strvalue, 10);

    if (isNaN(value) || value.toString() != strvalue)
      return false;
  }

  return true;
}

function algo_form_check()
{
  if (!algo_running && !algo_animating)
    $('#algo_submit_btn').attr('disabled', !algo_form_is_valid());
}

var algo_func = undefined;
var algo_data;
var algo_running = false;
var algo_animating = false;
var algo_ran = false;
var algo_type;
var algo_row;
var algo_state;
var algo_pass;
var algo_step;
var algo_comparisons;
var algo_swaps;
var algo_state_str;

function algo_go()
{
  algo_running = true;
  algo_animating = true;
  algo_ran = true;

  $('#algo_submit_btn').attr('disabled', true);

  if (algo_ran)
  {
    $('#algo_form_sep').show("slow");
    $('#algo_working').slideUp("slow", function ()
    {
      $('#algo_working').empty();
      algo_start();
    });
  }
  else
  {
    algo_start();
  }
}

function algo_start()
{
  algo_data = []

  switch ($('#algo_name').val())
  {
    case "algo_sort_bubble":
      algo_func = algo_sort_bubble;
      algo_is_sort = true;
      algo_sort_direction = 
        ($('#algo_sort_direction').val() == "algo_sort_asc");
      break;
    case "algo_sort_shuttle":
      algo_func = algo_sort_shuttle;
      algo_is_sort = true;
      algo_sort_direction = 
        ($('#algo_sort_direction').val() == "algo_sort_asc");
      break;
    case "algo_search_binary":
      algo_func = algo_search_binary;
      algo_is_sort = false;
      algo_search_target = parseInt($('#algo_search_target').val(), 10);
      break;
  }

  for (var i = 1; i <= algo_data_num; i++)
    algo_data.push(parseInt($('#algo_data_' + i).val(), 10));

  algo_row = 0;
  algo_state = 0;

  algo_add_headers().show();

  algo_pass = "";
  algo_step = "";
  algo_comparisons = "";
  algo_swaps = "";
  algo_state_str = "";
  algo_add_row().show();

  $('#algo_form_sep').hide();
  $('#algo_working').slideDown("slow", function ()
  {
    algo_func();

    algo_animating = false;
    algo_form_check();
  });
}

function algo_finished()
{
  algo_running = false;
  algo_form_check();
}

function algo_create_base_row()
{
  var row = $(document.createElement('div'));
  row.hide();
  $('#algo_working').append(row);
  row.addClass('algo_row');
  return row;
}

function algo_get_subsections()
{
  if (algo_is_sort)
    return ["pass", "step", "data", "comparisons", "swaps", "bot"];
  else
    return ["data", "comparisons", "state", "bot"];
}

function algo_add_headers()
{
  var row = algo_create_base_row();
  var subsections = algo_get_subsections();

  row.addClass("algo_row_header");

  var headers = { "pass": "Pass", "step": "Step",
                  "data": "Data", "comparisons": "# Comparisons",
                  "swaps": "# Swaps", "state": "State" };

  for (var ss_n in subsections)
  {
    var ss = subsections[ss_n];
    var ss_elem = $(document.createElement('div'));
    row.append(ss_elem);
    ss_elem.addClass('algo_row_' + ss);

    if (ss != "bot")
      ss_elem.append(headers[ss]);
  }

  return row;
}

function algo_add_row()
{
  algo_row = algo_row + 1;

  var row = algo_create_base_row();
  row.attr('id', 'algo_row_' + algo_row);

  var subsections = algo_get_subsections();
  var data_section;

  for (var ss_n in subsections)
  {
    var ss = subsections[ss_n];
    var ss_elem = $(document.createElement('div'));
    row.append(ss_elem);
    ss_elem.attr('id', 'algo_row_' + algo_row + '_' + ss);
    ss_elem.addClass('algo_row_' + ss);

    if (ss == "data")
      data_section = ss_elem;
  }

  algo_update_info();

  for (var data_i in algo_data)
  {
    var data = $(document.createElement('div'));
    data_section.append(data);
    data.attr('id', 'algo_row_' + algo_row + '_data_' + data_i);
    data.addClass('algo_row_data_item');
    data.append(algo_data[data_i]);
  }

  return row;
}

function algo_update_data(i)
{
  var cell = $("#algo_row_" + algo_row + "_data_" + i);
  cell.empty();
  cell.append(algo_data[i]);
}

function algo_update_info()
{
  var subsections = algo_get_subsections();

  var info = { "pass": algo_pass, "step": algo_step,
               "comparisons": algo_comparisons,
               "swaps": algo_swaps,
               "state": algo_state_str }

  for (var ss_id in subsections)
  {
    var key = subsections[ss_id];

    if (info[key] != undefined)
    {
      var cell = $("#algo_row_" + algo_row + "_" + key);
      cell.empty();
      cell.append(info[key]);
    }
  }
}

function algo_clear_hilight()
{
  var rem = ["algo_hilight", "algo_hilight_underline",
             "algo_compare", "algo_swap", "algo_range"];

  for (var c in rem)
    $("#algo_row_" + algo_row + " ." + rem[c]).removeClass(rem[c]);
}

function algo_hilight(style, left, right, selectstyle, select)
{
  algo_clear_hilight();

  var cells = [left, right];

  for (var i in cells)
  {
    var cell = $("#algo_row_" + algo_row + "_data_" + cells[i]);
    cell.addClass("algo_hilight");
    cell.addClass("algo_" + style);
  }

  for (var i = left + 1; i <= right - 1; i++)
  {
    var cell = $("#algo_row_" + algo_row + "_data_" + i);
    cell.addClass("algo_hilight_underline");
    cell.addClass("algo_" + style);
  }

  if (selectstyle != undefined)
  {
    var cell = $("#algo_row_" + algo_row + "_data_" + select);
    cell.addClass("algo_" + selectstyle);
  }
}

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

$(document).ready(function()
{
  $('#algo_data_add').click(function () { algo_data_num_adj(true); } );
  $('#algo_data_sub').click(function () { algo_data_num_adj(false); } );
  $('#algo_name').change(algo_chosen);
  $('#algo_submit_btn').click(function () { algo_go(); } );
  $('input:text').keyup(algo_form_check);
  $('input:text').attr('maxlength', 3);
});
