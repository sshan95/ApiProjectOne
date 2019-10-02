"use strict";

const apikey = "b853aa928e7ffdda1f5dcdd8532de394";

const searchURL= "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/"


function displayResults(responseJson) {
  let trackLists = responseJson.message.body.track_list; 
  let trackArray = [];

  trackLists.forEach(track => {
    let eachTrack = {
      trackName: track.track.track_name,
      artistName: track.track.artist_name,
      albumName: track.track.album_name,
      trackShareUrl: track.track.track_share_url
    }
    trackArray.push(eachTrack);
  })

  $("#results-list").empty();

  trackArray.forEach(trackObj => {
    $("#results-list").append(
      `<li><h3>${trackObj.trackName}</h3>
      <p>${trackObj.artistName}</p>
      <p>${trackObj.albumName}</p>
      <p><a href="${trackObj.trackShareUrl}">Visit Song URL</a></p>
      </li>`
    );
  })
    $("#results").removeClass("hidden");
};

function getSong(query, words) {
  console.log("Songs Fired");
  const params = {
    api_key: apikey,
    q: query,
    lyrics: words
   };
   const url = searchURL + "track.search" + "?q_lyrics=" + encodeURIComponent(query) + "&apikey=" + apikey

   console.log(url);
   
   fetch(url)
   .then(response => {
     if (response.ok) {
       return response.json();
     }
     throw new Error(response.statusText);
   })
   .then(responseJson => displayResults(responseJson))
   .catch(err => {
     console.log(err);
     $("#js-error-message").text(`Something went wrong!: ${err.message}`);
   });
   watchForm();
}

function watchForm() {
  $("form").submit((event) => {
    event.preventDefault();
    const searchTerm =$("#searchLyrics").val();
    getSong(searchTerm);
  });
}

$(watchForm);