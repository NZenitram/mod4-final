var $newLinkTitle, $newLinkUrl;

$(document).ready(function(){
  $newLinkTitle = $("#link-title");
  $newLinkUrl  = $("#link-url");
  $("#new-link").on('submit', createLink);

  $(".hot-read").on('click', '.edit-link-button', function(){
    var $this = $(this);
    var linkId = this.id;
    $(this.parentElement).append(editForm())
  });


$(".hot-read").on('click', '.press', function(){

  var linkId = $(this).parents().children('.id').text();
  var title = $('#edit-title').val()
  var url = $('#edit-url').val()
  var read = false;

  $.ajax({ url: '/api/v1/links/' + linkId,
          method: 'PATCH',
           data: {id: linkId,
           title: title,
           url: url,
           read: read}
         });
  })
})


function editForm(){

  return `<form id="edit-link">
  <h4>Edit Your Link:</h4>
    <label>URL:
      <input id="edit-url">
    </label>
    <label>Title:
      <input id="edit-title">
    </label>
    <input class="press" type="submit" value="Edit Link">
  </form>`
}

function createLink (event){
  event.preventDefault();

  var link = getLinkData();

  $.post("/api/v1/links", link)
   .then( renderLink )
   .fail( displayFailure )
   location.reload();
 }

function getLinkData() {
 return {
   title: $newLinkTitle.val(),
   url: $newLinkUrl.val()
 }
}

function getLinks (){
  $.get()
}

function renderLink(link){
  $("#links-list").append( linkHTML(link) )
  // clearLink();
}

function linkHTML(link) {

    return `<div class='link' data-id='${link.id}' id="link-${link.id}">
              <p class='link-title'>${ link.title }</p>
              <p class='link-url'>${ link.url }</p>

              <p class="link_read">
                ${ link.read }
              </p>
              <p class="link_buttons">
                <button class="mark-read">Mark as Read</button>
                <button class='edit-link'>Edit</button>
                <button class='delete-link'>Delete</button>
              </p>
            </div>`
}

function clearLink() {
  $newLinkTitle.val("");
  $newLinkUrl.val("");
}

function displayFailure(failureData){
  alert("FAILED attempt to create new Link: " + failureData.responseText);
}
