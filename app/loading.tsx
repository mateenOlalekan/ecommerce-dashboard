export default function SkeletonLoader(){
    return(
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-200 p-5 rounded-2xl h-32"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-200 p-6 rounded-2xl h-96"></div>
        <div className="bg-gray-200 p-6 rounded-2xl h-96"></div>
      </div>
    </div>
    )
}