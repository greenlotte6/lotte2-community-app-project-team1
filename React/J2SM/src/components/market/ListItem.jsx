import React from "react";
import { PRODUCT_THUMB } from "../../api/_http";

const ListItem = ({ product }) => {
  return (
    <tr>
      <td>
        <a href="./view.html">
          <img
            src={`${PRODUCT_THUMB}/${product.thumb120}`}
            className="thumbnail"
            alt={`${product.productName}`}
          />
        </a>
      </td>
      <td class="type">{product.type}</td>
      <td class="title">
        <a href="#">{product.productName}</a>
      </td>
      <td class="discount">{product.discount}%</td>
      <td class="point">{product.point}P</td>
      <td class="price">
        <strong>{product.price}</strong>
        <del>{product.price}</del>
      </td>
    </tr>
  );
};

export default ListItem;
