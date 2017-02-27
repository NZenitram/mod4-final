var $newLinkTitle, $newLinkUrl;

$(document).ready(function(){

  $('#links-list').on('click', 'button.mark-read', function(){
    var $this = $(this);
    var linkId = $this.parents('.link').data('id');

    $.ajax({
      url: '/api/v1/links/' + linkId,
      method: 'PATCH',
      data: {read: true}
    });
  })

  $("#my-input").on('keyup', function() {
     var filter = this.value.toUpperCase();
     var search = $('.hot-read')
     for (i = 0; i < search.length; i++) {
      td = search[i].getElementsByClassName('title')[0]
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          search[i].style.display = "";
        } else {
          search[i].style.display = "none";
        }
      }
    }
   });
})
