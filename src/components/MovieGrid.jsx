import MovieCard from './MovieCard'
import MovieCardSkeleton from './MovieCardSkeleton'

export default function MovieGrid({ movies = [], loading = false, skeletonCount = 18 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-7">
      {loading
        ? Array.from({ length: skeletonCount }, (_, i) => <MovieCardSkeleton key={i} />)
        : movies.map(mv => <MovieCard key={mv.id} movie={mv} />)
      }
    </div>
  )
}
