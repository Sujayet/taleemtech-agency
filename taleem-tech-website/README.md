# Taleem Tech website

When a visitor fills the contact form and presses **Send enquiry on WhatsApp**, WhatsApp opens on their phone
with the enquiry already written, addressed to **your** number. They press Send and it arrives in your chat.
There is no server and no database, so there is nothing to maintain.

> **One honest limit:** the enquiry reaches you only after the visitor presses **Send** inside WhatsApp.
> If they close WhatsApp first, you receive nothing. (Fully automatic delivery needs the paid WhatsApp Business API.)

## Folders

- `ready-to-upload/`: the finished website. This is the folder you put online.
- `source/`: the editable project (only needed if you want to change text, prices or design).

## Step 1: Add your WhatsApp number (2 minutes, no tools needed)

1. Open `ready-to-upload/config.js` with **Notepad**.
2. Between the quotes after `whatsapp:` type your number with country code, no `+`, no spaces.
   For India: `91` followed by your 10 digits, e.g. `'919876543210'`.
3. Optionally fill in `email`, `phone`, `address` and your social links. Anything left `''` is simply not shown.
4. Save the file.

## Step 2: Put it online (free)

1. Go to **https://app.netlify.com/drop** and sign up (free).
2. Drag the whole **`ready-to-upload`** folder onto the page.
3. In a few seconds you get a web address. That is your live website.
4. To use your own domain: Netlify, then Domain management, then Add a domain.

To change your number or contact details later: edit `config.js` again and drag the folder onto Netlify again.
(Don't double-click `index.html` to test. It must be opened from a host, or from the developer steps below.)

## Step 3: Test it like a customer

Open your live address **on your phone**, fill the form, and press **Send enquiry on WhatsApp**.
WhatsApp should open with the message ready. Press Send and check it arrived.

## Please check your prices

The price list was read from a handwritten photo. Prices live in `source/src/data/marketplace.js`.
Please confirm:

1. **Billing period.** The sheet says "monthly" only for Meesho catalogs and the reels/posts. The site shows Amazon, Flipkart,
   Meta management, Google and GST returns as "per month", and Meta setup and GST registration as "one-time".
   Change `per` in that file if any of it is wrong.
2. **Amazon and Flipkart** are shown as Rs 2,500 each (25 catalogs each). The bracket might mean Rs 2,500 for both.
3. The totals written on the right of the sheet (7500, 2500, 1500, 1500, 700, 12000) were not used. 7500 is not the sum
   of Meesho 2000 + Amazon 2500 + Flipkart 2500 (= 7000), so it may be a bundle price or a typo.
4. **GST tiers** were read as bills: up to 100 = 700, up to 200 = 1,000, 200 to 500 = 1,200, above 500 = 1,500 to 2,000.
5. Struck-out lines on the sheet were treated as removed.

To hide every price: set `showPrices: false` in `config.js` (no rebuild needed).

## Your logo

Your logo is used as a static 3D badge (About section) and a 3D "TT" mark (top bar and browser tab).
The files are in `ready-to-upload/brand/`, plus `favicon.png`, `apple-touch-icon.png` and `og-image.png` (the picture shown when the link is shared).

## Changing text, prices or design (needs Node.js, https://nodejs.org)

```bash
cd source
npm install
npm run dev       # live preview at http://localhost:5173
npm run build     # creates source/dist  <- upload this folder instead of ready-to-upload
```

Where things are: `src/data/` (services, prices, portfolio, process), `src/config/site.js`, `src/index.css` (colours are at the top).
Before launch, replace `your-domain.com` in `public/robots.txt` and `public/sitemap.xml`, and make the `og:image` line in
`index.html` a full address (for example `https://your-domain.com/og-image.png`).
The portfolio cards are labelled samples. Replace them in `src/data/portfolio.js` with your real work.
