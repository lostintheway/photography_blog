import Head from "next/head";
import Header from "./components/Header";
import FeaturedWorks from "./components/FeaturedWorks";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Head>
        <title>Precious Memories - Professional Photography</title>
        <meta
          name="description"
          content="Precious Memories - Capturing your special moments with professional photography"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow">
        <Hero />
        <FeaturedWorks />
      </main>

      <Footer />
    </main>
  );
}
