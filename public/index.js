(function() {
  // const url = 'https://apod-viewer-app.herokuapp.com/data';
  const url = 'http://localhost:3000/data'; // If you want to run it locally
  $.get(url, (res) => {

    // The API returns an array sorted from oldest to most recent, that is why I reverse it
    const thumbnailIds = setGalleryThumbnails(res.reverse());
    setMainPicture(thumbnailIds[0]);
  });
})();


function setMainPicture(thumbnailId) {
  $('#main-media-container iframe').addClass('hidden');
  $('#main-media-container img').addClass('hidden');

  const photo = $(`#${thumbnailId}`).data('info');

  if (photo.media_type === 'video') {
    $('#main-media-container iframe').toggleClass('hidden');
    $('#main-media-container iframe').attr('src', photo.url);
  } else {
    $('#main-media-container img').toggleClass('hidden');
    $('#main-media-container img').attr('src', photo.url);
  }
  $('#main-title').text(photo.title);
  $('#main-explanation').text(photo.explanation);
}


function setGalleryThumbnails(photos) {
  const thumnbnailIds = [];
  photos.forEach(photo => {
    // Each thumbnail is identified by the date of the photo it is containing
    // since there can only be a photo per day
    if (photo.media_type === 'video') {
      $('#gallery').append(`
        <div class="thumbnail" id="${photo.date}">
          <div class="thumbnail-title">${photo.title}</div>
          <div class="thumbnail-video"><i class="fas fa-video"></i></div>
        </div>
      `);
    } else {  
      $('#gallery').append(`
        <div class="thumbnail" id="${photo.date}">
          <div class="thumbnail-title">${photo.title}</div>
          <img class="thumbnail-img" src=${photo.url} alt="">
        </div>
      `);
    }

    $(`#${photo.date}`).data('info', photo);

    $(`#${photo.date}`).click(() => setMainPicture(photo.date));

    thumnbnailIds.push(photo.date);
  });
  return thumnbnailIds;
}
