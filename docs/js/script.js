var buttonMenu = document.querySelector('.js-menu-button');
var menu = document.querySelector('.header-menu');

buttonMenu.addEventListener('click', function () {
  menu.classList.toggle('header-menu--opened');
});

var grid = document.querySelector('.grid');

var template = document.querySelector('#moduleTemplate');

var moduleTemplate = template.content.querySelector('.module');
var moduleStats = template.content.querySelector('.module__stats');
var moduleButtons = template.content.querySelector('.module__buttons');
var moduleGraph = template.content.querySelector('.module__graph');
var modulePlayer = template.content.querySelector('.player');
var modulePicture = template.content.querySelector('.module__picture');

var data;

var xhr = new XMLHttpRequest();
xhr.open('GET', 'events.json', false);
xhr.send();
if (xhr.status != 200) {
  alert( xhr.status + ': ' + xhr.statusText );
} else {
  data = JSON.parse(xhr.responseText);
}

var events = data.events;

for (var i = 0; i < events.length; i++) {

  var module = moduleTemplate.cloneNode(true);

  // type
  if (events[i].type ===  'critical') {
    module.classList.add('module--alert');
  }

  // title
  module.querySelector('.module__title').innerHTML += events[i].title;

  // source
  module.querySelector('.module__type').textContent = events[i].source;

  // time
  module.querySelector('.module__date').textContent = events[i].time;

  // description
  if (events[i].description !== null) {
    module.querySelector('.module__message').textContent = events[i].description;
  }

  // icon
  module.querySelector('.module__icon svg use').setAttributeNS('http://www.w3.org/1999/xlink','href','#' + events[i].icon);

  // size
  switch(events[i].size) {
    case 'm':
      module.classList.add('grid__cell--m');
      break;
    case 'l':
      module.classList.add('grid__cell--l');
      break;
    default:
      module.classList.add('grid__cell--s');
      break
  }

  // data
  if (typeof events[i].data !== 'undefined') {

    // data.image
    if (typeof events[i].data.image !== 'undefined') {
      var picture = modulePicture.cloneNode(true);
      module.querySelector('.module__message').appendChild(picture);
    }

    // data.buttons
    if (typeof events[i].data.buttons !== 'undefined') {
      var buttons = moduleButtons.cloneNode(true);
      module.querySelector('.module__message').appendChild(buttons);
    }

    // data.albumcover
    if (typeof events[i].data.albumcover !== 'undefined') {
      var player = modulePlayer.cloneNode(true);
      module.querySelector('.module__message').appendChild(player);
    }

    // data.temperature
    if (typeof events[i].data.temperature !== 'undefined') {
      var stats = moduleStats.cloneNode(true);
      module.querySelector('.module__message').appendChild(stats);
    }

    // data.type
    if (typeof events[i].data.type !== 'undefined') {
      var graph = moduleGraph.cloneNode(true);
      module.querySelector('.module__message').appendChild(graph);
    }

  }

  grid.appendChild(module);
}

