# CRM Intake - Google Apps Script

This folder contains the Google Apps Script web app used by the CRM intake flow
(`/api/lead`).

## Configuration

Script Properties required by `CRM_WebApp.gs`:
- `SHEET_ID`: `199u_nKqE9lOjT-B0RlSmmfmIqImiT5fawasHxbbbLkU` (production sheet)
- `SHEET_TAB`: `Leads` (optional, defaults to `Leads`)
- `API_TOKEN`: shared secret for the web app
- `PARENT_FOLDER_ID`: Drive folder for per-lead folders (optional)
- `CALENDAR_ID`: Calendar for appointments (optional)
- `STAFF_EMAILS`: comma-separated staff emails (optional)

Vercel environment variables:
- `GOOGLE_APPS_SCRIPT_WEBAPP_URL`
- `GOOGLE_APPS_SCRIPT_API_TOKEN`

## Owner Access

Share the Google Sheet with `hellodr@drsayuj.info` as an Editor so the clinic
owner can view and manage lead submissions.
