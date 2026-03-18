import React from "react";

export default function Premium() {
  return (
    <div className="w-[52%] min-h-screen border-x border-gray-200 relative left-80 bg-white text-black flex flex-col items-center">

      {/* Header */}
      <div className="w-full p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold">Choose your plan</h1>
        <p className="text-gray-500 text-sm mt-1">
          Upgrade anytime to unlock premium features
        </p>
      </div>

      {/* Cards Container */}
      <div className="mt-10 flex gap-6 w-[90%] justify-center">

        {/* FREE PLAN */}
        <div className="w-1/2 border border-gray-200 rounded-2xl p-6 bg-white hover:shadow-md transition">
          <h2 className="text-lg font-semibold">Free</h2>
          <p className="text-gray-500 text-sm mt-1">
            Basic access for everyone
          </p>

          <div className="mt-6">
            <span className="text-3xl font-bold">₹0</span>
            <span className="text-gray-500"> / month</span>
          </div>

          <ul className="mt-6 space-y-3 text-sm text-gray-700">
            <li>✅ Basic feed access</li>
            <li>✅ Limited news viewing</li>
            <li>✅ Standard profile</li>
            <li>❌ No AI features</li>
            <li>❌ Ads included</li>
          </ul>

          <button className="mt-8 w-full border border-gray-300 py-2 rounded-xl hover:bg-gray-100 transition">
            Current Plan
          </button>
        </div>

        {/* PREMIUM PLAN */}
        <div className="w-1/2 border-2 border-blue-500 rounded-2xl p-6 bg-white shadow-md relative hover:scale-105 transition">

          {/* Badge */}
          <div className="absolute top-3 right-3 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
            Most Popular
          </div>

          <h2 className="text-lg font-semibold">Pulse Premium 💎</h2>
          <p className="text-gray-500 text-sm mt-1">
            For power users & creators
          </p>

          <div className="mt-6">
            <span className="text-3xl font-bold">₹199</span>
            <span className="text-gray-500"> / month</span>
          </div>

          <ul className="mt-6 space-y-3 text-sm text-gray-700">
            <li>✅ Ad-free experience</li>
            <li>✅ Full news access</li>
            <li>✅ PulseAI smart responses</li>
            <li>✅ Priority support</li>
            <li>✅ Advanced profile features</li>
          </ul>

          <button className="mt-8 w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition">
            Upgrade 🚀
          </button>
        </div>

      </div>

      {/* Footer */}
      <div className="mt-10 text-sm text-gray-500">
        Cancel anytime • Secure payments
      </div>

    </div>
  );
}