module.exports = {
  sections: [
    {
      name: 'Introduction',
      content: 'docs/introduction/index.md',
      sections: [
        {
          name: 'Live Demo',
          external: true,
          href: 'https://hapi-app.netlify.app'
        }
      ]
    },
    {
      name: 'Installation',
      content: 'docs/installation/index.md',
    },
    {
      name: 'Usage',
      content: 'docs/usage/index.md'
    },
    {
      name: 'Explanations',
      description: 'Explanations of the project and its dependencies',
      content: 'docs/explanations/index.md',
      sections: [
        {
          name: 'Project Structure',
          description: 'The structure of all the files in the project',
          content: 'docs/explanations/project-structure/index.md',
        },
        {
          name: 'Activity Creation',
          description: 'How activities are related to the creator, and how it generates them',
          content: 'docs/explanations/activity-creation/index.md',
        },
        {
          name: 'A short explanation about react',
          description: 'The minimum explanation required to understand the following chapters',
          content: 'docs/explanations/short-react/index.md',
        },
        {
          name: 'Activity Structure and State Flow',
          description: 'How the activity is built and how the state is managed throughout',
          content: 'docs/explanations/activity/index.md',
        },
        {
          name: 'Creator State Flow',
          description: 'How the creator is built and how the state is managed throughout',
          content: 'docs/explanations/creator/index.md',
        },
        {
          name: 'Packages',
          sections: [
            { name: 'Git', content: 'docs/explanations/git/index.md' },
            { name: 'NPM', content: 'docs/explanations/npm/index.md' },
            { name: 'Webpack', content: 'docs/explanations/webpack/index.md' },
            { name: 'Babel', content: 'docs/explanations/babel/index.md' },
            { name: 'React', content: 'docs/explanations/react/index.md' },
            { name: 'React-Styleguidist', content: 'docs/explanations/react-styleguidist/index.md' }
          ]
        },
      ]
    },
    {
      name: 'Activity Components',
      components: 'activity/src/components/**/*.jsx'
    },
    // {
    //   name: 'Creator Components',
    //   components: 'creator/src/components/**/*.jsx'
    // }
  ]
};
