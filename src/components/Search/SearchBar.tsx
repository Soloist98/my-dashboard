export function SearchBar() {
  return (
    <div className="mx-auto max-w-md px-4 py-4">
      <div className="flex items-center rounded-xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl">
        <span className="mr-2 text-white/50" aria-hidden>
          🔍
        </span>
        <input
          type="search"
          placeholder="搜索应用..."
          className="flex-1 bg-transparent text-white placeholder-white/50 outline-none"
          aria-label="搜索应用"
        />
      </div>
    </div>
  );
}
