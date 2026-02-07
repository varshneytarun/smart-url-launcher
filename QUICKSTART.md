# Quick Start Guide

## 🚀 5-Minute Setup

### Step 1: Install the Extension
1. Open Chrome/Edge and go to `chrome://extensions/` or `edge://extensions/`
2. Enable "Developer mode" (toggle in top-right or left sidebar)
3. Click "Load unpacked"
4. Select the `smart-url-launcher` folder
5. You should see the extension icon in your toolbar

### Step 2: Configure Your Patterns
1. Click the extension icon and select **"Configure Patterns"**.
2. Update the default patterns with your actual URLs. Changes are **saved automatically** when you click away from a field.

   **For ServiceNow:**
   - Change `your-instance` to your actual instance name.
   - Example: `https://acme.service-now.com/nav_to.do?uri=incident.do?sysparm_query=number={value}`

   **For Jira:**
   - Change `your-domain` to your Jira domain.
   - Example: `https://acme.atlassian.net/browse/{value}`

### Step 3: Test It Out
1. Copy a ticket number to your clipboard
   - ServiceNow: `INC0123456`
   - Jira: `PROJ-123`

2. Click the extension icon

3. Click "Read Clipboard & Launch"

4. Your ticket should open in a new tab!

## Common Configurations

### ServiceNow Setup
Replace `your-instance.service-now.com` with your actual instance:

**Incidents:**
```
Pattern: INC\\d{7,}
URL: https://YOUR-COMPANY.service-now.com/nav_to.do?uri=incident.do?sysparm_query=number={value}
```

**Change Requests:**
```
Pattern: CHG\\d{7,}
URL: https://YOUR-COMPANY.service-now.com/nav_to.do?uri=change_request.do?sysparm_query=number={value}
```

**Problem Records:**
```
Pattern: PRB\\d{7,}
URL: https://YOUR-COMPANY.service-now.com/nav_to.do?uri=problem.do?sysparm_query=number={value}
```

### Jira Setup
Replace `your-domain.atlassian.net` with your actual Jira URL:

```
Pattern: [A-Z]{2,}-\\d+
URL: https://YOUR-COMPANY.atlassian.net/browse/{value}
```

### GitHub Setup
Replace `owner/repo` with your repository:

```
Pattern: #\\d+
URL: https://github.com/YOUR-ORG/YOUR-REPO/issues/{value}
```

## Tips

- **Test patterns**: Use [regex101.com](https://regex101.com/) to test your regex patterns
- **Multiple projects**: Add separate patterns for different Jira projects
- **Enable/Disable**: Uncheck patterns you don't want to use without deleting them
- **Order matters**: Patterns are checked in order, put more specific patterns first

## Need Help?

Check the full README.md for detailed documentation and troubleshooting tips.