import SearchBar from "./SearchBar";
import StockDashes from "./StockDashes";

export default function Dashboard() {
  return (
    <div className="m-auto">
      <SearchBar />
      <StockDashes />
    </div>
  );
}
