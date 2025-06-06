const SkipCardSkeleton = ({ index }) => {
  return (
    <div
      key={index}
      className="animate-pulse transition-all duration-300 transform border-[0.5px] rounded-xl bg-white border-gray-200 dark:bg-gray-800/50 dark:border-gray-700"
    >
      <div className="p-6 flex flex-col gap-4">
        {/* Header */}
        <div>
          <div className="h-5 w-1/3 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-3 w-1/4 bg-gray-200 dark:bg-gray-600 rounded"></div>
        </div>

        {/* Price & Details + Button */}
        <div className="flex justify-between items-end mt-5">
          <div className="space-y-2">
            <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-2.5 w-32 bg-gray-200 dark:bg-gray-600 rounded"></div>
            <div className="h-2.5 w-40 bg-gray-200 dark:bg-gray-600 rounded"></div>
          </div>
          <div className="h-9 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SkipCardSkeleton;
