import Posts from "../components/Posts";
import Products from "../components/Products";
import Categories from "../components/Categories";
import Hashtags from "../components/Hashtags";
import Nav from "../components/Nav";
import "../public/bootstrap/css/bootstrap.min.css";
export default function() {
  return (
    <div>
      <Nav />

      <Posts />
      <Products />
      <Categories />
      <Hashtags />
    </div>
  );
}
