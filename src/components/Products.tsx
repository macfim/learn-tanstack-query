import { Fragment, useState } from "react";
import { useProduct, useProducts } from "../services/queries";

export default function Products() {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const produtsQuery = useProducts();
  const productQuery = useProduct(selectedProductId);

  return (
    <>
      {produtsQuery.data?.pages.map((group, index) => (
        <Fragment key={index}>
          {group.map((product) => (
            <Fragment key={product.id}>
              <button onClick={() => setSelectedProductId(product.id)}>
                {product.name}
              </button>
              <br />
            </Fragment>
          ))}
        </Fragment>
      ))}
      <br />
      <div>
        <button
          onClick={() => produtsQuery.fetchNextPage()}
          disabled={
            !produtsQuery.hasNextPage || produtsQuery.isFetchingNextPage
          }
        >
          {produtsQuery.isFetchingNextPage
            ? "Loading more..."
            : produtsQuery.hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div>Selected product: </div>
      {JSON.stringify(productQuery.data)}
    </>
  );
}
