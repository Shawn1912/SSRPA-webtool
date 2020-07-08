// Popups_Starts
// var modalBtns = [...document.querySelectorAll(".button_roundoff_column")];
// modalBtns.forEach(function(btn){
//   btn.onclick = function() {
//     console.log("Clicked");
//     var modal = document.querySelector("#modalOne_roundoff_column")
//     modal.style.display = "block";
//   }
// });

//EXCEL POP-UP STARTS HERE//
var modalBtns = [...document.querySelectorAll(".button_filter")];
$(document).on('DOMNodeInserted', function(e) {
  if ( $(e.target).hasClass('button_filter') ) {
      //element with .MyClass was inserted.
      console.log("working");
    modalBtns = [...document.querySelectorAll(".button_filter")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_filter");
    modal.style.display = "block";
  }
});
  }
   else if ( $(e.target).hasClass('button_maxcolumn') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_maxcolumn")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_maxcolumn");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_maxrow') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_maxrow")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_maxrow");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_vlookupsamesheet') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_vlookupsamesheet")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_vlookupsamesheet");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_copy_data_sheet') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_copy_data_sheet")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_copy_data_sheet");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_roundoff_column') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_roundoff_column")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_roundoff_column");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_remove_duplicate') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_remove_duplicate")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_remove_duplicate");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_remove_duplicate') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_remove_duplicate")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_remove_duplicate");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_password') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_password")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_password");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_sum_if') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_sum_if")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_sum_if");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_pivot_table') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_pivot_table")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_pivot_table");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_paste_special') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_paste_special")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_paste_special");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_move_excel') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_move_excel")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_move_excel");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_create_sheet') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_create_sheet")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_create_sheet");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_del_sheet') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_del_sheet")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_del_sheet");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_sel_sheet') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_sel_sheet")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_sel_sheet");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_rename_sheet') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_rename_sheet")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_rename_sheet");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_del_column') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_del_column")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_del_column");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_del_row_col') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_del_row_col")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_del_row_col");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_read_cell_data') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_read_cell_data")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_read_cell_data");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_copy_data') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_copy_data")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_copy_data");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_v_lookup') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_v_lookup")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_v_lookup");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_search_value') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_search_value")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_search_value");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_change_header') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_change_header")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_change_header");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_formula') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_formula")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_formula");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_del_row') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_del_row")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_del_row");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_col_datatype') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_col_datatype")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_col_datatype");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_excel_to_csv') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_excel_to_csv")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_excel_to_csv");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_create_excel') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_create_excel")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_create_excel");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_open_excel') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_open_excel")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_open_excel");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_del_excel') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_del_excel")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_del_excel");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_rename_excel') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_rename_excel")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_rename_excel");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_copy_excel') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_copy_excel")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_copy_excel");
    modal.style.display = "block";
  }
  });//EXCEL POP-UP ENDS HERE//
  }//FILE POP-UP STARTS HERE//
  else if ( $(e.target).hasClass('button_create_new_file') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_create_new_file")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_create_new_file");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_move_files') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_move_files")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_move_files");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_copy_files') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_copy_files")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_copy_files");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_rename_files') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_rename_files")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_rename_files");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_print_file') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_print_file")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_print_file");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_print_files') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_print_files")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_print_files");
    modal.style.display = "block";
  }
  });
  } 
  else if ( $(e.target).hasClass('button_create_files_shortcut') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_create_files_shortcut")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_create_files_shortcut");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_zip_file') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_zip_file")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_zip_file");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_get_file_part') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_get_file_part")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_get_file_part");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_unzip_file') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_unzip_file")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_unzip_file");
    modal.style.display = "block";
  }
  });//FILE POP-UP ENDS HERE//
  }//PDF POP-UP STARTS HERE//
   else if ( $(e.target).hasClass('button_create_pdf') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_create_pdf")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_create_pdf");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_split_pdf') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_split_pdf")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_split_pdf");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_concatenate_pdf') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_concatenate_pdf")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_concatenate_pdf");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_insert_newpage_pdf') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_insert_newpage_pdf")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_insert_newpage_pdf");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_insert_existingpage_pdf') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_insert_existingpage_pdf")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_insert_existingpage_pdf");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_encrypt_pdf') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_encrypt_pdf")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_encrypt_pdf");
    modal.style.display = "block";
  }
  });
  }
   else if ( $(e.target).hasClass('button_decrypt_pdf') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_decrypt_pdf")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_decrypt_pdf");
    modal.style.display = "block";
  }
  });
  }
   else if ( $(e.target).hasClass('button_extract_image_pdf') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_extract_image_pdf")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_extract_image_pdf");
    modal.style.display = "block";
  }
  });
  }
   else if ( $(e.target).hasClass('button_extract_text_ocr_pdf') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_extract_text_ocr_pdf")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_extract_text_ocr_pdf");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_extract_text_pdf') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_extract_text_pdf")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_extract_text_pdf");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_extract_page_pdf') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_extract_page_pdf")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_extract_page_pdf");
    modal.style.display = "block";
  }
  });
  }
 else if ( $(e.target).hasClass('button_any_to_pdf') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_any_to_pdf")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_any_to_pdf");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_word_to_pdf') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_word_to_pdf")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_word_to_pdf");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_excel_to_pdf') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_excel_to_pdf")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_excel_to_pdf");
    modal.style.display = "block";
  }
  });
  }
   else if ( $(e.target).hasClass('button_gif_to_pdf') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_gif_to_pdf")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_gif_to_pdf");
    modal.style.display = "block";
  }
  });
  }
   else if ( $(e.target).hasClass('button_pdf_to_word') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_pdf_to_word")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_pdf_to_word");
    modal.style.display = "block";
  }
  });
  }
   else if ( $(e.target).hasClass('button_pdf_to_excel') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_pdf_to_excel")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_pdf_to_excel");
    modal.style.display = "block";
  }
  });//PDF POP-UP ENDS HERE//
  }//E-MAIL POP-UP STARTS HERE//
  else if ( $(e.target).hasClass('button_send_email') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_send_email")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_send_email");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_retrieve_email') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_retrieve_email")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_retrieve_email");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_send_html_message') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_send_html_message")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_send_html_message");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_send_plaintext_message') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_send_plaintext_message")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_send_plaintext_message");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_attach_excel') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_attach_excel")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_attach_excel");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_attach_word') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_attach_word")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_attach_word");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_attach_ppt') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_attach_ppt")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_attach_ppt");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_attach_zip') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_attach_zip")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_attach_zip");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_attach_any_otherformat') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_attach_any_otherformat")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_attach_any_otherformat");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_save_attachment') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_save_attachment")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_save_attachment");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_del_all_messages') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_del_all_messages")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_del_all_messages");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_del_read_messages') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_del_read_messages")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_del_read_messages");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_del_unread_messages') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_del_unread_messages")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_del_unread_messages");
    modal.style.display = "block";
  }
  });//E-MAIL POP-UP ENDS HERE//
  }//FOLDER POP-UP STARTS HERE//
  else if ( $(e.target).hasClass('button_copy_folder') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_copy_folder")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_copy_folder");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_create_folder') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_create_folder")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_create_folder");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_create_shortcut') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_create_shortcut")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_create_shortcut");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_del_folder') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_del_folder")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_del_folder");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_move_folder') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_move_folder")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_move_folder");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_open_folder') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_open_folder")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_open_folder");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_rename_folder') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_rename_folder")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_rename_folder");
    modal.style.display = "block";
  }
  });//FOLDER POP-UP ENDS HERE//
  }//CSV POP-UP STARTS HERE//
  else if ( $(e.target).hasClass('button_read_from_csv') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_read_from_csv")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_read_from_csv");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_write_to_csv') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_write_to_csv")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_write_to_csv");
    modal.style.display = "block";
  }
  });//CSV POP-UP ENDS HERE//
  }//FTP POP-UP STARTS HERE//
  else if ( $(e.target).hasClass('button_change_ftp_directory') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_change_ftp_directory")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_change_ftp_directory");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_create_ftp_directory') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_create_ftp_directory")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_create_ftp_directory");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_delete_ftp_directory') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_delete_ftp_directory")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_delete_ftp_directory");
    modal.style.display = "block";
  }
  });
  } 
  else if ( $(e.target).hasClass('button_delete_ftp_files') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_delete_ftp_files")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_delete_ftp_files");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_download_multiple_ftp_files') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_download_multiple_ftp_files")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_download_multiple_ftp_files");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_download_single_ftp_file') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_download_single_ftp_file")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_download_single_ftp_file");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_download_single_ftp_folder') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_download_single_ftp_folder")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_download_single_ftp_folder");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_invoke-ftp') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_invoke-ftp")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_invoke-ftp");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_rename_ftp_file') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_rename_ftp_file")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_rename_ftp_file");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_upload_multiple_ftp_files') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_upload_multiple_ftp_files")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_upload_multiple_ftp_files");
    modal.style.display = "block";
  }
  });
  } 
  else if ( $(e.target).hasClass('button_upload_multiple_ftp_folders') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_upload_multiple_ftp_folders")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_upload_multiple_ftp_folders");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_upload_single_ftp_file') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_upload_single_ftp_file")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_upload_single_ftp_file");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_upload_single_ftp_folder') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_upload_single_ftp_folder")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_upload_single_ftp_folder");
    modal.style.display = "block";
  }
  });
  }//WEB DATA EXTRACTION POP-UP START//
  else if ( $(e.target).hasClass('button_extract_data_from_webpage') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_extract_data_from_webpage")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_extract_data_from_webpage");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_take_screenshot_of_webpage') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_take_screenshot_of_webpage")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_take_screenshot_of_webpage");
    modal.style.display = "block";
  }
  });//WEB DATA EXTRACTION POP-UP ENDS//
  }//DIRECT WEB ACCESS POP-UP ENDS//
  else if ( $(e.target).hasClass('button_download_small_files') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_download_small_files")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_download_small_files");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_download_large_files') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_download_large_files")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_download_large_files");
    modal.style.display = "block";
  }
  });
  }
  else if ( $(e.target).hasClass('button_download_multiple_files') ){
    console.log("working");
    modalBtns = [...document.querySelectorAll(".button_download_multiple_files")];
    console.log(modalBtns);
    modalBtns.forEach(function(btn){
    btn.onclick = function() {
    console.log("Clicked");
    var modal = document.querySelector("#modalOne_download_multiple_files");
    modal.style.display = "block";
  }
  });
  }

});

// Close_Button
var closeBtns = [...document.querySelectorAll(".close")];
closeBtns.forEach(function(btn){
  btn.onclick = function() {
    var modal = btn.closest('.modal');
    modal.style.display = "none";
  }
});

window.onclick = function(event) {
  if (event.target.className === "modal") {
    event.target.style.display = "none";
  }
}