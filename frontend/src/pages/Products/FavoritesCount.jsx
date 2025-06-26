import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    favoriteCount > 0 && (
      <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs rounded-full px-1.5 py-0.5 shadow-md border-2 border-white z-10">
        {favoriteCount}
      </span>
    )
  );
};

export default FavoritesCount;
