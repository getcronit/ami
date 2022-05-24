export const jaenData = {
  jaenPage: {
    id: "JaenPage fff",
    chapters: {
      'home': {
        ptrHead: 'JaenSection foo-bar-baz-1',
        ptrTail: 'JaenSection foo-bar-baz-8',
        sections: {
          'JaenSection foo-bar-baz-1': {
            jaenFields: null,
            name: 'hero',
            ptrNext: 'JaenSection foo-bar-baz-2',
            ptrPrev: null // this is the first section of the chapter
          },
          'JaenSection foo-bar-baz-2': {
            jaenFields: null,
            name: 'featuredpartner',
            ptrNext: 'JaenSection foo-bar-baz-3',
            ptrPrev: 'JaenSection foo-bar-baz-1'
          },
          'JaenSection foo-bar-baz-3': {
            jaenFields: null,
            name: 'reviewfaq',
            ptrNext: 'JaenSection foo-bar-baz-4',
            ptrPrev: 'JaenSection foo-bar-baz-2'
          },
          'JaenSection foo-bar-baz-4': {
            jaenFields: null,
            name: 'about',
            ptrNext: 'JaenSection foo-bar-baz-5',
            ptrPrev: 'JaenSection foo-bar-baz-3'
          },
          'JaenSection foo-bar-baz-5': {
            jaenFields: null,
            name: 'news',
            ptrNext: null, // this is the last section of the chapter
            ptrPrev: 'JaenSection foo-bar-baz-4'
          }
        }
      }
    }
  }
}
