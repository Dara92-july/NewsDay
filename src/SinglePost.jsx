import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search, ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import useNewsApi  from "./UseNewsApi";

function SinglePost() {
  const { id } = useParams();
  const { articles } = useNewsApi();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const found = articles.find((item, index) => index === Number(id));
    setArticle(found);
    setLoading(false)
  }, [articles, id]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading…</p>
      </div>
    );
  }

  if (!article)
    return (
      <div className="text-center py-20">
        <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading…</p>
      </div>
    );
  const category = article.category || "News";

  return (
    <div className="min-h-screen bg-gray-50">
      
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          
         
          <Link to="/" className="text-2xl font-bold">
            NewsToday
          </Link>

          <nav className="hidden md:flex space-x-6 text-gray-700">
            <Link to="/" className="hover:text-black">Home</Link>
            <Link to="/category/business" className="hover:text-black">Business</Link>
            <Link to="/category/technology" className="hover:text-black">Technology</Link>
            <Link to="/category/sports" className="hover:text-black">Sports</Link>
          </nav>

          <div className="relative">
            <Search className="absolute left-3 top-2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-full pl-10 pr-4 py-2 w-40 md:w-56"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-4"
        >
        <span className="text-xl">←</span> Back
        </button>

        <div className="flex items-center text-sm text-gray-500 mb-4 space-x-2">
          <Link to="/" className="hover:underline">News</Link>
          <span>/</span>
          <span className="hover:underline">{category}</span>
          <span>/</span>
          <span className="text-gray-700">{article.title?.slice(0, 30)}...</span>
        </div>

        <h1 className="text-4xl font-extrabold mb-3 leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center text-gray-600 mb-6">
          <img
            src="https://i.pravatar.cc/40"
            alt="Author"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold">By NewsToday Reporter</p>
            <p className="text-sm">
              {new Date(article.publishedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {article.urlToImage && (
          <img
            src={article.urlToImage}
            className="w-full h-96 object-cover rounded-lg mb-8"
            alt={article.title}
          />
        )}

          <article className="prose max-w-full text-gray-800 leading-relaxed mb-10">
          <p>{article.description}</p>

          {article.content && (
            <p className="mt-4 text-gray-700">
              {article.content.replace(/\[\+\d+\schars\]/, "")}
            </p>
          )}

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-semibold mt-4 inline-block"
          >
            Read the full article →
          </a>
        </article>

        <div className="flex items-center space-x-6 mb-12">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-black">
            <ThumbsUp size={20} /> <span>Like</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-black">
            <MessageCircle size={20} /> <span>Comment</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-black">
            <Share2 size={20} /> <span>Share</span>
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {articles.slice(0, 2).map((related, i) => (
            <Link key={i} to={`/post/${i}`}>
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
                <img
                  src={related.urlToImage}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                  alt={related.title}
                />
                <p className="text-blue-600 text-sm font-semibold mb-1">
                  {related.category || "News"}
                </p>
                <h3 className="font-bold text-lg mb-2">{related.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {related.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-3">Add a Comment</h2>
        <textarea
          rows="4"
          placeholder="Write your comment..."
          className="w-full border rounded-lg p-3 mb-3 focus:outline-none focus:ring focus:ring-blue-200"
        ></textarea>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Submit Comment
        </button>
      </main>
    </div>
  );
}

export default SinglePost;
