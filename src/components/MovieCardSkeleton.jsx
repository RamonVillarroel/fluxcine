export default function MovieCardSkeleton() {
  return (
    <div className="block">
      <div className="aspect-[2/3] rounded-2xl overflow-hidden mb-3">
        <div
          className="w-full h-full animate-shimmer"
          style={{
            background: 'linear-gradient(90deg, #1c1c1e 25%, #2c2c2e 50%, #1c1c1e 75%)',
            backgroundSize: '400px 100%',
          }}
        />
      </div>
      <div className="h-3 w-3/4 rounded-full mb-1.5" style={{ background: '#2c2c2e' }} />
      <div className="h-2.5 w-1/3 rounded-full" style={{ background: '#1c1c1e' }} />
    </div>
  )
}
