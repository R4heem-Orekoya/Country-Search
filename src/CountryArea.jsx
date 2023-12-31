import React from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const CountryArea = ({ data, loading }) => {

  if(loading){
    return <p className="pt-20 text-[#2b3945] dark:text-white"><Loader2 size={100} strokeWidth={2} className="animate-spin duration-100 mx-auto"/></p>
  }
  return (
    <>
      <section className="w-[1000px] max-w-[90%] mx-auto pb-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((count, index) => (
          <div key={index} className="bg-white dark:bg-[#2b3945] dark:text-white shadow-md rounded-md">
            <Link to={`/Country-Search/details/${count.name.common}`}>
              <img
                src={count.flags.png}
                alt={count.flags.alt}
                loading="lazy"
                className="w-full rounded-t-md  aspect-video object-cover"
              />
            </Link>
            <div className="p-4">
              <h2 className="text-lg font-bold">{count.name.common}</h2>

              <ul className="mt-4">
                <li className="text-sm font-light">
                  Population: {count.population.toLocaleString()}
                </li>
                <li className="text-sm font-light">Region: {count.region}</li>
                <li className="text-sm font-light">Capital: {count.capital}</li>
              </ul>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default CountryArea;
