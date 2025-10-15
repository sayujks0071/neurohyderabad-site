# 🔍 SEO FIXES VALIDATION SCRIPTS
## For drsayuj.info Website

**Use these commands to test and validate all SEO fixes**

---

## 🚨 **CRITICAL 404 REDIRECT VALIDATION**

### **Test Redirect Functionality**
```bash
# Test the epilepsy surgery redirect
curl -I https://www.drsayuj.info/services/epilepsy-surgery

# Expected output:
# HTTP/1.1 301 Moved Permanently
# Location: https://www.drsayuj.info/services/epilepsy-surgery-hyderabad
```

### **Test Redirect with Browser**
```bash
# Test redirect in browser (should automatically redirect)
open https://www.drsayuj.info/services/epilepsy-surgery
```

### **Validate Redirect Status Code**
```bash
# Check if redirect returns 301 status
curl -s -o /dev/null -w "%{http_code}" https://www.drsayuj.info/services/epilepsy-surgery
# Should return: 301
```

---

## 📋 **CANONICAL TAGS VALIDATION**

### **Check Canonical Tags on Patient Story Pages**
```bash
# Check canonical tag on epilepsy surgery success story
curl -s https://www.drsayuj.info/patient-stories/epilepsy-surgery-success-hyderabad | grep -i canonical

# Check canonical tag on spine surgery recovery story
curl -s https://www.drsayuj.info/patient-stories/spine-surgery-recovery-hyderabad | grep -i canonical

# Check canonical tag on brain tumor treatment story
curl -s https://www.drsayuj.info/patient-stories/brain-tumor-treatment-hyderabad | grep -i canonical

# Check canonical tag on neurological disorder treatment story
curl -s https://www.drsayuj.info/patient-stories/neurological-disorder-treatment-hyderabad | grep -i canonical

# Check canonical tag on neurosurgery recovery story
curl -s https://www.drsayuj.info/patient-stories/neurosurgery-recovery-hyderabad | grep -i canonical
```

### **Expected Output for Each Page:**
```html
<link rel="canonical" href="https://www.drsayuj.info/patient-stories/[PAGE-URL]" />
```

### **Validate Canonical URLs are Self-Referencing**
```bash
# Check if canonical URL matches the page URL
curl -s https://www.drsayuj.info/patient-stories/epilepsy-surgery-success-hyderabad | grep -o 'href="[^"]*"' | grep canonical
```

---

## 🏷️ **TITLE OPTIMIZATION VALIDATION**

### **Check Title Length (Should be 50-60 characters)**
```bash
# Check title length for epilepsy surgery page
curl -s https://www.drsayuj.info/services/epilepsy-surgery-hyderabad | grep -o '<title>[^<]*</title>' | sed 's/<title>//;s/<\/title>//' | wc -c

# Check title length for spine surgery page
curl -s https://www.drsayuj.info/services/spine-surgery-hyderabad | grep -o '<title>[^<]*</title>' | sed 's/<title>//;s/<\/title>//' | wc -c

# Check title length for brain tumor surgery page
curl -s https://www.drsayuj.info/services/brain-tumor-surgery-hyderabad | grep -o '<title>[^<]*</title>' | sed 's/<title>//;s/<\/title>//' | wc -c
```

### **Extract and Display Titles**
```bash
# Display actual titles
curl -s https://www.drsayuj.info/services/epilepsy-surgery-hyderabad | grep -o '<title>[^<]*</title>'
curl -s https://www.drsayuj.info/services/spine-surgery-hyderabad | grep -o '<title>[^<]*</title>'
curl -s https://www.drsayuj.info/services/brain-tumor-surgery-hyderabad | grep -o '<title>[^<]*</title>'
```

### **Validate Title Uniqueness**
```bash
# Check if titles are unique across pages
curl -s https://www.drsayuj.info/services/epilepsy-surgery-hyderabad | grep -o '<title>[^<]*</title>' > title1.txt
curl -s https://www.drsayuj.info/services/spine-surgery-hyderabad | grep -o '<title>[^<]*</title>' > title2.txt
diff title1.txt title2.txt
# Should show differences (titles should be unique)
```

---

## 📝 **META DESCRIPTION VALIDATION**

### **Check Meta Description Length (Should be 150-160 characters)**
```bash
# Check meta description length for epilepsy surgery page
curl -s https://www.drsayuj.info/services/epilepsy-surgery-hyderabad | grep -o 'name="description" content="[^"]*"' | sed 's/name="description" content="//;s/"//' | wc -c

# Check meta description length for spine surgery page
curl -s https://www.drsayuj.info/services/spine-surgery-hyderabad | grep -o 'name="description" content="[^"]*"' | sed 's/name="description" content="//;s/"//' | wc -c

# Check meta description length for brain tumor surgery page
curl -s https://www.drsayuj.info/services/brain-tumor-surgery-hyderabad | grep -o 'name="description" content="[^"]*"' | sed 's/name="description" content="//;s/"//' | wc -c
```

### **Extract and Display Meta Descriptions**
```bash
# Display actual meta descriptions
curl -s https://www.drsayuj.info/services/epilepsy-surgery-hyderabad | grep -o 'name="description" content="[^"]*"'
curl -s https://www.drsayuj.info/services/spine-surgery-hyderabad | grep -o 'name="description" content="[^"]*"'
curl -s https://www.drsayuj.info/services/brain-tumor-surgery-hyderabad | grep -o 'name="description" content="[^"]*"'
```

### **Check if Meta Descriptions Exist**
```bash
# Check if meta description exists
curl -s https://www.drsayuj.info/services/epilepsy-surgery-hyderabad | grep -i 'meta.*description'
curl -s https://www.drsayuj.info/services/spine-surgery-hyderabad | grep -i 'meta.*description'
curl -s https://www.drsayuj.info/services/brain-tumor-surgery-hyderabad | grep -i 'meta.*description'
```

---

## 🔍 **COMPREHENSIVE VALIDATION SCRIPT**

### **Complete Validation Script**
```bash
#!/bin/bash

echo "🔍 SEO FIXES VALIDATION SCRIPT"
echo "================================"

# Test 404 Redirect
echo "1. Testing 404 Redirect..."
REDIRECT_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://www.drsayuj.info/services/epilepsy-surgery)
if [ "$REDIRECT_STATUS" = "301" ]; then
    echo "✅ Redirect working correctly (301 status)"
else
    echo "❌ Redirect not working (Status: $REDIRECT_STATUS)"
fi

# Test Canonical Tags
echo "2. Testing Canonical Tags..."
PAGES=(
    "patient-stories/epilepsy-surgery-success-hyderabad"
    "patient-stories/spine-surgery-recovery-hyderabad"
    "patient-stories/brain-tumor-treatment-hyderabad"
    "patient-stories/neurological-disorder-treatment-hyderabad"
    "patient-stories/neurosurgery-recovery-hyderabad"
)

for page in "${PAGES[@]}"; do
    CANONICAL=$(curl -s "https://www.drsayuj.info/$page" | grep -i canonical)
    if [ -n "$CANONICAL" ]; then
        echo "✅ Canonical tag found on $page"
    else
        echo "❌ Canonical tag missing on $page"
    fi
done

# Test Title Lengths
echo "3. Testing Title Lengths..."
SERVICE_PAGES=(
    "services/epilepsy-surgery-hyderabad"
    "services/spine-surgery-hyderabad"
    "services/brain-tumor-surgery-hyderabad"
)

for page in "${SERVICE_PAGES[@]}"; do
    TITLE=$(curl -s "https://www.drsayuj.info/$page" | grep -o '<title>[^<]*</title>' | sed 's/<title>//;s/<\/title>//')
    TITLE_LENGTH=$(echo "$TITLE" | wc -c)
    if [ $TITLE_LENGTH -ge 50 ] && [ $TITLE_LENGTH -le 60 ]; then
        echo "✅ Title length OK on $page ($TITLE_LENGTH chars): $TITLE"
    else
        echo "❌ Title length issue on $page ($TITLE_LENGTH chars): $TITLE"
    fi
done

# Test Meta Descriptions
echo "4. Testing Meta Descriptions..."
for page in "${SERVICE_PAGES[@]}"; do
    META_DESC=$(curl -s "https://www.drsayuj.info/$page" | grep -o 'name="description" content="[^"]*"' | sed 's/name="description" content="//;s/"//')
    if [ -n "$META_DESC" ]; then
        DESC_LENGTH=$(echo "$META_DESC" | wc -c)
        if [ $DESC_LENGTH -ge 150 ] && [ $DESC_LENGTH -le 160 ]; then
            echo "✅ Meta description OK on $page ($DESC_LENGTH chars)"
        else
            echo "❌ Meta description length issue on $page ($DESC_LENGTH chars)"
        fi
    else
        echo "❌ Meta description missing on $page"
    fi
done

echo "================================"
echo "Validation complete!"
```

---

## 🌐 **ONLINE VALIDATION TOOLS**

### **Redirect Testing**
- [Redirect Checker](https://www.redirect-checker.org/)
- [HTTP Status Code Checker](https://httpstatus.io/)

### **SEO Validation**
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Google Search Console](https://search.google.com/search-console)

### **Meta Tags Validation**
- [Meta Tags Validator](https://metatags.io/)
- [SEO Meta Tags Checker](https://www.seoptimer.com/meta-tags-checker)

---

## 📊 **VALIDATION CHECKLIST**

### **Before Implementation**
- [ ] Identify website technology stack
- [ ] Backup current website
- [ ] Test changes on staging environment

### **After Implementation**
- [ ] Test 404 redirect returns 301 status
- [ ] Verify canonical tags are present on all 5 patient story pages
- [ ] Check title lengths are 50-60 characters on all 38 pages
- [ ] Verify meta descriptions are 150-160 characters on all 16 pages
- [ ] Test all pages load correctly
- [ ] Submit updated sitemap to Google Search Console
- [ ] Monitor Google Search Console for any errors

### **Ongoing Monitoring**
- [ ] Check Google Search Console weekly
- [ ] Monitor page rankings
- [ ] Track organic traffic improvements
- [ ] Review and update content regularly

---

## 🚀 **QUICK VALIDATION COMMANDS**

### **One-Line Tests**
```bash
# Test redirect
curl -I https://www.drsayuj.info/services/epilepsy-surgery | head -1

# Test canonical tag
curl -s https://www.drsayuj.info/patient-stories/epilepsy-surgery-success-hyderabad | grep -i canonical

# Test title length
curl -s https://www.drsayuj.info/services/epilepsy-surgery-hyderabad | grep -o '<title>[^<]*</title>' | wc -c

# Test meta description
curl -s https://www.drsayuj.info/services/epilepsy-surgery-hyderabad | grep -o 'name="description" content="[^"]*"'
```

**Use these validation scripts to ensure all SEO fixes are working correctly!**
