import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Listings from "./components/Listings";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ListingDetails from "./components/ListingDetails";
import Book from "./components/Book";
function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [listings, setListings] = useState([]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/listing/search?query=${searchTerm}`
        );
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    if (searchTerm) fetchListings();
  }, [searchTerm]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar onSearch={handleSearch} />
          <Categories onCategorySelect={handleCategorySelect} />
          <Listings
            listings={listings}
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
          />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar onSearch={handleSearch} />
          <Login />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Navbar onSearch={handleSearch} />
          <Signup />
        </>
      ),
    },
    {
      path: "/details/:id",
      element: (
        <>
          <Navbar onSearch={handleSearch} />
          <ListingDetails />
        </>
      ),
    },
    {
      path: "/book/:id",
      element: (
        <>
          <Navbar onSearch={handleSearch} />
          <Book />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
