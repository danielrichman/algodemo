$(document).ready(function()
{
  $('#algo_data_add').click(function () { algo_data_num_adj(true); } );
  $('#algo_data_sub').click(function () { algo_data_num_adj(false); } );
  $('#algo_name').change(algo_chosen);
  $('#algo_submit_btn').click(function () { algo_go(); } );
  $('input:text').keyup(algo_form_check);
  $('input:text').attr('maxlength', 3);
});
