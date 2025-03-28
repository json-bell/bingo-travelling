import TripButton from "@/components/TripButton";
import Link from "next/link";

const TestPage = ({}) => {
  return (
    <>
      <TripButton />
      <Link href="/">Back to home</Link>
    </>
  );
};

export default TestPage;
