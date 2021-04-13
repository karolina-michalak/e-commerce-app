import React from "react";
import "../scss/PreviewCollection.styles.scss";
import CollectionItem from "./CollectionItem";

const PreviewCollection = ({ title, items }) => {
  return (
    <div className="collection-preview">
      <h3 className="title"> {title.toUpperCase()}</h3>
      <div className="preview">
        {items
          .filter((item, idx) => idx < 4)
          .map(( item ) => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default PreviewCollection;
