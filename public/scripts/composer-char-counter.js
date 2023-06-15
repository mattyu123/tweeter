$(document).ready(function() {
  console.log("your js file is successfully linked")
});

$('#tweet-text').on("input", function() {
  const total = $(this).val()

  console.log(total)
  console.log(total.length)
})