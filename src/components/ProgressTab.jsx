import clsx from "clsx";

const statusColor = {
  completed: "bg-primary-400 text-white border-primary-400",
  active: "bg-primary-500 text-white border-primary-500",
  upcoming:
    "bg-gray-500 dark:bg-gray-600 text-white border-gray-500 dark:border-gray-600",
};

const connectorColor = {
  completed: "flex-1 h-[3px] bg-primary-400",
  active: "flex-1 h-[3px] bg-primary-500",
  upcoming: "flex-1 h-0.5 bg-gray-300",
};

const ProgressTab = ({ index, step, activeTab, setActiveTab }) => {
  const status =
    step.step === activeTab.step
      ? "active"
      : step.step < activeTab.step
      ? "completed"
      : "upcoming";

  const isClickable =
    step.step < activeTab.step ||
    (step.stepDescription !== "" && step.step !== activeTab.step);

  return (
    <div
      id={step.step}
      key={index}
      onClick={() => {
        if (isClickable) setActiveTab(step);
      }}
      className={`flex flex-col w-full min-w-[150px] items-center text-center relative ${
        isClickable ? "cursor-pointer" : "cursor-not-allowed"
      } `}
    >
      <div className="flex items-center w-full">
        <div
          className={clsx(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border",
            statusColor[status]
          )}
        >
          {step.step}
        </div>
        <div className={clsx(connectorColor[status])} />
      </div>

      {/* Title & Description */}
      <div className="mt-2 w-full items-start">
        <div
          className={`text-start font-medium ${
            status === "active"
              ? "text-primary-500"
              : "text-gray-800 dark:text-gray-300"
          }`}
        >
          {step.title}
        </div>
        <div className="text-sm text-start text-gray-500">
          {step.stepDescription}
        </div>
      </div>
    </div>
  );
};

export default ProgressTab;
