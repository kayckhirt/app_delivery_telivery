// import PropTypes from 'prop-types';
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
    <div>
      <table>
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={ field }>{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr key={ index }>
            <td
              data-testid={ `${part}element-user-table-item-number-${index}` }
            >
              Item
            </td>
            <td data-testid={ `${part}element-user-table-name-${index}` }>
              Nome
            </td>
            <td data-testid={ `${part}element-user-table-email-${index}` }>
              Email
            </td>
            <td
              data-testid={ `${part}element-user-table-role-${index}` }
            >
              Role
            </td>
            <td
              data-testid={ `${part}element-user-table-remove-${index}` }
            >
              Excluir
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ClientsTable;
