const data =
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1687037192188
  }

//Takes a tweet object and returns a tweet article element containing entire HTML structure of tweet
const createTweetElement= function(tweet) {
  let $tweet = (
  `<article>
    <header class = "tweet-header">
      <div>
        <i class="fa-solid fa-face-smile"></i>
        <h3>
          ${tweet.user.name}
        </h3>
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
}

const $tweet = createTweetElement(data)

console.log($tweet)

$('.tweets-container').append($tweet)