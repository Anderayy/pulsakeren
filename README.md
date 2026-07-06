# Pulsakerenzz Static Website

Website PPOB static untuk `pulsakerenzz.com`.

## Struktur

- `index.html` - homepage marketplace PPOB
- `login.html` - login demo
- `dashboard.html` - dashboard user statis interaktif
- `admin.html` - admin CMS statis interaktif
- `styles.css` - seluruh style
- `app.js`, `dashboard.js`, `admin.js` - interaksi dummy
- `assets/brands` - logo merchant/operator
- `assets/images` - banner dan ilustrasi
- `.htaccess` - fallback route untuk hosting Apache/Hostinger

## Upload ke Hostinger

Zip isi folder `C:\pulsakeren`, lalu upload dan extract ke `public_html`.

Jangan upload:

- `.git`
- `.next`
- `node_modules`
- `src`
- `prisma`
- `package.json`
- `package-lock.json`

Project ini tidak butuh Node.js.
