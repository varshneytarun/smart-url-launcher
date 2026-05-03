// Shared default patterns for the extension
globalThis.DEFAULT_PATTERNS = [
  {
    name: "ServiceNow Incident",
    pattern: "INC\\d{7,}",
    urlTemplate: "https://your-instance.service-now.com/nav_to.do?uri=incident.do?sysparm_query=number={value}",
    id: 'snow-inc',
    enabled: true
  },
  {
    name: "ServiceNow Change",
    pattern: "CHG\\d{7,}",
    urlTemplate: "https://your-instance.service-now.com/nav_to.do?uri=change_request.do?sysparm_query=number={value}",
    id: 'snow-chg',
    enabled: true
  },
  {
    name: "ServiceNow Problem",
    pattern: "PRB\\d{7,}",
    urlTemplate: "https://your-instance.service-now.com/nav_to.do?uri=problem.do?sysparm_query=number={value}",
    id: 'snow-prb',
    enabled: true
  },
  {
    name: "ServiceNow Request",
    pattern: "REQ\\d{7,}",
    urlTemplate: "https://your-instance.service-now.com/nav_to.do?uri=sc_request.do?sysparm_query=number={value}",
    id: 'snow-req',
    enabled: true
  },
  {
    name: "ServiceNow Request Item",
    pattern: "RITM\\d{7,}",
    urlTemplate: "https://your-instance.service-now.com/nav_to.do?uri=sc_request_item.do?sysparm_query=number={value}",
    id: 'snow-req-item',
    enabled: true
  },
  {
    name: "ServiceNow Configuration Item",
    pattern: "CI\\d{7,}",
    urlTemplate: "https://your-instance.service-now.com/nav_to.do?uri=cmdb_ci.do?sysparm_query=number={value}",
    id: 'snow-ci',
    enabled: true
  },
  {
    name: "Jira Issue",
    pattern: "[A-Z]{2,}-\\d+",
    urlTemplate: "https://your-domain.atlassian.net/browse/{value}",
    id: 'jira-issue',
    enabled: true
  }
];

// Make it immutable to avoid accidental mutation
Object.freeze(globalThis.DEFAULT_PATTERNS);
