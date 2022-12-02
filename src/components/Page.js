import Footer from './footer/Footer.js';

const Page = ({ title, children }) => {
  return (
    <div>
      <head>
        <title>{title}</title>
        <meta
          httpEquiv='Content-Security-Policy'
          content='upgrade-insecure-requests'
        ></meta>
      </head>

      <body>{children}</body>

      <Footer />
    </div>
  );
};

export default Page;
