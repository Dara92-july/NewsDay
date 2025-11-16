
import { Link } from 'react-router-dom';

function PostCard({ article, index }) {
  const fallbackImage = "https://picsum.photos/600/400";


  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">

      <div className="w-full h-56 overflow-hidden">
        <img
          src={article.urlToImage || fallbackImage}
          alt={article.title}
          className="w-full h-full object-cover"
          onError={(e) => (e.target.src = fallbackImage)}
        />
      </div>

      <div className="p-5">
        
        <h2 className="font-semibold text-lg mb-2 leading-tight line-clamp-2">
          {article.title}
        </h2>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.description || "No description available."}
        </p>

        <div className="flex justify-between items-center">

          <span className="text-xs text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>

          <Link
            to={`/article/${index}`}
            state={{ article }}
            className="text-blue-600 font-medium hover:underline"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostCard;