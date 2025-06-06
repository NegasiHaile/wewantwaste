import clsx from "clsx";
import Button from "./Button";

import skipImage4YD from "../assets/4-Yd-skip.png";
import skipImage6YD from "../assets/6-Yd-skip.webp";
import skipImage8YD from "../assets/8-Yd-skip.png";
import skipImage10YD from "../assets/10-Yd-skip.png";
import skipImage12YD from "../assets/12-Yd-skip.png";
import skipImage14YD from "../assets/14-Yd-skip.png";
import skipImage16YD from "../assets/16-Yd-skip.png";
import skipImage20YD from "../assets/20-Yd-skip.webp";

const images = {
  1: skipImage8YD,
  4: skipImage4YD,
  6: skipImage6YD,
  8: skipImage8YD,
  10: skipImage10YD,
  12: skipImage12YD,
  14: skipImage14YD,
  16: skipImage16YD,
  20: skipImage20YD,
};

const SkipCard = ({
  index,
  skip,
  selected,
  onSelect,
  className,
  handleTabData,
}) => {
  const isSelected = selected === skip.id;

  return (
    <div
      key={index}
      className={clsx(
        "rounded-xl shadow-sm transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg border-[0.5px] dark:bg-gray-800/50",
        isSelected
          ? "border-primary-400 bg-primary-50 dark:bg-yellow-800/20 dark:border-yellow-800/20"
          : "border-gray-200 bg-white dark:border-gray-700 hover:border-primary-400",
        className
      )}
    >
      {/* ---------- CARD CONTENT START ---------- */}
      <div className="p-6 flex flex-row gap-6 items-start">
        {/* LEFT: IMAGE */}
        <img
          src={skip?.imageUrl || images[skip.size] || images[1]}
          alt={`${skip.size} Yard Skip`}
          className="w-32 h-32 object-cover rounded-md border-0 hidden md:block"
        />

        {/* RIGHT: TEXT & BUTTON */}
        <div className="flex flex-col justify-between gap-4 flex-1">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {skip.size} Yard Skip
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {skip.hire_period_days}-day hire
            </p>
          </div>

          <div className="flex justify-between items-end flex-wrap gap-4">
            <div>
              <p className="text-lg font-semibold text-primary-400 dark:text-primary-400">
                £{skip.price_before_vat} + VAT ({skip.vat}%)
              </p>
              {skip.allowed_on_road && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  ✓ Can be placed on road
                </p>
              )}
              {skip.allows_heavy_waste && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  🏋️‍♂️ Suitable for heavy waste
                </p>
              )}
              {skip.forbidden && (
                <p className="text-sm text-red-500 dark:text-red-400 font-medium">
                  🚫 Cannot be used in this area
                </p>
              )}
            </div>

            <Button
              className="rounded-full whitespace-nowrap"
              variant={isSelected ? "default" : "outline"}
              onClick={() => {
                onSelect(skip.id);
                handleTabData(
                  `${skip.size} Yard Skip, ${skip.hire_period_days}-day hire, £${skip.price_before_vat}`,
                  skip
                );
              }}
              disabled={skip.forbidden}
            >
              {isSelected ? "✓ Selected" : "Select"}
            </Button>
          </div>
        </div>
      </div>
      {/* ---------- CARD CONTENT END ---------- */}
    </div>
  );
};

export default SkipCard;
