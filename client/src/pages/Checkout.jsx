import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Stepper, { Step } from "../components/react-bits/Stepper";
import { setCheckoutForm, updateCart } from "../redux/authSlice";
import { createOrder, successState } from "../redux/orderSlice";
import VerifyCode from "../components/VerifyCode";
import CreditCard from "../components/CreditCard";
import ShippingInfo from "../components/ShippingInfo";
import toast from "react-hot-toast";
import moment from "moment";

const Checkout = () => {
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [last4Digits, setLast4Digits] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, authToken } = useSelector((state) => state.auth);
  const { success, order } = useSelector((state) => state.orders);
  useEffect(() => {
    console.log(user)
        //This will set the user and shippingAddress to checkout in authSLice on load
        if (!user.checkout || Object.keys(user.checkout).length === 0) {
          const initialCheckout = {         
              firstName: user.firstName,
              lastName: user.lastName,
              phone: user.phone,
          
            shippingAddress: {
              street: user.address?.street ?? "",
              city: user.address?.city ?? "",
              state: user.address?.state ?? "",
              zip: user.address?.zip ?? "",
            },
            payment: {
              street: user.address?.street ?? "",
              city: user.address?.city ?? "",
              state: user.address?.state ?? "",
              zip: user.address?.zip ?? "",
            },
          };
          dispatch(setCheckoutForm({ checkout: initialCheckout }));
        }
      }, [user]);

  useEffect(() => {
    const date = moment(order.date).format("LL");
    const time = moment(order.date).format("hh:mm");
    if (success === "order created") {
      toast.success(
        `Your order was placed on ${date} at ${time}. Go to your dashboard for more details. Order number ${order.id}.`
      );
      dispatch(successState());
      dispatch(
        updateCart({
          operation: "checkout",
          authToken,
        })
      );
      navigate("/dashboard");
      
    }
  }, [success]);

  const checkLuhn = (cardNo) => {
    let s = 0;
    let doubleDigit = false;
    for (let i = cardNo.length - 1; i >= 0; i--) {
      let digit = +cardNo[i];
      if (doubleDigit) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      s += digit;
      doubleDigit = !doubleDigit;
    }
    return s % 10 == 0;
  };

  const validateCardNo = (no) => {
    return (
      (no &&
        checkLuhn(no) &&
        no.length == 16 &&
        (no[0] == 4 ||
          (no[0] == 5 && no[1] >= 1 && no[1] <= 5) ||
          no.indexOf("6011") == 0 ||
          no.indexOf("65") == 0)) ||
      (no.length == 15 && (no.indexOf("34") == 0 || no.indexOf("37") == 0)) ||
      (no.length == 13 && no[0] == 4)
    );
  };

  const handleCreditCard = (e) => {
    let error = user.checkout.error || [];
    // If card number is valid
    if (validateCardNo(e.target.value)) {
      dispatch(
        setCheckoutForm({
          checkout: {
            ...user.checkout,
            error: error.filter((error) => error !== "creditCard"),
          },
        })
      );
    } else {
      dispatch(
        setCheckoutForm({
          checkout: { ...user.checkout, error: [...error, "creditCard"] },
        })
      );
    }
  };

  const subtotal = useMemo(
    () =>
      user.cart?.reduce((acc, item) => acc + item.price * item.quantity, 0) ??
      0,
    [user.cart]
  );

  const shippingCost = useMemo(() => {
    const costs = { ground: 5, UPS: 10, FEDEX: 15 };
    return costs[user.checkout?.shipping?.shippingOptions] ?? 0;
  }, [user.checkout?.shipping?.shippingOptions]);

  const promo = useMemo(() => {
    const rates = { new: 0.1, frost: 0.25 };
    const rate = rates[user.checkout?.payment?.promoCode ?? ""] ?? 0;
    return rate * subtotal; // will be 0 if rate is 0
  }, [user.checkout?.payment?.promoCode, subtotal]);

  const icing = useMemo(() => {
    const subtotalWithPromo = subtotal - promo;
    const extraDiscount =
      subtotalWithPromo > 200000
        ? subtotal * 0.05
        : subtotalWithPromo > 300000
        ? subtotal * 0.07
        : subtotalWithPromo > 400000
        ? subtotal * 0.09
        : 0;
    return extraDiscount;
  }, [subtotal, promo]);

  const grandTotal = useMemo(
    () => subtotal + shippingCost - promo - icing,
    [subtotal, shippingCost, promo, icing]
  );

  return (
    <div className="overflow-hidden">
      <Stepper
        initialStep={1}
        onStepChange={(step) => {
          setCurrentStep(step);
        }}
        nextButtonProps={{
          // Disable the button only on step 3 until verified NOT WORKING???
          disabled: !isCodeVerified && currentStep === 4,
        }}
        onFinalStepCompleted={() => {
          const { checkout } = user;

          dispatch(
            setCheckoutForm({
              checkout: { ...checkout },
            })
          );

          const orderPayload = {
            user: {
              ...user,
              phone: checkout.phone,
              id: user._id,
            },
            shippingAddress: checkout.shippingAddress,
            shipping: {
              company: checkout.shipping.shippingOptions,
              cost: shippingCost,
            },
            payment: {
              ...checkout.payment,
              subtotal,
              promo,
              icing,
              total: grandTotal,
            },
            items: user.cart,
            authToken,
          };
          if (orderPayload.items.length > 0) {
            dispatch(createOrder(orderPayload));
          }
        }}
        backButtonText="Previous"
        nextButtonText="Next"
      >
        <Step>
          <div className="flex flex-col items-center justify-center pb-2">
            <div className="w-full max-w-xl rounded-lg shadow-md p-6 sweet">
              <h2 className="text-4xl font-bold text-base-content mb-6">
                Shipping Information
              </h2>
              <ShippingInfo />
            </div>
          </div>
        </Step>

        <Step>
          <div className="flex flex-col items-center justify-center pb-3">
            <h2 className="text-4xl font-bold text-neutral sweet">
              Credit Card Information
            </h2>
            <CreditCard
              part="first"
              setLast4Digits={setLast4Digits}
              handleCreditCard={handleCreditCard}
            />
          </div>
        </Step>
        <Step>
        <div className="flex flex-col items-center justify-center pb-3">
            <h2 className="text-4xl font-bold text-neutral sweet">
              Billing Address
            </h2>
          <CreditCard
            part="second"
            setLast4Digits={setLast4Digits}
            handleCreditCard={handleCreditCard}
          />
          </div>
        </Step>
        <Step>
          <div className="verification-form sweet flex items-center justify-center w-full ms-10">
            <div className="text-center">
              <span className="text-info text-4xl font-bold">
                Two-Factor Verification
              </span>
              <p className="my-3 text-xl fancy">
                Enter the last four digits of your credit card number for
                authentication
              </p>
            </div>
            <div className="input-fields flex items-center justify-center gap-2">
              <VerifyCode
                last4={last4Digits}
                onSuccess={() => setIsCodeVerified(true)}
              />
            </div>
          </div>
        </Step>

        <Step>
          <h2 className="text-5xl tracking-wider flex justify-center fancy mb-5">
            Verify order and submit
          </h2>
          <div className="flex flex-col gap-5 h-100 overflow-y-scroll">
            {user.cart?.map((item) => (
              <div className="flex justify-around items-center tracking-wider">
                <div className="flex gap-5">
                  <img
                    src={
                      new URL(
                        `../assets/images/${item?.images[0]}`,
                        import.meta.url
                      ).href
                    }
                    alt=""
                    className="size-20"
                  />
                  <div className="flex flex-col">
                    <p className="text-3xl sweet text-accent">
                      {item.productName}
                    </p>
                    <p className="text-md sweet text-info">
                      quantity: {item.quantity} @{" "}
                      {item.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                    <p className="text-2xl sweet text-success">
                      {(item.quantity * item.price).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    dispatch(
                      updateCart({
                        product: item,
                        operation: "delete",
                        authToken,
                      })
                    );
                  }}
                  className="btn btn-ghost text-error hover:btn-dash"
                >
                  Delete
                </button>
              </div>
            ))}
            <div className="flex flex-col gap-3 ms-2">
              <p className="text-3xl text-rose-400 fancy tracking-widest">
                Items in cart...
                {user.cart?.reduce((sum, { quantity }) => sum + quantity, 0)}
              </p>

              <select
                value={user.checkout?.shipping?.shippingOptions}
                onChange={(e) =>
                  dispatch(
                    setCheckoutForm({
                      checkout: {
                        ...user.checkout,
                        shipping: {
                          ...user.checkout?.shipping,
                          shippingOptions: e.target.value,
                        },
                      },
                    })
                  )
                }
                className="select select-sm w-1/3 text-xl sweet focus:ring-purple-400"
              >
                <option value="">Shipping Options</option>
                <option value="ground">Ground ($5.00)</option>
                <option value="UPS">UPS ($10.00)</option>
                <option value="FEDEX">FedEx ($15.00)</option>
              </select>
              <label className="input w-3/8">
                <input
                  value={user.checkout?.payment?.promoCode}
                  onChange={(e) =>
                    dispatch(
                      setCheckoutForm({
                        checkout: {
                          ...user.checkout,
                          payment: {
                            ...user.checkout?.payment,
                            promoCode: e.target.value,
                          },
                        },
                      })
                    )
                  }
                  type="text"
                  className="grow"
                  placeholder="Promo Code"
                />
                <span className="badge badge-neutral badge-xs rounded-2xl">
                  Optional
                </span>
              </label>
            </div>
            <div className="flex flex-col items-end pe-3 sweet">
              <p className="text-2xl text-info">
                SubTotal:{" "}
                <span className="text-success">
                  {subtotal?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </p>
              <p className="text-2xl text-info">
                Shipping:{" "}
                <span className="text-success">
                  {shippingCost.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </p>
              <p className="text-2xl text-info">
                Promo: -
                <span className="text-success">
                  {promo?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </p>
              <p className="text-2xl text-info">
                Icing: -
                <span className="text-success">
                  {icing?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </p>
              <p className="text-2xl text-info">
                Total:{" "}
                <span className="text-success">
                  {grandTotal.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </p>
            </div>
          </div>
        </Step>
      </Stepper>
    </div>
  );
};

export default Checkout;
