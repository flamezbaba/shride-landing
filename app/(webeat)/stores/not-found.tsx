import Header from "@/components/Header";

export default function NotFound() {
  return (
    <div>
      <Header />
      <div className="w-full flex justify-center items-center flex-col px-10 py-20">
        <h1 className="text-xl">404 - Page Not Found</h1>
        <p>Could not find requested resource.</p>
        <a href="/" className="btn mt-5">Return Home</a>
      </div>
    </div>
  );
}
