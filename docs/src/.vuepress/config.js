const { description } = require('../../package')
const { path } = require('@vuepress/utils')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'gamEngineJS Docs',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['script', {src: './docs/github.js'}]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    sidebarDepth: 2,
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'Config',
        link: '/config/',
      },
      {
        text: 'versions',
        arialLabel: 'versions standarts',
        items: [
          { text: 'v1.0', link: '/pages/v1/' },
          { text: 'v2.0', link: '/pages/v2/' },
        ]
      },
      {
        text: 'Profile',
        link: '/profile/',
      }
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            'start',
            'constants',
            'startJS',
          ]
        }
      ],
      '/profile/': [
        {
          title: 'versions',
          collapsable: false,
          children: [
            '',
            'info',
          ]
        }
      ],
      '/pages/': [
        {
          title: 'v1',
          collapsable: false,
          children: [
            'v1/',
            'v1/start',
          ]
        },
        {
          title: 'v2',
          collapsable: false,
          children: [
            'v2/',
            'v2/start',
          ]
        },
      ],
      '/': [
        '',
      ] 
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
    [
      "@vuepress/pwa",
      {
        serviceWorker: true
      }
    ]
  ]
}
