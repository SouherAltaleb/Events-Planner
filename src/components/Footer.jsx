const Footer = () => {
  return (
    <footer className="footer mt-20 w-full bg-cover bg-no-repeat">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between px-6 py-16 sm:gap-8 md:flex-row lg:gap-40">
        {/* nav */}
        <div className="mb-6 flex flex-col gap-2 text-lg font-semibold sm:pt-6 lg:pt-30">
          <span className="mb-2">Navigation</span>
          <a href="/" className="font-normal hover:underline">
            Home
          </a>
          <a href="/upcoming" className="font-normal hover:underline">
            Upcoming
          </a>
          <a href="/addEvent" className="font-normal hover:underline">
            Add Event
          </a>
        </div>

        {/* contact */}
        <div className="mb-6 flex flex-col gap-2 text-lg font-semibold sm:pt-6 lg:pt-30">
          <span className="mb-2">Contact</span>
          <p className="font-normal">Email: info@planzia.com</p>
          <p className="font-normal">Phone: +49 123 456 789</p>
        </div>

        {/* logo */}
        <div className="sm:pt-6 lg:pt-30">
          <img src="/logo.svg" alt="Logo" className="mb-4 w-32" />
          <p className="max-w-sm">
            Creating events that inspire, connect and empower communities.
          </p>
        </div>
      </div>

      <div className="mb-6 w-full justify-center py-4 text-center text-sm">
        © {new Date().getFullYear()} Planzia Company – All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
