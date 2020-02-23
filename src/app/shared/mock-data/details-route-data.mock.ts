export const mockDetailsRouteData = {
  snapshot: {
    data: {
      job: {
        id: '123',
        title: 'Redo Kitchen Tiles',
        description: 'Kitchen tiles need to be replaced completely',
        date: '2020-02-17',
        status: 'Active',
        assignee: {
          name: 'Jimmy K',
          email: 'jimmy-k@myhammer.de',
          role: 'Case Manager',
          avatar: 'image1.jpg',
        },
        attachments: [
          {
            name: 'SampleTile.jpg',
            downloadUrl: 'download-url-1',
          },
          {
            name: 'Query.pdf',
            downloadUrl: 'download-url-2',
          },
        ],
      },
    },
  },
};
