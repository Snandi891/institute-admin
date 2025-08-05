import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function OrderProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/students").then((res) => {
      setProducts(res.data);
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
                All students
              </h1>
            </div>
          </div>
        </div>
      </header>

      <hr class="my-2 h-px border-0 bg-gray-300" />

      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {products.length === 0 ? (
          <p>No Products Found</p>
        ) : (
          <div class="">
            <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-4 font-medium text-gray-900"
                  ></th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Name
                  </th>

                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Phone
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    course
                  </th>

                  <th
                    scope="col"
                    class="px-6 py-4 font-medium text-gray-900"
                  ></th>
                  <th
                    scope="col"
                    class="px-6 py-4 font-medium text-gray-900"
                  ></th>
                </tr>
              </thead>
              {products.map((product, index) => (
                <tbody
                  class="divide-y divide-gray-100 border-t border-gray-100"
                  key={product._id}
                >
                  <tr>
                    <th class="px-6 py-4 font-medium text-gray-900">
                      {index + 1}
                    </th>

                    <td class="px-6 py-4 truncate max-w-xs ">{product.name}</td>

                    {/*                   
                    <td class="px-6 py-4 truncate max-w-xs ">
                      <img
                        class=" h-16 w-19 object-contain rounded-full"
                        src={product.images[0]}
                        alt=""
                      />
                    </td> */}
                    <td class="px-6 py-4 truncate max-w-xs">{product.phone}</td>
                    <td class="px-6 py-4 truncate max-w-xs">
                      {product.course}
                    </td>

                    <td class=" gap-4 px-2 py-2 font-medium">
                      <Link
                        href={"/students/delete/" + product._id}
                        className="text-red-500"
                      >
                        Delete
                      </Link>
                    </td>
                    <td class=" gap-4 px-2 py-2 font-medium">
                      <Link
                        href={"/students/edit/" + product._id}
                        class="text-green-700"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        )}
      </div>
    </>
  );
}
