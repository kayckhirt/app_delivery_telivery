/* eslint-disable max-lines */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography } from '@mui/material';
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

  const fetchSellers = useCallback(async () => {
    try {
      const { data } = await api.get('/users/sellers');
      setSellers(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchSellers();
  }, [fetchSellers]);

  const handleRem = (product) => removeProduct(product);

  const productsOnCart = getCart();
  return (
    <main>
      <NavBar />
      <Typography
        variant="h3"
        textAlign="center"
      >
        Meu carrinho
      </Typography>
      <TableContainer>
        <Table sx={ { minWidth: '400px' } }>
          <TableHead>
            <TableRow>
              {fields.map((field) => (
                <TableCell
                  key={ field }
                  sx={ { fontSize: '1.5em' } }
                >
                  {field}

                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {productsOnCart
              .map(({ productId, name, quantity, unitPrice, subTotal }, id) => (
                <TableRow key={ productId }>
                  <TableCell
                    data-testid={
                      `customer_checkout__element-order-table-item-number-${id}`
                    }
                    sx={ { fontSize: '1.3em' } }
                  >
                    {id + 1}
                  </TableCell>
                  <TableCell
                    data-testid={
                      `customer_checkout__element-order-table-name-${id}`
                    }
                    sx={ { fontSize: '1.3em' } }
                  >
                    {name}
                  </TableCell>
                  <TableCell
                    data-testid={
                      `customer_checkout__element-order-table-quantity-${id}`
                    }
                    sx={ { fontSize: '1.3em' } }
                  >
                    {quantity}
                  </TableCell>
                  <TableCell
                    data-testid={
                      `customer_checkout__element-order-table-unit-price-${id}`
                    }
                    sx={ { fontSize: '1.3em' } }
                  >
                    {unitPrice.replace('.', ',')}
                  </TableCell>
                  <TableCell
                    data-testid={
                      `customer_checkout__element-order-table-sub-total-${id}`
                    }
                    sx={ { fontSize: '1.3em' } }
                  >
                    {subTotal.toFixed(2).replace('.', ',')}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={
                        () => (
                          handleRem({ productId, name, quantity, unitPrice, subTotal }))
                      }
                      data-testid={
                        `customer_checkout__element-order-table-remove-${id}`
                      }
                      type="button"
                      variant="outlined"
                      sx={ {
                        background: '#181654',
                        color: 'white',
                      } }
                    >
                      Remover
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Typography
          data-testid="customer_checkout__element-order-total-price"
          variant="h5"
          textAlign="right"
          sx={ {
            marginRight: '50px',
            fontWeight: 'Bold',
          } }
        >
          {`TOTAL R$ ${totalCartValue.toFixed(2).replace('.', ',')}`}
        </Typography>
      </TableContainer>
      <Typography
        variant="h4"
        textAlign="center"
        sx={ {
          marginBottom: '70px',
        } }
      >
        Detalhes e Endereço para entrega
      </Typography>
      <FormGroup
        sx={ {
          width: '100vw',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
          alignSelf: '',
        } }
      >
        <InputLabel
          htmlFor="selectSeller"
          sx={ { fontSize: '1.5em',
            display: 'flex',
            color: 'black',
            marginLeft: '5px',
            justifyContent: '',
          } }
        >
          Vendedor
          <Select
            id="selectSeller"
            name="sellerId"
            onChange={ onSelectChange }
            data-testid="customer_checkout__select-seller"
            sx={ {
              background: 'white',
            } }
          >
            {
              sellers.map(({ id, name }) => (
                <MenuItem
                  key={ name }
                  value={ id }
                  sx={ { background: 'white' } }
                >
                  {name}
                </MenuItem>))
            }
          </Select>
        </InputLabel>
        <InputLabel
          htmlFor="address"
          sx={ { fontSize: '1.5em',
            display: 'flex',
            color: 'black',
            marginLeft: '5px' } }
        >
          Endereço
          <TextField
            id="address"
            name="deliveryAddress"
            onChange={ onInputChange }
            type="text"
            data-testid="customer_checkout__input-address"
            sx={ {
              background: 'white',
            } }
          />
        </InputLabel>
        <InputLabel
          htmlFor="numberAddress"
          sx={ { fontSize: '1.5em',
            color: 'black',
            marginLeft: '5px' } }
        >
          Número
          <TextField
            id="numberAddress"
            name="deliveryNumber"
            onChange={ onInputChange }
            type="text"
            data-testid="customer_checkout__input-address-number"
            sx={ {
              background: 'white',
            } }
          />
        </InputLabel>
        <Button
          type="submit"
          data-testid="customer_checkout__button-submit-order"
          variant="outlined"
          onClick={ handleSubmit }
          sx={ {
            background: '#181654',
            color: 'white',
          } }
        >
          Finalizar Pedido
        </Button>
      </FormGroup>
    </main>
  );
}
export default Checkout;
