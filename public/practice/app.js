/* Web制作実習：完成見本。
 * 授業ではこの全体を一度に写さず、1つの機能ずつ練習します。
 * HTML/CSS版は、このファイルを読み込みません。
 */
'use strict';

// JavaScriptを使えるときだけ、追加の操作を見せる。
document.querySelectorAll('[data-js-tools]').forEach(function (area) {
  area.hidden = false;
});

// 1. classを切りかえる：文章の大きさを変える。
const textSizeButton = document.getElementById('text-size');
if (textSizeButton) {
  textSizeButton.addEventListener('click', function () {
    const isLarge = document.body.classList.toggle('large-text');
    textSizeButton.setAttribute('aria-pressed', String(isLarge));
    textSizeButton.textContent = isLarge ? '文字を元に戻す' : '文字を大きく';
  });
}

// 2. true / false を使う：説明を出す・隠す。
const introButton = document.getElementById('intro-toggle');
const introMore = document.getElementById('intro-more');
if (introButton && introMore) {
  introButton.addEventListener('click', function () {
    introMore.hidden = !introMore.hidden;
    introButton.setAttribute('aria-expanded', String(!introMore.hidden));
    introButton.textContent = introMore.hidden ? 'もう少し読む ＋' : '短くする −';
  });
}

// 3. 配列と番号：同じ場所で、写真・説明・出典を一緒に切りかえる。
const photoData = [
  { id: 'hondo', name: '本堂と京都のまち', author: 'Jordy Meow', license: 'CC BY-SA 3.0', alt: '木々に囲まれた清水寺の本堂。奥に京都のまちが見えます。' },
  { id: 'autumn', name: '秋の清水寺', author: 'Siegfried Ehret', license: 'CC BY-SA 3.0', alt: '赤や黄色の木々に囲まれた清水寺の本堂。' },
  { id: 'gate', name: '仁王門', author: 'Volfgang', license: 'CC BY-SA 3.0', alt: '清水寺の入口にある、赤い仁王門。' },
  { id: 'water', name: '音羽の滝', author: 'Cun Cun', license: 'CC BY-SA 4.0', alt: '音羽の滝。三つに分かれて水が流れています。' }
];
const gallery = document.getElementById('gallery-photo');
if (gallery) {
  let currentPhoto = 0;
  const galleryButtons = document.querySelectorAll('[data-photo]');
  function showPhoto(number) {
    currentPhoto = number;
    const item = photoData[currentPhoto];
    gallery.className = 'photo photo-' + item.id;
    const sourceThumb = document.querySelector('[data-photo="' + number + '"] img');
    const image = gallery.querySelector('img');
    if (sourceThumb && image) {
      image.src = sourceThumb.src;
      image.alt = item.alt;
    }
    const caption = document.getElementById('gallery-caption');
    const link = document.createElement('a');
    link.href = '../credits.html#' + item.id;
    link.textContent = item.license + '・出典';
    caption.replaceChildren(document.createTextNode(item.name + ' / ' + item.author + ' / '), link);
    document.getElementById('gallery-number').textContent = (number + 1) + ' / ' + photoData.length;
    galleryButtons.forEach(function (button, index) {
      button.setAttribute('aria-pressed', String(index === currentPhoto));
    });
  }
  galleryButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      showPhoto(Number(button.dataset.photo));
    });
  });
  document.getElementById('gallery-next').addEventListener('click', function () {
    let next = currentPhoto + 1;
    if (next >= photoData.length) next = 0;
    showPhoto(next);
  });
  document.getElementById('gallery-prev').addEventListener('click', function () {
    let previous = currentPhoto - 1;
    if (previous < 0) previous = photoData.length - 1;
    showPhoto(previous);
  });
}

// 4. 条件と繰り返し：見たい種類の項目を残す。
const filterButtons = document.querySelectorAll('[data-filter]');
const places = document.querySelectorAll('[data-place]');
filterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const selected = button.dataset.filter;
    let visibleCount = 0;
    places.forEach(function (place) {
      const show = selected === 'all' || place.dataset.category === selected;
      place.hidden = !show;
      if (show) visibleCount += 1;
    });
    filterButtons.forEach(function (other) {
      other.setAttribute('aria-pressed', String(other === button));
    });
    document.getElementById('filter-result').textContent = visibleCount + 'か所を表示しています。';
  });
});

// 5. 選んだ場所を、このブラウザーだけに残す（発展機能）。
// 共有PC向けに消すボタンを用意。localStorage.clear()で他のデータは消さない。
const saveButtons = document.querySelectorAll('[data-save]');
if (saveButtons.length > 0) {
  const storageKey = 'kyoto-temple:interests:v1';
  const placeNames = { hondo: '本堂と舞台', gate: '仁王門', water: '音羽の滝' };
  let savedIds = [];
  let storageAvailable = location.protocol === 'http:' || location.protocol === 'https:';
  if (storageAvailable) {
    try {
      const old = localStorage.getItem(storageKey);
      if (old) savedIds = old.split(',').filter(function (id, index, list) {
        return Object.prototype.hasOwnProperty.call(placeNames, id) && list.indexOf(id) === index;
      });
    } catch (error) {
      storageAvailable = false;
    }
  }
  function drawSaved() {
    saveButtons.forEach(function (button) {
      const chosen = savedIds.includes(button.dataset.save);
      button.setAttribute('aria-pressed', String(chosen));
      button.textContent = chosen ? 'メモに入っています ✓' : '気になる ＋';
    });
    document.getElementById('saved-list').textContent = savedIds.length === 0
      ? 'まだ選んでいません。'
      : savedIds.map(function (id) { return placeNames[id]; }).join(' ・ ');
    if (!storageAvailable) {
      document.getElementById('storage-status').textContent = 'この表示方法では保存を使いません。選択は、今開いているページの中だけに残ります。';
    }
  }
  function storeSaved() {
    if (storageAvailable) {
      try {
        if (savedIds.length === 0) localStorage.removeItem(storageKey);
        else localStorage.setItem(storageKey, savedIds.join(','));
      } catch (error) {
        storageAvailable = false;
      }
    }
    drawSaved();
  }
  saveButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const id = button.dataset.save;
      if (savedIds.includes(id)) savedIds = savedIds.filter(function (old) { return old !== id; });
      else savedIds.push(id);
      storeSaved();
    });
  });
  document.getElementById('clear-saved').addEventListener('click', function () {
    savedIds = [];
    storeSaved();
  });
  drawSaved();
}

// 6. 数を数える：チェックした数を文章に入れる。
const checks = document.querySelectorAll('[data-check]');
if (checks.length > 0) {
  function countChecks() {
    let count = 0;
    checks.forEach(function (box) { if (box.checked) count += 1; });
    document.getElementById('check-count').textContent = count + ' / ' + checks.length + ' できました。';
  }
  checks.forEach(function (box) { box.addEventListener('change', countChecks); });
  document.getElementById('clear-check').addEventListener('click', function () {
    checks.forEach(function (box) { box.checked = false; });
    countChecks();
  });
}

// 7. 入力を読む：未選択・正解・違う答えを分ける。
const quiz = document.getElementById('quiz');
if (quiz) {
  quiz.addEventListener('submit', function (event) {
    event.preventDefault(); // サーバーへ送らず、この画面に返事を出す。
    const choice = quiz.querySelector('input[name="answer"]:checked');
    let message = '先に、答えを一つ選んでください。';
    if (choice && choice.value === 'water') message = '正解です。清水寺の名前は、音羽の滝の水に関係しています。';
    else if (choice) message = 'もう一度、見どころの「音羽の滝」を読んでみましょう。';
    document.getElementById('quiz-result').textContent = message;
  });
  quiz.addEventListener('reset', function () {
    document.getElementById('quiz-result').textContent = '';
  });
}

// 8. 短いメモ：個人情報は集めず、入力した文章を安全なtextContentで表示。
const noteForm = document.getElementById('note-form');
if (noteForm) {
  noteForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const place = document.getElementById('note-place').value;
    const text = document.getElementById('note-text').value.trim();
    const result = document.getElementById('note-result');
    if (!place) result.textContent = '先に、見たい場所を選んでください。';
    else if (!text) result.textContent = '短いメモを一文、書いてください。';
    else if (text.length > 40) result.textContent = 'メモは40文字までにしてください。';
    else result.textContent = place + '：' + text;
  });
  noteForm.addEventListener('reset', function () {
    document.getElementById('note-result').textContent = '';
  });
}
