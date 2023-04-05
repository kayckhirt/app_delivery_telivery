import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useForm from '../Hooks/UseForm';
import NavBar from '../Components/NavBar';
import CartContext from '../Context/CartContext';
import { getCart, getToken } from '../utils/localStorage';
import api from '../services/api';

const fields = [
  'Item',
  'Descrição',
  'Quantidade',
  'Valor Unitário',
  'Sub-total',
  'Remover Item',
];

function Checkout() {
  const history = useHistory();
  const { totalCartValue, removeProduct } = useContext(CartContext);
  const { formData, onInputChange, onSelectChange } = useForm(
    { sellerId: 2, deliveryAddress: '', deliveryNumber: '' },
  );
  const [sellers, setSellers] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = getToken();
      const products = getCart();
      const { data } = await api.post(
        '/sales',
        { userId: user.id, ...formData, totalPrice: totalCartValue, products,
        },
      );
      const saleId = data.id;
      history.push(`/customer/orders/${saleId}`);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStudents = useCallback(async () => {
    try {
      const { data } = await api.get('/users/sellers');
      setSellers(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, []);

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
            name="sellerId"
            onChange={ onSelectChange }
            data-testid="customer_checkout__select-seller"
          >
            {
              sellers.map(({ id, name }) => (
                <option key={ name } value={ id }>
                  {name}
                </option>))
            }

          </select>
        </label>
        <input
          name="deliveryAddress"
          onChange={ onInputChange }
          type="text"
          data-testid="customer_checkout__input-address"
        />
        <input
          name="deliveryNumber"
          onChange={ onInputChange }
          type="text"
          data-testid="customer_checkout__input-address-number"
        />
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
export default Checkout;
