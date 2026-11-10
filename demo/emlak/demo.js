(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const log = $('log'), form = $('form'), input = $('msg'), statusEl = $('status');
  const note = $('note'), noteCard = $('noteCard'), noteBody = $('noteBody'), noteActions = $('noteActions'), backdrop = $('backdrop');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 759px)');

  const TICKS = '<svg viewBox="0 0 18 12" aria-hidden="true"><path d="M1 6.5l3.2 3.2L11 2.5M7 9.7l.8.8L16.5 2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const HOUSE = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 22L24 8l17 14M11 19v20h9V29h8v10h9V19" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const DEFAULT_SAATLER = ['10:00', '11:30', '14:00', '16:00'];

  let D = null;        // ofis verisi (JSON)
  let S = {};          // sohbet durumu
  let epoch = 0;       // "Baştan dene" eski sıradaki mesajları iptal etsin diye
  let queue = Promise.resolve();
  let focusNext = false; // klavyeyle seçim yapıldıysa yeni butonlara odak taşı

  // ---------- yardımcılar ----------
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (const c of kids.flat()) if (c != null && c !== false) el.append(c);
    return el;
  }
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const clock = () => new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  const num = (n) => Number(n).toLocaleString('tr-TR');
  const price = (i) => num(i.fiyat) + ' TL' + (i.tur === 'kiralik' ? ' / ay' : '');
  const turAd = (t) => (t === 'satilik' ? 'Satılık' : 'Kiralık');
  const norm = (s) => s.toLocaleLowerCase('tr-TR').replace(/ı/g, 'i').normalize('NFD').replace(/[̀-ͯ]/g, '');
  const opt = (label, fn, extra) => Object.assign({ label, fn }, extra);
  const down = () => log.scrollTo({ top: log.scrollHeight, behavior: reduce.matches ? 'auto' : 'smooth' });

  function rangeLabel(lo, hi) {
    if (lo === 0 && hi === Infinity) return 'Bütçe fark etmez';
    if (lo === 0) return hi >= 1e6 ? `${num(hi / 1e6)} milyon TL altı` : `${num(hi)} TL altı`;
    if (hi === Infinity) return lo >= 1e6 ? `${num(lo / 1e6)} milyon TL üstü` : `${num(lo)} TL üstü`;
    return lo >= 1e6 ? `${num(lo / 1e6)}-${num(hi / 1e6)} milyon TL` : `${num(lo)}-${num(hi)} TL`;
  }

  // ---------- mesajlar ----------
  function bubble(who, content, wide) {
    const meta = h('span', { class: 'meta' }, clock());
    if (who === 'out') meta.insertAdjacentHTML('beforeend', `<span class="ticks">${TICKS}</span>`);
    const el = h('div', { class: `msg ${who}${wide ? ' wide' : ''}` }, content, meta);
    log.append(el);
    down();
    return el;
  }
  const userSay = (t) => bubble('out', h('p', null, t));

  async function typing(len, my) {
    log.querySelectorAll('.ticks:not(.read)').forEach((t) => t.classList.add('read'));
    statusEl.textContent = 'yazıyor...';
    const dots = h('div', { class: 'msg in typing', 'aria-hidden': 'true' }, h('i'), h('i'), h('i'));
    log.append(dots);
    down();
    await wait(Math.min(1500, 500 + len * 10));
    dots.remove();
    if (my === epoch) statusEl.textContent = 'çevrimiçi';
  }

  // Sırayla: metin, DOM düğümü ya da fonksiyon (ör. hızlı cevapları göster).
  function say(...items) {
    const my = epoch;
    queue = queue.then(async () => {
      for (const it of items) {
        if (my !== epoch) return;
        if (typeof it === 'function') { it(); continue; }
        await typing(typeof it === 'string' ? it.length : 80, my);
        if (my !== epoch) return;
        if (typeof it === 'string') bubble('in', h('p', null, it));
        else bubble('in', it, true);
      }
    });
    return queue;
  }

  // ---------- hızlı cevaplar ----------
  const opts = (list) => () => showOpts(list);
  function showOpts(list) {
    clearOpts();
    S.pending = list;
    const box = h('div', { class: 'quick', role: 'group', 'aria-label': 'Hızlı cevaplar' },
      list.map((o) => h('button', { type: 'button', class: 'qbtn', onclick: (e) => pick(o, e) }, o.label)));
    log.append(box);
    down();
    if (focusNext) { focusNext = false; box.querySelector('button').focus({ preventScroll: true }); }
  }
  function clearOpts() {
    log.querySelectorAll('.quick').forEach((q) => q.remove());
    S.pending = null;
  }
  function pick(o, e) {
    if (e && e.detail === 0) focusNext = true; // klavye (Enter/Space) ile basıldı
    clearOpts();
    if (!o.silent) userSay(o.label);
    o.fn();
  }

  // ---------- akış ----------
  const menu = () => [
    opt('Satılık', () => startSearch('satilik')),
    opt('Kiralık', () => startSearch('kiralik')),
    opt('İlan numarasıyla sor', askNo),
    opt('Ofisle görüşmek istiyorum', callback),
  ];

  function startSearch(tur) {
    S.arama = { tur };
    S.kind = 'randevu';
    S.capture = null;
    if (!D.ilanlar.some((i) => i.tur === tur)) {
      return say(`Şu an ${turAd(tur).toLocaleLowerCase('tr-TR')} ilanımız yok. Ne aradığınızı danışmanımıza iletelim, uygun ilan çıkınca sizi arasın.`,
        opts([opt('Olur, arasınlar', callback), opt('Ana menü', () => say('Başka nasıl yardımcı olabilirim?', opts(menu())))]));
    }
    say(`${turAd(tur)} ilanlara bakalım. Hangi bölgede arıyorsunuz?`,
      opts([...D.bolgeler.map((b) => opt(b, () => pickSemt(b))), opt('Fark etmez', () => pickSemt(null))]));
  }

  function pickSemt(semt) {
    S.arama.semt = semt;
    const odalar = [...new Set(D.ilanlar.filter((i) => i.tur === S.arama.tur).map((i) => i.oda))].sort();
    say('Kaç oda olsun?', opts([...odalar.map((o) => opt(o, () => pickOda(o))), opt('Fark etmez', () => pickOda(null))]));
  }

  function pickOda(oda) {
    S.arama.oda = oda;
    const edges = [0, ...((D.butceAraliklari || {})[S.arama.tur] || []), Infinity];
    const list = [];
    for (let k = 0; k < edges.length - 1; k++) {
      const lo = edges[k], hi = edges[k + 1], label = rangeLabel(lo, hi);
      list.push(opt(label, () => pickButce(lo, hi, label)));
    }
    say('Bütçeniz hangi aralıkta?', opts(list));
  }

  function pickButce(lo, hi, label) {
    const a = Object.assign(S.arama, { lo, hi, label });
    const pool = D.ilanlar.filter((i) => i.tur === a.tur);
    const hits = pool.filter((i) => (!a.semt || i.semt === a.semt) && (!a.oda || i.oda === a.oda) && i.fiyat >= lo && i.fiyat < hi);
    const after = opts([opt('Yeniden ara', () => startSearch(a.tur)), opt('Ofisle görüşmek istiyorum', callback)]);
    if (hits.length) {
      if (hits.length === 1) S.ilan = hits[0]; // tek ilan varsa "aidatı ne kadar" gibi sorular ona gitsin
      return say(hits.length === 1 ? 'Aradığınıza uyan bir ilan var:' : `Aradığınıza uyan ${hits.length} ilan var:`, cards(hits), after);
    }
    // Uyan yoksa: fiyat farkı + semt/oda uyuşmazlığı cezasıyla en yakın 2 ilan
    const dist = (i) =>
      (i.fiyat < lo ? (lo - i.fiyat) / lo : i.fiyat >= hi ? (i.fiyat - hi) / hi : 0) +
      (a.semt && i.semt !== a.semt ? 0.35 : 0) +
      (a.oda && i.oda !== a.oda ? 0.25 : 0);
    const near = [...pool].sort((x, y) => dist(x) - dist(y)).slice(0, 2);
    say('Aradığınıza birebir uyan ilan şu an yok. Size en yakın seçenekler:', cards(near), after);
  }

  function cards(list) {
    return h('div', { class: 'cards' }, list.map(card));
  }
  function card(i) {
    const ph = h('div', { class: `ph ph${Math.max(0, D.bolgeler.indexOf(i.semt)) % 3}` });
    if (i.foto) {
      const img = h('img', { src: i.foto, alt: i.baslik, loading: 'lazy' });
      img.addEventListener('error', () => { img.remove(); fillPh(ph, i); });
      ph.append(img);
    } else fillPh(ph, i);
    const facts = [i.oda, `${i.m2} m²`, i.semt, i.aidat ? `Aidat ${num(i.aidat)} TL` : null].filter(Boolean);
    return h('article', { class: 'card' },
      ph,
      h('div', { class: 'card-body' },
        h('p', { class: 'card-no' }, `${turAd(i.tur)} · İlan no ${i.no}`),
        h('h3', { class: 'card-title' }, i.baslik),
        h('p', { class: 'card-price' }, price(i)),
        h('ul', { class: 'card-facts' }, facts.map((f) => h('li', null, f))),
        i.not ? h('p', { class: 'card-note' }, i.not) : null,
        h('button', {
          type: 'button', class: 'card-btn',
          onclick: (e) => {
            if (e.detail === 0) focusNext = true;
            clearOpts();
            userSay(`${i.no} numaralı daireyi görmek istiyorum`);
            startRandevu(i);
          },
        }, 'Bu daireyi görmek istiyorum')));
  }
  function fillPh(ph, i) {
    ph.innerHTML = HOUSE;
    ph.append(h('span', null, i.semt));
  }

  function startRandevu(i) {
    S.ilan = i;
    S.kind = 'randevu';
    S.capture = null;
    say(`${i.no} numaralı daire için hangi gün uygunsunuz?`, opts(nextDays(3).map((d) => opt(d.label, () => pickGun(d)))));
  }
  function nextDays(n) {
    const out = [], closed = D.kapaliGunler || [];
    const base = new Date();
    base.setHours(12, 0, 0, 0);
    for (let k = 1; out.length < n && k < 15; k++) {
      const x = new Date(base);
      x.setDate(base.getDate() + k);
      if (closed.includes(x.getDay())) continue;
      const full = x.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'long' });
      out.push({ full, label: k === 1 ? `Yarın, ${full}` : full });
    }
    return out;
  }
  function pickGun(d) {
    S.gun = d.full;
    say('Saat kaçta gelmek istersiniz?', opts(D.randevuSaatleri.map((s) => opt(s, () => pickSaat(s)))));
  }
  function pickSaat(s) {
    S.saat = s;
    askContact(`${S.gun}, saat ${s} için not alıyorum. Adınızı ve telefon numaranızı yazar mısınız?`);
  }

  function callback() {
    S.kind = 'geri-arama';
    askContact(`Tabii. Adınızı ve telefonunuzu yazın, ${D.danisman} sizi arasın. Doğrudan aramak isterseniz: ${D.telefon} (${D.calismaSaatleri}).`);
  }

  function askContact(text) {
    if (S.ad && S.tel) return say(`Bilgilerinizi aldım: ${S.ad}, ${S.tel}.`, done);
    say(text, () => {
      S.capture = contact;
      input.placeholder = 'Adınız ve telefonunuz';
      focusNext = false;
      input.focus({ preventScroll: true });
    });
  }

  const STOP = /(?<!\p{L})(adım|adim|ismim|benim|ben|telefonum|telefon|tel|numaram|numarası|numara|no|ve)(?!\p{L})/giu;
  function contact(t) {
    const digits = t.replace(/\D/g, '');
    if (digits.length >= 10) S.tel = '0' + digits.slice(-10).replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
    const name = t.replace(/[0-9+()\-.,:;/]/g, ' ').replace(STOP, ' ').replace(/\s+/g, ' ').trim();
    if (/\p{L}{2,}/u.test(name)) S.ad = name.slice(0, 40);
    if (S.ad && S.tel) {
      S.capture = null;
      input.placeholder = 'Mesaj yazın';
      return done();
    }
    if (digits.length && digits.length < 10) return say('Telefon numarası eksik görünüyor. 05 ile başlayan 11 haneli numaranızı yazar mısınız?');
    if (!S.tel) return say(S.ad ? `Teşekkürler ${S.ad}. Telefon numaranızı da yazar mısınız?` : 'Telefon numaranızı da yazar mısınız?');
    say('Adınızı da yazar mısınız?');
  }

  function done() {
    const i = S.ilan;
    const end = opts([opt('Ofise düşen notu gör', openNote, { silent: true }), opt('Baştan dene', restart, { silent: true })]);
    if (S.kind === 'randevu' && i) {
      say(`Özet:\n${i.no} · ${i.baslik} (${i.semt})\n${S.gun}, saat ${S.saat}\n${S.ad} · ${S.tel}`,
        `Talebiniz ofise iletildi. Danışmanımız ${D.danisman} sizi arayıp randevuyu teyit edecek.`,
        showNote, end);
    } else {
      say(`Teşekkürler ${S.ad}. Notunuzu ofise ilettim, danışmanımız ${D.danisman} en kısa sürede sizi arayacak.`, showNote, end);
    }
  }

  function askNo() {
    S.capture = null;
    const ex = D.ilanlar[0] && D.ilanlar[0].no;
    S.capture = noCapture;
    say(`İlan numarasını yazar mısınız?${ex ? ` Denemek için ${ex} yazabilirsiniz.` : ''}`, () => {
      input.focus({ preventScroll: true });
    });
  }
  function noCapture(t) {
    const i = findIlan(t);
    if (i) { S.capture = null; return showIlan(i); }
    if (/\d/.test(t)) return say('Bu numarada bir ilan bulamadım. Numarayı kontrol edip tekrar yazar mısınız?');
    S.capture = null;
    handle(t);
  }
  function findIlan(t) {
    const nums = t.match(/\d{3,6}/g) || [];
    for (const m of nums) {
      const i = D.ilanlar.find((x) => String(x.no) === m);
      if (i) return i;
    }
    return null;
  }
  function showIlan(i) {
    S.ilan = i;
    say(`${i.no} numaralı ilan:`, cards([i]), opts([opt('Başka ilan sor', askNo), opt('Ofisle görüşmek istiyorum', callback)]));
  }

  // ---------- serbest yazı ----------
  function handle(t) {
    const n = norm(t);
    if (S.capture) {
      if (/\b(iptal|vazgec|bosver)/.test(n)) {
        S.capture = null;
        input.placeholder = 'Mesaj yazın';
        return say('Tamam, iptal ettim. Başka nasıl yardımcı olabilirim?', opts(menu()));
      }
      return S.capture(t);
    }
    if (S.pending) {
      const hit = S.pending.find((o) => norm(o.label) === n) || (n.length > 2 && S.pending.find((o) => norm(o.label).startsWith(n)));
      if (hit) { clearOpts(); return hit.fn(); }
    }
    answer(t, n);
  }

  function answer(t, n) {
    const again = S.pending ? [opts(S.pending)] : []; // cevaptan sonra bekleyen seçenekleri tekrar göster
    const i = S.ilan;
    const has = (re) => re.test(n);
    const rec = (text) => { S.sorular.push(t); return say(text, ...again); };

    const found = findIlan(t);
    if (found) return showIlan(found);
    if (has(/\b(merhaba|selam|slm|iyi gunler|gunaydin|iyi aksamlar)\b/)) return say('Merhaba, buyurun. Satılık mı kiralık mı bakıyorsunuz?', opts(menu()));
    if (has(/kredi/)) return rec(i
      ? (i.tur === 'kiralik' ? `${i.no} numaralı ilan kiralık, kredi gerekmiyor. Depozito ve kira şartlarını danışmanımız anlatır.` : i.krediyeUygun ? `${i.no} numaralı daire krediye uygun. Evrak tarafında danışmanımız size yardımcı olur.` : `${i.no} numaralı daire şu an krediye uygun görünmüyor. Danışmanımız durumu teyit edip size döner.`)
      : 'Krediye uygun ilanlarımız var. Bir ilan seçerseniz uygun olup olmadığını söylerim.');
    if (has(/takas/)) return rec('Takas tekliflerini mal sahibine iletiyoruz. Elinizdekini kısaca yazarsanız (araç, daire, arsa) nota ekliyorum.');
    if (has(/aidat/)) return rec(i ? `${i.no} numaralı dairenin aidatı ${num(i.aidat || 0)} TL.` : 'Aidat her ilanın kartında yazıyor. Merak ettiğiniz ilanın numarasını yazarsanız söyleyeyim.');
    if (has(/adres|konum|nerede|neresi|lokasyon|harita|yol tarifi/)) return rec(i
      ? `Daire ${i.semt} tarafında. Tam adresi randevuyu teyit ederken paylaşıyoruz. Ofisimiz: ${D.adres}.`
      : `Ofisimiz: ${D.adres}. Gelmeden önce haber verirseniz danışmanımız sizi karşılar.`);
    if (has(/fiyat|kac para|ne kadar|pazarlik|indirim|kac tl/)) return rec(i
      ? `${i.no} numaralı dairenin fiyatı ${price(i)}. Pazarlık payını danışmanımız görüşmede konuşur.`
      : 'Fiyatlar ilan kartlarında yazıyor. Pazarlık payını danışmanımız görüşmede konuşur.');
    if (has(/calisma saat|kacta|acik mi|aciksiniz|kapali mi|mesai/)) return say(`Çalışma saatlerimiz: ${D.calismaSaatleri}. Bu hattan her saat yazabilirsiniz.`, ...again);
    if (has(/randevu|gormek ist|gezmek|bakmaya gel/)) return i ? startRandevu(i) : say('Hangi daireyi görmek istersiniz? İlan numarasını yazabilir ya da aramaya başlayabilirsiniz.', opts(menu()));
    if (has(/satilik|satin al|almak ist/)) return startSearch('satilik');
    if (has(/kiralik|kiraya|kiralamak/)) return startSearch('kiralik');
    if (has(/tesekkur|sagol|sag ol|eyvallah/)) return say('Rica ederim. Başka sorunuz olursa buradayım.', ...again);
    if (has(/danisman|yetkili|insanla|biriyle gorus|arayin|beni ara|telefon/)) return callback();
    if (has(/ilan/) && /\d/.test(t)) return say('Bu numarada bir ilan bulamadım. Numarayı kontrol edip tekrar yazar mısınız?', ...again);
    rec('Bunu danışmanımıza iletiyorum, birkaç dakika içinde dönecek.');
  }

  // ---------- ofise düşen not ----------
  function emptyNote() {
    return h('p', { class: 'note-empty' }, 'Sohbeti bitirince emlakçının telefonuna düşen özet burada görünür.');
  }
  function showNote() {
    const a = S.arama, i = S.ilan, randevu = S.kind === 'randevu' && i;
    const rows = [
      ['Müşteri', S.ad],
      ['Telefon', h('a', { href: 'tel:' + S.tel.replace(/\s/g, '') }, S.tel)],
    ];
    if (a && a.tur) rows.push(['Aradığı', [turAd(a.tur), a.semt || 'Tüm bölgeler', a.oda || 'Oda fark etmez', a.label].filter(Boolean).join(' · ')]);
    if (i) rows.push([randevu ? 'İlan' : 'Baktığı ilan', `${i.no} · ${i.baslik}\n${i.semt} · ${price(i)}`]);
    if (randevu) rows.push(['Randevu', `${S.gun}, ${S.saat}`]);
    if (S.sorular.length) rows.push(['Sorduğu', S.sorular.map((q) => `“${q}”`).join('\n')]);
    rows.push(['Geldiği saat', `Bugün ${clock()}, asistan üzerinden`]);

    noteBody.replaceChildren(
      h('p', { class: 'note-kind' }, randevu ? 'Yeni randevu talebi' : 'Geri arama talebi'),
      h('dl', { class: 'note-rows' }, rows.map(([k, v]) => h('div', null, h('dt', null, k), h('dd', null, v)))),
      h('p', { class: 'note-next' }, randevu ? 'Yapılacak: müşteriyi arayıp randevuyu teyit edin.' : 'Yapılacak: müşteriyi geri arayın.'));
    noteActions.hidden = false;
    note.classList.remove('filled');
    void note.offsetWidth; // giriş animasyonu her yeni notta tekrar oynasın
    note.classList.add('filled');
    if (mobile.matches) setTimeout(openNote, 500);
  }
  function openNote() {
    if (!note.classList.contains('filled')) return;
    if (mobile.matches) {
      note.classList.add('open');
      backdrop.hidden = false;
    }
    noteCard.focus({ preventScroll: !mobile.matches });
  }
  function closeNote() {
    const wasOpen = note.classList.contains('open');
    note.classList.remove('open');
    backdrop.hidden = true;
    if (wasOpen) input.focus({ preventScroll: true });
  }

  // ---------- başlat ----------
  function restart() {
    epoch++;
    queue = Promise.resolve();
    closeNote();
    S = { sorular: [], capture: null, pending: null };
    log.replaceChildren(h('p', { class: 'sys' }, 'Bu bir demo. Müşteriniz WhatsApp\'tan yazınca asistan böyle cevap verir.'));
    noteBody.replaceChildren(emptyNote());
    noteActions.hidden = true;
    note.classList.remove('filled');
    statusEl.textContent = 'çevrimiçi';
    input.placeholder = 'Mesaj yazın';
    say(`Merhaba, burası ${D.ofisAdi}. Satılık ya da kiralık daire mi bakıyorsunuz? Aşağıdan seçebilir ya da yazabilirsiniz.`, opts(menu()));
  }

  async function load() {
    const raw = new URLSearchParams(location.search).get('ofis') || '';
    const kod = /^[a-z0-9-]{1,40}$/i.test(raw) ? raw : 'ornek'; // yol enjeksiyonuna karşı yalnız harf/rakam/tire
    for (const k of kod === 'ornek' ? ['ornek'] : [kod, 'ornek']) {
      try {
        const r = await fetch(`ofisler/${k}.json`, { cache: 'no-cache' });
        if (!r.ok) continue;
        const d = await r.json();
        if (d && d.ofisAdi && Array.isArray(d.ilanlar) && d.ilanlar.length) return d;
      } catch (e) { /* sıradaki dosyayı dene */ }
    }
    return null;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const t = input.value.trim();
    if (!t || !D) return;
    input.value = '';
    userSay(t);
    handle(t);
  });
  $('restart').addEventListener('click', () => D && restart());
  $('noteAgain').addEventListener('click', restart);
  $('noteClose').addEventListener('click', closeNote);
  backdrop.addEventListener('click', closeNote);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && note.classList.contains('open')) closeNote(); });

  load().then((d) => {
    if (!d) {
      $('ofisAd').textContent = 'Demo';
      log.replaceChildren(h('p', { class: 'sys' }, 'Demo yüklenemedi. Sayfayı yenileyip tekrar deneyin.'));
      return;
    }
    D = d;
    D.bolgeler = D.bolgeler && D.bolgeler.length ? D.bolgeler : [...new Set(D.ilanlar.map((i) => i.semt))];
    D.randevuSaatleri = D.randevuSaatleri && D.randevuSaatleri.length ? D.randevuSaatleri : DEFAULT_SAATLER;
    $('ofisAd').textContent = D.ofisAdi;
    $('avatar').textContent = D.kisaAd || D.ofisAdi.slice(0, 2).toLocaleUpperCase('tr-TR');
    document.title = `${D.ofisAdi} · Emlak asistanı demosu`;
    restart();
  });
})();
