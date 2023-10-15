import { Search, ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import CountryArea from "./CountryArea";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const SearchArea = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdown, setDropdown] = useState(false);

  const [country, setCountry] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");

        if (!response.ok) {
          alert("Check Your Internet Connection!😔😔");
        }

        const jsondata = await response.json();
        setData(jsondata);
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const handleSubmit = async (country) => {
    let response;

    try {
      if (country.length === 0) {
        response = await fetch("https://restcountries.com/v3.1/all");
      } else {
        response = await fetch(
          `https://restcountries.com/v3.1/name/${country}?fullText=true`
        );
      }

      if (response.status === 404) {
        alert("Country not found. Please enter a valid country name.");
        return;
      }

      if (!response.ok) {
        alert("Check your connection. 😔😔");
        return;
      }

      const jsondata = await response.json();
      console.log(response.status);
      setData(jsondata);


    } catch (error) {
      throw new Error(error);
    }
  };

  const handleRegionSubmit = async (region) => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/region/${region}`
      );

      if (!response.ok) {
        alert("Check your connection! 😔😔");
      }

      const jsondata = await response.json();
      setData(jsondata);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="w-[1000px] max-w-[90%] mx-auto py-4 my-8 flex justify-between items-start flex-wrap gap-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(country);
          }}
          className="flex items-center w-[400px] h-[56px] max-w-full bg-white dark:bg-[#2b3945] dark:text-white shadow-md rounded-md"
        >
          <Search
            size={20}
            strokeWidth={1.5}
            strokeOpacity={0.4}
            className="ml-4"
          />
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            placeholder="Search for a country..."
            className="ml-4 h-full flex-1 outline-none rounded-md bg-transparent"
          />
        </form>

        <div className="relative flex flex-col gap-4 w-[200px] group">
          <button
            onClick={() => setDropdown(!dropdown)}
            className="w-full h-[56px] bg-white dark:bg-[#2b3945] dark:text-white shadow-md rounded-md flex items-center justify-between px-4 cursor-pointer"
          >
            <p>Filter by region</p>
            <ChevronDown size={20} strokeWidth={1.5} strokeOpacity={0.8} />
          </button>

          <div className={`absolute top-[56px] z-10 w-full pt-2`}>
            <ul
              className={`flex-col gap-2 p-2 bg-white dark:bg-[#2b3945] dark:text-white shadow-lg rounded-md hidden group-hover:flex`}
            >
              {regions.map((region, index) => (
                <li
                  onClick={() => {
                    handleRegionSubmit(region);
                  }}
                  key={index}
                  className="cursor-pointer p-1 px-2 hover:bg-stone-100 dark:hover:bg-[#202c37] rounded-md"
                >
                  {region}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <CountryArea data={data} />
    </>
  );
};

export default SearchArea;
