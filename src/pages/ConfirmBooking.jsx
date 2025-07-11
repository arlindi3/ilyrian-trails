import { useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
// import { FaStar } from "react-icons/fa";
import {
  tourPackages,
  housesData,
  speedBoatData,
  fishingGuides,
  atvGuides,
  carRentals,
  horsebackGuides,
} from "../data/dummyData";
import React, { useState } from "react";

const ConfirmBooking = () => {
  const { type, id } = useParams();

  // Combine all services into one array
  const allServices = [
    ...(tourPackages || []),
    ...(housesData || []),
    ...(speedBoatData || []),
    ...(fishingGuides || []),
    ...(carRentals || []),
    ...(atvGuides || []),
    ...(horsebackGuides || []),
  ];

  const service = allServices.find(
    (item) => String(item.id) === String(id) && item.type === type
  );
  const [selectedImg, setSelectedImg] = useState(service?.gallery?.[0] || "");
  const mainImgRef = React.useRef(null);

  const handleGalleryImgClick = (img) => {
    setSelectedImg(img);
    setTimeout(() => {
      if (mainImgRef.current) {
        mainImgRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 50);
  };

  if (!service) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl px-8 py-12 text-center">
          <span className="text-5xl mb-4 block">😕</span>
          <div className="text-2xl font-bold text-red-500 mb-2">
            Service not found.
          </div>
          <p className="text-gray-500 dark:text-gray-300">
            Please check the link or browse our services.
          </p>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    const phoneNumber = "355692311606";
    const message = encodeURIComponent(
      `Hello, I would like to book the "${service.name}" in ${
        service.location || ""
      }.`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  // Render different layouts or extra info for specific service types
  // Custom layout for houses
  if (service.type === "house") {
    return (
      <div className="min-h-screen pt-24 px-4 md:px-10 pb-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row gap-8">
            <img
              ref={mainImgRef}
              src={selectedImg || service.image}
              alt={service.name}
              className="w-full md:w-2/3 h-[400px] object-cover rounded-3xl shadow-xl border-4 border-gray-200 dark:border-gray-700"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-extrabold mb-2">{service.name}</h1>
                <div className="flex items-center gap-2 text-lg mb-2">
                  <FaMapMarkerAlt className="text-2xl" />
                  <span>{service.location}</span>
                </div>
                <div className="mb-4">
                  <span className="font-semibold text-lg">
                    €{service.price}
                  </span>{" "}
                  <span className="text-xs">/night</span>
                </div>
                <p className="text-lg">{service.description}</p>
              </div>
              <button
                className="mt-8 bg-primary hover:bg-primary text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg transition-all"
                onClick={handleBooking}
              >
                Book House on WhatsApp
              </button>
              <p className="mt-2 text-base">
                You will be redirected to WhatsApp to complete your booking.
              </p>
            </div>
          </div>
          {service.gallery && (
            <div>
              <h2 className="text-xl font-bold mb-2">Gallery</h2>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {service.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleGalleryImgClick(img)}
                    className={`rounded-xl overflow-hidden border-2 transition-all duration-200 shadow-sm ${
                      selectedImg === img
                        ? "border-emerald-500 scale-105 ring-2 ring-emerald-300"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    aria-label={`Select gallery image ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="w-24 h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-8">
            {service.included && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Amenities</h3>
                <ul className="space-y-2">
                  {service.included.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {service.notIncluded && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Not Included</h3>
                <ul className="list-disc list-inside space-y-2">
                  {service.notIncluded.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Custom layout for speedboats (already present below)
  if (service.type === "boat" || service.type === "fishing") {
    return (
      <div className="min-h-screen pt-24 px-4 md:px-10 pb-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row gap-8">
            <img
              ref={mainImgRef}
              src={
                selectedImg ||
                (service.gallery && service.gallery.length > 0
                  ? service.gallery[0]
                  : service.image)
              }
              alt={service.name}
              className="w-full md:w-2/3 h-[400px] object-cover rounded-3xl shadow-xl border-4 border-gray-200 dark:border-gray-700"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-extrabold mb-2">{service.name}</h1>
                <div className="flex items-center gap-2 text-lg mb-2">
                  <FaMapMarkerAlt className="text-2xl" />
                  <span>{service.location}</span>
                </div>
                <div className="mb-4 flex flex-col gap-1">
                  {/* Show group prices if available */}
                  {service.price_1_4_persons && (
                    <div>
                      <span className="font-semibold text-lg">
                        €{service.price_1_4_persons}
                      </span>{" "}
                      <span className="text-xs">/1-4 persons</span>
                    </div>
                  )}
                  {service.price_5_8_persons && (
                    <div>
                      <span className="font-semibold text-lg">
                        €{service.price_5_8_persons}
                      </span>{" "}
                      <span className="text-xs">/5-8 persons</span>
                    </div>
                  )}
                  {/* Fallback to single price */}
                  {!service.price_1_4_persons && service.price && (
                    <div>
                      <span className="font-semibold text-lg">
                        €{service.price}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-lg">{service.description}</p>
                {service.boatTypes && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-1">Boat Types:</h3>
                    <ul className="flex flex-wrap gap-2">
                      {service.boatTypes.map((boat, idx) => (
                        <li
                          key={idx}
                          className="bg-blue-100 dark:bg-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {boat}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <button
                className="mt-8 bg-primary hover:bg-primary text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg transition-all"
                onClick={handleBooking}
              >
                Book Now on WhatsApp
              </button>
              <p className="mt-2 text-base">
                You will be redirected to WhatsApp to complete your booking.
              </p>
            </div>
          </div>
          {service.gallery && (
            <div>
              <h2 className="text-xl font-bold mb-2">Gallery</h2>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {service.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleGalleryImgClick(img)}
                    className={`rounded-xl overflow-hidden border-2 transition-all duration-200 shadow-sm ${
                      selectedImg === img
                        ? "border-emerald-500 scale-105 ring-2 ring-emerald-300"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    aria-label={`Select gallery image ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="w-24 h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
              {/* Show all videos if present as array or single string */}
              {service.type === "boat" && service.videos && (
                <div className="mt-4 flex flex-row flex-wrap gap-4 justify-center">
                  {(Array.isArray(service.videos)
                    ? service.videos
                    : [service.videos]
                  ).map(
                    (videoUrl, idx) =>
                      videoUrl && (
                        <div
                          key={idx}
                          className="w-[140px] sm:w-[160px] md:w-[180px]"
                        >
                          <video
                            controls
                            className="w-full rounded-xl shadow"
                            style={{ maxHeight: 110, objectFit: "contain" }}
                          >
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          <div className="text-center text-xs mt-2 text-gray-500 dark:text-gray-300">
                            Speed Boat Video
                            {Array.isArray(service.videos) &&
                            service.videos.length > 1
                              ? ` ${idx + 1}`
                              : ""}
                          </div>
                        </div>
                      )
                  )}
                </div>
              )}
            </div>
          )}
          {/* Itinerary for speed boat tours */}
          {service.type === "boat" && service.itinerary && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <span className="inline-block w-2 h-6 bg-emerald-400 rounded-full mr-2"></span>
                Itinerary
              </h2>
              <ul className="space-y-4">
                {service.itinerary.map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <span className="font-semibold min-w-[80px]">
                      {item.time}
                    </span>
                    <span>{item.activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-8">
            {service.included && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Included</h3>
                <ul className="space-y-2">
                  {service.included.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {service.notIncluded && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Not Included</h3>
                <ul className="list-disc list-inside space-y-2">
                  {service.notIncluded.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Custom layout for fishing guides
  if (service.type === "fishing") {
    return (
      <div className="min-h-screen pt-24 px-4 md:px-10 pb-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row gap-8">
            <img
              ref={mainImgRef}
              src={selectedImg || service.image}
              alt={service.name}
              className="w-full md:w-2/3 h-[400px] object-cover rounded-3xl shadow-xl border-4 border-blue-200 dark:border-blue-700"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-extrabold mb-2">{service.name}</h1>
                <div className="flex items-center gap-2 text-lg mb-2">
                  <FaMapMarkerAlt className="text-2xl" />
                  <span>{service.location}</span>
                </div>
                <div className="mb-4">
                  <span className="font-semibold text-lg">
                    €{service.price_1_4 || service.price}
                  </span>{" "}
                  <span className="text-xs">/1-4 persons</span>
                  {service.price_5_8_persons && (
                    <>
                      <span className="mx-2">|</span>
                      <span className="font-semibold text-lg">
                        €{service.price_5_8_persons}
                      </span>{" "}
                      <span className="text-xs">/5-8 persons</span>
                    </>
                  )}
                </div>
                <p className="text-lg">{service.description}</p>
                {service.fishTypes && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-1">Fish Types:</h3>
                    <ul className="flex flex-wrap gap-2">
                      {service.fishTypes.map((fish, idx) => (
                        <li
                          key={idx}
                          className="bg-blue-100 dark:bg-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {fish}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <button
                className="mt-8 bg-primary hover:bg-primary text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg transition-all"
                onClick={handleBooking}
              >
                Book Fishing Guide on WhatsApp
              </button>
              <p className="mt-2 text-base">
                You will be redirected to WhatsApp to complete your booking.
              </p>
            </div>
          </div>
          {service.gallery && (
            <div>
              <h2 className="text-xl font-bold mb-2">Gallery</h2>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {service.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleGalleryImgClick(img)}
                    className={`rounded-xl overflow-hidden border-2 transition-all duration-200 shadow-sm ${
                      selectedImg === img
                        ? "border-emerald-500 scale-105 ring-2 ring-emerald-300"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    aria-label={`Select gallery image ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="w-24 h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-8">
            {service.included && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Included</h3>
                <ul className="space-y-2">
                  {service.included.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {service.notIncluded && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Not Included</h3>
                <ul className="list-disc list-inside space-y-2">
                  {service.notIncluded.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Custom layout for ATV guides
  if (service.type === "atv") {
    return (
      <div className="min-h-screen pt-24 px-4 md:px-10 pb-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row gap-8">
            <img
              ref={mainImgRef}
              src={selectedImg || service.image}
              alt={service.name}
              className="w-full md:w-2/3 h-[400px] object-cover rounded-3xl shadow-xl border-4 border-orange-200 dark:border-orange-700"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-extrabold mb-2">{service.name}</h1>
                <div className="flex items-center gap-2 text-lg mb-2">
                  <FaMapMarkerAlt className="text-2xl" />
                  <span>{service.location}</span>
                </div>
                <div className="mb-4">
                  <span className="font-semibold text-lg">
                    €{service.price}
                  </span>{" "}
                  <span className="text-xs">/tour</span>
                </div>
                <p className="text-lg">{service.description}</p>
                {service.route && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-1">Route:</h3>
                    <p>{service.route}</p>
                  </div>
                )}
              </div>
              <button
                className="mt-8 bg-primary hover:bg-primary text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg transition-all"
                onClick={handleBooking}
              >
                Book ATV Tour on WhatsApp
              </button>
              <p className="mt-2 text-base">
                You will be redirected to WhatsApp to complete your booking.
              </p>
            </div>
          </div>
          {service.gallery && (
            <div>
              <h2 className="text-xl font-bold mb-2">Gallery</h2>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {service.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(img)}
                    className={`rounded-xl overflow-hidden border-2 transition-all duration-200 shadow-sm ${
                      selectedImg === img
                        ? "border-emerald-500 scale-105 ring-2 ring-emerald-300"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    aria-label={`Select gallery image ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="w-24 h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-8">
            {service.included && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Included</h3>
                <ul className="space-y-2">
                  {service.included.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {service.notIncluded && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Not Included</h3>
                <ul className="list-disc list-inside space-y-2">
                  {service.notIncluded.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Custom layout for car rentals
  if (service.type === "car") {
    return (
      <div className="min-h-screen pt-24 px-4 md:px-10 pb-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row gap-8">
            <img
              ref={mainImgRef}
              src={selectedImg || service.image}
              alt={service.name}
              className="w-full md:w-2/3 h-[400px] object-cover rounded-3xl shadow-xl border-4 border-gray-200 dark:border-gray-700"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-extrabold mb-2">{service.name}</h1>
                <div className="flex items-center gap-2 text-lg mb-2">
                  <FaMapMarkerAlt className="text-2xl" />
                  <span>{service.location}</span>
                </div>
                <div className="mb-4">
                  <span className="font-semibold text-lg">
                    €{service.price}
                  </span>{" "}
                  <span className="text-xs">/day</span>
                </div>
                <p className="text-lg">{service.description}</p>
                {service.carType && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-1">Car Type:</h3>
                    <span>{service.carType}</span>
                  </div>
                )}
                {service.seats && (
                  <div>
                    <span className="font-semibold">Seats:</span>{" "}
                    {service.seats}
                  </div>
                )}
              </div>
              <button
                className="mt-8 bg-primary hover:bg-primary text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg transition-all"
                onClick={handleBooking}
              >
                Book Car on WhatsApp
              </button>
              <p className="mt-2 text-base">
                You will be redirected to WhatsApp to complete your booking.
              </p>
            </div>
          </div>
          {service.gallery && (
            <div>
              <h2 className="text-xl font-bold mb-2">Gallery</h2>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {service.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleGalleryImgClick(img)}
                    className={`rounded-xl overflow-hidden border-2 transition-all duration-200 shadow-sm ${
                      selectedImg === img
                        ? "border-emerald-500 scale-105 ring-2 ring-emerald-300"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    aria-label={`Select gallery image ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="w-24 h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-8">
            {service.included && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Included</h3>
                <ul className="space-y-2">
                  {service.included.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {service.notIncluded && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Not Included</h3>
                <ul className="list-disc list-inside space-y-2">
                  {service.notIncluded.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Custom layout for horseback riding guides
  if (service.type === "horseback") {
    return (
      <div className="min-h-screen pt-24 px-4 md:px-10 pb-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row gap-8">
            <img
              ref={mainImgRef}
              src={selectedImg || service.image}
              alt={service.name}
              className="w-full md:w-2/3 h-[400px] object-cover rounded-3xl shadow-xl border-4 border-yellow-200 dark:border-yellow-700"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-extrabold mb-2">{service.name}</h1>
                <div className="flex items-center gap-2 text-lg mb-2">
                  <FaMapMarkerAlt className="text-2xl" />
                  <span>{service.location}</span>
                </div>
                <div className="mb-4">
                  <span className="font-semibold text-lg">
                    €{service.price}
                  </span>{" "}
                  <span className="text-xs">/tour</span>
                </div>
                <p className="text-lg">{service.description}</p>
                {service.horseTypes && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-1">Horse Types:</h3>
                    <ul className="flex flex-wrap gap-2">
                      {service.horseTypes.map((horse, idx) => (
                        <li
                          key={idx}
                          className="bg-yellow-100 dark:bg-yellow-800 px-3 py-1 rounded-full text-sm"
                        >
                          {horse}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <button
                className="mt-8 bg-primary hover:bg-primary text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg transition-all"
                onClick={handleBooking}
              >
                Book Horseback Tour on WhatsApp
              </button>
              <p className="mt-2 text-base">
                You will be redirected to WhatsApp to complete your booking.
              </p>
            </div>
          </div>
          {service.gallery && (
            <div>
              <h2 className="text-xl font-bold mb-2">Gallery</h2>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {service.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleGalleryImgClick(img)}
                    className={`rounded-xl overflow-hidden border-2 transition-all duration-200 shadow-sm ${
                      selectedImg === img
                        ? "border-emerald-500 scale-105 ring-2 ring-emerald-300"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    aria-label={`Select gallery image ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="w-24 h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-8">
            {service.included && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Included</h3>
                <ul className="space-y-2">
                  {service.included.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {service.notIncluded && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Not Included</h3>
                <ul className="list-disc list-inside space-y-2">
                  {service.notIncluded.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Example: Custom layout for speed boats
  if (service.type === "speedboat") {
    // Assume service.price_1_4 and service.price_5_8_persons are the prices for 1-4 and 5-8 persons
    return (
      <div className="min-h-screen pt-24 px-4 md:px-10 pb-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row gap-8">
            <img
              ref={mainImgRef}
              src={
                selectedImg ||
                (service.gallery && service.gallery.length > 0
                  ? service.gallery[0]
                  : service.image)
              }
              alt={service.name}
              className="w-full md:w-2/3 h-[400px] object-cover rounded-3xl shadow-xl border-4 border-gray-200 dark:border-gray-700"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-extrabold mb-2">{service.name}</h1>
                <div className="flex items-center gap-2 text-lg mb-2">
                  <FaMapMarkerAlt className="text-2xl" />
                  <span>{service.location}</span>
                </div>
                <div className="mb-4 flex flex-col gap-1">
                  <div>
                    <span className="font-semibold text-lg">
                      €{service.price_1_4_persons}
                    </span>{" "}
                    <span className="text-xs">/1-4 persons</span>
                  </div>
                  {service.price_5_8_persons && (
                    <div>
                      <span className="font-semibold text-lg">
                        €{service.price_5_8_persons}
                      </span>{" "}
                      <span className="text-xs">/5-8 persons</span>
                    </div>
                  )}
                </div>
                <p className="text-lg">{service.description}</p>
                {service.boatTypes && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-1">Boat Types:</h3>
                    <ul className="flex flex-wrap gap-2">
                      {service.boatTypes.map((boat, idx) => (
                        <li
                          key={idx}
                          className="bg-blue-100 dark:bg-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {boat}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <button
                className="mt-8 bg-primary hover:bg-primary text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg transition-all"
                onClick={handleBooking}
              >
                Book Now on WhatsApp
              </button>
              <p className="mt-2 text-base">
                You will be redirected to WhatsApp to complete your booking.
              </p>
            </div>
          </div>
          {service.gallery && (
            <div>
              <h2 className="text-xl font-bold mb-2">Gallery</h2>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {service.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleGalleryImgClick(img)}
                    className={`rounded-xl overflow-hidden border-2 transition-all duration-200 shadow-sm ${
                      selectedImg === img
                        ? "border-emerald-500 scale-105 ring-2 ring-emerald-300"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    aria-label={`Select gallery image ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="w-24 h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-8">
            {service.included && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Included</h3>
                <ul className="space-y-2">
                  {service.included.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {service.notIncluded && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Not Included</h3>
                <ul className="list-disc list-inside space-y-2">
                  {service.notIncluded.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default layout for other services (tours, guides, etc.)
  return (
    <div className="min-h-screen pt-24 px-4 md:px-10 pb-16 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
              {service.name}
            </h1>
            {service.location && (
              <div className="flex items-center gap-2 text-lg">
                <FaMapMarkerAlt className="text-2xl" />
                <p className="font-medium">{service.location}</p>
              </div>
            )}
          </div>
          {/* {(service.rating || service.number_of_reviews) && (
            <div className="flex items-center gap-3 bg-white dark:bg-gray-800 px-5 py-2 rounded-full shadow">
              {service.rating && (
                <FaStar className="text-yellow-400 text-2xl" />
              )}
              {service.rating && (
                <span className="text-xl font-bold">{service.rating}</span>
              )}
              {service.number_of_reviews && (
                <span className="text-sm">
                  ({service.number_of_reviews} reviews)
                </span>
              )}
            </div>
          )} */}
        </div>

        {/* Main Image & Gallery */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Image */}
          <div className="md:col-span-2 rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-200 dark:border-gray-700 relative">
            <img
              ref={mainImgRef}
              src={selectedImg || service.image}
              alt="Selected"
              className="w-full h-[420px] object-cover object-center transition-all duration-300"
            />
            {service.price && (
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 px-4 py-1 rounded-full shadow font-semibold text-lg">
                €{service.price}{" "}
                <span className="text-xs font-normal">/person</span>
              </div>
            )}
          </div>
          {/* Gallery */}
          {service.gallery && (
            <div className="flex flex-col gap-4">
              <div className="flex gap-3 overflow-x-auto pb-2">
                {service.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleGalleryImgClick(img)}
                    className={`rounded-xl overflow-hidden border-2 transition-all duration-200 shadow-sm ${
                      selectedImg === img
                        ? "border-emerald-500 scale-105 ring-2 ring-emerald-300"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    aria-label={`Select gallery image ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="w-24 h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow text-center">
                <span className="font-semibold text-lg">
                  {service.gallery.length} Photos
                </span>
              </div>
              {/* Video */}
              {service.video && (
                <div className="mt-4">
                  <video
                    controls
                    className="w-full rounded-xl shadow"
                    style={{ maxHeight: 200 }}
                  >
                    <source src={service.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="text-center text-sm mt-2 text-gray-500 dark:text-gray-300">
                    Place Video
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Description & Ethics */}
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <span className="inline-block w-2 h-6 bg-emerald-500 rounded-full mr-2"></span>
              About
            </h2>
            <p className="text-lg leading-relaxed">{service.description}</p>
          </div>
          {/* Optional: Show Ethics only for tours/guides */}
          {service.itinerary && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <span className="inline-block w-2 h-6 bg-yellow-400 rounded-full mr-2"></span>
                Ethical Commitment
              </h2>
              <ul className="space-y-4">
                <li>
                  <b>Respect for Local Culture:</b> Our guides foster cultural
                  understanding and encourage respectful interactions with local
                  communities.
                </li>
                <li>
                  <b>Environmental Responsibility:</b> We minimize our
                  environmental impact by following Leave No Trace principles
                  and supporting eco-friendly practices.
                </li>
                <li>
                  <b>Fair Compensation:</b> All guides and local partners are
                  paid fairly and work in safe, supportive conditions.
                </li>
                <li>
                  <b>Inclusivity:</b> We welcome travelers of all backgrounds
                  and strive to make our tours accessible and enjoyable for
                  everyone.
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Itinerary */}
        {service.itinerary && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <span className="inline-block w-2 h-6 bg-emerald-400 rounded-full mr-2"></span>
              Itinerary
            </h2>
            <ul className="space-y-4">
              {service.itinerary.map((item, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <span className="font-semibold min-w-[80px]">
                    {item.time}
                  </span>
                  <span>{item.activity}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Info Boxes */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Included */}
          {service.included && (
            <div className="bg-white dark:bg-gray-800 p-7 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Included
              </h3>
              <ul className="space-y-2">
                {service.included.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Not Included */}
          {service.notIncluded && (
            <div className="bg-white dark:bg-gray-800 p-7 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-red-400 rounded-full"></span>
                Not Included
              </h3>
              <ul className="list-disc list-inside space-y-2">
                {service.notIncluded.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick Info & Group Pricing */}
          <div className="bg-white dark:bg-gray-800 p-7 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <span className="inline-block w-2 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></span>
              Quick Info
            </h3>
            <div className="flex flex-col sm:flex-row sm:gap-4 gap-2 text-lg mb-4 w-full text-center">
              {service.duration && (
                <span>
                  <span className="font-semibold">Duration:</span>{" "}
                  {service.duration}
                </span>
              )}
              {service.language && (
                <span>
                  <span className="font-semibold">Language:</span>{" "}
                  {service.language}
                </span>
              )}
            </div>
            {/* Group Pricing */}
            {(service.price_2_person ||
              service.price_3_person ||
              service.price_4_person) && (
              <div className="w-full">
                <h4 className="text-lg font-semibold mb-2 text-center">
                  Group Pricing
                </h4>
                <div className="flex flex-col xs:flex-row sm:flex-row justify-center gap-2">
                  {[2, 3, 4].map((num) => (
                    <div
                      key={num}
                      className="bg-white dark:bg-gray-800 rounded-xl px-3 py-2 shadow border border-gray-200 dark:border-gray-700 flex flex-col items-center min-w-[60px]"
                    >
                      <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {num} {num === 1 ? "Person" : "People"}
                      </span>
                      <span className="font-bold text-lg">
                        {service[`price_${num}_person`]
                          ? `€${service[`price_${num}_person`]}`
                          : "-"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="text-center pt-6">
          <button
            className="bg-primary hover:bg-primary text-white px-12 py-5 rounded-full text-xl font-bold shadow-2xl transition-all tracking-wide  hover:scale-105"
            onClick={handleBooking}
          >
            Book Now on WhatsApp
          </button>
          <p className="mt-4 text-base">
            You will be redirected to WhatsApp to complete your booking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;
