import $ from 'jquery';

function drop(x) {
  $(`.confetti-${x}`).animate(
    {
      top: '100%',
      left: `+=${Math.random() * 15}%`,
    },
    Math.random() * 3000 + 3000,
    () => {
      $(`.confetti-${x}`).remove();
    },
  );
}

function create(i) {
  const width = Math.random() * 12;
  const height = width * 0.4;

  const colourIdx = Math.ceil(Math.random() * 3);
  let colour = 'red';

  switch (colourIdx) {
    case 1:
      colour = 'yellow';
      break;
    case 2:
      colour = 'blue';
      break;
    default:
      colour = 'red';
  }
  $(`<div class="confetti-${i} ${colour}"></div>`)
    .css({
      width: `${width}px`,
      height: `${height}px`,
      top: `${-Math.random() * 20}%`,
      left: `${10 + Math.random() * 80}%`,
      opacity: Math.random() + 0.5,
      transform: `rotate(${Math.random() * 360}deg)`,
    })
    .appendTo('.confetti-wrapper');

  drop(i);
}

function dropConfetti() {
  for (let i = 0; i < 150; i++) {
    create(i);
  }
}

export default dropConfetti;
