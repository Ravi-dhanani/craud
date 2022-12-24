import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import * as yup from "yup";

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
  const onSubmit = async (data: IFormInputs) => {
    try {
      fetch("	https://crude-ca1ec-default-rtdb.firebaseio.com/basic.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          salary: data.salary,
          age: data.age,
        }),
      })
        .then((res) => res.json())
        .then();
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
