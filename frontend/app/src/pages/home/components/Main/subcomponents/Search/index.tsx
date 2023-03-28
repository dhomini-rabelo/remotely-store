import { IProductData } from "@/pages/home/types";
import { Product } from "../Product";

export function Search({ search, products }: { search: string, products: IProductData[] }) {
  const filteredProducts = products.filter((product) =>
    `
              ${product.name.toLowerCase()}
              ${product.provider.name.toLowerCase()}
            `.includes(search.toLowerCase()),
  )
    .map((product) => (
      <Product key={product.id} product={product} />
    ))

  return filteredProducts.length ? (
    <main className="mt-10">
      <h2 className="text-1xl font-bold"> Resultados para {`"${search}"`}</h2>
      <div className="grid grid-cols-3 md:grid-cols-2 gap-x-5 sm:flex sm:flex-col mt-3 gap-y-3">
        {products
          .filter((product) =>
            `
              ${product.name.toLowerCase()}
              ${product.provider.name.toLowerCase()}
            `.includes(search.toLowerCase()),
          )
          .map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </div>
    </main>
  ) : (
    <main className="mt-10">
      <h2 className="text-1xl font-bold"> Nenhum resultado para {`"${search}"`}</h2>
    </main>
  )
}