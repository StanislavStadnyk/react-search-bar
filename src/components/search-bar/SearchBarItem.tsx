import { FC } from "react";
import { ROUTES } from "../../constants";

interface SearchBarItemProps {
  id: number;
  description: string;
  price: number;
  imgUrl: string;
}

const SearchBarItem: FC<SearchBarItemProps> = ({
  id,
  description,
  price,
  imgUrl,
}) => {
  const src = imgUrl ? imgUrl : "/images/placeholder.png";
  const alt = description ? description : "Image here";

  return (
    // can be Link from "react-router-dom" or from "next/link" in NextJS
    <a href={`${ROUTES.PRODUCT}/${id}`} className="flex">
      <div className="w-1/4 self-start">
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
    </a>
  );
};

export default SearchBarItem;
