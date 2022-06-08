import { createContext, useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { addDoc, onSnapshot, collection, deleteDoc, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { Store } from "react-notifications-component";

import { auth, db, storage } from "../Firebase";

const context = createContext();

export const ContextProvider = ({ children }) => {

    // Storage && Collections

    const [progress, setProgress] = useState(0);

    const addOrEditProduct = (file, productObj) => {
        if (!file) {
            alert('Tienes que agregar una imagen!');
            return;
        }
        const fileName = new Date().getTime() + file.name
        const stroageRef = ref(storage, fileName)
        const uploadImg = uploadBytesResumable(stroageRef, file)
        uploadImg.on('state-change', (snapshot) => {
            const prog = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(prog);
        }, (err) => {
            console.log(err);
        }, () => {
            getDownloadURL(uploadImg.snapshot.ref)
                .then((url) => {
                    console.log(url);
                    const docRef = addDoc(collection(db, "products"), { ...productObj, img: url });
                    console.log(docRef);
                    Store.addNotification({
                        title: "Proceso exitoso",
                        message: "El producto se ha agrgado a la lista!",
                        type: "success",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 1500,
                            onScreen: true
                        }
                    });
                })
        })
    }

    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);

    const getData = () => {
        onSnapshot(collection(db, "products"), (doc) => {
            const allProducts = [];

            doc.forEach((doc) => {
                allProducts.push({ ...doc.data(), id: doc.id });
            });
            console.log(allProducts);
            setProducts(allProducts);
        });
    }

    const getUsers = () => {

        onSnapshot(collection(db, "users"), (doc) => {
            const allUsers = [];

            doc.forEach((doc) => {
                allUsers.push({ ...doc.data(), id: doc.id });
            });
            console.log(allUsers);
            setUsers(allUsers);

        });
    }
    const deleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this movie?')) {
            await deleteDoc(doc(db, "products", id));
        }
    }

    useEffect(() => {

        getData();
        getUsers();

    }, []);

    // Authentication

    const [user, setUser] = useState({});

    async function getRol(uid) {

        const docRef = doc(db, `users/${uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data()
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    function setUserWithFirebaseAndRol(usuarioFirebase) {
        getRol(usuarioFirebase.uid).then((user) => {
            const userData = {
                name: usuarioFirebase.displayName,
                id: usuarioFirebase.uid,
                email: usuarioFirebase.email,
                rol: user.rol,
                car: user.shopping
            };
            setUser(userData);
            console.log("userData fianl", userData);
        });
    }

    onAuthStateChanged(auth, (usuarioFirebase) => {
        if (usuarioFirebase) {
            if (!user) {
                setUserWithFirebaseAndRol(usuarioFirebase);
            }
        } else {
            setUser(null);
        }
    });

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const signUp = async (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth);
    }

    // Shopping Cart

    const [car, setCar] = useState([])

    useEffect(() => {
        const data = localStorage.getItem("car")
        if (data) {
            setCar(JSON.parse(data))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('car', JSON.stringify(car))
    })

    const addShoppingCart = async (uid, obj) => {

        const userCart = doc(db, `users/${uid}`);

        await updateDoc(userCart, {
            shopping: arrayUnion(obj)
        })

    }

    const deleteShoppingCart = async (uid, obj) => {

        const userCart = doc(db, `users/${uid}`);

        await updateDoc(userCart, {
            shopping: arrayRemove(obj)
        }).then((list) => {
            console.log('El producto se ha eliminado del carrito');
        })

    }



    const values = {
        user,
        users,
        car,
        setCar,
        logIn,
        signUp,
        logOut,
        progress,
        addOrEditProduct,
        products,
        deleteProduct,
        addShoppingCart,
        deleteShoppingCart
    }

    return (
        <context.Provider value={values}>
            {children}
        </context.Provider>
    );
}

export const useAppContext = () => {
    return useContext(context);
}
