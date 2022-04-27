export const jaenPage = {id: "fff", chapters: {
  'faq': {
    ptrHead: 'JaenSection foo-bar-baz-1',
    ptrTail: 'JaenSection foo-bar-baz-2',
    sections: {
      'JaenSection foo-bar-baz-1': {
        jaenFields: null,
        name: 'faq-item',
        ptrNext: 'JaenSection foo-bar-baz-2',
        ptrPrev: null // this is the first section of the chapter
      },
      'JaenSection foo-bar-baz-2': {
        jaenFields: {'IMA:TextField': {question: "lolz", answer: "lololz"}},
        name: 'faq-item',
        ptrNext: null, // this is the last section of the chapter
        ptrPrev: 'JaenSection foo-bar-baz-1'
      }
    }
  }
},}