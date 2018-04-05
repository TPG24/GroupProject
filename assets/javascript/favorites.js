$(document).ready(function() {
  $(document).on('click', '.delete', function() {
    //var favorite = $(this).val();

    //confirm('Do you want to delete this favorite?');

    if (confirm('Do you want to delete this favorite?')) {
      $(this)
        .parentsUntil('tbody')
        .remove();
    } else {
      //link remains
    }
  });
});
