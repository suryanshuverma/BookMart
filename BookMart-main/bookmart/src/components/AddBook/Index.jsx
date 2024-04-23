import React, { useState, useEffect } from "react";
import { storage, db } from "../../firebase";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./style.css";
import Modal from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Heading from "../HeadingUI";
let initialState = {
  name: "",
  originalPrice: "",
  priceOffered: "",
  authorName: "",
  category: "",
  description: "",
  ownerInfo: {
    name: "",
    contact: "",
    email: "",
  },
  imgURLs: [],
};

const AddEditBook = () => {
  const [data, setData] = useState(initialState);
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const uploadFile = () => {
    files.forEach((file) => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const ImageUploadprogress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgress(ImageUploadprogress);
          if (ImageUploadprogress === 100) {
            setUploaded(false);
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((urls) => {
            initialState = {
              ...initialState,
              imgURLs: [...initialState.imgURLs, urls],
            };

            setData({ ...data, imgURLs: initialState.imgURLs });
          });
        }
      );
    });
  };
  useEffect(() => {
    files && uploadFile();
  }, [files]);

  const handleImageUpload = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setFiles((prevState) => [...prevState, newImage]);
    }
  };

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "booksmanually"), {
      ...data,
      timeStamp: serverTimestamp(),
    }).then(() => {
      toast.success(`Added New Book`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
    setData(initialState);
    setFiles([]);
  };

  useEffect(() => {
    if (!isAuth) {
      setModalOpen(true);
    }
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  };


  return (
    <>
       {!isAuth && <Modal onClose={closeModal} login={true} />}
       <div className="addBookContainer">
      <Heading text={"Add Books"} />

      <div className="addBookForm">
        <form onSubmit={handleSubmit}>
          <TextField
            className="inputHandle"
            fullWidth
            label="Book Name"
            value={data.name}
            name="name"
            required
            onChange={handleInputChange}
          />

          <div className="priceContainer">
            <TextField
              label="Book Original Price"
              value={data.originalPrice}
              type="number"
              name="originalPrice"
              required
              onChange={handleInputChange}
              className="price"
            />

            <TextField
              label="Book Price Offered"
              value={data.priceOffered}
              name="priceOffered"
              type="number"
              required
              onChange={handleInputChange}
              className="price"
            />
          </div>

          <TextField
            fullWidth
            label="Book's Author Name"
            value={data.authorName}
            name="authorName"
            required
            onChange={handleInputChange}
          />

          <FormControl className="categorySelect">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              label="Category"
              id="category"
              value={data.category}
              name="category"
              onChange={handleInputChange}
            >
              <MenuItem value="Fiction">Fiction</MenuItem>
              <MenuItem value="Comedy">Comedy</MenuItem>
              <MenuItem value="Self Help">Self Help</MenuItem>
              <MenuItem value="Romance">Romance</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Description"
            value={data.description}
            name="description"
            required
            onChange={handleInputChange}
          />

          <div className="ownerInfo">
            <TextField
              className="ownerData"
              label="Owner Name"
              value={data.ownerInfo.name}
              name="authorContact"
              required
              onChange={(e) =>
                setData({
                  ...data,
                  ownerInfo: {
                    ...data.ownerInfo,
                    name: e.target.value,
                  },
                })
              }
            />

            <TextField
              className="ownerData"
              label="Owner Contact"
              value={data.ownerInfo.contact}
              type="number"
              name="ownerName"
              required
              onChange={(e) =>
                setData({
                  ...data,
                  ownerInfo: {
                    ...data.ownerInfo,
                    contact: e.target.value,
                  },
                })
              }
            />

            <TextField
              className="ownerData"
              label="Owner Email"
              type="email"
              value={data.ownerInfo.email}
              name="ownerEmail"
              required
              onChange={(e) =>
                setData({
                  ...data,
                  ownerInfo: {
                    ...data.ownerInfo,
                    email: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="imgUploadMain">
            <div className="imgUpload">
              <Button fullWidth variant="contained" component="label">
                Upload Images*
                <input
                  hidden
                  required
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={handleImageUpload}
                />
              </Button>
            </div>
            <div className="progressBar">
              {"Upload is " + progress + "% done"}
            </div>
          </div>

          <Button
            disabled={uploaded}
            type="submit"
            fullWidth
            variant="contained"
            color="success"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddEditBook;