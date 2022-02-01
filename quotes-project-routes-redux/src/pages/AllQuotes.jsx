import QuoteList from "../components/quotes/QuoteList";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useEffect } from "react";


const AllQuotes = () => {
  const { sendRequest, data, status } = useHttp(getAllQuotes);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  return <QuoteList quotes={data || []} />;
};

export default AllQuotes;
