/* eslint-disable react/jsx-max-depth */
// import PropTypes from 'prop-types';
import { Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow } from '@mui/material';
import React from 'react';
// import { useParams } from 'react-router-dom';

// import api from '../services/api';

const fields = [
  'Item',
  'Nome',
  'E-mail',
  'Tipo',
  'Excluir',
];

const part = 'admin_manage__';

function ClientsTable() {
  const index = 1;
  //  const [ordersDetails, setOrdersDetails] = useState([]);
  //  const [products, setProducts] = useState([]);
  //
  //  const { saleId } = useParams();
  //  const getOrderDetails = useCallback(async () => {
  //    try {
  //      const { data } = await api.get(`/sales/details/${saleId}`);
  //      console.log(data);
  //      setOrdersDetails(data);
  //      setProducts(data.products);
  //    } catch (err) {
  //      console.error(err);
  //    }
  //  }, [saleId]);
  //
  //  useEffect(() => {
  //    getOrderDetails();
  //  }, [getOrderDetails]);

  return (
    <TableContainer sx={ { marginTop: '40px' } }>
      <Table>
        <TableHead>
          <TableRow>
            {fields.map((field) => (
              <TableCell key={ field } sx={ { fontSize: '1.3em' } }>{field}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={ index }>
            <TableCell
              data-testid={ `${part}element-user-table-item-number-${index}` }
              sx={ { fontSize: '1.3em' } }
            >
              1
            </TableCell>
            <TableCell
              data-testid={ `${part}element-user-table-name-${index}` }
              sx={ { fontSize: '1.3em' } }
            >
              Fulana Pereira
            </TableCell>
            <TableCell
              data-testid={ `${part}element-user-table-email-${index}` }
              sx={ { fontSize: '1.3em' } }
            >
              fulana@deliveryapp.com
            </TableCell>
            <TableCell
              data-testid={ `${part}element-user-table-role-${index}` }
              sx={ { fontSize: '1.3em' } }
            >
              Vendedora
            </TableCell>
            <TableCell
              data-testid={ `${part}element-user-table-remove-${index}` }
              sx={ { fontSize: '1.3em' } }
            >
              <Button variant="outlined">
                Excluir
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ClientsTable;
