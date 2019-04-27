function getPaginationData(totalResults, rows, currentIndex) {
  const breakPoint = 10;
  const totalPages = Math.ceil(totalResults / rows);
  const list = [];

  if (currentIndex - 1 >= 1) {
    list.push({
      index: currentIndex - 1,
      type: 'prev',
      view: 'Previous',
      status: currentIndex - 1 >= 1
    });
  }

  if (currentIndex >= breakPoint) {
    list.push({ index: 1, type: 'number', view: 1 });
    list.push({ index: currentIndex - 5, type: 'dots', view: '...' });

    const pageSequence = [{ n: 4, o: 'dec' }, { n: 0, o: 'none' }, { n: 4, o: 'inc' }];
    const prevPages = [4, 3, 2, 1];

    pageSequence.forEach((item) => {
      if (item.o !== 'none') {
        for (let i = 1; i <= item.n; i++) {
          let pageNumber;
          if (item.o === 'dec') {
            pageNumber = currentIndex - prevPages[i - 1];
            list.push({ index: pageNumber, type: 'number', view: pageNumber });
          } else if (item.o === 'inc') {
            pageNumber = currentIndex + i;
            if (pageNumber <= totalPages) {
              list.push({ index: pageNumber, type: 'number', view: pageNumber });
            }
          }
        }
      } else {
        list.push({ index: currentIndex, type: 'active', view: currentIndex });
      }
    });
  } else {
    for (let i = 1; i <= 10; i++) {
      if (i <= totalPages && list.length <= 10) {
        if (i === currentIndex) {
          list.push({ index: i, type: 'active', view: i });
        } else {
          list.push({ index: i, type: 'number', view: i });
        }
      }
    }
  }

  if (currentIndex + 1 <= totalPages) {
    list.push({
      index: currentIndex + 1,
      type: 'next',
      view: 'Next',
      status: currentIndex + 1 <= totalPages
    });
  }

  return {
    pages: list,
    totalPages
  };
}

export default getPaginationData;

