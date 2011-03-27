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
