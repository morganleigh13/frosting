import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router";
import { getAllOrders } from "../redux/orderSlice";
import { MdDetails } from "react-icons/md";
import { FcShipped } from "react-icons/fc";
import moment from "moment";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { isLoggedIn, user, authToken } = useSelector((state) => state.auth);
  const { orders, order } = useSelector((state) => state.orders);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);


  return (
    <>
      <div className="flex justify-around p-4 items-center mx-20">
        <h1 className="text-9xl fancier text-info mt-20 px-10 pb-10">
          {user.firstName}'s Orders
        </h1>  
      </div>
    {orders.length > 0 && (

      <div className="flex flex-col items-center justify-center pt-13">
        <ul className="list bg-base-100 rounded-box shadow-md w-3/4">
          {orders
            ?.filter((o) => o.user.id === user._id)
            .map((order) => {
              const date = moment(order.shipping.date).format("LL");
              let daysToAdd = 0;
              switch (order.shipping.company.toUpperCase()) {
                case "GROUND":
                  daysToAdd = 10;
                  break;
                case "UPS":
                  daysToAdd = 5;
                  break;
                case "FEDEX":
                  daysToAdd = 1;
                  break;
              }

              return (
             

                <li key={order.id} className="list-row mx-20 space-y-5">
                  <div className="me-3">
                    <img
                      className="size-20 rounded-box"
                      src={
                        new URL(
                          `../assets/images/${order.items[0].images[0]}`,
                          import.meta.url
                        ).href
                      }
                    />
                  </div>
                  <div>
                    <div className="text-primary text-xl">
                      Ordered On: {date}
                    </div>
                    <div>Total Items: {order.items.length}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">
                      Shipping Method: {order.shipping.company}
                    </div>
                  </div>

                  <div className="tooltip me-3" data-tip="Details Page">
                    <Link
                      to={`/orders/${order.id}`}
                      className="btn btn-square btn-ghost"
                    >
                      <MdDetails className="size-20" />
                    </Link>
                  </div>
                  <div
                    className="tooltip"
                    data-tip={`Delivery Date ${moment(order.shipping.date)
                      .add(daysToAdd, "days")
                      .format("LL")}`}
                  >
                    <button className="btn btn-square btn-ghost">
                      <FcShipped className="size-20" />
                    </button>
                  </div>
                </li>
               
              );
            })}
        </ul>
      </div>
    )}
    </>
  );
};

export default Dashboard;
