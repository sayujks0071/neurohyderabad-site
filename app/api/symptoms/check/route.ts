15:58:48.910 Running build in Portland, USA (West) – pdx1 (Enhanced Build Machine)
15:58:48.910 Build machine configuration: 8 cores, 16 GB
15:58:48.999 Cloning github.com/sayujks0071/neurohyderabad-site (Branch: main, Commit: 22fe00a)
15:58:50.604 Warning: Failed to fetch one or more git submodules
15:58:50.604 Cloning completed: 1.605s
15:58:50.703 Found .vercelignore
15:58:50.706 Removed 0 ignored files defined in .vercelignore
15:58:50.757 Restored build cache from previous deployment (DwH5mt4UuEpcArHHQ6xwDMWFZaqf)
15:58:51.783 Running "vercel build"
15:58:52.198 Vercel CLI 48.9.0
15:58:52.517 Running "install" command: `npm install`...
15:58:55.170 
15:58:55.170 up to date, audited 1253 packages in 2s
15:58:55.170 
15:58:55.170 272 packages are looking for funding
15:58:55.170   run `npm fund` for details
15:58:55.195 
15:58:55.195 15 vulnerabilities (4 low, 4 moderate, 7 high)
15:58:55.195 
15:58:55.195 To address all issues (including breaking changes), run:
15:58:55.195   npm audit fix --force
15:58:55.195 
15:58:55.195 Run `npm audit` for details.
15:58:55.225 Detected Next.js version: 15.5.3
15:58:55.225 Running "npm run build"
15:58:55.349 
15:58:55.349 > neurosurgery-nextjs-site@0.1.0 build
15:58:55.349 > next build
15:58:55.349 
15:58:56.007    ▲ Next.js 15.5.3
15:58:56.007    - Experiments (use with caution):
15:58:56.007      ✓ optimizeCss
15:58:56.007      · optimizePackageImports
15:58:56.007 
15:58:56.171    Creating an optimized production build ...
15:59:06.224  ⚠ Compiled with warnings in 9.0s
15:59:06.224 
15:59:06.224 ./src/lib/gemini/file-handler.ts
15:59:06.224 Attempted import error: 'GoogleAIFileManager' is not exported from '@google/genai' (imported as 'GoogleAIFileManager').
15:59:06.224 
15:59:06.224 Import trace for requested module:
15:59:06.224 ./src/lib/gemini/file-handler.ts
15:59:06.224 ./app/api/gemini-files/list/route.ts
15:59:06.225 
15:59:06.225 ./src/lib/gemini/file-handler.ts
15:59:06.225 Attempted import error: 'GoogleGenerativeAI' is not exported from '@google/genai' (imported as 'GoogleGenerativeAI').
15:59:06.225 
15:59:06.225 Import trace for requested module:
15:59:06.225 ./src/lib/gemini/file-handler.ts
15:59:06.225 ./app/api/gemini-files/list/route.ts
15:59:06.225 
15:59:11.291  ✓ Compiled successfully in 12.0s
15:59:11.295    Linting and checking validity of types ...
15:59:16.096 
15:59:16.096 ./app/ai-chat/page.tsx
15:59:16.096 94:13  Warning: Do not use an `<a>` element to navigate to `/emergency-rehabilitation/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.096 
15:59:16.097 ./app/appointments/page.tsx
15:59:16.097 126:17  Warning: Do not use an `<a>` element to navigate to `/locations/brain-spine-surgeon-jubilee-hills/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.097 132:17  Warning: Do not use an `<a>` element to navigate to `/locations/brain-spine-surgeon-banjara-hills/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.097 138:17  Warning: Do not use an `<a>` element to navigate to `/locations/brain-spine-surgeon-hitec-city/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.098 
15:59:16.098 ./app/blog/endoscopic-spine-surgery-cost-hyderabad/page.tsx
15:59:16.098 292:15  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.098 
15:59:16.099 ./app/blog/sciatica-pain-management-hyderabad/page.tsx
15:59:16.099 208:17  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.099 
15:59:16.099 ./app/blog/spine-health-maintenance-hyderabad/page.tsx
15:59:16.099 281:17  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.099 
15:59:16.099 ./app/blog/spine-surgery-recovery-timeline-hyderabad/page.tsx
15:59:16.099 291:17  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.099 
15:59:16.099 ./app/conditions/spinal-stenosis-treatment-hyderabad/page.tsx
15:59:16.099 39:13  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.099 
15:59:16.100 ./app/layout.tsx
15:59:16.100 205:13  Warning: `rel="preconnect"` is missing from Google Font. See: https://nextjs.org/docs/messages/google-font-preconnect  @next/next/google-font-preconnect
15:59:16.100 
15:59:16.100 ./app/medical-disclaimer/page.tsx
15:59:16.100 96:54  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.100 
15:59:16.100 ./app/services/epilepsy-surgery-hyderabad/page.tsx
15:59:16.100 92:13  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.100 
15:59:16.100 ./app/services/minimally-invasive-spine-surgery/page.tsx
15:59:16.100 196:13  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.100 
15:59:16.100 ./src/components/ExpandedFAQ.tsx
15:59:16.100 227:23  Warning: The attribute aria-expanded is not supported by the role group. This role is implicit on the element details.  jsx-a11y/role-supports-aria-props
15:59:16.100 
15:59:16.100 info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
15:59:27.252 Failed to compile.
15:59:27.252 
15:59:27.253 ./src/lib/gemini/file-handler.ts:6:10
15:59:27.253 Type error: Module '"@google/genai"' has no exported member 'GoogleGenerativeAI'.
15:59:27.253 
15:59:27.253 [0m [90m 4 |[39m [90m */[39m
15:59:27.253  [90m 5 |[39m
15:59:27.253 [31m[1m>[22m[39m[90m 6 |[39m [36mimport[39m { [33mGoogleGenerativeAI[39m[33m,[39m [33mGoogleAIFileManager[39m } [36mfrom[39m [32m'@google/genai'[39m[33m;[39m
15:59:27.253  [90m   |[39m          [31m[1m^[22m[39m
15:59:27.253  [90m 7 |[39m [36mimport[39m {
15:59:27.254  [90m 8 |[39m   [33mGeminiFileMetadata[39m[33m,[39m
15:59:27.254  [90m 9 |[39m   [33mGeminiFileUploadResponse[39m[33m,[39m[0m
15:59:27.283 Next.js build worker exited with code: 1 and signal: null
15:59:27.300 Error: Command "npm run build" exited with 115:58:48.910 Running build in Portland, USA (West) – pdx1 (Enhanced Build Machine)
15:58:48.910 Build machine configuration: 8 cores, 16 GB
15:58:48.999 Cloning github.com/sayujks0071/neurohyderabad-site (Branch: main, Commit: 22fe00a)
15:58:50.604 Warning: Failed to fetch one or more git submodules
15:58:50.604 Cloning completed: 1.605s
15:58:50.703 Found .vercelignore
15:58:50.706 Removed 0 ignored files defined in .vercelignore
15:58:50.757 Restored build cache from previous deployment (DwH5mt4UuEpcArHHQ6xwDMWFZaqf)
15:58:51.783 Running "vercel build"
15:58:52.198 Vercel CLI 48.9.0
15:58:52.517 Running "install" command: `npm install`...
15:58:55.170 
15:58:55.170 up to date, audited 1253 packages in 2s
15:58:55.170 
15:58:55.170 272 packages are looking for funding
15:58:55.170   run `npm fund` for details
15:58:55.195 
15:58:55.195 15 vulnerabilities (4 low, 4 moderate, 7 high)
15:58:55.195 
15:58:55.195 To address all issues (including breaking changes), run:
15:58:55.195   npm audit fix --force
15:58:55.195 
15:58:55.195 Run `npm audit` for details.
15:58:55.225 Detected Next.js version: 15.5.3
15:58:55.225 Running "npm run build"
15:58:55.349 
15:58:55.349 > neurosurgery-nextjs-site@0.1.0 build
15:58:55.349 > next build
15:58:55.349 
15:58:56.007    ▲ Next.js 15.5.3
15:58:56.007    - Experiments (use with caution):
15:58:56.007      ✓ optimizeCss
15:58:56.007      · optimizePackageImports
15:58:56.007 
15:58:56.171    Creating an optimized production build ...
15:59:06.224  ⚠ Compiled with warnings in 9.0s
15:59:06.224 
15:59:06.224 ./src/lib/gemini/file-handler.ts
15:59:06.224 Attempted import error: 'GoogleAIFileManager' is not exported from '@google/genai' (imported as 'GoogleAIFileManager').
15:59:06.224 
15:59:06.224 Import trace for requested module:
15:59:06.224 ./src/lib/gemini/file-handler.ts
15:59:06.224 ./app/api/gemini-files/list/route.ts
15:59:06.225 
15:59:06.225 ./src/lib/gemini/file-handler.ts
15:59:06.225 Attempted import error: 'GoogleGenerativeAI' is not exported from '@google/genai' (imported as 'GoogleGenerativeAI').
15:59:06.225 
15:59:06.225 Import trace for requested module:
15:59:06.225 ./src/lib/gemini/file-handler.ts
15:59:06.225 ./app/api/gemini-files/list/route.ts
15:59:06.225 
15:59:11.291  ✓ Compiled successfully in 12.0s
15:59:11.295    Linting and checking validity of types ...
15:59:16.096 
15:59:16.096 ./app/ai-chat/page.tsx
15:59:16.096 94:13  Warning: Do not use an `<a>` element to navigate to `/emergency-rehabilitation/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.096 
15:59:16.097 ./app/appointments/page.tsx
15:59:16.097 126:17  Warning: Do not use an `<a>` element to navigate to `/locations/brain-spine-surgeon-jubilee-hills/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.097 132:17  Warning: Do not use an `<a>` element to navigate to `/locations/brain-spine-surgeon-banjara-hills/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.097 138:17  Warning: Do not use an `<a>` element to navigate to `/locations/brain-spine-surgeon-hitec-city/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.098 
15:59:16.098 ./app/blog/endoscopic-spine-surgery-cost-hyderabad/page.tsx
15:59:16.098 292:15  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.098 
15:59:16.099 ./app/blog/sciatica-pain-management-hyderabad/page.tsx
15:59:16.099 208:17  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.099 
15:59:16.099 ./app/blog/spine-health-maintenance-hyderabad/page.tsx
15:59:16.099 281:17  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.099 
15:59:16.099 ./app/blog/spine-surgery-recovery-timeline-hyderabad/page.tsx
15:59:16.099 291:17  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.099 
15:59:16.099 ./app/conditions/spinal-stenosis-treatment-hyderabad/page.tsx
15:59:16.099 39:13  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.099 
15:59:16.100 ./app/layout.tsx
15:59:16.100 205:13  Warning: `rel="preconnect"` is missing from Google Font. See: https://nextjs.org/docs/messages/google-font-preconnect  @next/next/google-font-preconnect
15:59:16.100 
15:59:16.100 ./app/medical-disclaimer/page.tsx
15:59:16.100 96:54  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.100 
15:59:16.100 ./app/services/epilepsy-surgery-hyderabad/page.tsx
15:59:16.100 92:13  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.100 
15:59:16.100 ./app/services/minimally-invasive-spine-surgery/page.tsx
15:59:16.100 196:13  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.100 
15:59:16.100 ./src/components/ExpandedFAQ.tsx
15:59:16.100 227:23  Warning: The attribute aria-expanded is not supported by the role group. This role is implicit on the element details.  jsx-a11y/role-supports-aria-props
15:59:16.100 
15:59:16.100 info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
15:59:27.252 Failed to compile.
15:59:27.252 
15:59:27.253 ./src/lib/gemini/file-handler.ts:6:10
15:59:27.253 Type error: Module '"@google/genai"' has no exported member 'GoogleGenerativeAI'.
15:59:27.253 
15:59:27.253 [0m [90m 4 |[39m [90m */[39m
15:59:27.253  [90m 5 |[39m
15:59:27.253 [31m[1m>[22m[39m[90m 6 |[39m [36mimport[39m { [33mGoogleGenerativeAI[39m[33m,[39m [33mGoogleAIFileManager[39m } [36mfrom[39m [32m'@google/genai'[39m[33m;[39m
15:59:27.253  [90m   |[39m          [31m[1m^[22m[39m
15:59:27.253  [90m 7 |[39m [36mimport[39m {
15:59:27.254  [90m 8 |[39m   [33mGeminiFileMetadata[39m[33m,[39m
15:59:27.254  [90m 9 |[39m   [33mGeminiFileUploadResponse[39m[33m,[39m[0m
15:59:27.283 Next.js build worker exited with code: 1 and signal: null
15:59:27.300 Error: Command "npm run build" exited with 115:58:48.910 Running build in Portland, USA (West) – pdx1 (Enhanced Build Machine)
15:58:48.910 Build machine configuration: 8 cores, 16 GB
15:58:48.999 Cloning github.com/sayujks0071/neurohyderabad-site (Branch: main, Commit: 22fe00a)
15:58:50.604 Warning: Failed to fetch one or more git submodules
15:58:50.604 Cloning completed: 1.605s
15:58:50.703 Found .vercelignore
15:58:50.706 Removed 0 ignored files defined in .vercelignore
15:58:50.757 Restored build cache from previous deployment (DwH5mt4UuEpcArHHQ6xwDMWFZaqf)
15:58:51.783 Running "vercel build"
15:58:52.198 Vercel CLI 48.9.0
15:58:52.517 Running "install" command: `npm install`...
15:58:55.170 
15:58:55.170 up to date, audited 1253 packages in 2s
15:58:55.170 
15:58:55.170 272 packages are looking for funding
15:58:55.170   run `npm fund` for details
15:58:55.195 
15:58:55.195 15 vulnerabilities (4 low, 4 moderate, 7 high)
15:58:55.195 
15:58:55.195 To address all issues (including breaking changes), run:
15:58:55.195   npm audit fix --force
15:58:55.195 
15:58:55.195 Run `npm audit` for details.
15:58:55.225 Detected Next.js version: 15.5.3
15:58:55.225 Running "npm run build"
15:58:55.349 
15:58:55.349 > neurosurgery-nextjs-site@0.1.0 build
15:58:55.349 > next build
15:58:55.349 
15:58:56.007    ▲ Next.js 15.5.3
15:58:56.007    - Experiments (use with caution):
15:58:56.007      ✓ optimizeCss
15:58:56.007      · optimizePackageImports
15:58:56.007 
15:58:56.171    Creating an optimized production build ...
15:59:06.224  ⚠ Compiled with warnings in 9.0s
15:59:06.224 
15:59:06.224 ./src/lib/gemini/file-handler.ts
15:59:06.224 Attempted import error: 'GoogleAIFileManager' is not exported from '@google/genai' (imported as 'GoogleAIFileManager').
15:59:06.224 
15:59:06.224 Import trace for requested module:
15:59:06.224 ./src/lib/gemini/file-handler.ts
15:59:06.224 ./app/api/gemini-files/list/route.ts
15:59:06.225 
15:59:06.225 ./src/lib/gemini/file-handler.ts
15:59:06.225 Attempted import error: 'GoogleGenerativeAI' is not exported from '@google/genai' (imported as 'GoogleGenerativeAI').
15:59:06.225 
15:59:06.225 Import trace for requested module:
15:59:06.225 ./src/lib/gemini/file-handler.ts
15:59:06.225 ./app/api/gemini-files/list/route.ts
15:59:06.225 
15:59:11.291  ✓ Compiled successfully in 12.0s
15:59:11.295    Linting and checking validity of types ...
15:59:16.096 
15:59:16.096 ./app/ai-chat/page.tsx
15:59:16.096 94:13  Warning: Do not use an `<a>` element to navigate to `/emergency-rehabilitation/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.096 
15:59:16.097 ./app/appointments/page.tsx
15:59:16.097 126:17  Warning: Do not use an `<a>` element to navigate to `/locations/brain-spine-surgeon-jubilee-hills/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.097 132:17  Warning: Do not use an `<a>` element to navigate to `/locations/brain-spine-surgeon-banjara-hills/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.097 138:17  Warning: Do not use an `<a>` element to navigate to `/locations/brain-spine-surgeon-hitec-city/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.098 
15:59:16.098 ./app/blog/endoscopic-spine-surgery-cost-hyderabad/page.tsx
15:59:16.098 292:15  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.098 
15:59:16.099 ./app/blog/sciatica-pain-management-hyderabad/page.tsx
15:59:16.099 208:17  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.099 
15:59:16.099 ./app/blog/spine-health-maintenance-hyderabad/page.tsx
15:59:16.099 281:17  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.099 
15:59:16.099 ./app/blog/spine-surgery-recovery-timeline-hyderabad/page.tsx
15:59:16.099 291:17  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.099 
15:59:16.099 ./app/conditions/spinal-stenosis-treatment-hyderabad/page.tsx
15:59:16.099 39:13  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.099 
15:59:16.100 ./app/layout.tsx
15:59:16.100 205:13  Warning: `rel="preconnect"` is missing from Google Font. See: https://nextjs.org/docs/messages/google-font-preconnect  @next/next/google-font-preconnect
15:59:16.100 
15:59:16.100 ./app/medical-disclaimer/page.tsx
15:59:16.100 96:54  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.100 
15:59:16.100 ./app/services/epilepsy-surgery-hyderabad/page.tsx
15:59:16.100 92:13  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.100 
15:59:16.100 ./app/services/minimally-invasive-spine-surgery/page.tsx
15:59:16.100 196:13  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.100 
15:59:16.100 ./src/components/ExpandedFAQ.tsx
15:59:16.100 227:23  Warning: The attribute aria-expanded is not supported by the role group. This role is implicit on the element details.  jsx-a11y/role-supports-aria-props
15:59:16.100 
15:59:16.100 info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
15:59:27.252 Failed to compile.
15:59:27.252 
15:59:27.253 ./src/lib/gemini/file-handler.ts:6:10
15:59:27.253 Type error: Module '"@google/genai"' has no exported member 'GoogleGenerativeAI'.
15:59:27.253 
15:59:27.253 [0m [90m 4 |[39m [90m */[39m
15:59:27.253  [90m 5 |[39m
15:59:27.253 [31m[1m>[22m[39m[90m 6 |[39m [36mimport[39m { [33mGoogleGenerativeAI[39m[33m,[39m [33mGoogleAIFileManager[39m } [36mfrom[39m [32m'@google/genai'[39m[33m;[39m
15:59:27.253  [90m   |[39m          [31m[1m^[22m[39m
15:59:27.253  [90m 7 |[39m [36mimport[39m {
15:59:27.254  [90m 8 |[39m   [33mGeminiFileMetadata[39m[33m,[39m
15:59:27.254  [90m 9 |[39m   [33mGeminiFileUploadResponse[39m[33m,[39m[0m
15:59:27.283 Next.js build worker exited with code: 1 and signal: null
15:59:27.300 Error: Command "npm run build" exited with 115:58:48.910 Running build in Portland, USA (West) – pdx1 (Enhanced Build Machine)
15:58:48.910 Build machine configuration: 8 cores, 16 GB
15:58:48.999 Cloning github.com/sayujks0071/neurohyderabad-site (Branch: main, Commit: 22fe00a)
15:58:50.604 Warning: Failed to fetch one or more git submodules
15:58:50.604 Cloning completed: 1.605s
15:58:50.703 Found .vercelignore
15:58:50.706 Removed 0 ignored files defined in .vercelignore
15:58:50.757 Restored build cache from previous deployment (DwH5mt4UuEpcArHHQ6xwDMWFZaqf)
15:58:51.783 Running "vercel build"
15:58:52.198 Vercel CLI 48.9.0
15:58:52.517 Running "install" command: `npm install`...
15:58:55.170 
15:58:55.170 up to date, audited 1253 packages in 2s
15:58:55.170 
15:58:55.170 272 packages are looking for funding
15:58:55.170   run `npm fund` for details
15:58:55.195 
15:58:55.195 15 vulnerabilities (4 low, 4 moderate, 7 high)
15:58:55.195 
15:58:55.195 To address all issues (including breaking changes), run:
15:58:55.195   npm audit fix --force
15:58:55.195 
15:58:55.195 Run `npm audit` for details.
15:58:55.225 Detected Next.js version: 15.5.3
15:58:55.225 Running "npm run build"
15:58:55.349 
15:58:55.349 > neurosurgery-nextjs-site@0.1.0 build
15:58:55.349 > next build
15:58:55.349 
15:58:56.007    ▲ Next.js 15.5.3
15:58:56.007    - Experiments (use with caution):
15:58:56.007      ✓ optimizeCss
15:58:56.007      · optimizePackageImports
15:58:56.007 
15:58:56.171    Creating an optimized production build ...
15:59:06.224  ⚠ Compiled with warnings in 9.0s
15:59:06.224 
15:59:06.224 ./src/lib/gemini/file-handler.ts
15:59:06.224 Attempted import error: 'GoogleAIFileManager' is not exported from '@google/genai' (imported as 'GoogleAIFileManager').
15:59:06.224 
15:59:06.224 Import trace for requested module:
15:59:06.224 ./src/lib/gemini/file-handler.ts
15:59:06.224 ./app/api/gemini-files/list/route.ts
15:59:06.225 
15:59:06.225 ./src/lib/gemini/file-handler.ts
15:59:06.225 Attempted import error: 'GoogleGenerativeAI' is not exported from '@google/genai' (imported as 'GoogleGenerativeAI').
15:59:06.225 
15:59:06.225 Import trace for requested module:
15:59:06.225 ./src/lib/gemini/file-handler.ts
15:59:06.225 ./app/api/gemini-files/list/route.ts
15:59:06.225 
15:59:11.291  ✓ Compiled successfully in 12.0s
15:59:11.295    Linting and checking validity of types ...
15:59:16.096 
15:59:16.096 ./app/ai-chat/page.tsx
15:59:16.096 94:13  Warning: Do not use an `<a>` element to navigate to `/emergency-rehabilitation/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.096 
15:59:16.097 ./app/appointments/page.tsx
15:59:16.097 126:17  Warning: Do not use an `<a>` element to navigate to `/locations/brain-spine-surgeon-jubilee-hills/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.097 132:17  Warning: Do not use an `<a>` element to navigate to `/locations/brain-spine-surgeon-banjara-hills/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.097 138:17  Warning: Do not use an `<a>` element to navigate to `/locations/brain-spine-surgeon-hitec-city/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.098 
15:59:16.098 ./app/blog/endoscopic-spine-surgery-cost-hyderabad/page.tsx
15:59:16.098 292:15  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.098 
15:59:16.099 ./app/blog/sciatica-pain-management-hyderabad/page.tsx
15:59:16.099 208:17  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.099 
15:59:16.099 ./app/blog/spine-health-maintenance-hyderabad/page.tsx
15:59:16.099 281:17  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.099 
15:59:16.099 ./app/blog/spine-surgery-recovery-timeline-hyderabad/page.tsx
15:59:16.099 291:17  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.099 
15:59:16.099 ./app/conditions/spinal-stenosis-treatment-hyderabad/page.tsx
15:59:16.099 39:13  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.099 
15:59:16.100 ./app/layout.tsx
15:59:16.100 205:13  Warning: `rel="preconnect"` is missing from Google Font. See: https://nextjs.org/docs/messages/google-font-preconnect  @next/next/google-font-preconnect
15:59:16.100 
15:59:16.100 ./app/medical-disclaimer/page.tsx
15:59:16.100 96:54  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.100 
15:59:16.100 ./app/services/epilepsy-surgery-hyderabad/page.tsx
15:59:16.100 92:13  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.100 
15:59:16.100 ./app/services/minimally-invasive-spine-surgery/page.tsx
15:59:16.100 196:13  Warning: Do not use an `<a>` element to navigate to `/appointments/`. Use `<Link />` from `next/link` instead. See: https://nextjs.org/docs/messages/no-html-link-for-pages  @next/next/no-html-link-for-pages
15:59:16.100 
15:59:16.100 ./src/components/ExpandedFAQ.tsx
15:59:16.100 227:23  Warning: The attribute aria-expanded is not supported by the role group. This role is implicit on the element details.  jsx-a11y/role-supports-aria-props
15:59:16.100 
15:59:16.100 info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
15:59:27.252 Failed to compile.
15:59:27.252 
15:59:27.253 ./src/lib/gemini/file-handler.ts:6:10
15:59:27.253 Type error: Module '"@google/genai"' has no exported member 'GoogleGenerativeAI'.
15:59:27.253 
15:59:27.253 [0m [90m 4 |[39m [90m */[39m
15:59:27.253  [90m 5 |[39m
15:59:27.253 [31m[1m>[22m[39m[90m 6 |[39m [36mimport[39m { [33mGoogleGenerativeAI[39m[33m,[39m [33mGoogleAIFileManager[39m } [36mfrom[39m [32m'@google/genai'[39m[33m;[39m
15:59:27.253  [90m   |[39m          [31m[1m^[22m[39m
15:59:27.253  [90m 7 |[39m [36mimport[39m {
15:59:27.254  [90m 8 |[39m   [33mGeminiFileMetadata[39m[33m,[39m
15:59:27.254  [90m 9 |[39m   [33mGeminiFileUploadResponse[39m[33m,[39m[0m
15:59:27.283 Next.js build worker exited with code: 1 and signal: null
15:59:27.300 Error: Command "npm run build" exited with 1/**
 * API Route: Symptom Information Checker
 * POST /api/symptoms/check
 * 
 * Provides evidence-based guidance based on symptoms using medical documents
 */

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 30;

interface SymptomCheckRequest {
  symptoms: string;
  patientAge?: number;
  medicalHistory?: string;
  duration?: string;
  severity?: 'mild' | 'moderate' | 'severe';
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SymptomCheckRequest;
    const { symptoms, patientAge, medicalHistory, duration, severity } = body;

    if (!symptoms || !symptoms.trim()) {
      return NextResponse.json(
        { error: 'Symptoms description is required' },
        { status: 400 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    // Build comprehensive query for symptom analysis
    let query = `Symptoms: ${symptoms}`;
    if (patientAge) query += `. Age: ${patientAge}`;
    if (duration) query += `. Duration: ${duration}`;
    if (severity) query += `. Severity: ${severity}`;
    if (medicalHistory) query += `. Medical history: ${medicalHistory}`;
    query += `. What neurosurgical conditions could this indicate? What are the potential causes, when should someone seek immediate medical attention, and what are the general treatment approaches?`;

    // Search medical documents for symptom information
    const response = await fetch(`${baseUrl}/api/gemini-files/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchType: 'medical',
        query: query,
        category: 'patient-info',
        maxResults: 5,
        temperature: 0.3, // Lower temperature for more factual responses
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Failed to check symptoms: ${response.status} - ${JSON.stringify(errorData)}`
      );
    }

    const data = await response.json();

    // Determine urgency level based on symptoms
    const urgentKeywords = [
      'stroke',
      'seizure',
      'severe headache',
      'sudden weakness',
      'paralysis',
      'loss of vision',
      'loss of consciousness',
      'severe neck pain',
      'trauma',
      'accident',
      'head injury',
    ];
    const isUrgent = urgentKeywords.some((keyword) =>
      symptoms.toLowerCase().includes(keyword)
    );

    // Add medical disclaimer and recommendation
    const recommendation = isUrgent
      ? 'This appears to be an emergency situation. Please call +91-9778280044 immediately or visit the nearest emergency room.'
      : 'If symptoms persist or worsen, please contact Dr. Sayuj at +91-9778280044 for proper evaluation and treatment.';

    return NextResponse.json({
      success: true,
      information: data.answer,
      sources: data.sources || [],
      urgency: isUrgent ? 'high' : 'normal',
      disclaimer:
        'This information is for educational purposes only and does not replace professional medical advice. Please consult with a healthcare provider for proper diagnosis and treatment.',
      recommendation,
      contactInfo: {
        phone: '+91-9778280044',
        email: 'neurospinehyd@drsayuj.com',
        location: 'Yashoda Hospital, Room 317, OPD Block, Malakpet, Hyderabad',
      },
      checkedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error checking symptoms:', error);
    return NextResponse.json(
      {
        error: 'Failed to check symptoms',
        message: error instanceof Error ? error.message : 'Unknown error',
        recommendation:
          'Please contact Dr. Sayuj directly at +91-9778280044 for immediate assistance.',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Symptom Information Checker API',
    version: '1.0.0',
    usage: 'POST with { symptoms: string, patientAge?: number, medicalHistory?: string, duration?: string, severity?: "mild" | "moderate" | "severe" }',
    example: {
      symptoms: 'persistent headaches and vision problems',
      patientAge: 45,
      duration: '2 weeks',
      severity: 'moderate',
    },
  });
}
