// src/components/VerifyCode.jsx
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCheckoutForm } from "../redux/authSlice";
import toast from "react-hot-toast";

export default function VerifyCode({ last4, onSuccess }) {
  const [digits, setDigits] = useState(["", "", "", ""]);

  /*  Refs – one per input for focus control */
  const refs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const updateDigit = (index, value) => {
    // value will be a single char (or '' because maxLength=1)
    setDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });

    // Auto‑focus next / previous input
    if (value && index < 3) {
      refs[index + 1].current?.focus();
    } else if (!value && index > 0) {
      refs[index - 1].current?.focus();
    }
  };

  const clearAll = () => {
    setDigits(["", "", "", ""]);
    refs[0].current?.focus();
  };

  const handleVerify = () => {
    const entered = digits.join("");
    if (entered === last4) {
      onSuccess();
      toast.success(`Your credit card was verified. Please confirm your order. 💲💳💸`);
    } else {
      toast.error("❌ Code does not match.");
    }
  };


  return (
    <div className="max-w-2xl p-4 bg-base-100 shadow-md rounded-md">
      <div className="flex justify-center items-center gap-3 mb-4">
        {digits.map((digit, idx) => (
          <input
            key={idx}
            ref={refs[idx]}
            type="tel"
            maxLength="1"
            value={digit}
            onChange={(e) => updateDigit(idx, e.target.value)}
            className="verify-inputs focus:bg-gray-600"
            autoComplete="off"
            inputMode="numeric"
            pattern="[0-9]*"
          />
        ))}
      </div>

      <div className="flex justify-center mt-5 gap-4">
        <button
          type="button"
          onClick={handleVerify}
          className="verify"
          disabled={digits.includes("")}
        >
          Verify
        </button>
        <button onClick={clearAll} type="button" className="clear-button">
          Clear
        </button>
      </div>
    </div>
  );
}
