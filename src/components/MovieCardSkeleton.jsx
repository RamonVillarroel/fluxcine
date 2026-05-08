export default function MovieCardSkeleton() {
  return (
    <div className="block">
      <div
        className="aspect-[2/3] rounded-2xl overflow-hidden mb-3"
        style={{ border: '1px solid rgba(139,92,246,0.08)' }}
      >
        <div
          className="w-full h-full animate-shimmer"
          style={{
            background: 'linear-gradient(90deg, rgba(139,92,246,0.06) 25%, rgba(139,92,246,0.12) 50%, rgba(139,92,246,0.06) 75%)',
            backgroundSize: '400px 100%',
          }}
        />
      </div>
      <div className="h-3 w-3/4 rounded-full mb-1.5" style={{ background: 'rgba(139,92,246,0.1)' }} />
      <div className="h-2.5 w-1/3 rounded-full" style={{ background: 'rgba(139,92,246,0.06)' }} />
    </div>
  )
}
