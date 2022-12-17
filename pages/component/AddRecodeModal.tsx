import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import swal from "sweetalert";

interface IAddRecodeModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}
interface IFormInputs {
  name: string;
  salary: number;
  age: number;
}

const schema = yup
  .object({
    name: yup.string().required(),
    salary: yup.number().required(),
    age: yup.number().required(),
  })
  .required();
export default function AddRecodeModal(props: IAddRecodeModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: IFormInputs) => {
    try {
      fetch("	https://dummy.restapiexample.com/api/v1/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          salary: data.name,
          age: data.name,
        }),
      })
        .then((res) => res.json())
        .then(console.log);
      swal({
        title: "Recode Insert SuccessFully",
        text: "You clicked the button!",
        icon: "success",
        // button: "Aww yiss!",
      });
    } catch (errors: any) {
      console.log(errors, "errors");
    }
  };
  return (
    <div>
      <Dialog open={props.open} onClose={() => props.setOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Add Recode</DialogTitle>
          <>
            <DialogContent>
              <TextField
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                {...register("name")}
              />
              <TextField
                margin="dense"
                id="name"
                label="salary"
                type="text"
                fullWidth
                variant="outlined"
                {...register("salary")}
              />
              <TextField
                margin="dense"
                id="name"
                label="Age"
                type="number"
                fullWidth
                variant="outlined"
                {...register("age")}
              />
            </DialogContent>
          </>
          <DialogActions>
            <Button type="submit">Save</Button>
            <Button onClick={() => props.setOpen(false)}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
