import clsx from "clsx";
import Button from "./Button";

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
          ? "border-primary-400 bg-primary-50 dark:bg-yellow-600/20 dark:border-primary-400/20"
          : "border-gray-200 bg-white dark:border-gray-700 hover:border-primary-400",
        className
      )}
    >
      {/* ---------- CARD CONTENT START ---------- */}
      <div className="p-6 flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {skip.size} Yard Skip
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {skip.hire_period_days}-day hire
          </p>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-lg font-semibold text-primary-400 dark:text-primary-400">
              £{skip.price_before_vat} + VAT ({skip.vat}%)
            </p>
            {skip.allowed_on_road && (
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                ✓ Can be placed on road
              </p>
            )}
            {skip.allows_heavy_waste && (
              <p className="text-xs text-gray-600 dark:text-gray-400">
                🏋️‍♂️ Suitable for heavy waste
              </p>
            )}
            {skip.forbidden && (
              <p className="text-xs text-red-500 dark:text-red-400 font-medium">
                🚫 Cannot be used in this area
              </p>
            )}
          </div>

          <Button
            className="rounded-full"
            variant={isSelected ? "default" : "outline"}
            onClick={() => {
              onSelect(skip.id);
              handleTabData(`${skip.size} Yard Skip`, skip);
            }}
            disabled={skip.forbidden}
          >
            {isSelected ? "✓ Selected" : "Select"}
          </Button>
        </div>
      </div>
      {/* ---------- CARD CONTENT END ---------- */}
    </div>
  );
};

export default SkipCard;
