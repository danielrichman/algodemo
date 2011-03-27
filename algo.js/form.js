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
