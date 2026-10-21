import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main>
      <section aria-labelledby="not-found-title">
        <h1 id="not-found-title">404 — Page not found</h1>
        <p>The page you’re looking for doesn’t exist or may have moved.</p>
        <Link to="/">Return to home</Link>
      </section>
    </main>
  );
}
