import React from "react";
import './Item.css';
import { getClientById, getLabelType } from '../../shared/utils';

function Item(props: any) {
  return (
    <div className="item-wrap">
      <div className="item-image">
        <img src="../../assets/icon/box.svg" alt="item"/>
      </div>
      <div className="item-data">
        <h4>{props.client?.name || 'Нет данных'}</h4>
        <span className="type">{getLabelType(props.item.type)}</span>
        <span className="price">{props.item.price} &#8376;</span>
      </div>
    </div>
  );
}

export default Item;
