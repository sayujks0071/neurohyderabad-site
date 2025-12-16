export default function Head() {
  return (
    <>
      {/* Bing Webmaster Tools Verification */}
      <meta name="msvalidate.01" content="13FC1F5CB1F44756BDBFD421C02C29E2" />

      {/* Google tag (gtag.js) */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17680191922" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-17680191922');
          `,
        }}
      />
      {/* Event snippet for Contact conversion page */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
gtag('event', 'conversion', {'send_to': 'AW-17680191922/zBshCJ3e2M0bELKjye5B'});
          `,
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
    'send_to': 'AW-17680191922/zBshCJ3e2M0bELKjye5B',
    'event_callback': callback
  });
  return false;
}
          `,
        }}
      />

      {/* Critical CSS inlined for fastest rendering */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
*,*::before,*::after{box-sizing:border-box}
html{line-height:1.15;-webkit-text-size-adjust:100%}
body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif}
.min-h-screen{min-height:100vh}
.container{margin-left:auto;margin-right:auto;padding-left:1rem;padding-right:1rem}
@media (min-width:640px){.container{max-width:640px}}
@media (min-width:768px){.container{max-width:768px}}
@media (min-width:1024px){.container{max-width:1024px}}
@media (min-width:1280px){.container{max-width:1280px}}
@media (min-width:1536px){.container{max-width:1536px}}
.home-hero{background:linear-gradient(90deg,#2563eb 0%,#1e3a8a 100%);color:#f8fafc;padding-top:80px;padding-bottom:80px}
.home-hero__title{font-size:2.25rem;font-weight:700;margin-bottom:1.5rem;line-height:1.1;color:#f8fafc}
.home-hero__subtitle{display:block;font-size:1.875rem;color:#dbeafe}
.home-hero__lead{color:rgba(226,238,255,0.96);font-weight:500;line-height:1.55;max-width:40rem;margin:0 auto 1.5rem auto}
.bg-white{background-color:#ffffff}
.text-blue-600{color:#2563eb}
.px-8{padding-left:2rem;padding-right:2rem}
.py-4{padding-top:1rem;padding-bottom:1rem}
.rounded-full{border-radius:9999px}
.text-lg{font-size:1.125rem;line-height:1.75rem}
.font-semibold{font-weight:600}
.hover\\:bg-gray-100:hover{background-color:#f3f4f6}
.transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(0.4,0,0.2,1);transition-duration:150ms}
.inline-block{display:inline-block}
.grid{display:grid}
.lg\\:grid-cols-2{grid-template-columns:repeat(1,minmax(0,1fr))}
@media (min-width:1024px){.lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}
.gap-12{gap:3rem}
.items-center{align-items:center}
.text-center{text-align:center}
.lg\\:text-left{text-align:left}
@media (min-width:1024px){.lg\\:text-left{text-align:left}}
.mb-6{margin-bottom:1.5rem}
.mb-4{margin-bottom:1rem}
.ml-4{margin-left:1rem}
@media (min-width:768px){
  .home-hero__title{font-size:3.75rem}
  .home-hero__subtitle{font-size:3rem}
  .home-hero__lead{font-size:1.5rem}
}
.max-w-md{max-width:28rem}
.mx-auto{margin-left:auto;margin-right:auto}
.w-32{width:8rem}
.h-32{height:8rem}
.relative{position:relative}
.overflow-hidden{overflow:hidden}
.shadow-lg{box-shadow:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)}
.object-cover{object-fit:cover}
.w-full{width:100%}
.h-full{height:100%}
.text-blue-800{color:#1e40af}
.text-blue-100{color:#dbeafe}
.bg-green-600{background-color:#16a34a}
.hover\\:bg-green-700:hover{background-color:#15803d}
img{max-width:100%;height:auto}
          `,
        }}
      />

      {/* Preload critical resources for fastest LCP */}
      <link
        rel="preload"
        href="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />

      {/* Critical resource hints for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />

      {/* Additional PWA + mobile UX hints */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    </>
  );
}

