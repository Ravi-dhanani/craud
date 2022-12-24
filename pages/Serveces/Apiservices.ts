import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
const dbConnect = collection(db, "employee");
class ApiServices {
  addRecode = (newRecode: any) => {
    return addDoc(dbConnect, newRecode);
  };
  updateRecode = (id: any, updatedRecode: any) => {
    const employee = doc(db, "employee", id);

    return updateDoc(employee, updatedRecode);
  };
  deleteRecode = (id: any) => {
    const employee = doc(db, "employee", id);
    return deleteDoc(employee);
  };
  getAllRecode = () => {
    return getDocs(dbConnect);
  };
  getSigleRecode = (id: any) => {
    const data = doc(db, "employee", id);
    return getDoc(data);
  };
}
export default new ApiServices();
