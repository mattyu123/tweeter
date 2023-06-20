
//Takes a tweet object and returns a tweet article element containing entire HTML structure of tweet
const createTweetElement= function(tweet) {
  let $tweet = (
  `<article class="individual-tweet">
    <header class = "tweet-header">
      <div class="face-name">
        <i class="fa-solid fa-face-smile"></i>
        <h3>${tweet.user.name}</h3>
      </div>
      <h3 id="user-handle">${tweet.user.handle}</h3>
    </header>
    <p class="tweet-content">
      ${tweet.content.text}
    </p>
    <footer class="tweet-footer">
    <p>${timeago.format(tweet.created_at)}</p>
    <div>
      <i class="fa-solid fa-flag" id = "fa-flag"></i>
      <i class="fa-solid fa-retweet" id = "fa-retweet"></i>
      <i class="fa-solid fa-heart" id = "fa-heart"></i>
    </div>
  </footer>
  </article>
  `);
  return $tweet;
};

//Event listener that sends the serialized form data to the server
$('.form-organizer').on("submit", function (event) {
  const url = '/tweets/';
  
  event.preventDefault();
  const formData = $(this).serialize()

  $.ajax({
    type: 'POST',
    url, 
    data: formData
  })
  .then(console.log("success"))
  .catch((error)=> {
    console.log(error.responseText)
  })
})

//render function takes in an array of tweet objects and appends each to #tweets-container 
const renderTweets = function(tweetArr) {
  for (let item = 0; item < tweetArr.length; item++) {
    $('#tweets-container').append(createTweetElement(tweetArr[item]))
  }
}

//function that fetches tweets using ajax
const loadTweets = function(renderTweets) {
  const server = '/tweets/';

  $.ajax(server, {method: 'GET'})
    .then (function (data) {
      renderTweets(data);
    })
    .catch((error) => {
      console.log(`error: ${error.status}, ${error.statusText}`)
    })
  }

loadTweets(renderTweets)

