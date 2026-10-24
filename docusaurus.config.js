// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Abby Kendrick',
  tagline: 'Technical writing portfolio: engineering, cloud, and security documentation',
  favicon: 'img/favicon.ico',
  url: 'https://abbykendrick.github.io',
  baseUrl: '/technical-writing-portfolio/',
  organizationName: 'abbykendrick',
  projectName: 'technical-writing-portfolio',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  i18n: {defaultLocale: 'en', locales: ['en']},
  markdown: {mermaid: true},
  themes: ['@docusaurus/theme-mermaid'],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: 'samples',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/abbykendrick/technical-writing-portfolio/tree/main/',
        },
        blog: false,
        theme: {customCss: './src/css/custom.css'},
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {respectPrefersColorScheme: true},
      navbar: {
        title: 'Abby Kendrick',
        items: [
          {type: 'docSidebar', sidebarId: 'samples', position: 'left', label: 'Samples'},
          {href: 'https://www.linkedin.com/in/abbykendrick', label: 'LinkedIn', position: 'right'},
          {href: 'https://github.com/abbykendrick/technical-writing-portfolio', label: 'GitHub', position: 'right'},
        ],
      },
      footer: {
        style: 'dark',
        copyright: `All samples use fictional companies and systems. © ${new Date().getFullYear()} Abby Kendrick.`,
      },
      prism: {theme: prismThemes.github, darkTheme: prismThemes.dracula, additionalLanguages: ['bash', 'json', 'yaml']},
    }),
};

export default config;
