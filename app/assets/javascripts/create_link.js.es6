var $newLinkTitle, $newLinkUrl;

$(document).ready(function(){
  $newLinkTitle = $("#link-title");
  $newLinkUrl  = $("#link-url");
  $("#new-link").on('submit', createLink);

  $(".hot-read").on('click', '.edit-link', function(){
    $(".hot-read").append(editForm())
  })

  $("#edit-link").on('submit', sendEdit)

  $('.hot-read').on('click', '.mark-read', function(){
    sendToReads()
  })
})

function sendToReads(){
  var id = $('.hot-read .id').text();
  var title = $('#edit-title').val()
  var url = $('#edit-url').val()
  var read = $('.hot-read .read').text();

  $.post("http://localhost:8080/links",{
          id: id,
          title: title,
          url: url,
          read: read}
        )
}

function sendEdit(){
  var id = $('.hot-read .id').text();
  var title = $('#edit-title').val()
  var url = $('#edit-url').val()
  var read = $('.hot-read .read').text();

  $.post("api/v1/link", {
           id: id,
           title: title,
           url: url,
           read: read}
  )
}

function editForm(){

  return `<form id="edit-link">
  <h4>Edit Your Link:</h4>
    <label>URL:
      <input id="edit-url">
    </label>
    <label>Title:
      <input id="edit-title">
    </label>
    <input type="submit" value="Edit Link">
  </form>`
}

function createLink (event){
  event.preventDefault();

  var link = getLinkData();

  $.post("/api/v1/links", link)
   .then( renderLink )
   .fail( displayFailure )
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

$("#my-input").on('keyup', function() {
   var filter = this.value.toUpperCase();
   var search = $('.hot-read')
   for (i = 0; i < search.length; i++) {
    td = search[i].getElementsByClassName('url')[0]
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        search[i].style.display = "";
      } else {
        search[i].style.display = "none";
      }
    }
  }
 });
