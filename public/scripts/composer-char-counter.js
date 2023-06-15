$(document).ready(function() {
  console.log("your js file is successfully linked")
});

//Counter for how many characters the user has left
$('#tweet-text').on("input", function() {
  const total = $(this).val();
  const maxCharacters = 140;
  const lengthOfTweet = total.length;
  const charactersRemaining = maxCharacters - lengthOfTweet

  //traverse up the DOM tree and back down again looking for .counter class
  $(this).parents().find(".counter").val(charactersRemaining)

  const parent = $(this).parents().find(".counter")

  if (charactersRemaining < 0) {
    $(parent).css("color", "red")
  }
})

