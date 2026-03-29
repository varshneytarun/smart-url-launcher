// options-tabs.js
// External tab activation script to satisfy extension CSP (no inline scripts)
(function() {
  const nav = document.querySelector('.tab-nav');
  if (!nav) {
    console.warn('Tab nav not found');
    return;
  }

  const tabBtns = Array.from(nav.querySelectorAll('.tab-btn'));
  const panels = Array.from(document.querySelectorAll('.tab-panel'));

  const wrapper = document.querySelector('.tab-content-wrapper');

  function setWrapperHeightFor(panel) {
    if (!wrapper || !panel) return;
    // Measure panel height while it's visible off-DOM to compute stable min-height
    const prevVisibility = panel.style.visibility;
    const prevPosition = panel.style.position;
    panel.style.visibility = 'hidden';
    panel.style.position = 'relative';
    panel.classList.add('active');
    const h = panel.scrollHeight;
    panel.classList.remove('active');
    panel.style.position = prevPosition;
    panel.style.visibility = prevVisibility;
    wrapper.style.minHeight = h + 'px';
  }

  function activateTab(btn) {
    const name = btn.dataset.tab;
    tabBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
      b.tabIndex = -1;
    });
    panels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    btn.tabIndex = 0;

    const panel = document.getElementById(name);
    if (panel) {
      setWrapperHeightFor(panel);
      panel.classList.add('active');
    }
  }

  // Per-button click handlers (simpler than delegation for reliability)
  tabBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      activateTab(btn);
    });
    // Ensure focusability
    btn.tabIndex = btn.classList.contains('active') ? 0 : -1;
  });

  // Keyboard navigation on the nav container
  nav.addEventListener('keydown', (e) => {
    const activeBtn = tabBtns.find(b => b.classList.contains('active')) || tabBtns[0];
    let idx = tabBtns.indexOf(activeBtn);
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      idx = (idx + 1) % tabBtns.length;
      activateTab(tabBtns[idx]);
      tabBtns[idx].focus();
      e.preventDefault();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      idx = (idx - 1 + tabBtns.length) % tabBtns.length;
      activateTab(tabBtns[idx]);
      tabBtns[idx].focus();
      e.preventDefault();
    } else if (e.key === 'Home') {
      activateTab(tabBtns[0]);
      tabBtns[0].focus();
      e.preventDefault();
    } else if (e.key === 'End') {
      activateTab(tabBtns[tabBtns.length - 1]);
      tabBtns[tabBtns.length - 1].focus();
      e.preventDefault();
    }
  });

  // Initial activation
  const initial = nav.querySelector('.tab-btn.active') || tabBtns[0];
  if (initial) activateTab(initial);
  console.debug('Tabs initialized', tabBtns.map(b => b.dataset.tab));
})();
