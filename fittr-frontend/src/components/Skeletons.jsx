export const StatSkeleton = () => (
  <div className="skeleton" style={{ height: 80, borderRadius: 16 }} />
);

export const SectionSkeleton = () => (
  <div className="skeleton" style={{ height: 220, borderRadius: 16 }} />
);

export const ListSkeleton = () => (
  <div>
    {[1, 2, 3].map(i => (
      <div
        key={i}
        className="skeleton"
        style={{ height: 50, marginBottom: 12 }}
      />
    ))}
  </div>
);
