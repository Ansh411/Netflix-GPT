import MediaCard from "./MediaCard";

const MediaList = ({ title, items, type }) => {
  if (!items?.length) return null;

  return (
    <div className="px-6 md:px-12 py-6">
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
        {title}
      </h2>

      <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth">
        {items.map((item) => (
          <MediaCard
            key={item.id}
            id={item.id}
            posterPath={item.poster_path}
            type={type}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaList;
