import Footer from "./Footer";
import Header from "./Header";

export default function VisitorLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-[#77E4C8]">{children}</main>
      <Footer />
    </div>
  );
}
