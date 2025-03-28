"use client";

import { useState } from "react";
import axios from "axios";

const TripButton = () => {
  const [destination, setDestination] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async () => {
    if (!destination) {
      setError("Destination is required.");
      return;
    }

    setError("");
    setIsLoading(true);
    setSuccessMessage("");

    try {
      await axios.post("/api/trips", { destination });

      // If the request is successful, handle the response
      setSuccessMessage("Destination added successfully!");
      setDestination("");
    } catch (error) {
      // If there's an error, handle it
      if (axios.isAxiosError(error))
        setError(
          error?.response?.data?.error ||
            "An error occurred while creating the trip."
        );
      else throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Destination"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default TripButton;
