<svelte:head>
  <script>
    try {
      const THEME_KEY = "theme";
      const SYSTEM_THEME = "system";
      let resolvedTheme;

      function getSystemTheme() {
        const mql = window.matchMedia("(prefers-color-scheme: dark)");
        return mql.matches ? "dark" : "light";
      }
      if (THEME_KEY in localStorage) {
        const userSetTheme = localStorage.getItem(THEME_KEY);
        resolvedTheme =
          userSetTheme === SYSTEM_THEME ? getSystemTheme() : userSetTheme;
      } else {
        resolvedTheme = getSystemTheme();
        localStorage.setItem(THEME_KEY, SYSTEM_THEME);
      }
      const htmlElement = document.querySelector("html");
      htmlElement.classList.add(resolvedTheme);
      htmlElement.style.colorScheme = resolvedTheme;
    } catch (e) {
      logger.error(e);
    }
  </script>
</svelte:head>
