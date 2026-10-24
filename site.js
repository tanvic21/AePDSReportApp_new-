(function () {
  var KEY = 'aepds-lang';
  var root = document.documentElement;
  var lang = 'mr';

  try {
    var saved = localStorage.getItem(KEY);
    if (saved === 'en' || saved === 'mr') lang = saved;
  } catch (e) {}

  var m = /[?&]lang=(en|mr)\b/.exec(window.location.search);
  if (m) lang = m[1];

  function apply(next) {
    lang = next;
    root.setAttribute('data-lang', next);
    if (root.hasAttribute('data-bilingual')) root.setAttribute('lang', next);
    try { localStorage.setItem(KEY, next); } catch (e) {}
    var buttons = document.querySelectorAll('[data-lang-toggle]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-label', next === 'mr' ? 'Switch to English' : 'मराठीत पहा');
    }
  }

  // Set before the page paints so there is no flash of the wrong language.
  root.setAttribute('data-lang', lang);
  if (root.hasAttribute('data-bilingual')) root.setAttribute('lang', lang);

  document.addEventListener('DOMContentLoaded', function () {
    apply(lang);
    var buttons = document.querySelectorAll('[data-lang-toggle]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        apply(lang === 'mr' ? 'en' : 'mr');
      });
    }
  });
})();
