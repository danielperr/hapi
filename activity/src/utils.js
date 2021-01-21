import { strings } from './localization';

export function shuffle(array) {
  const a = [...array];
  let j;
  let x;
  let i;

  for (i = a.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }

  return a;
}

export function getPhrase(boolean) {
  const goodWords = [
    strings.answerCorrect1,
    strings.answerCorrect2,
    strings.answerCorrect3,
    strings.answerCorrect4,
    strings.answerCorrect5,
    strings.answerCorrect6,
    strings.answerCorrect7,
    strings.answerCorrect8,
  ];
  const badWords = [
    strings.answerIncorrect1,
    strings.answerIncorrect2,
    strings.answerIncorrect3,
    strings.answerIncorrect4,
  ];

  // Choose a word set according to the given bollean
  const wordSet = (boolean) ? goodWords : badWords;
  // Return a random word out of the set
  return wordSet[Math.floor(Math.random() * wordSet.length)];
}

export function download(filename, text) {
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`,
  );
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
