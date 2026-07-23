import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/productSlice";
import { updateCart } from "../redux/authSlice";
import SVG from "../assets/svgs/shoppingCart.svg";


export const useBackToTop = () => {
  const [visible, setVisible] = useState(false);
  const threshold = 300; 

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > threshold);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { visible, goToTop };
};


const ProductCard = ({ product, verifyLogin }) => {
  const navigate = useNavigate();
 
  return (
    <div className="relative group product-card rounded-lg overflow-hidden shadow-lg bg-base-200">
      <div className="flex flex-col items-center pt-3">
        <img
          src={
            new URL(`../assets/images/${product.images[0]}`, import.meta.url)
              .href
          }
          alt={product.name}
          className="w-70 h-70 object-cover rounded-xl"
        />
        <h3 className="fancier text-3xl pt-2 font-semibold text-black">
          {product.productName}
        </h3>
      </div>

      <div
        className="fancier 
            absolute inset-0
            bg-neutral bg-opacity-90
            flex flex-col items-center justify-center
            text-center
            px-4
            opacity-0
            group-hover:opacity-100
            transition-opacity duration-500
            z-10          
          "
      >
        <h4 className="text-3xl fancier tracking-wider font-bold mb-2 text-black">
          {product.productName}
        </h4>
        <p className="text-xl tracking-wider mb-1 text-neutral-content px-10">
          {product.description}
        </p>
        <p className="text-lg text-gray-600">{product.material}</p>
        <div className="flex gap-5">
          <button
            onClick={() => navigate(`/${product.slug}`)}
            className="codepen-button cursor-pointer text-neutral-content my-0 mx-auto relative decoration-none font-bold rounded-xl overflow-hidden p-1 w-29 flex justify-items-start items-center gap-10"
          >
            <span className="span relative px-2 py-2 text-xl bg-base-200 rounded-xl h-full">
              <p className="m-0 tracking-wider text-info ">Details</p>
            </span>
          </button>

          <label
            htmlFor="cart-drawer"
            onClick={() => verifyLogin({ product })}
            className="
    codepen-button cursor-pointer text-base-content
    my-0 mx-auto relative decoration-none font-bold rounded-xl
    overflow-hidden p-1 w-16 flex justify-items-start items-center gap-10"
          >
            <span className="relative flex items-center px-4 py-2 text-lg bg-base-200 rounded-xl h-full">
              <p className=""></p>
              <img src={SVG} alt="Cart" className="text-neutral-content" />
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};
const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.products);
  const { authToken } = useSelector((state) => state.auth);
  const params = useParams()
  const { visible, goToTop } = useBackToTop();


  useEffect(() => {
    const getProducts = async () => {
      dispatch(getAllProducts());
    };
    getProducts();
  }, []);

  const filteredProducts = params.jewelry ? products.filter(product => product.type === params.jewelry) : products

  const verifyLogin = ({ product }) => {
    if (authToken) {
      dispatch(updateCart({ product, operation: "add", authToken }));
    } else {
      localStorage.setItem("product", JSON.stringify(product));
      navigate("/login");
    }
  };


  return (
    <div className="p-20 bg-base-100 ">
        {visible && (
          <div className="fixed bottom-4 right-4 rounded-full bg-info text-info-content z-10">
          <button
          onClick={goToTop}
            aria-label="Back to top"
            className="sweet tracking-wider text-2xl cursor-pointer relative after:content-['scroll_to_top'] after:text-base-content after:absolute after:text-nowrap after:scale-0 hover:after:scale-100 after:duration-200 w-10 h-10 rounded-full border border-4 border-sky-200 bg-base-200 flex items-center justify-center duration-300 hover:rounded-[50px] hover:w-36 group/button overflow-hidden active:scale-90"
          >
            <svg
              className="w-3 fill-white delay-50 duration-200 group-hover/button:-translate-y-12"
              viewBox="0 0 384 512"
            >
              <path
                d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
              ></path>
            </svg>
          </button>
          </div>
  
    )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-15">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} verifyLogin={verifyLogin} />
        ))}
      </div>
    </div>
  );
};

export default Products;
