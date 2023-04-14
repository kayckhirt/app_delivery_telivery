/* eslint-disable max-lines */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
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

const defaultValues = {
  sellerId: 2,
  deliveryAddress: '',
  deliveryNumber: '',
};

function Checkout() {
  const history = useHistory();
  const { totalCartValue, removeProduct } = useContext(CartContext);
  const { formData, onInputChange, onSelectChange } = useForm(defaultValues);
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(true);
      const { data } = await api.get('/users/sellers');
      setSellers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSellers();
  }, [fetchSellers]);

  const handleRem = (product) => removeProduct(product);

  const productsOnCart = getCart();
  return (
    <Container>
      <NavBar />
      <Typography
        variant="h3"
        textAlign="center"
      >
        Meu carrinho
      </Typography>
      <TableContainer>
        <Table>
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
                    <IconButton
                      onClick={
                        () => (
                          handleRem({ productId, name, quantity, unitPrice, subTotal }))
                      }
                      data-testid={
                        `customer_checkout__element-order-table-remove-${id}`
                      }
                      color="primary"
                    >
                      <DeleteIcon />
                    </IconButton>
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
      {isLoading ? null : (
        <Stack
          sx={ { width: '100%' } }
          justifyContent="space-around"
          alignItems="center"
          direction="row"
        >

          <FormControl sx={ { minWidth: '100px' } }>
            <InputLabel>Vendedor</InputLabel>
            <Select
              autoWidth
              label="Vendedor"
              name="sellerId"
              value={ formData.sellerId }
              onChange={ onSelectChange }
              data-testid="customer_checkout__select-seller"

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
          </FormControl>

          <TextField
            label="Endereço"
            id="address"
            name="deliveryAddress"
            value={ formData.deliveryAddress }
            onChange={ onInputChange }
            type="text"
            data-testid="customer_checkout__input-address"
          />

          <TextField
            label="Número"
            id="numberAddress"
            name="deliveryNumber"
            value={ formData.deliveryNumber }
            onChange={ onInputChange }
            type="text"
            data-testid="customer_checkout__input-address-number"
          />
          <Button
            variant="contained"
            type="submit"
            data-testid="customer_checkout__button-submit-order"
            onClick={ handleSubmit }
          >
            Finalizar Pedido
          </Button>
        </Stack>
      ) }

    </Container>
  );
}
export default Checkout;
