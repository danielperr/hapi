module.exports = {
  title: 'Hapi Documentation',
  tagline: 'DABA Are Hapi',
  url: 'https://hapi-docs.netlify.app/',
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
          to: '/docs',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          to: '/components/activity',
          activeBasePath: 'components/activity',
          label: 'Activity Componenets',
          position: 'left',
        },
        {
          to: '/components/creator',
          activeBasePath: 'components/creator',
          label: 'Creator Componenets',
          position: 'left',
        },
        {
          href: 'https://github.com/danielperr/hapi',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    hideableSidebar: true,
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
  plugins: [
    [
      'docusaurus-plugin-react-docgen',
      {
        id: 'docgen-activity',
        src: ['../hapi-activity/src/components/**/*.jsx'],
        route: {
          path: '/components/activity',
          component: require.resolve('./src/components/ComponentDocPage/index.jsx'),
          exact: true,
        },
      },
    ],
    [
      'docusaurus-plugin-react-docgen',
      {
        id: 'docgen-creator',
        src: ['../hapi-creator/src/components/**/*.jsx'],
        route: {
          path: '/components/creator',
          component: require.resolve('./src/components/ComponentDocPage/index.jsx'),
          exact: true,
        },
      },
    ],
  ],
};
