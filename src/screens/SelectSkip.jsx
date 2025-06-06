import { useEffect, useState } from "react";
import SkipCard from "../components/SkipCard";
import Button from "../components/Button";
import clsx from "clsx";
import SkipCardSkeleton from "../components/skeletons/SkeletonCard";

export default function SelectSkip({ activeTab, handleTabData }) {
  const [selected, setSelected] = useState(activeTab?.data?.id ?? null);
  const [skips, setSkips] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setIsloading(true); // Start loading

      try {
        const response = await fetch(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data:", data);
        if (!Array.isArray(data)) {
          throw new Error("Expected array but got: " + typeof data);
        }

        setSkips(data);
      } catch (error) {
        console.error("Error fetching skips by location:", error);
      } finally {
        setIsloading(false); // End loading regardless of success or error
      }
    };

    fetchItems();
  }, []);

  return (
    <>
      <div className="w-full felx flex-col items-center mb-6">
        <h1 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-4">
          Select the skip size that best suits your needs
        </h1>

        <p className="text-center"></p>
      </div>

      {/* ---------- SKIP CARDS START ---------- */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
        {!isLoading
          ? skips?.map((skip, index) => (
              <SkipCard
                key={index}
                index={index}
                skip={skip}
                selected={selected}
                onSelect={setSelected}
                handleTabData={handleTabData}
              />
            ))
          : [0, 1, 2, 3, 4].map((item) => {
              return <SkipCardSkeleton key={item} index={item} />;
            })}
      </div>
      {/* ---------- SKIP CARDS END ---------- */}

      <div className="mt-10 flex justify-center items-center mx-auto mb-6">
        <Button
          className={clsx(
            "rounded-full bg-primary-400 text-white hover:bg-primary-500"
          )}
        >
          Load more
        </Button>
      </div>
    </>
  );
}
