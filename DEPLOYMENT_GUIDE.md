# 🚀 Deployment Guide for Dr. Sayuj's Neurosurgery Website

## 📧 **Email Service Setup (Resend)**

### 1. Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up for an account
3. Verify your email address

### 2. Add Your Domain
1. In Resend dashboard, go to "Domains"
2. Add `drsayuj.com` as your domain
3. Follow DNS verification steps
4. Add the required DNS records to your domain

### 3. Get API Key
1. Go to "API Keys" in Resend dashboard
2. Create a new API key
3. Copy the API key (starts with `re_`)

### 4. Set Up Environment Variables
Create a `.env.local` file in your project root:

```bash
# Email Service Configuration
RESEND_API_KEY=re_your_api_key_here

# Inngest Configuration (for production)
INNGEST_EVENT_KEY=your_inngest_event_key_here
INNGEST_SIGNING_KEY=your_inngest_signing_key_here

# Middleware.io APM Configuration
MIDDLEWARE_SERVICE_NAME=neurosurgery-nextjs-site
MIDDLEWARE_ACCESS_TOKEN=your_middleware_access_token_here
```

## 🌐 **Vercel Deployment**

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy to Production
```bash
# Deploy with environment variables
vercel --prod

# Or set environment variables in Vercel dashboard
vercel env add RESEND_API_KEY
vercel env add INNGEST_EVENT_KEY
vercel env add INNGEST_SIGNING_KEY
vercel env add MIDDLEWARE_ACCESS_TOKEN
```

### 4. Configure Custom Domain
1. In Vercel dashboard, go to your project
2. Go to "Settings" > "Domains"
3. Add `www.drsayuj.com` and `drsayuj.com`
4. Update DNS records as instructed

## 📧 **Email Templates Ready**

Your website now includes professional email templates for:

### ✅ **Patient Welcome Email**
- Personalized greeting
- Practice information
- Emergency contact details
- Call-to-action buttons

### ✅ **Appointment Confirmation**
- Appointment details
- Preparation instructions
- Location information
- Contact information

### ✅ **Appointment Reminders**
- 24-hour and 1-hour reminders
- Preparation checklist
- Contact information

### ✅ **Emergency Notifications**
- Critical alert system
- Immediate notifications
- Patient safety protocols

## 🔧 **Inngest Production Setup**

### 1. Create Inngest Account
1. Go to [inngest.com](https://inngest.com)
2. Sign up for an account
3. Create a new app

### 2. Get Production Keys
1. In Inngest dashboard, go to "Keys"
2. Copy your Event Key and Signing Key
3. Add them to your environment variables

### 3. Update Inngest Configuration
The system is already configured to use production keys when available.

## 📊 **Monitoring Setup**

### 1. Middleware.io APM
1. Sign up at [middleware.io](https://middleware.io)
2. Create a new project
3. Get your access token
4. Add to environment variables

### 2. Vercel Analytics
1. Enable Vercel Analytics in your project
2. Monitor performance and errors
3. Set up alerts for critical issues

## 🚀 **Deployment Commands**

### Quick Deploy
```bash
# Build and deploy
npm run build
vercel --prod

# Or use the deployment script
./deploy-to-vercel.sh
```

### Environment Variables Setup
```bash
# Add all required environment variables
vercel env add RESEND_API_KEY
vercel env add INNGEST_EVENT_KEY
vercel env add INNGEST_SIGNING_KEY
vercel env add MIDDLEWARE_ACCESS_TOKEN
vercel env add MIDDLEWARE_SERVICE_NAME
```

## ✅ **Post-Deployment Checklist**

### 1. Test Email Functionality
- [ ] Send test welcome email
- [ ] Test appointment confirmation
- [ ] Verify emergency notifications
- [ ] Check email deliverability

### 2. Test Inngest Functions
- [ ] Visit `/test-inngest` page
- [ ] Test all 18 functions
- [ ] Verify function executions
- [ ] Check error handling

### 3. Verify Website Functionality
- [ ] Test all pages load correctly
- [ ] Verify contact forms work
- [ ] Check appointment booking
- [ ] Test mobile responsiveness

### 4. Monitor Performance
- [ ] Check Vercel Analytics
- [ ] Monitor APM dashboard
- [ ] Set up error alerts
- [ ] Track conversion metrics

## 🎯 **Production Features Active**

### ✅ **Complete Patient Journey Automation**
- Welcome emails for new patients
- Intelligent follow-up sequences
- Appointment management system
- Post-care follow-up

### ✅ **Emergency & Safety Systems**
- Critical emergency alerts
- Post-surgery monitoring
- Patient safety protocols
- Automated notifications

### ✅ **Advanced Analytics**
- Real-time patient tracking
- Conversion optimization
- Lead scoring system
- Performance monitoring

### ✅ **Professional Email System**
- Branded email templates
- Automated sequences
- Emergency notifications
- Patient communication

## 📞 **Support & Maintenance**

### Regular Maintenance
- Monitor email deliverability
- Check function execution logs
- Update patient education content
- Review analytics and metrics

### Emergency Procedures
- Emergency notification system active
- 24/7 monitoring capabilities
- Automated safety protocols
- Direct communication channels

---

## 🎉 **Ready for Production!**

Your neurosurgery website is now fully equipped with:
- ✅ **Professional email system** with Resend
- ✅ **Complete automation** with Inngest
- ✅ **Advanced monitoring** with APM
- ✅ **Production-ready deployment** on Vercel

**Your practice now has enterprise-level automation and communication systems!** 🚀











