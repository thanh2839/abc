import * as React from "react";
import { FeatureCard, FeatureCardProps } from "./FetureCard";

const features: FeatureCardProps[] = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/9d70bfdb8e9b0b2777ba3288ce0870e65dedcdf81ac9ddacb2b1f86d0113e119?apiKey=107937b03e68408b93e8f13d8a143773&",
    title: "Large Assortment",
    description: "we offer many different types of products with fewer variations in each category."
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/9dc7eebbed141148a4ffe099fef8fcfe75fda6f4fb79047ef0e2f26e6427f7b9?apiKey=107937b03e68408b93e8f13d8a143773&",
    title: "Fast & Free Shipping",
    description: "4-day or less delivery time, free shipping and an expedited delivery option."
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/85c45b6913dd48b27921255460e87b68e7c508c4917f40ed6f252461ebeb19d8?apiKey=107937b03e68408b93e8f13d8a143773&",
    title: "24/7 Support",
    description: "answers to any business related inquiry 24/7 and in real-time."
  }
];

export function AboutFeature() {
  return (
    <main className="flex overflow-hidden flex-col items-center px-20 pb-40 bg-white max-md:px-5 max-md:pb-24">
      <section className="flex flex-col items-center max-md:max-w-full">
        <div className="flex flex-col items-center max-md:max-w-full">
          <h1 className="text-3xl font-bold text-stone-900">About us</h1>
          <p className="mt-3 text-lg font-medium text-stone-900 text-opacity-50 max-md:max-w-full">
            Order now and appreciate the beauty of nature
          </p>
        </div>
        <div className="flex flex-wrap gap-6 items-start mt-12 text-lg max-md:mt-10 max-md:max-w-full">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>
    </main>
  );
}