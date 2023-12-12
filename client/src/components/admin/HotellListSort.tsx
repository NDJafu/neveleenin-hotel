const HotellListSort = () => {
  return (
    <div className="bg-white rounded-xl p-4 text-neutral-700 flex justify-between items-center gap-2.5">
      <div className="font-bold">
        <h3 className="text-lg text-neutral-900 mb-2">Sort by</h3>
        <div className="flex items-center gap-4">
          <select className="outline-none py-1 px-2 border rounded-full">
            <option selected>Ascending</option>
            <option>Descending</option>
          </select>
          <button>Popularity</button>
          <button>Name</button>
          <button>Owner</button>
          <button>Recent</button>
          <button className="text-yellow-500">Disabled</button>
        </div>
      </div>
      <div className="flex gap-1">
        <form className="flex gap-1">
          <input
            className="rounded outline-none py-1 px-2 border border-neutral-700 w-60"
            placeholder="Search"
          />
          <button
            className="py-1 px-3 bg-green-100 text-green-700 rounded font-semibold"
            type="submit"
          >
            Search
          </button>
        </form>
        <button className="py-1 px-3 border rounded border-neutral-700 font-semibold">
          Clear
        </button>
      </div>
    </div>
  );
};

export default HotellListSort;
