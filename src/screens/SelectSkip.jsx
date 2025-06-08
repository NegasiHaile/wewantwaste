import { useEffect, useState } from "react";
import SkipCard from "../components/SkipCard";
import Button from "../components/Button";
import clsx from "clsx";
import SkipCardSkeleton from "../components/skeletons/SkeletonCard";
import FilterSkips from "../components/FilterSkips";

export default function SelectSkip({ activeTab, handleTabData }) {
  const [selected, setSelected] = useState(activeTab?.data?.id ?? null);
  const [skips, setSkips] = useState([]);
  const [filteredSkips, setFilteredSkips] = useState([]);
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
        setFilteredSkips([...data]);
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
      {/* --------- SKIP SELECTION HEADER --------- */}
      <header className="w-full flex flex-col space-y-3 items-center text-center mb-3">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Select the skip size that best suits your needs
        </h1>

        {/* Filter component for narrowing skip options */}
        <section aria-label="filter skip sizes" className="w-full">
          <FilterSkips skips={skips} setFilteredSkips={setFilteredSkips} />
        </section>
      </header>

      {/* --------- SKIP OPTIONS GRID --------- */}
      <section
        aria-labelledby="skip-options-heading"
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mx-auto pb-5"
      >
        <h2 id="skip-options-heading" className="sr-only">
          Available skip sizes
        </h2>

        {!isLoading
          ? filteredSkips?.map((skip, index) => (
              <SkipCard
                key={index}
                index={index}
                skip={skip}
                selected={selected}
                onSelect={setSelected}
                handleTabData={handleTabData}
              />
            ))
          : Array.from({ length: 6 }).map((_, item) => (
              <SkipCardSkeleton key={item} index={item} />
            ))}
      </section>
    </>
  );
}
