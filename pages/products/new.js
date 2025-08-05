import Product from "@/component/Product";

export default function NewProduct() {
  return (
    <>
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between py-3">
        <div>
          <p className="mt-1.5 text-md text-gray-500">
            Let create a new product!
          </p>
        </div>
      </div>

      <hr class="my-2 h-px border-0 bg-gray-300" />
      <div className="my-10">
        <Product />
      </div>
    </>
  );
}
