const newsPage = {
  id: "JaenPage /news/news-page-1",
  jaenPageMetadata: {
    title: "News Page 1"
  }
}

export const jaenData = {
  jaenPage: {
    id: "JaenPage /news/",
    chapters: {
      'news': {
        ptrHead: 'JaenSection foo-bar-baz-1',
        ptrTail: 'JaenSection foo-bar-baz-1',
        sections: {
          'JaenSection foo-bar-baz-1': {
            jaenFields: null,
            name: 'news',
            ptrNext: null,
            ptrPrev: null // this is the first section of the chapter
          }
        }
      }
    },
    children: [newsPage, newsPage, newsPage]
  }, 
  jaenPages: [newsPage]
}