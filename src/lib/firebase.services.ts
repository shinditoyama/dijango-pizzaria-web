import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  orderBy,
  OrderByDirection,
  query,
  updateDoc,
} from "firebase/firestore";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignOut,
} from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "./firebase";

class FirebaseService {
  useAuthState = () => {
    const [user] = useAuthState(auth);
    return { user };
  };

  signIn = () => {
    const [signInWithEmailAndPassword, user, loading, error] =
      useSignInWithEmailAndPassword(auth);

    return { signInWithEmailAndPassword, user, loading, error };
  };

  signOut = () => {
    const [signOut, loading, error] = useSignOut(auth);
    return { signOut };
  };

  addDocument = (table: string, newData: any) => {
    return addDoc(collection(db, table), newData);
  };

  updateDocument = (table: string, id: string, updatedData: any) => {
    const data = doc(db, table, id);
    return updateDoc(data, updatedData);
  };

  deleteDocument = (table: string, id: string) => {
    const data = doc(db, table, id);
    return deleteDoc(data);
  };

  getDocument = (
    table: string,
    order: string,
    orderValue: OrderByDirection
  ) => {
    const [value, loading, error] = useCollection(
      query(collection(db, table), orderBy(order, orderValue))
    );

    const data: any = value?.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { data, loading, error };
  };
}

export default new FirebaseService();
