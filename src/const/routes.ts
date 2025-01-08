export const routes = {
  app: {
    route: '/app/overview',
    breadCrumb: [{ title: 'Overview' }],
    children: {
      addRecord: {
        route: '/app/record',
        breadCrumb: [
          { title: 'Moodify', link: '/app/overview' },
          { title: 'Record new Mood' },
        ],
      },
      records: {
        route: '/app/records',
        breadCrumb: [
          { title: 'Moodify', link: '/app/overview' },
          { title: 'Records' },
        ],
      },
    },
  },
};
