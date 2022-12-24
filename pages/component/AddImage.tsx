import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
// import { addDoc, collection } from "firebase/firestore";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Apiservices from "../Serveces/Apiservices";

interface IFormInputs {
  firstName: string;
  lastName: string;
  phon: number;
}

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phon: yup.number().required(),
  })
  .required();

interface IAddRecodeModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  item?: any;
}

export default function AddImage(props: IAddRecodeModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: props.item ? props.item : "",
  });
  console.log(props.item);
  const onSubmit = async (newRecode: IFormInputs) => {
    console.log(newRecode);
    if (props.item.id) {
      await Apiservices.updateRecode(props.item.id, newRecode);
    } else {
      try {
        await Apiservices.addRecode(newRecode);
      } catch {
        console.log("error hai bhai dekh");
      }
    }
    // try {
    //   const docRef = await addDoc(collection(db, "employee"), {
    //     firstName: data.firstName,
    //     lastName: data.lastName,
    //     phon: data.phon,
    //   });
    //   swal({
    //     title: "Recode insert Successfully!",
    //     text: "You clicked the button!",
    //     icon: "success",
    //     // button: "Aww yiss!",
    //   });
    //   props.setOpen(false);
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }
  };
  return (
    <div>
      <Dialog open={props.open} onClose={() => props.setOpen(false)} fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Add Recode</DialogTitle>
          <DialogContent>
            <Grid
              container
              rowSpacing={1}
              marginTop="15px"
              columnSpacing={{ xs: 1, sm: 2, md: 2 }}
            >
              <Grid item xs={6}>
                <Box>
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    {...register("firstName")}
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    {...register("lastName")}
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <TextField
                    id="outlined-basic"
                    label="Phon"
                    variant="outlined"
                    {...register("phon")}
                    fullWidth
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid
              container
              columnSpacing={{ xs: 1, sm: 2 }}
              flexDirection={"row"}
              justifyContent={"end"}
            >
              <Grid>
                <Box>
                  <Button type="submit">Save</Button>
                </Box>
              </Grid>
              <Grid>
                <Button onClick={() => props.setOpen(false)}>Cancel</Button>
              </Grid>
            </Grid>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
