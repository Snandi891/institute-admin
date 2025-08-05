import Product from "@/component/Product";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [productInfo, setProductInfo] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get("/api/products?id=" + id).then((response) => {
        setProductInfo(response.data);
      });
    }
  }, [id]);
  return (
    <>
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between py-3">
        <div>
          <p className="mt-1.5 text-md text-gray-500">
            Editing {productInfo?.title}
          </p>
        </div>
      </div>

      <hr class="my-2 h-px border-0 bg-gray-300" />
      <div className="my-10">{productInfo && <Product {...productInfo} />}</div>
    </>
  );
}
