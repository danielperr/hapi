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
          collapsed: true,
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
        'activity-creation',
        'creator',
        'git',
        'hapi-docs',
      ],
    },
  ],
};
