/* Merdo Media — ortak site betiği.
   Metinler aşağıdaki T sözlüğünde; başka dildeki sayfa, bu dosyadan önce window.MERDO_TEXT tanımlayarak üzerine yazar.
   Her bölüm, öğesi sayfada yoksa sessizce atlanır (yasal sayfalar da aynı dosyayı kullanır). */
(() => {
  const TR = {
    locale: 'tr-TR',
    kvkkUrl: 'kvkk.html',
    words: ['büyütüyoruz.', 'hızlandırıyoruz.', 'görünür kılıyoruz.', 'öne çıkarıyoruz.'],
    console: [
      ['<span class="p">›</span> brief: <span class="d">"Çorum\'da mobilya mağazası, katalog sitesi"</span>', 8],
      ['<span class="k">✓</span> renk ve tipografi seçildi', 22],
      ['<span class="k">✓</span> 6 sayfa oluşturuldu <span class="d">(ana sayfa, katalog, iletişim…)</span>', 48],
      ['<span class="k">✓</span> mobil ve masaüstü test edildi', 70],
      ['<span class="k">✓</span> son kontrol: metin + tasarım onaylandı', 88],
      ['<span class="p">›</span> yayında · <span class="k">ilk taslak 31 sa 12 dk</span>', 100],
    ],
    wa: { demo: 'Merhaba Merdo Media, ücretsiz demo istiyorum.', destek: 'Merhaba, mevcut müşterinizim. Destek / bakım talebim var: ' },
    menuOpen: 'Menüyü aç', menuClose: 'Menüyü kapat',
    fm: {
      done: 'Tamamlandı', step: (n, t) => `Adım ${n} / ${t}`, send: 'Gönder', next: 'Devam',
      errService: 'En az bir hizmet seçin.', errSector: 'Sektörünüzü seçin.', errBudget: 'Bir bütçe aralığı seçin.',
      errName: 'Adınızı yazın.', errPhone: 'Geçerli bir telefon numarası yazın.', errKvkk: 'Devam etmek için onay gerekli.',
      head: 'Merhaba Merdo Media, teklif almak istiyorum.',
      l: { hizmet: 'Hizmet', sektor: 'Sektör', butce: 'Bütçe', ad: 'Ad', tel: 'Telefon', isletme: 'İşletme', not: 'Not' },
    },
    chat: {
      hello: 'Merhaba, ben Elif! 👋 Merdo Media\'nın asistanıyım.',
      ask: 'Merdo Media\'da hangi konuda bilgi almak istersiniz?', askAgain: 'Başka hangi konuda yardımcı olayım?',
      topics: {
        web: ['Web sitesi yaptırmak istiyorum', 'Harika! Birkaç bilgiyle 48 saatte ilk taslağı hazırlayabiliriz.'],
        video: ['Reklam videosu istiyorum', 'Süper! Dikey, kare ve yatay formatları tek seferde hazırlıyoruz.'],
        oto: ['WhatsApp / form otomasyonu', 'Güzel! Gelen mesajlara hazır yanıt ve form akışları kuruyoruz.'],
        emlak: ['Emlakçı otomasyonu istiyorum', 'Emlak ofisleri için otomasyon 5.000 ₺\'den başlıyor. Kapsamı ofisinize göre birlikte belirleyelim.'],
        fiyat: ['Fiyatları öğrenmek istiyorum', 'Web sitesi 10.000 ₺\'den, emlakçı otomasyonu 5.000 ₺\'den, Norevo aylık 999 ₺\'den başlıyor. Size özel fiyat için birkaç bilgi yeterli.'],
      },
      client: 'Zaten müşteriyim', clientReply: 'Hoş geldiniz! Destek talebinizi WhatsApp\'tan iletebilirsiniz.',
      formOpt: 'Teklif formunu doldurayım', formReply: 'Formu açıyorum, 4 kısa adım.',
      writeWa: 'WhatsApp\'ta yaz →', other: 'Başka bir konu',
      askName: 'Size nasıl hitap edeyim? Adınızı yazar mısınız?', namePh: 'Adınız', phonePh: '05xx xxx xx xx',
      nice: n => `Memnun oldum, ${n}! WhatsApp numaranızı yazar mısınız? Size oradan döneceğiz.`,
      ready: 'Teşekkürler! Talebiniz hazır. Aşağıdaki butonla WhatsApp\'ta gönderin, en kısa sürede dönelim.',
      privacy: url => `Bilgileriniz yalnızca bu talep için kullanılır. <a href="${url}">KVKK Aydınlatma Metni</a>`,
      sendWa: 'WhatsApp\'ta gönder →',
      msg: (topic, ad, tel) => `Merhaba Merdo Media, bilgi almak istiyorum.\nKonu: ${topic}\nAd: ${ad}\nTelefon: ${tel}`,
      open: 'Sohbeti aç', close: 'Sohbeti kapat',
      refYes: 'Evet, göster', refNo: 'Hayır, devam edelim', refOpen: 'Siteyi aç ↗',
      refAfter: 'Beğendiyseniz sizin için de benzerini hazırlayalım.',
      refs: {
        web: { q: 'Referans web sitemizi görmek ister misiniz?', intro: 'Yaptığımız sitelerden biri:', title: 'Merdo Mobilya', desc: 'Mobilya mağazası için katalog sitesi', url: 'https://mertozmen899-alt.github.io/merdo-mobilya-demo/', img: 'ref-mobilya.webp' },
        oto: { q: 'Yaptığımız otomasyonlardan birini görmek ister misiniz?', intro: 'Örnek otomasyonumuz:', title: 'Norevo', desc: 'Google ve Haritalar sıralama takip botu', url: 'https://mertozmen899-alt.github.io/norevo/', img: 'ref-norevo.webp' },
      },
    },
    tease: [
      '<b>Siteniz hâlâ hazır değil mi?</b> İlk taslağı 48 saatte görün. Yardımcı olayım mı?',
      '<b>Reklam videosu</b> mu lazım? Dikey, kare ve yatay formatları tek seferde hazırlıyoruz.',
      '<b>Merhaba!</b> İşletmeniz için doğru paketi birlikte seçelim mi?',
    ],
  };
  // başka dilin sözlüğü eksik anahtar bırakırsa Türkçeye düşer
  const X = window.MERDO_TEXT || {};
  const T = Object.assign({}, TR, X, { fm: Object.assign({}, TR.fm, X.fm), chat: Object.assign({}, TR.chat, X.chat) });
  const ASSETS = new URL('.', document.currentScript.src).href;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;

  // açık / koyu tema
  const themeBtn = $('#theme');
  if (themeBtn) themeBtn.addEventListener('click', () => {
    const t = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = t;
    try { localStorage.setItem('merdo-theme', t); } catch (e) {}
  });

  // saat
  const clock = $('#clock');
  if (clock) { const tick = () => clock.textContent = new Date().toLocaleTimeString(T.locale); tick(); setInterval(tick, 1000); }

  // başlıkta değişen kelime
  const typed = $('#typed');
  if (typed && !reduce) {
    const words = T.words;
    let wi = 0, ci = words[0].length, del = true;
    const loop = () => {
      if (del) { ci--; if (ci === 0) { del = false; wi = (wi + 1) % words.length; } } else ci++;
      typed.textContent = words[wi].slice(0, ci) || ' ';
      // kelime tamamlandı: önce son harfi göster, sonra bekle
      if (!del && ci === words[wi].length) { del = true; return setTimeout(loop, 2200); }
      setTimeout(loop, del ? 45 : 85);
    };
    setTimeout(loop, 2400);
  }

  // canlı konsol
  const cbody = $('#cbody'), cbar = $('#cbar');
  if (cbody) {
    const runConsole = () => {
      cbody.innerHTML = ''; cbar.style.width = '0';
      T.console.forEach(([html, pct], i) => {
        const d = document.createElement('div'); d.className = 'l'; d.innerHTML = html; cbody.appendChild(d);
        setTimeout(() => { d.classList.add('on'); cbar.style.width = pct + '%'; }, reduce ? 0 : 600 + i * 900);
      });
      if (!reduce) setTimeout(runConsole, 600 + T.console.length * 900 + 3500);
    };
    runConsole();
  }

  // görünme + sayaç + maketler
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target; el.classList.add('in'); io.unobserve(el);
    $$('[data-count]', el).forEach(n => {
      const to = +n.dataset.count; if (reduce) return n.textContent = to;
      const t0 = performance.now();
      const step = t => { const p = Math.min((t - t0) / 1400, 1); n.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
    const mchat = $('#mchat');
    if (mchat && el.contains(mchat)) {
      const bs = $$('.bub', mchat);
      bs.forEach((b, i) => setTimeout(() => { b.classList.add('on'); if (i === bs.length - 1) $('.typing', mchat).classList.add('gone'); }, reduce ? 0 : 300 + i * 800));
    }
  }), { threshold: .18 });
  $$('.rv, .step, #mbrowser, #giant').forEach(el => io.observe(el));

  // manifesto: kaydırdıkça kelime kelime yanar
  const mbig = $('#mbig');
  let mw = [];
  if (mbig) { mbig.innerHTML = mbig.textContent.split(' ').map(w => `<span class="w">${w}</span>`).join(' '); mw = $$('.w', mbig); }
  // dev footer yazısı harf harf
  const giant = $('#giant');
  if (giant) giant.innerHTML = '<span class="gw"></span>';

  // kaydırma: ilerleme çubuğu, menü, manifesto
  const hdr = $('#hdr'), prog = $('#progress');
  const onScroll = () => {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    if (prog) prog.style.width = (h > 0 ? y / h * 100 : 0) + '%';
    if (hdr) hdr.classList.toggle('scrolled', y > 10);
    if (mbig) {
      const r = mbig.getBoundingClientRect();
      const p = Math.min(Math.max((innerHeight * .85 - r.top) / (r.height + innerHeight * .35), 0), 1);
      const lit = reduce ? mw.length : Math.round(p * mw.length);
      mw.forEach((w, i) => w.classList.toggle('lit', i < lit));
    }
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // portföy filtresi
  $$('.f').forEach(b => b.addEventListener('click', () => {
    $$('.f').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
    const f = b.dataset.f;
    $$('#works .work').forEach(w => w.classList.toggle('hide', f !== 'all' && !w.dataset.cat.split(' ').includes(f)));
  }));

  // WhatsApp linkleri
  const WA_NUMBER = '905556984086';
  const waLink = t => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t)}`;
  $$('[data-wa]').forEach(a => { a.href = waLink(T.wa[a.dataset.wa]); a.target = '_blank'; a.rel = 'noopener'; });

  // mobil menü
  const burger = $('#burger'), mm = $('#mmenu');
  const setMenu = o => {
    if (!burger || !mm) return;
    mm.classList.toggle('open', o); burger.setAttribute('aria-expanded', o);
    burger.setAttribute('aria-label', o ? T.menuClose : T.menuOpen); burger.textContent = o ? '×' : '☰';
  };
  if (burger && mm) {
    burger.addEventListener('click', () => setMenu(!mm.classList.contains('open')));
    $$('a', mm).forEach(a => a.addEventListener('click', () => setMenu(false)));
  }

  // çok adımlı teklif formu: veri saklanmaz, WhatsApp mesajı olarak hazırlanır
  const fm = $('#fm');
  let openForm = () => {};
  if (fm) {
    const form = $('#fmForm'), steps = $$('.fm-step', fm), err = $('#fmErr'), TOTAL = 4, F = T.fm;
    let cur = 1;
    const show = n => {
      cur = n;
      steps.forEach(s => s.classList.toggle('on', +s.dataset.step === n));
      $('#fmBar').style.width = Math.min(n, TOTAL) / TOTAL * 100 + '%';
      $('#fmCount').textContent = n > TOTAL ? F.done : F.step(n, TOTAL);
      $('#fmBack').style.visibility = n > 1 && n <= TOTAL ? 'visible' : 'hidden';
      $('#fmNav').style.display = n > TOTAL ? 'none' : '';
      $('#fmNextT').textContent = n === TOTAL ? F.send : F.next;
      err.textContent = '';
    };
    openForm = () => { form.reset(); show(1); fm.showModal(); };
    $$('[data-open="form"]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); setMenu(false); openForm(); }));
    $$('[data-close]', fm).forEach(b => b.addEventListener('click', () => fm.close()));
    fm.addEventListener('click', e => { if (e.target === fm) fm.close(); });
    $('#fmBack').addEventListener('click', () => show(cur - 1));
    form.addEventListener('input', () => err.textContent = '');
    const picked = n => [...form.querySelectorAll(`[name="${n}"]:checked`)].map(i => i.value);
    const check = () => {
      if (cur === 1 && !picked('hizmet').length) return F.errService;
      if (cur === 2 && !picked('sektor').length) return F.errSector;
      if (cur === 3 && !picked('butce').length) return F.errBudget;
      if (cur === 4) {
        if (form.elements.ad.value.trim().length < 2) return F.errName;
        const d = form.elements.tel.value.replace(/\D/g, '');
        if (d.length < 10 || d.length > 13) return F.errPhone;
        if (!form.elements.kvkk.checked) return F.errKvkk;
      }
      return '';
    };
    form.addEventListener('submit', e => {
      e.preventDefault();
      const m = check(); if (m) { err.textContent = m; return; }
      if (cur < TOTAL) return show(cur + 1);
      const f = form.elements, v = k => f[k].value.trim(), L = F.l;
      const msg = [F.head, `${L.hizmet}: ${picked('hizmet').join(', ')}`, `${L.sektor}: ${picked('sektor')[0]}`, `${L.butce}: ${picked('butce')[0]}`, `${L.ad}: ${v('ad')}`, `${L.tel}: ${v('tel')}`, v('isletme') && `${L.isletme}: ${v('isletme')}`, v('not') && `${L.not}: ${v('not')}`].filter(Boolean).join('\n');
      const url = waLink(msg);
      $('#fmWa').href = url; window.open(url, '_blank', 'noopener'); show(TOTAL + 1);
    });
  }

  // sohbet asistanı: davet mesajı → konu → ad → telefon → hazır WhatsApp mesajı (veri saklanmaz)
  const cw = $('#cw');
  let openChat = () => {};
  if (cw) {
    const C = T.chat, cwBody = $('#cwBody'), cwBtn = $('#cwBtn'), tease = $('#cwTease'), cwTx = $('#cwTx');
    const cwIn = $('#cwIn'), cwInput = $('#cwInput'), cwErr = $('#cwErr');
    const AV = '<span class="mav"><svg><use href="#av"/></svg></span>';
    const esc = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const wait = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));
    const add = (html, cls) => { const d = document.createElement('div'); d.className = cls; d.innerHTML = html; cwBody.appendChild(d); cwBody.scrollTop = 1e6; return d; };
    const typing = async ms => { const d = add(AV + '<div class="msg b"><span class="dots"><i></i><i></i><i></i></span></div>', 'row'); await wait(ms); d.remove(); };
    const bot = async (html, ms = 900) => { await typing(ms); add(AV + `<div class="msg b">${html}</div>`, 'row'); };
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
    let ask = null; // input'un beklediği adım: 'ad' | 'tel'
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
        [C.formOpt, async t => { user(t); await bot(C.formReply, 600); await wait(400); openForm(); }],
      ]);
    };
    const askName = async () => { await bot(C.askName, 700); askInput('ad'); };
    // referans kartı: gerçek ekran görüntüsü + başlık + "siteyi aç"
    const refCard = r => add(AV + `<a class="refc" href="${r.url}" target="_blank" rel="noopener"><img src="${ASSETS}${r.img}" alt="${esc(r.title)} ekran görüntüsü" width="640" height="400"><span class="refc-t"><b>${esc(r.title)}</b><small>${esc(r.desc)}</small></span><span class="refc-go">${C.refOpen}</span></a>`, 'row');
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
      cw.classList.toggle('open', o); cw.classList.remove('teasing');
      cwBtn.setAttribute('aria-expanded', o); cwBtn.setAttribute('aria-label', o ? C.close : C.open);
      if (o && !started) { started = true; (async () => { await bot(C.hello, 800); menu(); })(); }
      if (o && ask) cwInput.focus();
    };
    cwBtn.addEventListener('click', () => openChat(!cw.classList.contains('open')));
    $('#cwClose').addEventListener('click', () => openChat(false));
    tease.addEventListener('click', () => openChat(true));
    tease.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openChat(true); } });

    // davet mesajları dönerek gösterilir; kapatılırsa bu oturumda bir daha çıkmaz
    let ti = 0, teaseTimer;
    cwTx.innerHTML = T.tease[0];
    const stopTease = () => { clearInterval(teaseTimer); cw.classList.remove('teasing'); };
    $('#cwTeaseX').addEventListener('click', e => { e.stopPropagation(); stopTease(); try { sessionStorage.setItem('cw-t', '1'); } catch (x) {} });
    let seen = false; try { seen = sessionStorage.getItem('cw-t') === '1'; } catch (x) {}
    if (!seen) setTimeout(() => {
      if (cw.classList.contains('open')) return;
      cw.classList.add('teasing');
      if (!reduce) teaseTimer = setInterval(() => {
        if (!cw.classList.contains('teasing')) return clearInterval(teaseTimer);
        cwTx.classList.add('fade');
        setTimeout(() => { ti = (ti + 1) % T.tease.length; cwTx.innerHTML = T.tease[ti]; cwTx.classList.remove('fade'); }, 300);
      }, 7000);
    }, 4000);
  }
  addEventListener('keydown', e => { if (e.key === 'Escape') { openChat(false); setMenu(false); } });

  // önce / sonra
  const ba = $('#ba');
  if (ba) ba.querySelector('input').addEventListener('input', e => ba.style.setProperty('--p', e.target.value + '%'));

  // SEO: SSS şeması görünen sorulardan üretilir
  const faqs = $$('#sss details');
  if (faqs.length) {
    const ld = document.createElement('script'); ld.type = 'application/ld+json';
    ld.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(d => ({ '@type': 'Question', name: d.querySelector('summary').firstChild.textContent.trim(), acceptedAnswer: { '@type': 'Answer', text: d.querySelector('p').textContent } })) });
    document.head.appendChild(ld);
  }

  if (!fine || reduce) return;

  // imleç ışığı + fareyle hareket eden şekiller
  const glow = $('#glow'), shapes = $$('.shape[data-depth]');
  if (glow) addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px';
    const dx = e.clientX / innerWidth - .5, dy = e.clientY / innerHeight - .5;
    shapes.forEach(s => { const d = +s.dataset.depth; const rot = s.classList.contains('s-dia') ? ' rotate(45deg)' : ''; s.style.transform = `translate(${dx * d}px, ${dy * d}px)${rot}`; });
  });

  // kartlarda imleci takip eden ışık
  $$('.spot').forEach(c => c.addEventListener('mousemove', e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }));

  // portföy kartlarında 3B eğim
  $$('.tilt').forEach(c => {
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      c.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    c.addEventListener('mouseleave', () => c.style.transform = '');
  });

  // manyetik butonlar
  $$('.mag').forEach(b => {
    b.addEventListener('mousemove', e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px, ${(e.clientY - r.top - r.height / 2) * .35}px)`;
    });
    b.addEventListener('mouseleave', () => b.style.transform = '');
  });
})();
