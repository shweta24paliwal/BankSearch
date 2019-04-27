import React from 'react';
import getPaginationData from './util';
import styles from './pagination.module.css';

const Pagination = (props) => {
  const paginationData = getPaginationData(props.totalProducts,props.count, props.currentIndex);
  const pages = paginationData.pages;

  if (pages.length === 1) {
    return null;
  }

  const buttons = pages.map((item, i) => {
    const itemClass = [styles[item.type], styles.listItem];

    if (item.hasOwnProperty('status') && !item.status) {
      itemClass.push(styles.disabled);
    }

    return (
      <li className={itemClass.join(' ')} key={i} onClick={() => {props.setPageNumber(item.index)}}>
        {item.view}
      </li>
    );
  });

  return (
    <ul className={styles.container}>
      <li className={styles.paginationMeta}>Page <b>{props.currentIndex}</b> of {paginationData.totalPages}</li>
      {buttons}
    </ul>
  );
};

export default Pagination;
