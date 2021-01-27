module.exports = {
  title: 'Hapi Documentation',
  tagline: 'DABA Are Hapi',
  url: 'https://hapi-app.netlify.app/docs',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'DABA', // Usually your GitHub org/user name.
  projectName: 'Hapi', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Hapi',
      logo: {
        alt: 'Hapi Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg'
      },
      items: [
        {
          href: 'https://github.com/danielperr/hapi',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [], // Todo: add important doc pages in the footer
        },
        {
          title: 'Community',
          items: [],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/danielperr/hapi',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Amir Kedem, Daniel Peretz, and Boaz Katz. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/danielperr/hapi/edit/master/hapi-docs/website/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
