import React, { useContext } from 'react';
import NavBar from '../Components/NavBar';
import CartContext from '../Context/CartContext';
import { getCart } from '../utils/localStorage';

const fields = [
  'Item',
  'Descrição',
  'Quantidade',
  'Valor Unitário',
  'Sub-total',
  'Remover Item',
];

function CustomerCheckout() {
  const { totalCartValue, removeProduct, updateCart } = useContext(CartContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCart();
  };

  const handleRem = (product) => removeProduct(product);

  const productsOnCart = getCart();
  return (
    <main>
      <NavBar />
      <h3>Finalizar Pedido</h3>
      <section>
        <table>
          <thead>
            <tr>
              {fields.map((field) => (
                <td key={ field }>{field}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {productsOnCart
              .map(({ productId, name, quantity, unitPrice, subTotal }, id) => (
                <tr key={ productId }>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-item-number-${id}`
                    }
                  >
                    {id + 1}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-name-${id}`
                    }
                  >
                    {name}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-quantity-${id}`
                    }
                  >
                    {quantity}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-unit-price-${id}`
                    }
                  >
                    {unitPrice.replace('.', ',')}

                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-sub-total-${id}`
                    }

                  >
                    {subTotal.toFixed(2).replace('.', ',')}

                  </td>
                  <td>
                    <button
                      onClick={
                        () => (
                          handleRem({ productId, name, quantity, unitPrice, subTotal }))
                      }
                      data-testid={
                        `customer_checkout__element-order-table-remove-${id}`
                      }
                      type="button"
                    >
                      Remover
                    </button>

                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <p
          data-testid="customer_checkout__element-order-total-price"
        >
          {totalCartValue.toFixed(2).replace('.', ',')}

        </p>
      </section>

      <form onSubmit={ handleSubmit }>
        <label htmlFor="selectSeller">
          Vendedor
          <select
            id="selectSeller"
            data-testid="customer_checkout__select-seller"
          >
            <option> vendedor </option>
          </select>
        </label>
        <input type="text" data-testid="customer_checkout__input-address" />
        <input type="text" data-testid="customer_checkout__input-address-number" />
        <button
          type="submit"
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Pedido
        </button>
      </form>

    </main>
  );
}
export default CustomerCheckout;
