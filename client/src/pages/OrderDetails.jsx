import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails } from "../redux/orderSlice";
import moment from "moment";

const OrderDetails = () => {
  const { authToken, user } = useSelector((state) => state.auth);
  const { order } = useSelector((state) => state.orders);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (params?.orderId) {
      dispatch(getOrderDetails({ orderId: params.orderId, authToken }));
    }
  }, [params.orderId]);

  const date = moment(order.shipping?.date).format("LL");
  console.log(date)
  let daysToAdd = 0;
  switch (order.shipping?.company.toUpperCase()) {
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
  const discounts = (order.payment?.icing + order.payment?.promo)

  return (
    <div className="flex flex-col items-center h-screen">
  
    <div className="order-container relative flex justify-center sweet mt-5 pb-25 w-screen overflow-x-hidden">
      {order && (
        <>
         <div
        data-text="Order"
        style={{ "--r": 15 }}
        className="glass overflow-y-scroll overflow-x-hidden pb-10 w-full"
      >
        <div className="w-5/6 pe-10 flex flex-col">
          <div className="text-accent/80 uppercase tracking-wider font-bold text-3xl">
            Ordered:
          </div>
          <div className="text-info tracking-wider font-bold text-3xl pb-3">
           {date}
          </div>
          <div className="flex flex-wrap justify-start gap-3 w-full pb-3">
            {order?.items?.map((item) => (
              <img key={item.id}                     
      className="w-20 h-20 rounded-box object-cover"
                src={
                  new URL(`../assets/images/${item.images[0]}`, import.meta.url)
                    .href
                }
              />
            ))}
          </div>

          <div className="text-2xl uppercase font-bold tracking-wider text-accent">
            Expected Delivery Date:{" "}
           
          </div>
          <div className="text-2xl font-bold tracking-wider text-info">
         
            {`${moment(order.shipping?.date)
              .add(daysToAdd, "days")
              .format("LL")}`}
          </div>
          <div className="text-2xl uppercase font-bold tracking-wider text-accent">
            Shipping Method:
          </div>
          <div className="text-2xl uppercase font-bold tracking-wider text-info">
             {order.shipping?.company}
          </div>
          <div className="text-2xl uppercase font-bold tracking-wider text-accent">
            Total Items: 
          </div>
          <div className="text-2xl font-bold text-info">
             {order.items?.length}
          </div>
        </div>
      </div>
      <div
        data-text="Shipping Address"
        style={{ "--r": 5 }}
        className="glass  overflow-y-scroll overflow-x-hidden pt-3 pb-10 w-5/6"
      >
        <div className="w-full space-y-3 mx-10">
          <div className="text-2xl uppercase font-bold tracking-wider text-accent">
            NAME:
          </div>
          <div className="text-2xl  font-bold tracking-wider text-success">
           {user.firstName} {user.lastName}
          </div>
          <div className="text-2xl uppercase font-bold tracking-wider text-accent">
            Address:  </div>
          <div className="text-lg  font-bold tracking-wider text-success">
          {order.shippingAddress?.street}       
          </div>
          <div className="text-lg font-bold tracking-wider text-success">
          {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zip}
          </div>
        </div>
      </div>
      <div
        data-text="Payment"
        style={{ "--r": 25 }}
        className="glass  overflow-y-scroll overflow-x-hidden pt-3 pb-10"
      >
         <div className="w-full space-y-3 mx-10">
          <div className="text-2xl uppercase font-bold tracking-wider text-accent">
            Name on card:
          </div>
          <div className="text-2xl contrast-150 font-bold tracking-wider text-primary">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-2xl uppercase font-bold tracking-wider text-accent">
          Billing Address:  </div>
          <div className="text-2xl contrast-150 font-bold tracking-wider text-primary">
          {order.shippingAddress?.street}       
          </div>
          <div className="text-2xl contrast-150 font-bold tracking-wider text-primary">
          {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zip}
          </div>
          <div className="text-2xl uppercase font-bold tracking-wider text-accent">
          Card:
          </div>
          <div className="text-2xl contrast-150 font-bold tracking-wider text-primary">
          {`${order.payment?.cardNumber.slice(0,4)}*******${order.payment?.cardNumber.slice(13,16)}`}</div>
          <div className="text-2xl contrast-150 font-bold tracking-wider text-primary">
           
          </div>
          <div className="text-2xl contrast-150 font-bold tracking-wider text-primary">
           Discounts: {discounts.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
          </div>
          <div className="text-2xl contrast-150 font-bold tracking-wider text-primary">
            Total: {order.payment?.total.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
          </div>
              
        </div>
      </div>
        </>
      )}
      </div>
     
      
     <h1 className="text-7xl tracking-widest text-info contrast-150 font-semibold fancier">Order Details</h1>
     </div>
    
  );
};

export default OrderDetails;
