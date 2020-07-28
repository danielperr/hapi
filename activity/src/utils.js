
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
    "עבודה מעולה!",
    "עבודה טובה!",
    "כל הכבוד!",
    "סחתיין!",
    "מעולה!",
    "מצוין!",
    "נפלא!",
    "סחתיקה!",
  ];
  const bad_words = [
    "טעות!",
    "נסו שוב!",
    "טעות אבל לא נורא...",
    "תשובה שגויה!",
  ]

  // Choose a word set according to the given bollean
  const word_set = (boolean)?good_words:bad_words;
  // Return a random word out of the set
  return word_set[Math.floor(Math.random() * word_set.length)];
}
