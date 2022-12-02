import Footer from './footer/Footer.js';

const Page = ({ title, children }) => {
  return (
    <div>
      <header>
        <title>{title}</title>
      </header>

      <body>{children}</body>

      <Footer />
    </div>
  );
};

export default Page;
