/* Easy Roof Hub — main.js */

document.addEventListener('DOMContentLoaded', () => {

  // ── Device detection ──────────────────────────────────────────
  function isTouchDevice() {
    return window.matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window);
  }

  // ── Call modal ────────────────────────────────────────────────
  const modal   = document.getElementById('call-modal');
  const closeBtn = document.getElementById('call-modal-close');
  const copyBtn  = document.getElementById('copy-number-btn');

  function openModal() {
    if (!modal) return;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn && closeBtn.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  // Close on backdrop click
  modal && modal.addEventListener('click', e => {
    if (e.target === modal || e.target.classList.contains('call-modal-backdrop')) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  closeBtn && closeBtn.addEventListener('click', closeModal);

  // Copy number to clipboard
  copyBtn && copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('6028788983').then(() => {
      copyBtn.textContent = 'Copied!';
      setTimeout(() => { copyBtn.textContent = 'Copy Number'; }, 2000);
    }).catch(() => {
      // Fallback: select the number link text
      const numLink = modal.querySelector('.call-modal-number');
      if (numLink) {
        const range = document.createRange();
        range.selectNode(numLink);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
    });
  });

  // ── Call button intercept (desktop → modal, mobile → tel:) ───
  document.querySelectorAll('.js-call-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      if (!isTouchDevice()) {
        e.preventDefault();
        openModal();
      }
      // Touch devices: let the href="tel:..." fire natively
    });
  });

  // ── Form submit handler ───────────────────────────────────────
  const form = document.getElementById('quote-form');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Submitting…';

      const data = Object.fromEntries(new FormData(form));

      /* TODO: replace with real backend call
         const res = await fetch('/api/leads', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(data),
         });
      */
      await new Promise(r => setTimeout(r, 800));

      form.style.display = 'none';
      const success = document.getElementById('form-success');
      if (success) success.style.display = 'block';
    });
  }

});
