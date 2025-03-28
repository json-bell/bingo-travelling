"use client";

import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Trip } from "@prisma/client";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    axios
      .get("/api/trips")
      .then(({ data }: { data: Trip[] }) => {
        setTrips(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Fetching trips failed :(", err);
      });
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <a href="test">Add a Trip</a>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2>The Following trips exist already:</h2>
            <ul>
              {trips.map(({ createdAt, destination, id }) => (
                <li key={id}>
                  <h3>Trip to {destination}</h3>
                  <p>Created on the {createdAt.toString()}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
