import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchSpuByUser } from "../api/product.api";

const SearchModal = ({ onClose }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // debounce search
  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await searchSpuByUser(search);
        setResults(res.data.metadata || []);
      } catch (err) {
        console.error(err);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="fixed inset-0 z-[999]">
      {/* Overlay */}
      <div onClick={onClose} className="absolute inset-0 bg-black/50" />

      {/* Modal */}
      <div className="absolute top-1/2 left-1/2 w-[600px] max-w-[90%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-xl">
        <input
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full text-lg border-b pb-3 focus:outline-none"
        />

        <div className="mt-4 max-h-[400px] overflow-y-auto">
          {results.map((item) => (
            <Link
              key={item._id}
              to={`/san-pham/${item.product_slug}`}
              onClick={onClose}
              className="flex gap-4 p-3 hover:bg-gray-100 rounded-md"
            >
              <img
                src={item.product_thumb?.[0]}
                alt=""
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-medium">{item.product_name}</p>
                <p className="text-sm text-gray-500">
                  {item.product_price?.toLocaleString()}đ
                </p>
              </div>
            </Link>
          ))}

          {search && results.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              Không tìm thấy sản phẩm
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
