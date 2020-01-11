import Posts from "../components/Posts";
import Products from "../components/Products";
import Categories from "../components/Categories";
import Hashtags from "../components/Hashtags";
import "../public/bootstrap/css/bootstrap.min.css";
export default function() {
  return (
    <div>
      <h1>Data:</h1>
      <Posts />
      <Products />
      <Categories />
      <Hashtags />
    </div>
  );
}
