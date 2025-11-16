import { useState } from "react";
import useNewsApi  from "./UseNewsApi";
import PostCard from "./PostCard";
import { Link } from "react-router-dom";

const categories = [
  { id: "general", name: "Top Stories" },
  { id: "world", name: "World" },
  { id: "politics", name: "Politics" },
  { id: "business", name: "Business" },
  { id: "technology", name: "Tech" },
  { id: "entertainment", name: "Culture" },
];

function Home() {
  const [category, setCategory] = useState("general");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const { articles, loading, error } = useNewsApi(category, query);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  const featured = articles[0];
  const recent = articles.slice(1, 7);

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">News Today</h1>

          <nav className="hidden md:flex space-x-6">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setCategory(c.id);
                  setQuery("");
                }}
                className={`${
                  category === c.id
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {c.name}
              </button>
            ))}
          </nav>

        </div>
      </header>

      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-6">
          <form
            onSubmit={handleSearch}
            className="max-w-3xl mx-auto flex items-center shadow rounded-lg overflow-hidden"
          >
            <input
              type="text"
              placeholder="Search for news, topics..."
              className="flex-1 px-4 py-3 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="px-6 py-3 bg-blue-600 text-white">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-6 flex gap-3 overflow-x-auto pb-4">
        {[
          { id: "all", name: "All" },
          ...categories,
        ].map((c) => (
          <button
            key={c.id}
            onClick={() => {
              if (c.id === "all") {
                setCategory("general");
                setQuery("");
              } else {
                setCategory(c.id);
                setQuery("");
              }
            }}
            className={`px-4 py-2 rounded-full text-sm ${
              category === c.id || (c.id === "all" && category === "general")
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <main className="container mx-auto px-6 py-10">

        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading…</p>
          </div>
        )}

        {error && (
          <p className="text-center text-red-600 bg-red-100 py-3 rounded">
            Error loading news…
          </p>
        )}

        {!loading && !error && featured && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-16">
            <img
              src={featured.urlToImage || "https://via.placeholder.com/900x450"}
              alt=""
              className="w-full h-72 md:h-96 object-cover"
            />
            <div className="p-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {featured.title}
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                {featured.description || "No description available."}
              </p>
              <Link
                to="/article/0"
                state={{ article: featured }}
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg"
              >
                Read More
              </Link>
            </div>
          </div>
        )}

        <h3 className="text-2xl font-bold mb-6">Recent Articles</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {recent.map((a, i) => (
            <PostCard key={i} article={a} index={i + 1} />
          ))}
        </div>

      </main>

      <footer className="mt-16 bg-white py-10 text-center text-gray-500">
        © {new Date().getFullYear()} NewsToday. All Rights Reserved.
      </footer>

    </div>
  );
}
export default Home;