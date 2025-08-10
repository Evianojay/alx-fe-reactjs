function UserProfile() {
  return (
    <div className="bg-gray-100 p-8 max-w-sm mx-auto my-20 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <img
        src="https://randomuser.me/api/portraits/men/75.jpg"
        alt="User"
        className="rounded-full w-36 h-36 mx-auto ring-4 ring-blue-200 shadow-md"
      />
      <h1 className="text-xl text-blue-800 my-4 font-semibold tracking-wide text-center">
        John Doe
      </h1>
      <p className="text-gray-600 text-base leading-relaxed text-center">
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
