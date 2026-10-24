// @ts-check
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  samples: [
    'index',
    {type: 'category', label: 'Engineering & Cloud', collapsed: false,
      items: ['architecture-c4', 'runbook-high-cpu', 'api-reference', 'release-notes']},
    {type: 'category', label: 'Security & Compliance', collapsed: false,
      items: ['ssp-excerpt', 'sop-change-control']},
    {type: 'category', label: 'Docs Practice', collapsed: false,
      items: ['style-guide']},
  ],
};
export default sidebars;
