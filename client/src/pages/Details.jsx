import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../redux/productSlice";
import { updateCart } from "../redux/authSlice";

const Details = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.products);
  const { authToken } = useSelector((state) => state.auth);

  const reviewColors = [
    "accent",
    "info",
    "primary",
    "error",
    "success",
    "neutral",
  ];

  useEffect(() => {
    const getDetail = async () => {
      if (params.productSlug) {
        dispatch(getProductDetails({ slug: params.productSlug }));
      }
    };
    getDetail();
  }, [params.productSlug]);

  useEffect(() => {}, []);

  const verifyLogin = ({ product }) => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(updateCart({ product, operation: "add", authToken: token }));
    } else {
      localStorage.setItem("product", JSON.stringify(product));
      navigate("/login");
    }
  };

  return (
    <div className="w-screen min-h-200 flex justify-center bg-base-100 p-5 h-fit">
      <div
        className="detail-card bg-base-200 flex justify-center w-1/2 shadow-[0_3px_10px_rgba(0,0,0,0.2)] relative border rounded-2xl pb-10
min-h-[200]"
      >
        <div className="flex flex-col pt-10 pb-20 items-center justify-start text-center w-full absolute h-fit">
          <h3 className="lg:text-7xl text-5xl fancier pb-6 text-accent/90 font-bold tracking-wider">
            {product.productName}
          </h3>
          <img
            src={
              new URL(`../assets/images/${product?.images[0]}`, import.meta.url)
                .href
            }
            alt="picture"
            className="2xl:h-90 2xl:w-100 lg:h-80 md:h-60 sm:h-50 xs:h-40 rounded-xl mb-2 transition-transform duration-200  hover:scale-150 sm:hover:scale-150 md:hover:scale-100 ease-in-out"
          />
          <div className="w-9/10 py-5 fancy tracking-widest">
            <p className="sm:text-3xl text-lg pb-2 text-base-content">
              {product.description}.
            </p>
            <div className="flex gap-5 justify-center pb-2 items-center text-success">
              <p className="text-2xl">{product.material}</p>
              <p className="text-md">
                {product.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
            </div>
            <div className="text-xl font-bold tracking-widest sweet flex gap-4 justify-center">
              <label
                htmlFor="cart-drawer"
                aria-label="close sidebar"
                className="drawer-overlay text-green-400"
                onClick={() => verifyLogin({ product })}
              >
                Add To Cart
              </label>
              <p className="text-rose-400" onClick={() => navigate(-1)}>
                Keep Shopping
              </p>
           
              <label
                className=" text-green-400 font-extrabold"
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </label>
            </div>
            <p className="text-sm mt-2">
              {" "}
              Serial Number:{" "}
              <span className="text-info text-xs">{product.id}</span>
            </p>
       
          </div>
        </div>

        <div
          className="details bg-base-100 w-full absolute bottom-0 h-12 
          transition-all duration-500 ease-in-out
          p-[0.4em] ps-2 overflow-hidden"
        >
          <label className="text-neutral font-bold tracking-wider text-3xl justify-self-center flex pb-2 sweet underline">
            Reviews
          </label>
          {product.reviews.map((review, index) => (
            <div
              key={index}
              className={`text-${
                reviewColors[index % reviewColors.length]
              } text-2xl px-5 pb-1 sweet`}
            >
              <ul className="ps-1 tracking-wider">
                <li className="list-disc">{review}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
