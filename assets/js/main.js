(() => {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const navigation = document.querySelector('[data-nav]');
  const dropdownToggles = [
    ...document.querySelectorAll('[data-dropdown-toggle]'),
  ];

  function closeDropdowns(except = null) {
    document.querySelectorAll('.dropdown.is-open').forEach((dropdown) => {
      if (dropdown === except) {
        return;
      }

      dropdown.classList.remove('is-open');
      const toggle = dropdown.querySelector('[data-dropdown-toggle]');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  }

  menuToggle?.addEventListener('click', (event) => {
    event.stopPropagation();

    const isOpen = navigation?.classList.toggle('is-open') ?? false;
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', (event) => {
      event.stopPropagation();

      const dropdown = toggle.closest('.dropdown');
      if (!dropdown) {
        return;
      }

      const shouldOpen = !dropdown.classList.contains('is-open');
      closeDropdowns(dropdown);
      dropdown.classList.toggle('is-open', shouldOpen);
      toggle.setAttribute('aria-expanded', String(shouldOpen));
    });
  });

  document.addEventListener('click', () => {
    closeDropdowns();
    navigation?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
      return;
    }

    closeDropdowns();
    navigation?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });

  // Evidențiază categoria activă în meniu.
  const currentPath = window.location.pathname.toLowerCase();

  const isCityQuestPage =
    currentPath.includes('/quests/') || currentPath.endsWith('/city-quests.html');

  if (isCityQuestPage) {
    const cityQuestToggle = dropdownToggles.find((toggle) =>
      toggle.textContent.includes('City Quests'),
    );
    cityQuestToggle?.classList.add('active-page');
  }

  const isCulturalTourPage =
    currentPath.includes('/cultura/') || currentPath.endsWith('/tururi-culturale.html');

  if (isCulturalTourPage) {
    const culturalTourToggle = dropdownToggles.find((toggle) =>
      toggle.textContent.includes('Tururi culturale'),
    );
    culturalTourToggle?.classList.add('active-page');
  }

  // Formular demonstrativ: nu trimite date până nu conectăm un serviciu real.
  const demoForm = document.querySelector('[data-demo-form]');

  demoForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const notice = document.querySelector('[data-form-notice]');
    if (!notice) {
      return;
    }

    notice.style.display = 'block';
    notice.textContent =
      'Formularul este pregătit vizual. Pentru trimitere reală trebuie conectat la e-mail sau la un serviciu de formulare.';
  });
})();
