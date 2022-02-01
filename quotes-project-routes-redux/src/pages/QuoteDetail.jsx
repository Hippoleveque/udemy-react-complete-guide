import { useParams, Route } from "react-router-dom";
import { Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import { useEffect } from "react";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

// const DUMMY_QUOTES = [
//   { id: "q1", author: "Hippo", text: "Learning react" },
//   { id: "q2", author: "Hippo", text: "Learning react" },
// ];

const QuoteDetail = () => {
  const match = useRouteMatch();
  const { quoteId } = useParams();
  const { sendRequest, status, data: quote } = useHttp(getSingleQuote);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const commentsUrl = `${match.url}/comments`;

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  if (!quote) {
    return <NoQuotesFound />;
  }

  return (
    <>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={commentsUrl}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments quoteId={quoteId} />
      </Route>
    </>
  );
};

export default QuoteDetail;
