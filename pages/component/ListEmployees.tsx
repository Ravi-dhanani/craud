import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Grid, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Apiservices from "../Serveces/Apiservices";
import AddImage from "./AddImage";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
export default function ListEmployees() {
  const [open, setOpen] = React.useState(false);
  const [lstTodos, setLstTodos] = useState<any>([]);
  const [item, setItem] = useState<any>();

  const getData = async () => {
    const data = await Apiservices.getAllRecode();
    setLstTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as any)));
  };
  useEffect(() => {
    getData();
  }, []);
  const deleteRecode = async (id: any) => {
    await Apiservices.deleteRecode(id);
    getData();
  };
  return (
    <Box>
      <Box
        sx={{ display: "flex", justifyContent: "end", marginBottom: "15px" }}
      >
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="center">FirstName</StyledTableCell>
              <StyledTableCell align="center">LastName</StyledTableCell>
              <StyledTableCell align="center">Phon</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lstTodos?.map((item: any, index: number) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.firstName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.lastName}
                </StyledTableCell>
                <StyledTableCell align="center">{item.phon}</StyledTableCell>
                <StyledTableCell align="right">
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid xs={6}>
                      <Box>
                        <IconButton
                          onClick={() => {
                            setItem(item);
                            setOpen(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid xs={6}>
                      <IconButton onClick={() => deleteRecode(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {open && <AddImage setOpen={setOpen} open={open} item={item} />}
    </Box>
  );
}
