import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const Details = () => {
  const { id } = useParams();
  const [info, setInfo] = useState([]);
  const [borderCountryNames, setBorderCountryNames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${id}?fullText=true`
        );

        if (!response.ok) {
          alert("Check Your Internet Connection!😔😔");
        }

        const jsondata = await response.json();
        setInfo(jsondata);

        if (jsondata.length > 0) {
          const borderNames = await Promise.all(
            jsondata[0].borders.map(async (border) => {
              return await fetchCountryName(border);
            })
          );
          setBorderCountryNames(borderNames);
        } else {
          setBorderCountryNames([]);
        }
      } catch (error) {
        // alert(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, [id]);

  const fetchCountryName = async (code) => {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${code}`
    );
    if (response.ok) {
      const data = await response.json();
      return data[0]?.name?.common || code;
    }
    return code;
  };

  return (
    <section className="w-[1000px] max-w-[90%] dark:bg-[#202c37] dark:text-white mx-auto py-12 flex flex-col items-start">
      <Link to="/Country-Search/">
        <button className="p-2 px-6 shadow-md dark:bg-[#2b3945] dark:text-white rounded-md flex items-center gap-1 text-lg group">
          <ChevronLeft size={25} strokeWidth={1.5} strokeOpacity={0.7} />
          Back
        </button>
      </Link>
      {info.map((inf, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-18 mt-20 w-full"
        >
          <div className="w-full aspect-video md:aspect-[16/10]">
            <img
              src={inf.flags.png}
              alt={inf.flags.alt}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="my-auto">
            <h2 className="text-3xl font-bold">{inf.name.common}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
              <div>
                <p className="text-base font-light">
                  <span className="font-semibold">Native Name:</span>{" "}
                  {Object.values(inf.name.nativeName)[0].common}
                </p>
                <p className="text-base font-light">
                  <span className="font-semibold">Population:</span>{" "}
                  {inf.population.toLocaleString()}
                </p>
                <p className="text-base font-light">
                  <span className="font-semibold">Region:</span> {inf.region}
                </p>

                <p className="text-base font-light">
                  <span className="font-semibold">Sub Region:</span>{" "}
                  {inf.subregion}
                </p>
                <p className="text-base font-light">
                  <span className="font-semibold">Capital:</span> {inf.capital}
                </p>
              </div>

              <div>
                <p className="text-base font-light">
                  <span className="font-semibold">Top Level Domain:</span>{" "}
                  {inf.tld}
                </p>
                <p className="text-base font-light">
                  <span className="font-semibold">Currency:</span>{" "}
                  {Object.values(inf.currencies)[0].name}
                </p>
                <p className="text-base font-light">
                  <span className="font-semibold">Languages:</span>{" "}
                  {Object.values(inf.languages).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-8 mt-12">
              <h4>Border Countries:</h4>
              <div className="flex flex-wrap gap-4">
                {borderCountryNames.length > 0
                  ? borderCountryNames.map((borderName, index) => (
                      <Link
                        to={`/Country-Search/details/${borderName}`}
                        key={index}
                        className="bg-white dark:bg-[#2b3945] dark:text-white shadow-sm px-3 py-1 rounded-md"
                      >
                        {borderName}
                      </Link>
                    ))
                  : `${
                      info[0]?.name?.common || id
                    } does not have border countries.`}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Details;
