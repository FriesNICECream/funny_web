import MediaCard from "./MediaCard";

function MediaGrid({ items }) {
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
      {items.map((item) => (
        <MediaCard key={item.id} item={item} />
      ))}
    </section>
  );
}

export default MediaGrid;
