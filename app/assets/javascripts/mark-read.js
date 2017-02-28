var $newLinkTitle, $newLinkUrl;

$(document).ready(function(){

  $('.hot-read').on('click', '.mark-read', function(){
    var $this = $(this);
    var linkId = this.id;

    if (this.parentElement.children[3].innerText.trim() == "true"){
      this.parentElement.children[3].innerText = "false"
      $(this).parent().children().first().css("text-decoration", "none")

      $.ajax({
        url: 'api/v1/links/' + linkId,
        method: 'PATCH',
        data: {read: false}
      });

    } else {

        this.parentElement.children[3].innerText = "true"
        $(this).parent().children().first().css("text-decoration", "line-through")
        $.ajax({
          url: 'api/v1/links/' + linkId,
          method: 'PATCH',
          data: {read: true}
        });
      }
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

   $('body').on('click', '.filter', function(){
     if (this.id === "show-all-read") {
       $('#false.hot-read').hide()
       $('#true.hot-read').show()
     } else if (this.id === "show-all-unread") {
       $('#true.hot-read').hide()
       $('#false.hot-read').show()
     } else {
       $('#true.hot-read').show()
       $('#false.hot-read').show()
     }
   })
   strikeThrough();
 })

  function strikeThrough(){
    var li = $('.hot-read')
    for (var i = 0; i < li.length; i++) {
      if (li[i].children[3].innerText.trim() === "false") {
        $(li[i]).parent().children().first().css("text-decoration", "none")
      } else if (li[i].children[3].innerText.trim() === "true"){
        $(li[i]).parent().children().first().css("text-decoration", "line-through")
      }
    }
  }
