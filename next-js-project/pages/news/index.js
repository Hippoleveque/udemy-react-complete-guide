import Link from "next/link";

const NewsPage = () => {
  return (
    <>
      <h1>News Page</h1>
      <ul>
        <li>
          <Link href="/news/first-article"> First Article </Link>
        </li>
        <li>
          <Link href="/news/second-article"> Second Article </Link>
        </li>
      </ul>
    </>
  );
};

export default NewsPage;
