//API
var forismaticAPI = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?';

$(document).ready(function() {

  //element variables
  var myBox = document.querySelector('#quote-box');
  var myButton = document.getElementById('button');
  var myTweeter = document.querySelector('#tweeter');
  var myWord = document.querySelector('#word');
  var wordsNext = document.querySelector('#words-next');
  var myContainer = document.querySelector('#container');
  var tweetLink = document.getElementById('tweetlink');
  var bigBox = document.getElementById('big');

  //Header
  var words = [
    'Plenty more where that came from',
    'I really like this one',
    'This one should do',
    'I LOVE QUOTES',
    'I could do this all day',
    'So beautiful...',
    'This one makes me cry'

  ];

  //Button Words
  var btn = [
    'More!',
    'Again!',
    'Carry on',
    'Continue!',
    'This is great!',
    'Perfect!',
    'Awesome!'
  ];



  // first button click
  myButton.addEventListener('click', initialClick, false);

  function initialClick() {
    //Remove all classes
    myButton.classList.remove("button-first");
    myButton.classList.add("button-first-click");

    myContainer.classList.remove("container");
    myContainer.classList.add("container-change");

    myWord.classList.remove("words-first");
    myWord.classList.add("words-first-click");
    //Use API to get quote
    $.getJSON(forismaticAPI, function(data) {
      $('#quote-box').empty();
      $('#quote-box').append('<blockquote id = "quoteWords">' + data.quoteText + '</blockquote>' + '<p id="author"> —  ' + data.quoteAuthor + '</p>');
      while (data.quoteText.length > 140);

    });
    //Add classes back
    setTimeout(function() {
      myBox.classList.remove('quote-box-hidden');
      myBox.classList.add('quote-box-alive');
    }, 2500);

    setTimeout(function() {
      myWord.classList.remove('words-first-click');
      myWord.classList.add('words-alive');
      myWord.firstChild.textContent = 'How about this one?';
    }, 3500);

    setTimeout(function() {
      myButton.classList.remove('button-first-click');
      myButton.classList.add('button-again');
      myButton.firstChild.textContent = 'Another!';
    }, 4500);

    setTimeout(function() {
      myTweeter.classList.remove('tweet-hidden');
      myTweeter.classList.add('tweet-alive');
    }, 6000);
    myTweeter.addEventListener('click', tweeterThis, false);

    setTimeout(function() {
      myContainer.classList.remove('container-change');
      myContainer.classList.add('container');
    }, 6000);
    //remove first click listener, add next listener
    myButton.removeEventListener("click", initialClick, false);
    myButton.addEventListener("click", afterClicks, false);
    console.log("initialClick finished");
  }

  //Tweet quote option
  function tweeterThis() {
    tweetLink.setAttribute("href",
      'https://twitter.com/intent/tweet?text=' + myBox.firstChild.innerHTML + " " + myBox.children[1].innerHTML);
  }

  //All subsequent clicks
  function afterClicks() {

    var word = words[Math.floor(Math.random() * words.length)];
    var btnWord = btn[Math.floor(Math.random() * btn.length)];
    //remove classes
    myButton.classList.remove("button-again");
    myButton.classList.add("button-final");

    myBox.classList.remove("quote-box-alive");
    myBox.classList.add("quote-box-click");

    bigBox.classList.remove("big-box");
    bigBox.classList.add("big-box-click");

    myWord.classList.remove("words-alive");
    myWord.classList.add("words-final");

    myContainer.classList.remove("container");
    myContainer.classList.add("container-change");

    myTweeter.classList.remove("tweet-alive");
    myTweeter.classList.add("tweet-final");

    setTimeout(function() {
      $.getJSON(forismaticAPI, function(data) {
        $('#quote-box').empty();
        $('#quote-box').append('<blockquote>' + data.quoteText + '</blockquote>' + '<p id="author"> —  ' + data.quoteAuthor + '</p>');
        while (data.quoteText.length > 140);
      });
    }, 2000);


    setTimeout(function() {
      myBox.classList.remove('quote-box-click');
      myBox.classList.add('quote-box-alive');
    }, 2500);

    setTimeout(function() {
      bigBox.classList.remove('big-box-click');
      bigBox.classList.add('big-box');
    }, 2500);

    setTimeout(function() {
      myWord.classList.remove('words-final');
      myWord.classList.add('words-alive');
      myWord.firstChild.textContent = word;
    }, 3500);

    setTimeout(function() {
      myButton.classList.remove('button-final');
      myButton.classList.add('button-again');
      myButton.firstChild.textContent = btnWord;
    }, 4500);

    setTimeout(function() {
      myTweeter.classList.remove('tweet-final');
      myTweeter.classList.add('tweet-alive');
    }, 6000);

    setTimeout(function() {
      myContainer.classList.remove('container-change');
      myContainer.classList.add('container');
    }, 6000);
    console.log("afterClicks finished");
  }


});
