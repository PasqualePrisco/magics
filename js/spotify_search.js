function getTrack(param, token) {
    console.log(token);
    var settings = {
        "url": "https://api.spotify.com/v1/search?q=pastello%20bianco&type=track",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer BQD6bdrFENVPsnM7XgxgP-jBxk0iugDxeaM2rKQUZ7B3Wnh6BT69Xi3RLx1Oh-th0AaDUBCroMTOPLakjd6BidnjFpatGNPzVvfj9FGd4PPAA-6PdVY"
        },
    };

    $.ajax(settings).done(function (response) {
        window.location.replace(response.tracks.items[0].external_urls.spotify);
    });
}

function useSpotify(param) {
    var settings = {
        "url": "https://accounts.spotify.com/api/token",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": "Basic NzI3YjIwZGQyNjc2NDc1N2FjYWI1NjVjZTEzZDBmNzc6MmE1Zjk3Yjg4YmY3NDg3NWFkODc1NzA4M2MxM2EwMmI="
        },
        "data": {
            "grant_type": "client_credentials"
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response.access_token);
        getTrack(param, response.access_token);
    });
}