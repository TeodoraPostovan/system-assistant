import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useContext } from 'react';

import { AppContext } from '../../state/state';

export const AccountProfileDetails = (props) => {
  const { userInfo } = useContext(AppContext);
  const surveyArr = Object.keys(userInfo?.surveyData || {}).map((key) => {
    const value = Array.isArray(userInfo?.surveyData[key])
      ? userInfo?.surveyData[key].join(', ')
      : userInfo?.surveyData[key] + '';
    return {
      key,
      value
    };
  });

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {surveyArr.map((row) => (
              <TableRow key={row.key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ textTransform: 'capitalize' }}>
                  {row.key}
                </TableCell>
                <TableCell>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
