export const dummyChannels = [
  {
    name: 'General',
    id: 0,
    users: [0, 1, 2]
  },
  {
    name: 'Events',
    id: 1,
    users: [5, 6, 7]
  },
  {
    name: 'Trade',
    id: 2,
    users: [10, 11, 12]
  }
];

export const dummyMessages = [
  {
    id: 0,
    userId: 2,
    text: 'Sups',
    region: 'SF',
    channel: 'General'
  },
  {
    id: 1,
    userId: 3,
    text: 'Nups',
    region: 'Marin',
    channel: 'Trade'
  },
  {
    id: 2,
    userId: 10,
    text: 'Pups',
    roomAndRegion: 'SF-Events'
  }
];

export const dummyUsers = [
  {
    id: 0,
    name: 'theBob',
    channel: 'General'
  },
  {
    id: 1,
    name: 'someBob',
    channel: 'General'
  },
  {
    id: 2,
    name: 'notBob',
    channel: 'Trade'
  }
];

export const dummyRegions = [
  {
    id: 0,
    name: 'what',
    region: 'Region 1'
  },
  {
    id: 1,
    name: 'what',
    region: 'Region 2'
  },
  {
    id: 2,
    name: 'what',
    region: 'Region 3'
  }, 

]