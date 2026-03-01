// event.js - populates event.html by fetching /api/events/:slug
(async function(){
  function slugFromPath(){
    const parts = window.location.pathname.split('/').filter(Boolean);
    return parts.length ? parts[parts.length-1] : null;
  }

  const slug = slugFromPath();
  if (!slug) return;

  const res = await fetch(`/api/events/${encodeURIComponent(slug)}`);
  if (!res.ok) {
    document.getElementById('ev-title').textContent = '404: Event not found';
    document.getElementById('ev-article').innerHTML = '<p class="muted">We could not find that event.</p>';
    return;
  }

  const ev = await res.json();

  document.getElementById('ev-title').textContent = ev.title || '';
  document.getElementById('ev-meta').textContent = `${ev.date || ''} · ${ev.time || ''} · ${ev.location || ''}`;

  const img = document.getElementById('ev-image');
  if (ev.image){ img.src = ev.image; img.alt = ev.title || 'Event image'; img.style.display = 'block' }

  document.getElementById('ev-summary').textContent = ev.summary || '';
  document.getElementById('ev-description').textContent = ev.description || '';

  document.getElementById('ev-category').textContent = ev.category || '';
  document.getElementById('ev-price').textContent = ev.price || '';
  document.getElementById('ev-organizer').textContent = ev.organizer || '';
  document.getElementById('ev-venue').textContent = ev.venue || '';
  const urlDd = document.getElementById('ev-url');
  if (ev.url){
    urlDd.innerHTML = `<a href="${ev.url}" target="_blank" rel="noopener">${ev.url}</a>`;
  } else {
    urlDd.textContent = '';
  }
})();
