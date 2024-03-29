module.exports = {
  sidebar: [
    {
      type: 'category',
      label: 'Hapi',
      collapsed: false,
      items: [
        'introduction',
        'documentation',
      ],
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'installation',
        'usage',
      ],
    },
    {
      type: 'category',
      label: 'Explanations',
      collapsed: false,
      items: [
        'npm',
        'react',
        'project-files-folders',
        'structure-object',
        {
          type: 'category',
          label: 'Activity',
          // collapsed: true,
          items: [
            'activity-introduction',
            'activity-component-folders',
            'activity-structure',
            'activity-answering',
            'activity-checking',
            'activity-saving-progress',
            'activity-containers',
            'activity-full-renders',
          ],
        },
        {
          type: 'category',
          label: 'Creator',
          // collapsed: true,
          items: [
            'creator-index',
            'creator-component-folders',
            'creator-structure-state',
            'creator-notices-warnings',
            'creator-auto-saving',
            'creator-full-renders',
          ],
        },
        'git',
      ],
    },
  ],
};
