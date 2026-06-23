/* Easy Roof Hub — Form handler */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quote-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('.form-submit');
    btn.disabled = true;
    btn.textContent = 'Submitting…';

    const data = Object.fromEntries(new FormData(form));

    /* -------------------------------------------------------
       TODO: Replace this block with your real backend call.
       Example:
         const res = await fetch('/api/leads', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(data),
         });
         if (!res.ok) throw new Error('Submit failed');
    ------------------------------------------------------- */
    await new Promise(r => setTimeout(r, 800)); // simulated network delay

    // Show success state
    form.style.display = 'none';
    document.getElementById('form-success').style.display = 'block';

    // Optional: push to analytics
    // gtag('event', 'lead_submitted', { neighborhood: data.neighborhood });
  });
});
