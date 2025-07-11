import GuidesCity from "../banners/city-guide.jpg";
// import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { tourPackages } from "../data/dummyData";
import { Explore } from "../components/home";

const CityGuide = () => {
  const handleGuideClick = (city) => {
    console.log("Guide clicked:", city);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-card-dark dark:to-gray-900">
      {/* Banner */}
      <div className="relative h-[28rem] sm:h-[24rem] md:h-[28rem] flex items-center justify-center overflow-hidden mb-6 md:mb-8">
        <img
          src={GuidesCity}
          alt="City Guide Banner"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/80" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight">
            Discover Albania’s Cities
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-white/90 font-medium max-w-2xl">
            Your perfect guide is just a click away.
          </p>
        </div>
      </div>
      <div className="mt-8 px-[3%] md:px-[10%]">
        <div className="pt-10 pb-20">
          <div className="text-center mb-10">
            <h1 className="heading text-4xl md:text-5xl font-extrabold dark:text-white">
              Book Your Guide on the Best Cities in Albania
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              The most searched for cities on Illyrian Trails
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {tourPackages.map(
              ({
                id,
                name,
                type,
                rating,
                image,
                number_of_reviews,
                price,
                description,
              }) => (
                <Link
                  key={id}
                  to={`/${type}/${id}/confirm-booking`}
                  className="bg-white dark:bg-card-dark rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col border border-gray-100 dark:border-gray-800 hover:-translate-y-1 hover:scale-[1.02] transform transition-all block"
                  onClick={() =>
                    handleGuideClick({
                      id,
                      name,
                      rating,
                      image,
                      number_of_reviews,
                      price,
                    })
                  }
                >
                  <div className="relative group">
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-80 object-cover object-center rounded-t-3xl group-hover:brightness-90 transition"
                    />
                    {/* <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/80 px-4 py-1.5 rounded-full flex items-center gap-1 shadow text-base font-semibold">
                      <FaStar className="text-secondaryYellow" />
                      <span className="text-gray-900 dark:text-gray-100">
                        {rating}
                      </span>
                    </div> */}
                  </div>
                  <div className="p-4 flex flex-col flex-1 bg-white dark:bg-card-dark rounded-b-3xl">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {name}
                    </h2>
                    {/* <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-500 dark:text-gray-300 text-xs">
                        {number_of_reviews} reviews
                      </span>
                    </div> */}
                    <div className="flex items-end justify-between flex-1">
                      <div>
                        <span className="text-xl font-extrabold text-primary dark:text-secondary">
                          €{price}
                        </span>
                        <span className="text-xs opacity-80 dark:text-gray-300 ml-1">
                          /Day
                        </span>
                      </div>
                      <span className="btn btn-primary px-4 py-2 rounded-full shadow-lg hover:scale-105 hover:bg-secondaryYellow hover:text-gray-900 transition-all duration-200 font-semibold text-sm">
                        See More
                      </span>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
        <div className="mt-16 rounded-2xl shadow-xl p-8 flex flex-col items-center bg-gradient-to-br from-blue-100 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
          <h2 className="text-3xl font-bold mb-3 text-blue-800 dark:text-white">
            You may also be interested in
          </h2>
          <p className="mb-8 text-gray-600 dark:text-gray-300 max-w-2xl text-center">
            Explore our exclusive packages for a complete and comfortable stay.
            Choose from curated deals that include amenities, local experiences,
            and more to make your trip memorable.
          </p>
          <div className="w-full">
            <Explore />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityGuide;
