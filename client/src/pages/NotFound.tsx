const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-5xl text-red-500/90 font-bold">404 Page Not Found</h1>
      <p className="text-neutral-500 text-sm mt-4">
        This page cannot be found, make sure you're on the correct url!
      </p>
    </div>
  );
};

export default NotFound;
