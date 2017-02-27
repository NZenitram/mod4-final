var $newLinkTitle, $newLinkUrl;

$(document).ready(function(){
  $newLinkTitle = $("#link-title");
  $newLinkUrl  = $("#link-url");
  $("#new-link").on('submit', createLink);

  $("#links-list").on('click', '.edit-link', function(){
    $("#links-list").append(editForm())

  $("#edit-link").on('submit', sendEdit)
  })
})

function sendEdit(){
  var id = $('.link').attr('data-id');
  var title = $('#edit-title').val()
  var url = $('#edit-url').val()
  var read = $('.link .link_read').text();

  $.post("api/v1/link", {
           link_id: id,
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
  console.log("FAILED attempt to create new Link: " + failureData.responseText);
}
