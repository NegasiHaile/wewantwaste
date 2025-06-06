import { useState } from "react";
import { Home, Truck } from "lucide-react";
import clsx from "clsx";

const skipPlacements = [
  {
    id: "private",
    title: "Private Property",
    subtitle: "Driveway or private land",
    description: "No permit required when placed on your private property",
    icon: Home,
  },
  {
    id: "public",
    title: "Public Road",
    subtitle: "Council or public property",
    description: "Permit required for placement on public roads",
    icon: Truck,
  },
];

export default function PermitCheck({ activeTab, handleTabData }) {
  const [selected, setSelected] = useState(activeTab?.data?.id ?? null);

  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Where will the skip be placed?</h2>
        <p className="text-gray-400 mt-2">
          This helps us determine if you need a permit for your skip
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skipPlacements.map(
          ({ id, title, subtitle, description, icon: Icon }) => {
            const isSelected = selected === id;

            return (
              <div
                key={id}
                onClick={() => {
                  setSelected(id);
                  handleTabData(title, {
                    id,
                    title,
                    subtitle,
                    description,
                    icon: Icon,
                  });
                }}
                className={clsx(
                  "cursor-pointer rounded-xl border-[0.5px] transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg shadow-sm",
                  "p-6 flex flex-col gap-4",
                  "hover:border-primary-400",
                  isSelected
                    ? "border-primary-400 bg-primary-50 dark:bg-yellow-600/20 dark:border-primary-400/20"
                    : "border-gray-200 bg-white dark:bg-gray-800/50 dark:border-gray-700"
                )}
              >
                <div className="flex items-center gap-4">
                  <Icon size={24} className="text-primary-400" />
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {subtitle}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {description}
                </p>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
