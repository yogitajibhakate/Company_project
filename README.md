# 🚕 Suhalaya Travels - Official Travel & Fleet Booking Website

Welcome to the **Suhalaya Travels** web application repository. Suhalaya Travels is a premium car rental, outstation taxi service, and corporate transportation platform designed for seamless user experience, responsive multi-device browsing, and real-time content updates.

---

## 🌟 Key Features

* **🚗 Vehicle Fleet Catalog & Tariffs**: Detailed showcasing of available vehicles (Sedans, SUVs, Luxury Chauffeurs, Tempo Travellers) with standardized high-resolution assets and clear pricing structure.
* **📍 Comprehensive Travel Services**:
  * Outstation & Regional Travel (`/outstation-travel`, `/areas`)
  * Airport Transfers & Chauffeur Services (`/airport-transfers`, `/luxury-chauffeur-services`)
  * Corporate & Employee Transportation (`/corporate-car-rental`, `/employee-transportation`, `/events-conferences`)
  * Special Occasions & Weddings (`/destination-weddings`)
  * Vendor Onboarding (`/attach-your-car`)
* **📝 Dynamic Blog System**: Integrated with Google Apps Script & Google Sheets backend for live blog retrieval and publishing without needing a heavy server setup.
* **🛠️ Admin Panel (`/admin`)**: Interactive dashboard for content managers to publish/delete blog posts and manage customer booking inquiries.
* **💬 Integrated Chatbot Widget**: User-activated interactive support widget for quick inquiries and booking guidance.
* **📱 Modern Responsive Design**: Custom CSS design system with subtle glassmorphism, fluid responsive grids, smooth animations, and optimized asset delivery across desktop, tablet, and mobile viewports.
* **⚡ High-Performance SEO**: Pre-configured `sitemap.xml`, `robots.txt`, open-graph metadata, and structured JSON-LD schema.

---

## 📁 Directory Structure

```text
Suhalaya Travels website/
├── 📄 index.html                      # Main landing page & Hero reservation form
├── 📄 README.md                        # Project documentation
├── 📄 sitemap.xml                      # SEO sitemap definition
├── 📄 robots.txt                       # Search engine crawler instructions
├── 📄 google_apps_script.js            # Apps Script handler for Google Sheets CMS
│
├── 📂 about/                           # About Us & Company overview page
├── 📂 admin/                           # Admin Dashboard for blog & inquiry management
├── 📂 airport-transfers/              # Airport transfer booking & service details
├── 📂 areas/                           # Regional service directory ("Areas We Serve")
├── 📂 assets/                          # Static vehicle images, icons, and branding media
├── 📂 attach-your-car/                # Vendor car attachment & partner portal
├── 📂 blog/                            # Dynamic blog index and individual post templates
├── 📂 booking/                         # Booking confirmation & checkout workflow
├── 📂 contact_us/                      # Contact information & customer inquiry form
├── 📂 corporate-car-rental/           # Corporate car rental services
├── 📂 corporate-transportation/        # Corporate transport solutions
├── 📂 css/                             # Core stylesheets
│   └── style.css                       # Design tokens, layouts, responsive rules
├── 📂 daily-rental-terms/             # Terms for daily rentals
├── 📂 destination-weddings/           # Wedding transport services
├── 📂 employee-transportation/        # Employee shuttle & cab services
├── 📂 events-conferences/             # Event logistics & fleet services
├── 📂 fleet/                           # Complete fleet showcase page
├── 📂 js/                              # Core JavaScript
│   └── main.js                         # Navigation, form handlers, Google Sheets API logic
├── 📂 luxury-chauffeur-services/      # Luxury car rental page
├── 📂 outstation-travel/              # Outstation taxi rates and routes
├── 📂 privacy-policy/                 # Privacy policy details
├── 📂 tariff/                          # Full tariff rate chart
├── 📂 terms/                           # Terms & Conditions page
│
└── 📂 Utility Scripts (Python)
    ├── add_forms_to_regions.py         # Batch updates for region page forms
    ├── standardize_forms.py            # Form structure standardization helper
    └── revert_region_forms.py          # Script for form rollback management
```

---

## 🛠️ Technology Stack

* **Frontend Structure**: Semantic HTML5
* **Styling**: Vanilla CSS3 (Custom Grid/Flexbox, Glassmorphism, Micro-animations, CSS Variables)
* **Scripts & Interactivity**: Vanilla JavaScript (ES6+)
* **CMS & Database Backend**: Google Apps Script & Google Sheets Web App API
* **Automations**: Python 3 utility scripts for static asset & regional page updates

---

## 🚀 Local Development Setup

Since the application is built using pure web standards (HTML5, CSS3, JS), **no Node.js build process is required**.

### Running Locally with Python HTTP Server:
Run the following command from the project root directory:

```bash
# Python 3
python3 -m http.server 8080
```

Then open your browser and navigate to:
```text
http://localhost:8080
```

---

## 📊 Content Management System (Google Sheets Integration)

The blog and booking forms dynamically connect to Google Sheets via `google_apps_script.js`:
1. Deploy `google_apps_script.js` as a Web App in Google Apps Script attached to your Google Sheet.
2. Grant read/write permissions to the Web App URL.
3. Update the endpoint URL in `js/main.js` to enable live fetching of blogs and form persistence.

---

## 🌐 Deployment Guidelines

The project can be deployed instantly to any static hosting service:
* **Render / Netlify / Vercel / GitHub Pages / Cloudflare Pages**: Simply set the publish directory to `/` (the project root).
* **Custom Domain**: Ensure CNAME or A records are pointed appropriately at your domain registrar.

---

## 📝 License & Maintenance

Maintained by **Suhalaya Travels**. All rights reserved.
