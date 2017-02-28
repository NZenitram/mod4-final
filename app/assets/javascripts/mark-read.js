var $newLinkTitle, $newLinkUrl;

$(document).ready(function(){

  $('.hot-read').on('click', '.mark-read', function(){
    var $this = $(this);
    var linkId = this.id;
    
    if (this.parentElement.children[4].innerText.trim() == "true"){
      this.parentElement.children[4].innerText = "false"
      $.ajax({
        url: 'api/v1/links/' + linkId,
        method: 'PATCH',
        data: {read: false}
      });
    } else {
        this.parentElement.children[4].innerText = "true"
        $.ajax({
          url: 'api/v1/links/' + linkId,
          method: 'PATCH',
          data: {read: true}
        });
      }

    $.ajax({
      url: 'api/v1/links/' + linkId,
      method: 'PATCH',
      data: {read: true}
    });
    location.reload();
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
