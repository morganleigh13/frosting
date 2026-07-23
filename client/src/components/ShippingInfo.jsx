import { useEffect } from "react";
import { setCheckoutForm } from "../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";

const ShippingInfo = () => {
  const dispatch = useDispatch();

  const { user, authToken } = useSelector((state) => state.auth);


  return (
    <div className="flex flex-col space-y-3">
      <div className="flex space-x-4 mb-5">
        <input
          value={user.checkout?.firstName}
          onChange={(e) =>
            dispatch(
              setCheckoutForm({
                checkout: {
                  ...user.checkout,
                  firstName: e.target.value,
                },
              })
            )
          }
          placeholder="First Name"
          className="text-base-content border-accent border rounded-md text-xl tracking-wider p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          type="text"
        />
        <input
          value={user.checkout?.lastName}
          onChange={(e) =>
            dispatch(
              setCheckoutForm({
                checkout: {
                  ...user.checkout,
                  lastName: e.target.value,
                },
              })
            )
          }
          placeholder="Last Name"
          className="text-base-content border-accent border rounded-md text-xl tracking-wider p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          type="text"
        />
      </div>

      <textarea
        placeholder="Your address"
        value={user.checkout?.shippingAddress?.street}
        onChange={(e) =>
          dispatch(
            setCheckoutForm({
              checkout: {
                ...user.checkout,
                shippingAddress: {
                  ...user.checkout?.shippingAddress,
                  street: e.target.value,
                },
              },
            })
          )
        }
        className="w-full border-accent rounded-md border text-base-content  p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 text-xl tracking-wider"
        id="address"
      ></textarea>
      <div className="mt-4 flex flex-row space-x-4 mb-4 space-y-2">
        <div className="flex-1">
          <input
            value={user.checkout?.shippingAddress?.city}
            onChange={(e) =>
              dispatch(
                setCheckoutForm({
                  checkout: {
                    ...user.checkout,
                    shippingAddress: {
                      ...user.checkout?.shippingAddress,
                      city: e.target.value,
                    },
                  },
                })
              )
            }
            placeholder="Your city"
            className="w-full border-accent rounded-md border text-base-content focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 p-2 text-xl tracking-wider"
            id="city"
            type="text"
          />
        </div>

        <div className="flex-1">
          <select
            value={user.checkout?.shippingAddress?.state}
            onChange={(e) =>
              dispatch(
                setCheckoutForm({
                  checkout: {
                    ...user.checkout,
                    shippingAddress: {
                      ...user.checkout?.shippingAddress,
                      state: e.target.value,
                    },
                  },
                })
              )
            }
            placeholder="Your state"
            className="w-full border-accent rounded-md border text-base-content focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 p-2 text-xl tracking-wider"
            id="state"
            type="text"
          >
            <option value="">Select a State</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="NY">New York</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
          </select>
        </div>
      </div>
      <div className="flex flex-row space-x-4">
        <div className="flex-1">
          <input
            value={user.checkout?.shippingAddress?.zip}
            onChange={(e) =>
              dispatch(
                setCheckoutForm({
                  checkout: {
                    ...user.checkout,
                    shippingAddress: {
                      ...user.checkout?.shippingAddress,
                      zip: e.target.value,
                    },
                  },
                })
              )
            }
            minLength={5}
            maxLength={5}
            placeholder="Your ZIP code"
            className="text-base-content border-accent border rounded-md text-xl tracking-wider p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full"
            id="zip"
            type="text"
          />
        </div>
        <div className="flex-1">
          <input
            value={user.checkout?.phone}
            onChange={(e) =>
              dispatch(
                setCheckoutForm({
                  checkout: {
                    ...user.checkout,
                    phone: e.target.value,
                  },
                })
              )
            }
            placeholder="Phone"
            className="text-base-content border-accent border rounded-md text-xl tracking-wider p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full"
            type="phone"
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
