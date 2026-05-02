import { useState, useRef, useEffect } from "react";

export default function OTPVerification({ onVerify }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 4) {
      alert("Enter 4 digit OTP");
      return;
    }

    onVerify?.(finalOtp);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white from-white-100 to-blue-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center w-80">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          OTP Verification
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Enter the 4-digit code sent to you
        </p>

        <div className="flex justify-center gap-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              maxLength={1}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-14 h-14 text-center text-xl font-semibold border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-semibold transition"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}
