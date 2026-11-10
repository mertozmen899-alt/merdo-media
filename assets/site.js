(() => {
  const TR = {
    kvkkUrl: 'kvkk.html',
    heroLines: ['Merhaba! İlk taslak <b>48 saatte</b>.', 'Hey, gıdıklanıyorum!', 'İşlerimiz biraz aşağıda.'],
    heroAsk: [
      ['Sitenizi <b>Google\'a</b> uygun kuruyoruz, müşteri sizi bulsun.', 'İlk taslağı <b>48 saatte</b> gönderiyoruz.'],
      ['Reklam videonuzun <b>kurgusunu</b> biz yapıyoruz.', 'Aynı videoyu <b>dikey, kare ve yatay</b> teslim ediyoruz.'],
      ['WhatsApp\'ınıza <b>7/24</b> cevap veren asistan kuruyoruz.', 'Sitenize <b>otomasyon</b> bağlıyoruz, formlar tabloya düşüyor.'],
    ],
    wa: { demo: 'Merhaba Merdo Media, ücretsiz demo istiyorum.', destek: 'Merhaba, mevcut müşterinizim. Destek / bakım talebim var: ' },
    menuOpen: 'Menüyü aç', menuClose: 'Menüyü kapat',
    fm: { errName: 'Adınızı yazın.', errPhone: 'Geçerli bir telefon numarası yazın.' },
    chat: {
      hello: 'Merhaba, ben Mochi. Merdo Media\'nın otomatik asistanıyım.',
      ask: 'Hangi konuda bilgi almak istersiniz?', askAgain: 'Başka bir konuda yardımcı olayım mı?',
      topics: {
        web: ['Web sitesi yaptırmak istiyorum', 'Birkaç bilgi alırsam ilk taslağı hazırlamaya başlayabiliriz.'],
        video: ['Reklam videosu istiyorum', 'Videoyu dikey, kare ve yatay olarak hazırlıyoruz. Çekiminiz varsa onu da kullanabiliriz.'],
        oto: ['WhatsApp / form otomasyonu', 'WhatsApp\'a gelen mesajlara otomatik cevap kuruyoruz, formları da tabloya kaydediyoruz.'],
        emlak: ['Emlakçı otomasyonu istiyorum', 'Emlak ofisleri için otomasyon 5.000 ₺\'den başlıyor. Kapsamı ofisinize göre birlikte belirleriz.'],
        fiyat: ['Fiyatları öğrenmek istiyorum', 'Web sitesi 10.000 ₺\'den, emlakçı otomasyonu 5.000 ₺\'den, Norevo aylık 999 ₺\'den başlıyor. Size özel fiyat için birkaç bilgi yeterli.'],
      },
      client: 'Zaten müşteriyim', clientReply: 'Hoş geldiniz. Destek talebinizi WhatsApp\'tan iletebilirsiniz.',
      writeWa: 'WhatsApp\'ta yaz →', other: 'Başka bir konu',
      askName: 'Size nasıl hitap edeyim? Adınızı yazar mısınız?', namePh: 'Adınız', phonePh: '05xx xxx xx xx',
      nice: n => `Memnun oldum, ${n}. WhatsApp numaranızı yazar mısınız? Size oradan döneceğiz.`,
      ready: 'Teşekkürler, mesajınız hazır. Aşağıdaki butonla WhatsApp\'tan gönderin, en kısa sürede döneriz.',
      privacy: url => `Bilgileriniz yalnızca bu talep için kullanılır. <a href="${url}">KVKK Aydınlatma Metni</a>`,
      sendWa: 'WhatsApp\'ta gönder →',
      msg: (topic, ad, tel) => `Merhaba Merdo Media, bilgi almak istiyorum.\nKonu: ${topic}\nAd: ${ad}\nTelefon: ${tel}`,
      open: 'Sohbeti aç', close: 'Sohbeti kapat',
      refYes: 'Evet, göster', refNo: 'Hayır, devam edelim', refOpen: 'Siteyi aç ↗',
      refAfter: 'Beğendiyseniz size de benzerini yapabiliriz.',
      refAlt: t => `${t} ekran görüntüsü`,
      refs: {
        web: { q: 'Örnek bir site görmek ister misiniz?', intro: 'Örnek olarak hazırladığımız demo site:', title: 'Merdo Mobilya', desc: 'Mobilya mağazası için demo', url: 'https://mertozmen899-alt.github.io/merdo-mobilya-demo/', img: 'ref-mobilya.webp' },
        oto: { q: 'Yaptığımız otomasyonlardan birini görmek ister misiniz?', intro: 'Bizim otomasyonumuz Norevo:', title: 'Norevo', desc: 'Google ve Haritalar sıralama takip botu', url: 'https://mertozmen899-alt.github.io/norevo/', img: 'ref-norevo.webp' },
      },
    },
  };
  const X = window.MERDO_TEXT || {};
  const T = Object.assign({}, TR, X, { fm: Object.assign({}, TR.fm, X.fm), chat: Object.assign({}, TR.chat, X.chat) });
  const ASSETS = new URL('.', document.currentScript.src).href;

  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  if (!RM) root.classList.add('motion');
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const WA_NUMBER = '905556984086';
  const waLink = t => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t)}`;
  const every = (fn, ms_) => setInterval(() => { if (!document.hidden) fn(); }, ms_);

  const BODY = 'M-100 -38C-100 -103 -55 -140 0 -140C55 -140 100 -103 100 -38C100 -10 80 0 50 0L-50 0C-80 0 -100 -10 -100 -38Z';
  const SVG = `<svg viewBox="-112 -152 224 158" aria-hidden="true" focusable="false"><g class="m-body"><path class="m-shape" d="${BODY}" fill="#C8F135"/><g class="m-eyes"><g class="m-open"><rect x="-39" y="-102" width="28" height="52" rx="14" fill="#111214"/><rect x="11" y="-102" width="28" height="52" rx="14" fill="#111214"/><circle cx="-31" cy="-91" r="5" fill="#F5F6F1"/><circle cx="19" cy="-91" r="5" fill="#F5F6F1"/></g><g class="m-happy" fill="none" stroke="#111214" stroke-width="11" stroke-linecap="round"><path d="M-41 -70Q-25 -96 -9 -70"/><path d="M9 -70Q25 -96 41 -70"/></g></g></g></svg>`;

  const ms = $$('[data-mochi]').map(el => {
    el.insertAdjacentHTML('beforeend', SVG);
    return { el, eyes: $('.m-eyes', el), rot: +(el.dataset.rot || 0), fixed: el.hasAttribute('data-static') };
  });
  const M = el => el ? ms.find(m => m.el === el || m.el.contains(el)) : null;
  const setEyes = (m, x, y) => { m.eyes.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`; };
  const flash = (el, cls, ms_) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); clearTimeout(el['_' + cls]); el['_' + cls] = setTimeout(() => el.classList.remove(cls), ms_); };
  const poke = m => { if (RM || !m) return; flash(m.el, 'squish', 560); flash(m.el, 'happy', 950); };
  const hop = m => { if (RM || !m) return; flash(m.el, 'hop', 620); };

  let px = null, py = null, lastMove = 0, raf = 0;
  const startAt = performance.now() + 1700;
  function aim(m, tx, ty) {
    const r = m.el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight || !r.width) return;
    let vx = tx - (r.left + r.width / 2), vy = ty - (r.top + r.height / 2);
    if (m.rot) { const a = m.rot * Math.PI / 180, c = Math.cos(a), s = Math.sin(a); [vx, vy] = [vx * c + vy * s, -vx * s + vy * c]; }
    const d = Math.hypot(vx, vy) || 1, k = Math.min(1, d / 220);
    setEyes(m, vx / d * 16 * k, vy / d * 10 * k);
  }
  if (!RM && ms.length) {
    const hero = M($('.hero-mochi'));
    if (hero) setEyes(hero, -16, 4);
    addEventListener('pointermove', e => {
      px = e.clientX; py = e.clientY; lastMove = performance.now();
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        if (performance.now() < startAt) return;
        ms.forEach(m => { if (!m.fixed) aim(m, px, py); });
      });
    }, { passive: true });
    every(() => {
      if (performance.now() - lastMove < 3500 || performance.now() < startAt) return;
      ms.forEach(m => { if (!m.fixed && Math.random() < .55) setEyes(m, (Math.random() * 2 - 1) * 15, (Math.random() * 2 - 1) * 8); });
    }, 2300);
    every(() => {
      ms.forEach(m => { if (Math.random() < .22) flash(m.el, 'blink', 150); });
    }, 1100);
    every(() => {
      const vis = ms.filter(m => { if (m.fixed) return false; const r = m.el.getBoundingClientRect(); return r.width && r.bottom > 0 && r.top < innerHeight; });
      if (vis.length) hop(vis[Math.floor(Math.random() * vis.length)]);
    }, 3600);
  }
  ms.forEach(m => m.el.addEventListener('click', () => poke(m)));

  let heroI = 0;
  const heroM = $('.hero-mochi'), heroB = $('#heroBubble');
  if (heroM && heroB) heroM.addEventListener('click', () => { heroI = (heroI + 1) % T.heroLines.length; heroB.innerHTML = T.heroLines[heroI]; });

  const stage = $('.hero-stage'), heroMo = M(heroM);
  const chips = stage ? $$('.orbit .chip', stage) : [];
  if (heroMo && heroB && chips.length) {
    const body = $('svg', heroMo.el);
    const ringF = $('.ring.front path', stage), ringB = $('.ring.back path', stage);
    const TAU = Math.PI * 2, N = chips.length, STEP = TAU / N, SPEED = STEP / 4.6;
    const TILT = -8 * Math.PI / 180, cT = Math.cos(TILT), sT = Math.sin(TILT);
    const hello = heroB.innerHTML, t0 = performance.now();
    const backOut = t => 1 + 2.4 * (t - 1) ** 3 + 1.4 * (t - 1) ** 2;
    const WIN = Math.PI / 4;
    const STILL = [20, 160, 90].map(d => d * Math.PI / 180);
    const said = chips.map(() => 0);
    let L = null, v = 1, hover = -1, asked = -1, lean = 0, last = t0;
    let th = WIN + .02 - SPEED * (startAt - t0) / 1000;

    const pt = (a, k) => { const x = L.rx * Math.cos(a) * k, y = L.ry * Math.sin(a) * k; return [L.cx + x * cT - y * sT, L.cy + x * sT + y * cT]; };
    const placeBubble = () => {
      if (!L) return;
      const bw = heroB.offsetWidth, bh = heroB.offsetHeight;
      const left = Math.max(0, Math.min(L.W - bw, L.cx - bw / 2));
      const top = Math.max(0, L.top - L.lift - bh - 10);
      heroB.style.left = left + 'px'; heroB.style.top = top + 'px';
      heroB.style.setProperty('--tx', (L.cx - left) + 'px');
    };
    const measure = () => {
      const m = heroMo.el, W = stage.clientWidth, mw = m.offsetWidth, mh = m.offsetHeight;
      const bleed = parseFloat(getComputedStyle(stage).getPropertyValue('--bleed')) || 0;
      const cw = chips.map(c => c.offsetWidth), wide = Math.max(...chips.filter(c => !c.classList.contains('on')).map(c => c.offsetWidth), 0);
      L = { W, bleed, cw, top: m.offsetTop, cx: m.offsetLeft + mw / 2, cy: m.offsetTop + mh * .5, eye: m.offsetTop + mh * .48,
            rx: Math.min(mw * 1.15, W / 2 + bleed - wide * .3), ry: mh * .7, lift: mh * .2 };
      [ringF, ringB].forEach((p, j) => {
        let d = '';
        for (let s = 0; s <= 48; s++) { const [x, y] = pt(Math.PI * (j + s / 48), 1); d += (s ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); }
        p.setAttribute('d', d);
      });
      placeBubble();
    };
    const say = html => { heroB.innerHTML = `<span class="say">${html}</span>`; placeBubble(); };
    heroM.addEventListener('click', placeBubble);
    const setAsked = i => {
      if (i === asked) return;
      asked = i;
      chips.forEach((c, j) => c.classList.toggle('on', j === i));
      L.cw = chips.map(c => c.offsetWidth);
      if (i < 0) { say(hello); return; }
      const lines = T.heroAsk[i];
      say(lines[said[i]++ % lines.length]);
      if (!RM) { flash(chips[i], 'ping', 900); if (hover < 0) hop(heroMo); }
    };
    const render = now => {
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      if (!RM) { v += ((hover < 0 ? 1 : 0) - v) * Math.min(1, dt * 5); th += SPEED * v * dt; }
      const k = RM ? 1 : backOut(Math.min(1, Math.max(0, (now - t0 - 450) / 1100)));
      const ang = i => RM ? STILL[i % 3] : th + i * STEP;
      let front = 0;
      chips.forEach((c, i) => { const n = ((ang(i) % TAU) + TAU) % TAU; if (n >= WIN && n < WIN + STEP) front = i; });
      setAsked(hover >= 0 ? hover : (RM || now < startAt) ? -1 : front);
      let tx = 0, ty = 0;
      chips.forEach((c, i) => {
        const a = ang(i), sa = Math.sin(a), depth = (sa + 1) / 2, on = i === asked;
        let [x, y] = pt(a, k);
        const s = (RM ? .9 + .14 * depth : .58 + .5 * depth) * (on ? 1.08 : 1);
        const hw = L.cw[i] * s / 2 + 2;
        x = Math.min(L.W + L.bleed - hw, Math.max(hw - L.bleed, x));
        if (on) { tx = x; ty = y; }
        c.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) translate(-50%,-50%) scale(${s.toFixed(3)})`;
        c.style.opacity = RM || on ? 1 : ((.36 + .64 * depth) * Math.min(1, k * 1.6)).toFixed(3);
        c.style.zIndex = RM || on || sa >= 0 ? 4 : 1;
        c.style.filter = RM || on || depth > .5 ? '' : `blur(${((.5 - depth) * 2.6).toFixed(2)}px)`;
      });
      if (asked >= 0) {
        const vx = tx - L.cx, vy = ty - L.eye, d = Math.hypot(vx, vy) || 1, q = Math.min(1, d / 140);
        setEyes(heroMo, vx / d * 16 * q, vy / d * 10 * q);
      }
      const want = asked >= 0 ? Math.max(-7, Math.min(7, (tx - L.cx) / L.W * 20)) : 0;
      lean += (want - lean) * (RM ? 1 : Math.min(1, dt * 6));
      body.style.transform = `rotate(${lean.toFixed(2)}deg)`;
    };
    chips.forEach((c, i) => {
      const on = () => { hover = i; if (RM) render(performance.now()); };
      const off = () => { hover = -1; if (RM) render(performance.now()); };
      c.addEventListener('pointerenter', on); c.addEventListener('pointerleave', off);
      c.addEventListener('focus', on); c.addEventListener('blur', off);
    });
    measure();
    new ResizeObserver(() => { measure(); if (RM) render(performance.now()); }).observe(stage);
    new ResizeObserver(placeBubble).observe(heroB);
    if (document.fonts) document.fonts.ready.then(() => { measure(); if (RM) render(performance.now()); });
    if (RM) render(performance.now());
    else {
      let rid = 0;
      const loop = now => { render(now); rid = document.hidden ? 0 : requestAnimationFrame(loop); };
      rid = requestAnimationFrame(loop);
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && !rid) { last = performance.now(); rid = requestAnimationFrame(loop); }
      });
    }
  }

  $$('[data-wa]').forEach(a => { a.href = waLink(T.wa[a.dataset.wa]); a.target = '_blank'; a.rel = 'noopener'; });
  $$('[data-wa-t]').forEach(a => { a.href = waLink(a.dataset.waT); a.target = '_blank'; a.rel = 'noopener'; });

  const burger = $('#burger'), mm = $('#mmenu'), logo = $('.hdr .logo');
  if (logo) {
    logo.classList.add('play');
    if (!RM) every(() => { logo.classList.remove('play'); void logo.offsetWidth; logo.classList.add('play'); }, 13000);
  }
  const setMenu = open => {
    if (!burger || !mm) return;
    mm.hidden = !open; burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? T.menuClose : T.menuOpen);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  if (burger && mm) {
    burger.addEventListener('click', () => setMenu(mm.hidden));
    $$('a', mm).forEach(a => a.addEventListener('click', () => setMenu(false)));
  }

  (() => {
    const openRow = h => { const d = h && h.length > 1 && document.getElementById(decodeURIComponent(h.slice(1))); if (d && d.tagName === 'DETAILS') d.open = true; };
    $$('a[href^="#d-"]').forEach(a => a.addEventListener('click', () => openRow(a.hash)));
    addEventListener('hashchange', () => openRow(location.hash));
    openRow(location.hash);
  })();

  (() => {
    const list = $('#icSatirlar'), acik = $('#icAcik');
    if (!list || !acik) return;
    const ilk = acik.innerHTML;
    const goster = li => {
      $$('li.ic-on', list).forEach(x => x.classList.remove('ic-on'));
      if (!li) { acik.innerHTML = ilk; return; }
      li.classList.add('ic-on');
      acik.innerHTML = `<b>* ${$('b', li).textContent}:</b> ${li.dataset.acik}`;
    };
    $$('li', list).forEach(li => ['pointerenter', 'focus', 'click'].forEach(ev => li.addEventListener(ev, () => goster(li))));
    list.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') goster(null); });
  })();


  const guide = $('#guide');
  let openChat = () => {}, chatOpen = false;
  if (guide) {
    const gBtn = $('#guideBtn');
    const C = T.chat, cwBody = $('#cwBody'), cwIn = $('#cwIn'), cwInput = $('#cwInput'), cwErr = $('#cwErr');
    const AV = `<span class="mav">${SVG}</span>`;
    const esc = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const wait = ms_ => new Promise(r => setTimeout(r, RM ? 0 : ms_));
    const add = (html, cls) => { const d = document.createElement('div'); d.className = cls; d.innerHTML = html; cwBody.appendChild(d); cwBody.scrollTop = 1e6; return d; };
    const typing = async ms_ => { const d = add(AV + '<div class="msg b"><span class="dots"><i></i><i></i><i></i></span></div>', 'row'); await wait(ms_); d.remove(); };
    const bot = async (html, ms_ = 900) => { await typing(ms_); add(AV + `<div class="msg b">${html}</div>`, 'row'); };
    const user = t => { const d = add('', 'msg u'); d.textContent = t; };
    const options = list => {
      const w = add('', 'opts-c');
      list.forEach(([label, fn, cls, href], i) => {
        const el = document.createElement(href ? 'a' : 'button');
        el.textContent = label; el.style.animationDelay = i * 70 + 'ms';
        if (cls) el.className = cls;
        if (href) { el.href = href; el.target = '_blank'; el.rel = 'noopener'; } else { el.type = 'button'; el.onclick = () => { w.remove(); fn(label); }; }
        w.appendChild(el);
      });
    };
    const lead = { topic: '', ad: '' };
    let ask = null;
    const askInput = kind => {
      ask = kind; cwErr.textContent = ''; cwInput.value = '';
      cwInput.type = kind === 'tel' ? 'tel' : 'text';
      cwInput.inputMode = kind === 'tel' ? 'tel' : 'text';
      cwInput.autocomplete = kind === 'tel' ? 'tel' : 'given-name';
      cwInput.placeholder = kind === 'tel' ? C.phonePh : C.namePh;
      cwIn.classList.add('on'); cwInput.focus();
    };
    const menu = async again => {
      await bot(again ? C.askAgain : C.ask, again ? 600 : 900);
      options([
        ...Object.entries(C.topics).map(([k, [label]]) => [label, t => pickTopic(k, t)]),
        [C.client, async t => { user(t); await bot(C.clientReply); options([[C.writeWa, null, 'go', waLink(T.wa.destek)], [C.other, () => menu(true), 'ghost']]); }],
      ]);
    };
    const askName = async () => { await bot(C.askName, 700); askInput('ad'); };
    const refCard = r => add(AV + `<a class="refc" href="${r.url}" target="_blank" rel="noopener"><img src="${ASSETS}${r.img}" alt="${esc(C.refAlt(r.title))}" width="640" height="400"><span class="refc-t"><b>${esc(r.title)}</b><small>${esc(r.desc)}</small></span><span class="refc-go">${C.refOpen}</span></a>`, 'row');
    const pickTopic = async (k, t) => {
      lead.topic = C.topics[k][0]; user(t);
      await bot(C.topics[k][1]);
      const r = C.refs && C.refs[k];
      if (!r) return askName();
      await bot(r.q, 700);
      options([
        [C.refYes, async a => { user(a); await bot(r.intro, 600); refCard(r); await bot(C.refAfter, 900); askName(); }],
        [C.refNo, a => { user(a); askName(); }, 'ghost'],
      ]);
    };
    cwIn.addEventListener('submit', async e => {
      e.preventDefault();
      const v = cwInput.value.trim();
      cwErr.textContent = '';
      if (ask === 'ad') {
        if (v.length < 2) { cwErr.textContent = T.fm.errName; return; }
        lead.ad = v; user(v); cwIn.classList.remove('on'); ask = null;
        await bot(C.nice(esc(v)));
        askInput('tel');
      } else if (ask === 'tel') {
        const d = v.replace(/\D/g, '');
        if (d.length < 10 || d.length > 13) { cwErr.textContent = T.fm.errPhone; return; }
        user(v); cwIn.classList.remove('on'); ask = null;
        await bot(C.ready);
        await bot(C.privacy(T.kvkkUrl), 500);
        options([[C.sendWa, null, 'go', waLink(C.msg(lead.topic, lead.ad, v))], [C.other, () => menu(true), 'ghost']]);
      }
    });
    cwInput.addEventListener('input', () => cwErr.textContent = '');

    let started = false;
    openChat = o => {
      if (o === chatOpen) return;
      chatOpen = o;
      guide.classList.toggle('open', o);
      gBtn.setAttribute('aria-expanded', o); gBtn.setAttribute('aria-label', o ? C.close : C.open);
      if (o && !started) { started = true; (async () => { await bot(C.hello, 800); menu(); })(); }
      if (o) (ask ? cwInput : $('#cwClose')).focus();
    };
    gBtn.addEventListener('click', () => { const o = !chatOpen; openChat(o); if (!o) gBtn.focus(); });
    $('#cwClose').addEventListener('click', () => { openChat(false); gBtn.focus(); });

    const mo = M($('.ml-mochi', gBtn));
    if (mo && !RM) {
      const at = (ms_, fn) => setTimeout(fn, ms_);
      const peek = () => {
        if (document.hidden || chatOpen || gBtn.matches(':hover')) return;
        gBtn.classList.add('ml-rise');
        at(600, () => gBtn.classList.add('ml-l'));
        at(1400, () => { gBtn.classList.remove('ml-l'); gBtn.classList.add('ml-r'); });
        at(2200, () => gBtn.classList.remove('ml-r'));
        at(2400, () => flash(mo.el, 'blink', 150));
        at(3100, () => gBtn.classList.remove('ml-rise'));
      };
      at(1200, peek);
      every(peek, 8000);
    }
  }
  addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (chatOpen) { openChat(false); $('#guideBtn').focus(); }
    if (mm && !mm.hidden) { setMenu(false); burger.focus(); }
  });

  const faqM = M($('.faq-mochi'));
  $$('.faq-list details').forEach(d => d.addEventListener('toggle', () => { if (d.open) hop(faqM); }));

  const faqs = $$('#sss details');
  if (faqs.length) {
    const ld = document.createElement('script'); ld.type = 'application/ld+json';
    ld.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(d => ({ '@type': 'Question', name: d.querySelector('summary').textContent.trim(), acceptedAnswer: { '@type': 'Answer', text: d.querySelector('p').textContent } })) });
    document.head.appendChild(ld);
  }
})();
