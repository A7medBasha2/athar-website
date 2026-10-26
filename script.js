(() => {
  const config = window.ATHAR_CONFIG || {};
  const download = document.getElementById('download-button');
  const status = document.getElementById('download-status');
  const versionLabel = document.getElementById('version-label');
  const releasePage = document.getElementById('release-page');
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  document.getElementById('year').textContent = new Date().getFullYear();

  document.querySelectorAll('a[href="mailto:CONTACT_EMAIL"]').forEach(link => {
    if (config.contactEmail) link.href = 'mailto:' + config.contactEmail;
    else link.addEventListener('click', event => { event.preventDefault(); status.textContent = 'بريد التواصل سيُضاف قريبًا.'; document.getElementById('download').scrollIntoView({behavior:'smooth'}); });
  });

  menuToggle?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.textContent = isOpen ? '×' : '☰';
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open'); menuToggle?.setAttribute('aria-expanded', 'false'); if(menuToggle) menuToggle.textContent='☰';
  }));

  function setUnavailable(message) {
    download.removeAttribute('href'); download.setAttribute('aria-disabled', 'true'); download.classList.add('is-disabled');
    status.textContent = message;
  }
  async function loadLatest() {
    const manifestUrl = config.manifestUrl || './website-latest.json';
    try {
      const response = await fetch(manifestUrl + (manifestUrl.includes('?') ? '&' : '?') + 't=' + Date.now(), {cache:'no-store'});
      if (!response.ok) throw new Error('manifest unavailable');
      const data = await response.json();
      if (!data || typeof data.apkUrl !== 'string' || !/^https:\/\//i.test(data.apkUrl)) throw new Error('invalid apk url');
      download.href = data.apkUrl; download.target = '_blank'; download.rel = 'noopener noreferrer'; download.removeAttribute('aria-disabled'); download.classList.remove('is-disabled');
      download.addEventListener('click', () => { status.textContent = 'جارٍ فتح رابط تنزيل ملف APK من خادم أثر…'; }, {once:true});
      versionLabel.textContent = 'الإصدار: ' + (data.versionName || 'متاح');
      status.textContent = 'أحدث إصدار متاح للتنزيل.';
      if (data.releasePage && /^https:\/\//i.test(data.releasePage)) { releasePage.href = data.releasePage; releasePage.hidden = false; }
      else releasePage.hidden = true;
    } catch (_) {
      versionLabel.textContent = 'تعذّر التحقق';
      setUnavailable('تعذّر تحميل بيانات الإصدار الآن. جرّب تحديث الصفحة بعد قليل.');
    }
  }
  loadLatest();
})();
