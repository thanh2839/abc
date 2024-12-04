import * as React from "react";
import { StatisticItem } from "./StatisticItem";
import { SearchBar } from "./SearchBar";

const statistics = [
  { count: "50+", label: "Plant Species" },
  { count: "100+", label: "Customers" }
];

export const HeroSection: React.FC = () => {
  return (
    <main className="overflow-hidden px-9 rounded-3xl bg-emerald-200 bg-opacity-50 max-md:px-5">
      <div className="flex gap-5 max-md:flex-col">
        <section className="flex flex-col w-[44%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col mt-12 w-full max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col w-full max-w-lg max-md:max-w-full">
              <h1 className="text-6xl font-extrabold text-black leading-[64px] max-md:max-w-full max-md:text-4xl max-md:leading-10">
                Buy your dream plants
              </h1>
              <div className="flex gap-10 items-center self-start mt-6 font-medium text-stone-900">
                {statistics.map((stat, index) => (
                  <React.Fragment key={stat.label}>
                    <StatisticItem {...stat} />
                    {index < statistics.length - 1 && (
                      <div className="shrink-0 self-stretch my-auto w-0 h-16 border border-solid bg-stone-900 border-stone-900" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <SearchBar
              placeholder="What are you looking for?"
              iconSrc="https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/229adc9582dcaa42388d32fe5a4222ce99e853ec7fb8b2fcbe2b043c29ce23a9?apiKey=107937b03e68408b93e8f13d8a143773&"
            />
          </div>
        </section>
        <section className="flex flex-col ml-5 w-[56%] max-md:ml-0 max-md:w-full" aria-hidden="true">
          <div className="flex shrink-0 mx-auto max-w-full bg-black bg-opacity-20 h-[512px] rounded-[200px_200px_0px_200px] w-[657px] max-md:mt-1.5" />
        </section>
      </div>
    </main>
  );
};