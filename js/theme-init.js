// Applies the saved/preferred theme before first paint to avoid a light-to-dark flash.
// Loaded synchronously in <head>; keep this file tiny.
(() => {
  let theme = null;
  try {
    theme = localStorage.getItem('theme');
  } catch (error) {
    theme = null;
  }
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', theme);
})();
