
interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Digite pelo menos 2 caracteres..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full p-3 pl-4 pr-10 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
      />
      {searchTerm && (
        <button 
          onClick={() => onSearchChange('')} 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xl bg-transparent border-none cursor-pointer"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;