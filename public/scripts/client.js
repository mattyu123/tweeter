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

  // $.ajax(server, {method: 'GET'})
  // .then (() => {
  //   console.log("success")
  // })
  // .catch((error) => {
  //   console.log(`error: ${error.status}, ${error.statusText}`)
  // })
  // }

//Event listener that sends the serialized form data to the server
$('.form-organizer').on("submit", function (event) {
  const url = '/tweets/';

  const totalCharacterCount = Number($('.counter').val());

  //checks to see if the input field exceeds the 140 character limit, alert user if that is the case
  if (totalCharacterCount < 0) {
    alert("your tweet is more than 140 characters, you cannot submit it");
    event.preventDefault();
    return false;
  }
  
  //checks to see if input field is blank, alerts user if that is the case
  if (totalCharacterCount === 140) {
    alert("you cannot submit an empty tweet");
    event.preventDefault();
    return false;
  }
  
  event.preventDefault();
  const formData = $(this).serialize()

  //send the post method via ajax and then returns the new tweet
  $.ajax({
    type: 'POST',
    url, 
    data: formData
  })
  .then(() => loadTweets(renderTweets))
  .catch((error)=> {
    alert(error.responseText)
  })
})

const renderTweets = function(tweetArr) {
  //empty the #tweets-container so that tweets are not duplicated when rendered 
  $('#tweets-container').empty();

  for (let item = 0; item < tweetArr.length; item++) {
    $('#tweets-container').prepend(createTweetElement(tweetArr[item]))
  }
}