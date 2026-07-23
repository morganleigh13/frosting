import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../redux/authSlice";
import diamond from "../assets/images/diamond31.jpg";
import Plus from "../assets/svgs/plus.svg";
import Minus from "../assets/svgs/minus.svg";
import { BsTrash } from "react-icons/bs";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, authToken } = useSelector((state) => state.auth);

  useEffect(() => {
  
  }, [user]);
  const subtotal = user.cart?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="drawer-side">
      <label
        htmlFor="cart-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-primary min-h-full w-80 p-4 gap-3">
        <li className="mt-20">
          <div className="text-primary-content text-2xl sweet font-extrabold flex justify-center tracking-wider">
            Subtotal:{" "}
            {subtotal?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
        </li>
        <li className="mx-auto">
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/checkout")}
              className={` checkout tracking-widest bg-secondary text-secondary-content hover:text-accent fancy`}
            >
              Checkout
              <div className="checkout-star-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z" />
                </svg>
              </div>
              <div className="checkout-star-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z" />
                </svg>
              </div>
              <div className="checkout-star-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M168.5 72l87.5 93 87.5-93-175 0zM383.9 99.1l-72.3 76.9 129 0-56.6-76.9zm50 124.9L78.1 224 256 420.3 433.9 224zM71.5 176l129 0-72.3-76.9-56.6 76.9zm434.3 40.1l-232 256c-4.5 5-11 7.9-17.8 7.9s-13.2-2.9-17.8-7.9l-232-256c-7.7-8.5-8.3-21.2-1.5-30.4l112-152c4.5-6.1 11.7-9.8 19.3-9.8l240 0c7.6 0 14.8 3.6 19.3 9.8l112 152c6.8 9.2 6.1 21.9-1.5 30.4z" />
                </svg>
              </div>
              <div className="checkout-star-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M168.5 72l87.5 93 87.5-93-175 0zM383.9 99.1l-72.3 76.9 129 0-56.6-76.9zm50 124.9L78.1 224 256 420.3 433.9 224zM71.5 176l129 0-72.3-76.9-56.6 76.9zm434.3 40.1l-232 256c-4.5 5-11 7.9-17.8 7.9s-13.2-2.9-17.8-7.9l-232-256c-7.7-8.5-8.3-21.2-1.5-30.4l112-152c4.5-6.1 11.7-9.8 19.3-9.8l240 0c7.6 0 14.8 3.6 19.3 9.8l112 152c6.8 9.2 6.1 21.9-1.5 30.4z" />
                </svg>
              </div>
              <div className="checkout-star-5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z" />
                </svg>
              </div>
              <div className="checkout-star-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z" />
                </svg>
              </div>
            </button>
          </div>
        </li>

        {/* Sidebar content here */}
        {user.cart?.map((item) => (
          <li key={item.id} className="">
            <div className="card w-fit bg-base-100 card-xs shadow-sm">
              <div className="flex justify-end w-full pt-1 z-10">
                <img
                  title="Delete Item"
                  src={new URL(`${diamond}`, import.meta.url).href}
                  className="w-10 h-8 rounded-xl bg-neutral"
                  onClick={() =>
                    dispatch(
                      updateCart({
                        product: item,
                        operation: "delete",
                        authToken,
                      })
                    )
                  }
                />
              </div>
              <div className="card-body -mt-10 items-center text-center">
                <h2 className="card-title text-4xl fancy tracking-widest">
                  {item.productName}
                </h2>
                <img
                  src={
                    new URL(
                      `../assets/images/${item.images[0]}`,
                      import.meta.url
                    ).href
                  }
                  className="w-24"
                />
                <p className="w-62 text-2xl fancy tracking-widest">
                  {item.reviews[0]}
                </p>
                <div className="join">
                  {item.quantity > 1 ? (
                    <button
                      className="btn join-item text-rose-400 text-200"
                      onClick={() =>
                        dispatch(
                          updateCart({
                            product: item,
                            operation: "remove",
                            authToken,
                          })
                        )
                      }
                    >
                      <img
                        src={Minus}
                        alt="minus"
                        className="text-neutral-content"
                      />
                    </button>
                  ) : (
                    <BsTrash
                      onClick={() =>
                        dispatch(
                          updateCart({
                            product: item,
                            operation: "delete",
                            authToken,
                          })
                        )
                      }
                      className="btn join-item w-15 text-rose-500"
                    />
                  )}
                  <button
                    disabled={true}
                    className="btn join-item text-secondary-content bg-content z-100 "
                  >
                    {item.quantity}
                  </button>
                  <button
                    className="btn join-item z-10 text-success"
                    onClick={() =>
                      dispatch(
                        updateCart({
                          product: item,
                          operation: "add",
                          authToken,
                        })
                      )
                    }
                  >
                    <img
                      src={Plus}
                      alt="plus"
                      className="text-neutral-content"
                    />
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
