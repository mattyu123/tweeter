//create an escape function to prevent XSS attacks
const escapeText = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Take a tweet object and return a tweet article element containing entire HTML structure of tweet
const createTweetElement = function(tweet) {
  let $tweet = (
    `<article class="individual-tweet">
      <header class = "tweet-header">
        <div id="face-name">
          <i class="fa-solid fa-face-smile"></i>
          <h3 class="users-name">${tweet.user.name}</h3>
        </div>
        <h3 id="user-handle">${tweet.user.handle}</h3>
        </header>
        <p class="tweet-content">
          ${escapeText(tweet.content.text)}
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
    .then(function(data) {
      renderTweets(data);
    })
    .catch((error) => {
      console.log(`error: ${error.status}, ${error.statusText}`);
    });
};

//Event listener that sends the serialized form data to the server
$('.form-organizer').on("submit", function(event) {
  const url = '/tweets/';

  // console.log(event)

  const totalCharacterCount = Number($('.counter').val());

  //Remove any existing banner and alert user if tweet more than 140 characters
  if (totalCharacterCount < 0) {
    $('#tweet-long-error').slideUp(("slow", () => {}));
    $('#empty-tweet-error').slideUp(("slow", () => {}));
    $('#tweet-long-error').slideDown(("slow", () => {}));
    event.preventDefault();
    return false;
  }

  //Remove any existing banner and alert user if tweet is empty
  //add the condition if the tweet is empty here
  if (totalCharacterCount === 140) {
    $('#tweet-long-error').slideUp(("slow", () => {}));
    $('#empty-tweet-error').slideUp(("slow", () => {}));
    $('#empty-tweet-error').slideDown(("slow", () => {}));
    event.preventDefault();
    return false;
  }

  //get rid of error banner before submitting new tweet
  $('#tweet-long-error').slideUp(("slow", () => {}));
  $('#empty-tweet-error').slideUp(("slow", () => {}));
  
  event.preventDefault();
  const formData = $(this).serialize();

  //send the post method via ajax and then return the new tweet
  $.ajax({
    type: 'POST',
    url,
    data: formData
  })
    .then(() => loadTweets(renderTweets))
    .catch((error)=> {
      alert(error.responseText);
    });

  //clear the new tweet area after a user submits their tweet
  $('.form-organizer')[0].reset();
});

//function takes the tweet and adds it to a new tweet container
const renderTweets = function(tweetArr) {
  //empty the #tweets-container so that tweets are not duplicated when rendered
  $('#tweets-container').empty();
  
  for (let item = 0; item < tweetArr.length; item++) {
    $('#tweets-container').prepend(createTweetElement(tweetArr[item]));
  }
};

//When the page loads, load the tweets that are already there
$(document).ready(
  loadTweets(renderTweets)
)