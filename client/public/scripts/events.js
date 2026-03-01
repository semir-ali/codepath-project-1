async function loadEvents(){
  const res = await fetch('/api/events');
  const events = await res.json();
  const container = document.getElementById('events');
  // Renders each individual event as a card with image, title, summary, and details link
  events.forEach(ev=>{
    const a = document.createElement('a');
    a.href = `/events/${ev.slug}`;
    a.className = 'card';

    const img = document.createElement('img');
    img.src = ev.image;
    img.alt = ev.title;
    img.style.maxWidth = '100%';

    const h3 = document.createElement('h3'); h3.textContent = ev.title;
    const p = document.createElement('p'); p.textContent = ev.summary;
    const small = document.createElement('small'); small.textContent = `${ev.date} · ${ev.time} · ${ev.location}`;
    a.appendChild(img); a.appendChild(h3); a.appendChild(p); a.appendChild(small);
    container.appendChild(a);
  });
}
document.addEventListener('DOMContentLoaded', loadEvents);