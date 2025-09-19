# NeuroHyderabad - Advanced Neurosurgery Website

A production-ready Next.js website for a premier neurosurgery practice in Hyderabad, designed to rank #1 for "Best Neurosurgeon in Hyderabad" and related medical queries.

## 🏥 About

NeuroHyderabad is a comprehensive neurosurgery website built with modern web technologies and medical SEO best practices. It showcases advanced brain and spine surgery services with a focus on patient care and medical expertise.

## 🚀 Features

### Medical SEO Optimization
- ✅ YMYL (Your Money Your Life) compliance
- ✅ Medical schema markup with structured data
- ✅ Local SEO optimization for Hyderabad
- ✅ Advanced meta tags and Open Graph integration
- ✅ Optimized for Core Web Vitals
- ✅ Comprehensive sitemap and robots.txt

### Technical Excellence
- ✅ Built with Next.js 14 and TypeScript
- ✅ Responsive design with Tailwind CSS
- ✅ Optimized images with Next.js Image component
- ✅ Accessibility features (WCAG compliance)
- ✅ Security headers and best practices
- ✅ Performance monitoring with Lighthouse CI

### Content Structure
- ✅ Hero section with clear value proposition
- ✅ Comprehensive services showcase
- ✅ Doctor profiles with credentials
- ✅ Patient testimonials and success stories
- ✅ Emergency contact information
- ✅ Appointment booking integration ready

### CI/CD Pipeline
- ✅ GitHub Actions workflow
- ✅ Automated testing and linting
- ✅ Security auditing
- ✅ Performance monitoring
- ✅ Deployment to Vercel

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image
- **Deployment**: Vercel (configured)
- **CI/CD**: GitHub Actions

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd neurohyderabad-site
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build and Deploy

### Development
```bash
npm run dev          # Start development server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript checking
```

### Production
```bash
npm run build        # Build for production
npm start           # Start production server
```

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout with SEO
│   ├── page.tsx         # Homepage
│   ├── robots.ts        # SEO robots configuration
│   └── sitemap.ts       # Dynamic sitemap generation
├── components/          # React components
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Hero section
│   ├── Services.tsx     # Medical services
│   ├── Doctors.tsx      # Doctor profiles
│   ├── Testimonials.tsx # Patient testimonials
│   └── Footer.tsx       # Footer with contact info
├── lib/                 # Utility functions
│   └── utils.ts         # Tailwind utilities
└── types/               # TypeScript types
```

## 🎯 SEO Features

### Medical Schema Markup
- Medical Organization structured data
- Local business information
- Service listings
- Doctor profiles
- Review aggregations

### Target Keywords
- "Best Neurosurgeon in Hyderabad"
- "Brain Surgery Hyderabad"
- "Spine Surgery Hyderabad"
- "Neurologist Hyderabad"
- "Neurosurgery Clinic Hyderabad"

### Local SEO
- Google My Business integration ready
- Local schema markup
- Hyderabad-specific content
- Contact information optimization
- Location-based landing pages

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```env
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
SLACK_WEBHOOK=your_slack_webhook
```

### Deployment
The project is configured for Vercel deployment with:
- Automatic deployments on main branch
- Preview deployments for pull requests
- Performance monitoring
- SEO analysis

## 📊 Performance

The website is optimized for:
- ⚡ Lighthouse Score: 90+ (all categories)
- 🎯 Core Web Vitals compliance
- 📱 Mobile-first responsive design
- 🔍 Search engine optimization
- ♿ Accessibility standards

## 🔒 Security

- Security headers configuration
- HTTPS enforcement
- Content Security Policy ready
- Input validation
- XSS protection

## 📋 Medical Compliance

- YMYL content guidelines
- Medical disclaimer ready
- Privacy policy template
- Terms of service template
- Patient data protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions or support, please contact:
- Email: contact@neurohyderabad.com
- Phone: +91-40-1234-5678
- Emergency: 24/7 Available

---

Built with ❤️ for advancing neurosurgical care in Hyderabad