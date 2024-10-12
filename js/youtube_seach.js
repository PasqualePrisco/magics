var youtubeReady = false;

function initYoutube() {
  gapi.client.setApiKey("AIzaSyDVmNiTQl_aXwi1IRsHnY0bPh2_DqjHzR8");
  gapi.client.load("youtube", "v3", function () {
    youtubeReady = true;
  });
}

async function useYoutube(param) {
  while (!youtubeReady) {
    await sleep(3000);
  }

  id = await searchYoutube(param);

  var isAndroid = /Android/i.test(navigator.userAgent);
  var isChrome =
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  if (isChrome) {
    window.location.replace(`https://www.youtube.com/watch?v=${id}&t=30s&autoplay=1&mute=1`);
  } else if (isAndroid) {
    window.location = `vnd.youtube://${id}?t=30s&autoplay=1&mute=1`;
  } else {
    window.location.replace(`https://www.youtube.com/watch?v=${id}&t=30s&autoplay=1&mute=1`);
  }
}

function searchYoutube(search) {
  return new Promise((resolve, reject) => {
    var request = gapi.client.youtube.search.list({
      part: "snippet",
      type: "video",
      q: encodeURIComponent(search).replace(/%20/g, "+"),
      maxResults: 1,
      topicId: "/m/04rlf",
    });

    request.execute(function (response) {
      resolve(response.result.items[0].id.videoId);
    });
  });
}
