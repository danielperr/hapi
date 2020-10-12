
import { strings } from './localization';

export function shuffle(a) {
    var j, x, i;

    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }

    return a;
}

export function getPhrase(boolean) {
  const good_words = [
    strings.answerCorrect1,
    strings.answerCorrect2,
    strings.answerCorrect3,
    strings.answerCorrect4,
    strings.answerCorrect5,
    strings.answerCorrect6,
    strings.answerCorrect7,
    strings.answerCorrect8,
  ];
  const bad_words = [
    strings.answerIncorrect1,
    strings.answerIncorrect2,
    strings.answerIncorrect3,
    strings.answerIncorrect4,
  ]

  // Choose a word set according to the given bollean
  const word_set = (boolean)?good_words:bad_words;
  // Return a random word out of the set
  return word_set[Math.floor(Math.random() * word_set.length)];
}
