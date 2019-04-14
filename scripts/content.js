
function myhide(element) {
  if (element) {
    element.style.display = 'none';
  }
}

function myhideAll(elements) {
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    if (element) {
      myhide(element);
    }
  }
}

function myremove(element) {
  if (element) {
    element.parentNode.removeChild(element);
  }
}

function clear() {
  var viewCounters = document.getElementsByClassName('view-count');
  var viewCounter = viewCounters[0];
  myhide(viewCounter);

  try {
    myhideAll(document.querySelectorAll('span.yt-view-count-renderer'))
  } catch (e) {}

  var topLevelButtons = document.querySelectorAll('#top-level-buttons');
  for (var i = 0; i < topLevelButtons.length; i++) {
    try {
      var topLevelButton = topLevelButtons[i];
      var likeText = topLevelButton.children[0].children[0].children[1];
      myhide(likeText);
      var dislikeText = topLevelButton.children[1].children[0].children[1];
      myhide(dislikeText);
    } catch (e) {}
  }

  var sentiment = document.getElementById('sentiment');
  myhide(sentiment);

  var subscriberCount = document.getElementById('subscriber-count');
  myhide(subscriberCount);
}

function clearSafe() {
  try {
    clear();
  } catch (e) {
  }
  try {
    clearMetaBlocks();
  } catch (e) {
  }
}

function clearMetaBlocks() {
  var subscribeButtons = document.querySelectorAll('yt-formatted-string.ytd-subscribe-button-renderer');
  var subscribeButton = subscribeButtons[0];
  if (subscribeButton) {
    var subscribeNumber = subscribeButton.children[0]
    myhide(subscribeNumber);
  }

  var metaBlocks = document.querySelectorAll('.ytd-video-meta-block:not(.stat-hider-clean)');
  for (var i = 0; i < metaBlocks.length; i++) {
    var metaBlock = metaBlocks[i];
    if (/^[0-9]+.*views?$/.exec(metaBlock.innerText)) {
      myhide(metaBlock);
    } else if (metaBlock.innerText == '') {
    } else {
      metaBlock.classList.add('stat-hider-clean');
    }
  }

  var gridStats = document.querySelectorAll('span.ytd-grid-video-renderer');
  for (var i = 0; i < gridStats.length; i++) {
    var gridStat = gridStats[i];
    if (/^[0-9]+.*views?$/.exec(gridStat.innerText)) {
      myhide(gridStat);
    } else if (gridStat.innerText == '') {
    } else {
      gridStat.classList.add('stat-hider-clean');
    }
  }

  var commentHeaders = document.querySelectorAll('.ytd-comments-header-renderer:not(.stat-hider-clean)');
  for (var i = 0; i < commentHeaders.length; i++) {
    var commentHeader = commentHeaders[i];
    if (/^[0-9]+.*Comments?$/.exec(commentHeader.innerText)) {
      myhide(commentHeader);
    } else {
      commentHeader.classList.add('stat-hider-clean');
    }
  }

  var actionButtons = document.querySelectorAll('.ytd-comment-action-buttons-renderer:not(.stat-hider-clean)');
  var voteCountDict = {
    'vote-count-left': true,
    'vote-count-middle': true,
  }
  for (var i = 0; i < actionButtons.length; i++) {
    var actionButton = actionButtons[i];
    if (actionButton.id in voteCountDict) {
      myhide(actionButton);
    } else {
      actionButton.classList.add('stat-hider-clean');
    }
  }

  var creatorHeartButtons = document.querySelectorAll('.ytd-creator-heart-renderer:not(.stat-hider-clean)');
  for (var i = 0; i < creatorHeartButtons.length; i++) {
    var creatorHeartButton = creatorHeartButtons[i];
    if (creatorHeartButton) {
      if (creatorHeartButton.id === 'creator-heart-button') {
        myremove(creatorHeartButton);
      } else {
        creatorHeartButton.classList.add('stat-hider-clean');
      }
    }
  }
}

function forceClear() {
  var cleanElements = document.querySelectorAll('.stat-hider-clean');
  for (var i = 0; i < cleanElements.length; i++) {
    var el = cleanElements[i];
    el.classList.remove('stat-hider-clean');
  }
  clearSafe();
}

document.addEventListener('DOMNodeInserted', function(e) {
  clearSafe();
}, false);

setInterval(forceClear, 1000);

clearSafe();
