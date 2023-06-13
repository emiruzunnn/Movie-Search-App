    function search() {
      var apiKey = '579d7228';
      var searchTerm = document.getElementById('searchInput').value;
      var url = 'https://www.omdbapi.com/?apikey=' + apiKey + '&s=' + searchTerm;

      // Sorguyu boşaltır
      document.getElementById('results').innerHTML = '';

      // Boş arama sorgu
      if (searchTerm === '') {
        return;
      }

      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
          if (data.Response === 'True') {
            var movies = data.Search;
            var html = '';
            for (var i = 0; i < movies.length; i++) {
              var movie = movies[i];
              html += '<div>';
              html += '<h2><a href="#" onclick="showDetail(\'' + movie.imdbID + '\')">' + movie.Title + '</a></h2>';
              html += '<p>Yıl: ' + movie.Year + '</p>';
              html += '<p>Tür: ' + movie.Type + '</p>';
              html += '<img src="' + movie.Poster + '" alt="' + movie.Title + '">';
              html += '</div>';
            }
            document.getElementById('results').innerHTML = html;
          } else {
            document.getElementById('results').innerHTML = 'Film bulunamadı.';
          }
        },
        //bu alanı Api kodunda sorun yaşadığım kısımda sorun yaşanıp yaşanmadığını anlamak için yaptım. İlk aşamada click halinde boş dönüyordu.
        //Bu sebepten dolayı bu kodu tercih ettim.
        error: function() {
          document.getElementById('results').innerHTML = 'API isteği sırasında bir hata oluştu.';
        }
      });
    }

    //DETAYLAR------------------------------------

    function showDetail(imdbID) {
      var apiKey = '579d7228';
      var url = 'https://www.omdbapi.com/?apikey=' + apiKey + '&i=' + imdbID;

      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
          if (data.Response === 'True') {
            var detailContainer = document.getElementById('detailContainer');
            var detailTitle = document.getElementById('detailTitle');
            var detailYear = document.getElementById('detailYear');
            var detailType = document.getElementById('detailType');
            var detailPlot = document.getElementById('detailPlot');
            var detailActors = document.getElementById('detailActors');
            var detailRating = document.getElementById('detailRating');
            var detailPoster = document.getElementById('detailPoster');

            detailTitle.innerHTML = data.Title;
            detailYear.innerHTML = 'Yıl: ' + data.Year;
            detailType.innerHTML = 'Tür: ' + data.Type;
            detailPlot.innerHTML = 'Konu: ' + data.Plot;
            detailActors.innerHTML = 'Oyuncular: ' + data.Actors;
            detailRating.innerHTML = 'IMDb Puanı: ' + data.imdbRating;
            detailPoster.src = data.Poster;

            detailContainer.style.display = 'block';
          } else {
            alert('Film detayları alınırken bir hata oluştu.');
          }
        },
      });
    }



    //--------------------------------------------------------------------------------------------------------------------------
    //FAVORİLER ALANI
    function addToFavorites() {
        var imdbID = document.getElementById('detailImdbID').innerText;
      
        // Favori film zaten listede varsa ekleme işlemi yapma
        if (isFavorite(imdbID)) {
          alert('Bu film zaten favorilerde.');
          return;
        }
      
        //Tekrardan apiKey tanımlama favoriler kısmı için
        var apiKey = '579d7228';
        var url = 'https://www.omdbapi.com/?apikey=' + apiKey + '&i=' + imdbID;
      
        $.ajax({
          url: url,
          type: 'GET',
          dataType: 'json',
          success: function(data) {
            if (data.Response === 'True') {
              var favoriteMovie = {
                imdbID: data.imdbID,
                Title: data.Title,
                Year: data.Year,
                Type: data.Type,
                Poster: data.Poster
              };
              favorites.push(favoriteMovie);
              saveFavoritesToStorage(); // Favorileri localStorage'e kaydet
              alert('Film favorilere eklendi.');
      
              // Yönlendirme yap
              window.location.href = 'favorites.html';
            } else {
              alert('Film favorilere eklenirken bir hata oluştu.');
            }
          },
        });
      }

//-------------------------------------------------------------------------------------------------------------------------------------
//FAVORİTES.HTML ALANI

// favorites.html sayfasında çalışması gereken JavaScript kodu

// Favori filmleri localStorage'den alması gereken fakat bu alanda sorun yaşanan kısım
var favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Favori filmleri yıl türüne göre listeyecek alan
function displayFavorites() {
  var favoritesContainer = document.getElementById('favoritesContainer');

  if (favorites.length === 0) {
    favoritesContainer.innerHTML = 'Henüz favori film yok.';
  } else {
    var html = '';
    for (var i = 0; i < favorites.length; i++) {
      var movie = favorites[i];
      html += '<div>';
      html += '<h2>' + movie.Title + '</h2>';
      html += '<p>Yıl: ' + movie.Year + '</p>';
      html += '<p>Tür: ' + movie.Type + '</p>';
      html += '<img src="' + movie.Poster + '" alt="' + movie.Title + '">';
      html += '</div>';
    }
    favoritesContainer.innerHTML = html;
  }
}

// Sayfa yüklendiğinde favori filmleri listeler ayır bir window kısmı açılmalı
window.addEventListener('DOMContentLoaded', displayFavorites);
      
    
    function hideDetail() {
      var detailContainer = document.getElementById('detailContainer');
      detailContainer.style.display = 'none';
    }

