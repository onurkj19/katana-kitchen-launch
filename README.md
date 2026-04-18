# Katana Kebab & Burger

Website for Katana Kebab & Burger, Salzburg.

**Stack:** React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui · Framer Motion · EmailJS

## Development

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env.local` file for EmailJS order submission:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Get these from [emailjs.com](https://emailjs.com) after setting up a service pointing to `office@kb-katana.at`.

## Menu Updates

Edit `src/data/menuData.ts` to update menu items, prices, and images.

## Build

```bash
npm run build
```

## Business Info

- **Name:** Katana Kebab & Burger
- **Address:** Meierhofweg 28, 5020 Salzburg
- **Phone:** +43 677 62004588
- **Email:** office@kb-katana.at
- **Hours:** Mon–Sat 08:00–21:00, Sunday closed
