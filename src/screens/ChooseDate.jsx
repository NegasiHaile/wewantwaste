import React from "react";

const ChooseDate = () => {
  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Choose Your Delivery Date</h2>
        <p className="text-gray-400 mt-2">
          Select your preferred skip delivery date.{" "}
        </p>
        <p className="text-gray-400 mt-2">
          We'll aim to deliver between 7am and 6pm on your chosen day.
        </p>
      </div>
    </div>
  );
};

export default ChooseDate;
