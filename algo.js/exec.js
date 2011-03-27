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
