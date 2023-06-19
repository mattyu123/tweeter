const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1687038785789
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1687125185789
  },
  {
    "user": {
      "name": "Matt",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@myu1"
    },
    "content": {
      "text": "Hi I am Matt"
    },
    "created_at": 91111234321414
  }
]

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
    <p>${tweet.created_at}</p>
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

//render function takes in an array of tweet objects and appends each to #tweets-container 
const renderTweets = function(tweetArr) {
  for (let item = 0; item < tweetArr.length; item++) {
    $('#tweets-container').append(createTweetElement(tweetArr[item]))
  }
}

renderTweets(data)

//Event listener that prevents the default behaviour 
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