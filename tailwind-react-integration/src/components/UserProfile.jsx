function UserProfile() {
  return (
    <div className="bg-gray-100 sm:p-4 md:p-8 max-w-xs md:max-w-sm mx-auto my-20 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <img
        src="https://randomuser.me/api/portraits/men/75.jpg"
        alt="User"
        className="rounded-full sm:w-24 sm:h-24 md:w-36 md:h-36 mx-auto ring-4 ring-blue-200 shadow-md hover:scale-110 transition-transform duration-300 ease-in-out"
      />
      <h1 className="text-lg md:text-xl text-blue-800 my-4 font-semibold tracking-wide text-center hover:text-blue-500 transition-colors duration-300 ease-in-out">
        John Doe
      </h1>
      <p className="text-sm md:text-base text-gray-600 leading-relaxed text-center">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
      <div className="mt-6 flex justify-center">
        <button className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300">
          Follow
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
