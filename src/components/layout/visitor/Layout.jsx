import Footer from "./Footer";
import Header from "./Header";

export default function VisitorLayout({ children }) {
  return (
    <>
      <Header />
      <div className="bg-[#77E4C8]">{children}</div>
      <Footer />
    </>
  );
}
