import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      setCourses(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <header className="bg-white">
        <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-2xl">
                All Courses
              </h1>
              <p className="mt-1.5 text-md text-gray-500">
                Let's create a new course
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                className="inline-flex items-center justify-center gap-1.5 rounded border border-green-200 hover:bg-green-50 px-5 py-3 text-green-900 transition hover:text-green-700 focus:outline-none focus:ring"
                href={"/products/new"}
              >
                <span className="text-md font-medium"> Create Course </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <hr className="my-2 h-px border-0 bg-gray-300" />

      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {courses.length === 0 ? (
          <p>No Courses Found</p>
        ) : (
          <div className="">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 font-medium text-gray-900">#</th>
                  <th className="px-6 py-4 font-medium text-gray-900">Name</th>
                  <th className="px-6 py-4 font-medium text-gray-900">
                    Description
                  </th>
                  <th className="px-6 py-4 font-medium text-gray-900">Price</th>
                  <th className="px-6 py-4 font-medium text-gray-900">
                    Duration
                  </th>
                  <th className="px-6 py-4 font-medium text-gray-900">
                    Format
                  </th>
                  <th className="px-6 py-4 font-medium text-gray-900">Image</th>
                  <th className="px-6 py-4 font-medium text-gray-900">Edit</th>
                  <th className="px-6 py-4 font-medium text-gray-900">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {courses.map((course, index) => (
                  <tr key={course._id}>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">{course.title}</td>
                    <td className="px-6 py-4 truncate max-w-xs">
                      {course.description}
                    </td>
                    <td className="px-6 py-4">₹{formatPrice(course.price)}</td>
                    <td className="px-6 py-4">{course.duration}</td>
                    <td className="px-6 py-4">{course.format}</td>
                    <td className="px-6 py-4">
                      <img
                        className="h-16 w-20 object-contain rounded-md"
                        src={course.images?.[0]}
                        alt="course"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <Link
                        href={`/products/edit/${course._id}`}
                        className="text-green-700"
                      >
                        Edit
                      </Link>
                    </td>
                    <td className="px-2 py-2">
                      <Link
                        href={`/products/delete/${course._id}`}
                        className="text-red-500"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
