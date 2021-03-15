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
        {
          type: 'category',
          label: 'Activity',
          // collapsed: true,
          items: [
            'activity-index',
            'activity-component-folders',
            'activity-structure',
            'activity-answering',
            'activity-checking',
            'activity-saving-progress',
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
            'creator-activity-creation',
            'creator-auto-saving',
            'creator-dnd',
            'creator-full-renders',
          ],
        },
        'git',
        'hapi-docs',
      ],
    },
  ],
};
