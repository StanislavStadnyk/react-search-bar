import React, { FC } from "react";

interface SearchBarItemProps {
  description: string;
  price: number;
  imgUrl: string;
}

const SearchBarItem: FC<SearchBarItemProps> = ({
  description,
  price,
  imgUrl,
}) => {
  const src = imgUrl ? imgUrl : "/images/placeholder.png";
  const alt = description ? description : "Image here";

  return (
    <div className="flex">
      <div className="w-1/4 self-start pb-">
        <div className="ratio-img">
          <img src={src} alt={alt} />
        </div>
      </div>

      <div className="p-2 pl-5 text-xs text-left w-3/4">
        {description && (
          <div className="uppercase line-clamp-2 mb-2">{description}</div>
        )}
        {price && <strong className="block">$ {price.toFixed(2)}</strong>}
      </div>
    </div>
  );
};

export default SearchBarItem;
