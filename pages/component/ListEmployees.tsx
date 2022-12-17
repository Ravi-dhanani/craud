import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddRecodeModal from "./AddRecodeModal";
import ApiServices from "../Serveces/Apiservices";
import getData from "../Serveces/Apiservices";
import swal from "sweetalert";
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
  const [lstTodos, setLstTodos] = useState<any>();

  async function deleteData(id: string) {
    try {
      await swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        // buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          fetch(`https://dummyjson.com/posts/${id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((response) => response);
          swal("Your Recode  has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your  Recode is safe!");
        }
      });
    } catch {
      console.log("not Found");
    }
  }
  // const lstData = getData();
  async function getData() {
    const url = "https://dummyjson.com/users";
    await fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setLstTodos(result);
      });
  }
  useEffect(() => {
    getData();
  }, []);
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
            {lstTodos?.users.map((item: any) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell component="th" scope="row">
                  {item.id}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.firstName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.lastName}
                </StyledTableCell>
                <StyledTableCell align="center">{item.phone}</StyledTableCell>
                <StyledTableCell align="right">
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid xs={6}>
                      <Box>
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid xs={6}>
                      <IconButton
                        onClick={() => {
                          deleteData(item.id);
                        }}
                      >
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
      {open && <AddRecodeModal setOpen={setOpen} open={open} />}
    </Box>
  );
}
