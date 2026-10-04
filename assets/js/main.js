(() => {
  // Icon Tururi culturale
  function decorateCulturalTourLabels() {
    const phrase = 'Tururi culturale';

    const makeLabel = () => {
      const label = document.createElement('span');
      label.className = 'cultural-icon-label';

      const icon = document.createElement('span');
      icon.className = 'cultural-tour-icon';
      icon.setAttribute('aria-hidden', 'true');

      const text = document.createElement('span');
      text.className = 'cultural-icon-text';
      text.textContent = phrase;

      label.append(icon, text);
      return label;
    };

    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
    );

    const matches = [];
    let node;

    while ((node = walker.nextNode())) {
      if (
        node.nodeValue?.includes(phrase) &&
        !node.parentElement?.closest('.cultural-icon-label, script, style')
      ) {
        matches.push(node);
      }
    }

    matches.forEach((textNode) => {
      const value = textNode.nodeValue;
      const index = value.indexOf(phrase);

      if (index === -1) {
        return;
      }

      const fragment = document.createDocumentFragment();
      const before = value.slice(0, index);
      const after = value.slice(index + phrase.length);

      if (before) {
        fragment.append(document.createTextNode(before));
      }

      fragment.append(makeLabel());

      if (after) {
        fragment.append(document.createTextNode(after));
      }

      textNode.replaceWith(fragment);
    });

    document
      .querySelectorAll('a.overview-link[href$="tururi-culturale.html"]')
      .forEach((link) => {
        if (link.querySelector('.cultural-tour-icon')) {
          return;
        }

        const icon = document.createElement('span');
        icon.className = 'cultural-tour-icon';
        icon.setAttribute('aria-hidden', 'true');
        link.prepend(icon);
        link.classList.add('cultural-overview-link');
      });
  }

  decorateCulturalTourLabels();

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
