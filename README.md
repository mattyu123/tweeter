# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

Users can write in a tweet in the text box, and their tweet will automatically refresh to the top of their timeline. 

## User Experience

### **Errors**
There is no limit to the number of tweets a user can create, however, there is a character limit of 140 characters. Users cannot submit a tweet that exceeds this limit nor can they submit an empty tweet. If they do so, they will be met with one of the errors below:

![screenshot of user attempting to submit an empty tweet](images/emptyTweetError.png)

![screenshot of user attempting to submit a tweet that's too long](images/tweetTooLong.png)

When the user clicks on the tweet button, their tweet will be populated at the top of the timeline without needing the page to refresh. 

## Dependencies
- Express
- Node 5.10.x or above
- Body-parser: v1.15.2
- Chance: v1.0.2
- md5: v2.1.0
- Timeago.js: v4.0.2