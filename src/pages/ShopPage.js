import React from "react";
import SHOP_DATA from "./ShopData";
import PreviewCollection from "../components/PreviewCollection";

class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: SHOP_DATA,
    };
  }
  render() {
      const {collections} = this.state
    return (
      <div className="shop-page">
        {collections.map(({id, ...otherProps}) => (
            <PreviewCollection key={id} {...otherProps} />
        ))}
      </div>
    );
  }
}

export default ShopPage;
