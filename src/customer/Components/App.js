import algoliasearch from "algoliasearch/lite";
import React, { useEffect, useRef, useState } from "react";
import {
  Configure,
  HierarchicalMenu,
  Hits,
  HitsPerPage,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
  SortBy,
  ToggleRefinement,
  Highlight,
  Snippet,
} from "react-instantsearch";

import {
  AlgoliaSvg,
  ClearFilters,
  ClearFiltersMobile,
  NoResults,
  NoResultsBoundary,
  Panel,
  PriceSlider,
  Ratings,
  ResultsNumberMobile,
  SaveFiltersMobile,
} from "./components";
import { ScrollTo } from "./components/ScrollTo";
// import getRouting from "./routing";
import { formatNumber } from "./utils";
import "./Theme.css";
import "./App.css";
import "./components/Pagination.css";
import "./App.mobile.css";
import { useNavigate } from "react-router-dom";
import HeaderTop from "./Navbar/HeaderTop";
import Navigation from "./Navbar/Navigation";
// import Spinner from "./Spinners/Spinner";

const searchClient = algoliasearch(
  "3BP6P78G2Y",
  "1903a10f4bc35dca44f99e43d8c51a99"
);

const indexName = "Target";
// const routing = getRouting(indexName);

export function App() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const searchBoxRef = useRef(null);

  // React.useEffect(() => {
  //   const handleScroll = () => {
  //     const headerBottom = headerRef?.current?.getBoundingClientRect().bottom;

  //     if (headerBottom < 0 && window.innerWidth >= 900) {
  //       if (searchBoxRef.current) {
  //         searchBoxRef.current.style.position = "fixed";
  //         searchBoxRef.current.style.top = "65px";
  //         // searchBoxRef.current.style.left = "0";
  //         // searchBoxRef.current.style.width = "100%";
  //         // searchBoxRef.current.style.zIndex = "1000";
  //         // searchBoxRef.current.style.background = "#fbc300";
  //         searchBoxRef.current.style.boxShadow = "0 4px 4px rgba(0, 0, 0, 0.1)";
  //         searchBoxRef.current.style.padding = "0.5rem 1rem";
  //         searchBoxRef.current.style.transition = "transform 0.3s ease-in-out";
  //       }
  //     } else {
  //       if (searchBoxRef.current) {
  //         searchBoxRef.current.style.position = "static";
  //         searchBoxRef.current.style.boxShadow = "none";
  //       }
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  function openFilters() {
    document.body.classList.add("filtering");
    window.scrollTo(0, 0);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("click", onClick);
  }

  function closeFilters() {
    document.body.classList.remove("filtering");
    containerRef.current.scrollIntoView();
    window.removeEventListener("keyup", onKeyUp);
    window.removeEventListener("click", onClick);
  }

  function onKeyUp(event) {
    if (event.key !== "Escape") {
      return;
    }

    closeFilters();
  }

  function onClick(event) {
    if (event.target !== headerRef.current) {
      return;
    }

    closeFilters();
  }

  return (
    <div className="mt-0">
        <HeaderTop />
        <Navigation />
      <InstantSearch
        searchClient={searchClient}
        indexName={indexName}
        // routing={routing}
        insights={true}
      >
        <header className="header" ref={headerRef}>
          <p className="header-logo">{/* <AlgoliaSvg /> */}</p>
          <div ref={searchBoxRef}>
            <SearchBox
              placeholder="Categories, price, color, …"
              submitIconComponent={SubmitIcon}
            />
          </div>
        </header>

        <Configure
          attributesToSnippet={["description:10"]}
          snippetEllipsisText="…"
          removeWordsIfNoResults="allOptional"
        />

        <ScrollTo>
          <main className="container" ref={containerRef}>
            <div className="container-wrapper">
              <section className="container-filters" onKeyUp={onKeyUp}>
                <div className="container-header">
                  <h2>Filters</h2>
                  <div className="clear-filters" data-layout="mobile">
                    <ResultsNumberMobile />
                  </div>
                </div>
                <div className="container-body">
                  <Panel header="Price">
                    <PriceSlider attribute="masterData.current.masterVariant.prices.value.centAmount" />
                  </Panel>
                  <Panel header="Gender">
                    <RefinementList attribute="Gender" />
                  </Panel>

                  <Panel header="Categories">
                    <RefinementList
                      attribute="category"
                      showMore
                    />
                  </Panel>
                  <Panel header="Stock">
                    <RefinementList
                      attribute="masterData.current.masterVariant.availability.isOnStock"
                      showMore
                    />
                  </Panel>
                  {/* <Panel header="Gender">
                    <RefinementList attribute="facetValues.name" />
                  </Panel>
                  <Panel header="Refinement Options">
                    <RefinementList attribute="optionGroups.name" />
                  </Panel>

                  <Panel header="Category">
                    <HierarchicalMenu
                      attributes={[
                        "masterData.current.categories.name",
                        "masterData.current.categories.parent.name",
                      ]}
                    />
                  </Panel> */}

                  {/* <Panel header="Ratings">
                  <Ratings attribute="rating" />
                </Panel> */}
                </div>
              </section>
              <footer className="container-filters-footer" data-layout="mobile">
                <div className="container-filters-footer-button-wrapper">
                  <ClearFiltersMobile containerRef={containerRef} />
                </div>
                <div className="container-filters-footer-button-wrapper">
                  <SaveFiltersMobile onClick={closeFilters} />
                </div>
              </footer>
            </div>
            <section className="container-results">
              <header className="container-header container-options ">
                {/* <SortBy
                  className="container-option bg-white text-gray-700 py-3 px-5 rounded-lg shadow-lg transition transform hover:scale-105 hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  items={[
                    { label: "Sort by Featured", value: indexName },
                    { label: "Price Ascending", value: `${indexName}_price_asc` },
                    { label: "Price Descending", value: `${indexName}_price_desc` },
                  ]}
                  defaultRefinement={indexName}
                /> */}
                <HitsPerPage
                  className="container-option bg-white text-gray-700 py-3 px-5 rounded-lg shadow-lg transition transform hover:scale-105 hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  items={[
                    { label: "16 hits per page", value: 16, default: true },
                    { label: "32 hits per page", value: 32 },
                    // { label: "64 hits per page", value: 64 },
                  ]}
                />
              </header>
            
              <NoResultsBoundary fallback={<NoResults />}>
                <Hits hitComponent={Hit} />
              </NoResultsBoundary>
              <footer className="container-footer">
                <Pagination padding={2} showFirst={false} showLast={false} />
              </footer>
            </section>
          </main>
        </ScrollTo>
        <aside data-layout="mobile">
          <button
            className="filters-button"
            data-action="open-overlay"
            onClick={openFilters}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 14">
              <path
                d="M15 1H1l5.6 6.3v4.37L9.4 13V7.3z"
                stroke="#fff"
                strokeWidth="1.29"
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Filters
          </button>
        </aside>
      </InstantSearch>
    </div>
  );
}

function SubmitIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 18 18"
      aria-hidden="true"
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.67"
        transform="translate(1 1)"
      >
        <circle cx="7.11" cy="7.11" r="7.11" />
        <path d="M16 16l-3.87-3.87" />
      </g>
    </svg>
  );
}
function Hit({ hit }) {
  const navigate = useNavigate();
  const [number, setNumber] = useState(null);

  const handleProduct = (product) => {
    const objectId = product.objectID;
    console.log("Object ID stored:", objectId);
  
    // Save object ID to localStorage
    localStorage.setItem("objectId", objectId);
  
    // Redirect to the product details page
    navigate(`/product/${product.id}`);
  };

  useEffect(() => {
    const min = 2;
    const max = 5;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setNumber(randomNumber);
  }, []);

  // Format the categories properly
  const formatCategories = (categories) => {
    if (!categories) return "No category";
    
    // Check if categories is an array of objects with typeId and id
    if (Array.isArray(categories) && categories.length > 0) {
      return "Furniture"; // Using a default since we can't access the actual category names
    }
    
    return String(categories);
  };

  // Safely get the product name
  const getProductName = () => {
    if (hit.masterData?.current?.name) {
      // First try to get the English name
      if (hit.masterData.current.name["en-US"]) {
        return hit.masterData.current.name["en-US"];
      }
      // Then try to get name with "en" key
      if (hit.masterData.current.name["en"]) {
        return hit.masterData.current.name["en"];
      }
      // If none of the above, get the first available name
      const nameKeys = Object.keys(hit.masterData.current.name);
      if (nameKeys.length > 0) {
        return hit.masterData.current.name[nameKeys[0]];
      }
    }
    return "Product Name Not Available";
  };

  // Safely get the product price
  const getProductPrice = () => {
    try {
      if (hit.masterData?.current?.masterVariant?.prices && 
          hit.masterData.current.masterVariant.prices.length > 0) {
        return formatNumber(hit.masterData.current.masterVariant.prices[0].value.centAmount);
      }
    } catch (error) {
      console.error("Error getting price:", error);
    }
    return "N/A";
  };

  // Safely get the product image
  const getProductImage = () => {
    try {
      if (hit.masterData?.current?.masterVariant?.images && 
          hit.masterData.current.masterVariant.images.length > 0) {
        return hit.masterData.current.masterVariant.images[0].url;
      }
    } catch (error) {
      console.error("Error getting image:", error);
    }
    return "https://via.placeholder.com/300";
  };

  // Safely check if product is in stock
  const isInStock = () => {
    try {
      return hit.masterData?.current?.masterVariant?.availability?.isOnStock || false;
    } catch (error) {
      return false;
    }
  };

  return (
    <article className="hit h-[420px] flex flex-col" onClick={() => handleProduct(hit)}>
      {/* Image container with fixed height */}
      <header className="hit-image-container relative h-48 overflow-hidden">
        <img
          src={getProductImage()}
          alt={getProductName()}
          className="hit-image w-full h-full object-cover"
        />
        <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold py-1 px-2 rounded flex items-center">
          {number}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 16 16"
            className="inline-block ml-1"
          >
            <path
              fill="#fff"
              fillRule="evenodd"
              d="M10.472 5.008L16 5.816l-4 3.896.944 5.504L8 12.616l-4.944 2.6L4 9.712 0 5.816l5.528-.808L8 0z"
            />
          </svg>
        </span>
      </header>

      {/* Content container with flex-grow to fill available space */}
      <div className="hit-info-container flex-grow flex flex-col p-3">
        {/* Category with fixed height and ellipsis */}
        <div className="hit-category h-6 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-500">
          {formatCategories(hit.masterData?.current?.categories)}
        </div>

        {/* Product name with fixed height and ellipsis */}
        <div className="h-18 font-medium overflow-hidden">
          <div className="line-clamp-6">
            {getProductName()}
          </div>
        </div>

        {/* Price and rating with fixed height */}
        <footer className="mt-auto">
          <p className="flex items-center h-6">
            <span className="hit-em">$</span>{" "}
            <strong>
              {getProductPrice()}
            </strong>{" "}
            <span className="hit-em hit-rating ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 16 16"
              >
                <path
                  fill="#e2a400"
                  fillRule="evenodd"
                  d="M10.472 5.008L16 5.816l-4 3.896.944 5.504L8 12.616l-4.944 2.6L4 9.712 0 5.816l5.528-.808L8 0z"
                />
              </svg>{' '}
              {hit.rating || 4.5}
            </span>
          </p>
        </footer>

        {/* Stock status and button with fixed height */}
        <footer className="flex items-center justify-between pt-2 mt-2 border-t border-gray-100 h-10">
          {/* Stock status */}
          {isInStock() ? (
            <span className="text-green-600 text-xs font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              In Stock
            </span>
          ) : (
            <span className="text-gray-500 text-xs font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
              </svg>
              Out of Stock
            </span>
          )}
          
          {/* View Details button */}
          <button className="text-sm bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 py-1 px-3 rounded-lg transition-colors duration-300">
            View Details
          </button>
        </footer>
      </div>
    </article>
  );
}