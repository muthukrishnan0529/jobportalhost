// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// import {
//   Container,
//   Card,
//   Typography,
//   TextField,
//   Button,
//   Stack,
//   Snackbar,
//   Alert,
// } from "@mui/material";

// function SetupProfilePage() {

//   const navigate = useNavigate();

//   const role = localStorage.getItem("role");

//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [resume, setResume] = useState(null);

//   const [snack, setSnack] = useState({
//     open: false,
//     msg: "",
//     type: "success",
//   });

//   const handleSave = async () => {

//     if (!phone || !email || (role === "candidate" && !resume)) {

//       setSnack({
//         open: true,
//         msg: "Fill all required fields",
//         type: "warning",
//       });

//       return;
//     }

//     try {

//       const token = localStorage.getItem("access");

//       const form = new FormData();
//       form.append("phone", phone);
//       form.append("email", email);

//       if (role === "candidate") {
//         form.append("resume", resume);
//       }

//       await axios.put(
//         "http://127.0.0.1:8000/api/users/update/",
//         form,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setSnack({
//         open: true,
//         msg: "Profile Setup Complete 🎉",
//         type: "success",
//       });

//       setTimeout(() => {
//         navigate("/jobs");
//       }, 1200);

//     } catch {

//       setSnack({
//         open: true,
//         msg: "Something went wrong",
//         type: "error",
//       });

//     }
//   };

//   return (
//     <Container maxWidth="xs" sx={{ mt: 8 }}>

//       <Card sx={{ p: 4, borderRadius: 3 }}>

//         <Typography
//           variant="h5"
//           fontWeight={800}
//           mb={3}
//           textAlign="center"
//         >
//           Setup Profile
//         </Typography>

//         <Stack spacing={2}>

//           <TextField
//             label="Email"
//             fullWidth
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <TextField
//             label="Phone"
//             fullWidth
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />

//           {role === "candidate" && (
//             <Button
//               variant="outlined"
//               component="label"
//               fullWidth
//             >
//               Upload Resume
//               <input
//                 hidden
//                 type="file"
//                 onChange={(e) =>
//                   setResume(e.target.files[0])
//                 }
//               />
//             </Button>
//           )}

//           <Button
//             variant="contained"
//             fullWidth
//             sx={{ height: 46, fontWeight: 700 }}
//             onClick={handleSave}
//           >
//             Save Profile
//           </Button>

//         </Stack>

//       </Card>

//       <Snackbar
//         open={snack.open}
//         autoHideDuration={3000}
//         anchorOrigin={{
//           vertical: "top",
//           horizontal: "center",
//         }}
//         onClose={() =>
//           setSnack({ ...snack, open: false })
//         }
//       >
//         <Alert severity={snack.type}>
//           {snack.msg}
//         </Alert>
//       </Snackbar>

//     </Container>
//   );
// }

// export default SetupProfilePage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import API from "../api/axios";

function SetupProfilePage() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const [snack, setSnack] = useState({
    open: false,
    msg: "",
    type: "success",
  });

  const handleSave = async (e) => {
    e.preventDefault();

    if (!phone || !email || (role === "candidate" && !resume)) {
      setSnack({
        open: true,
        msg: "Fill all required fields",
        type: "warning",
      });
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("access");

      const form = new FormData();
      form.append("phone", phone);
      form.append("email", email);

      if (role === "candidate") {
        form.append("resume", resume);
      }

      // await axios.put("http://127.0.0.1:8000/api/users/update/", form, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      await API.put("/users/update/", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSnack({
        open: true,
        msg: "Profile Setup Complete 🎉",
        type: "success",
      });

      setTimeout(() => {
        navigate("/jobs");
      }, 1200);
    } catch {
      setSnack({
        open: true,
        msg: "Something went wrong",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <div className="form-container">
        <p className="title">Setup Profile</p>

        <form className="form" onSubmit={handleSave} autoComplete="off">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Phone</label>
            <input
              type="text"
              autoComplete="off"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {role === "candidate" && (
            // <label className="file-upload">
            //   Upload Resume
            //   <input
            //     type="file"
            //     hidden
            //     onChange={(e) => setResume(e.target.files[0])}
            //   />
            // </label>
            <label className="file-upload">
              {resume ? resume.name : "Upload Resume"}

              <input
                type="file"
                hidden
                onChange={(e) => setResume(e.target.files[0])}
              />
            </label>
          )}

          <button className="sign" disabled={loading}>
            {loading ? <CircularProgress size={20} /> : "Save Profile"}
          </button>
        </form>
      </div>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.type}>{snack.msg}</Alert>
      </Snackbar>
    </StyledWrapper>
  );
}

export default SetupProfilePage;

const StyledWrapper = styled.div`
  height: 100vh;
  background: linear-gradient(135deg, #020617, #111827);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;

  .form-container {
    width: 100%;
    max-width: 380px;
    background: #111827;
    padding: 28px;
    border-radius: 12px;
    color: white;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  }

  .title {
    text-align: center;
    font-size: 26px;
    font-weight: 700;
  }

  .form {
    margin-top: 22px;
  }

  .input-group {
    margin-bottom: 14px;
  }

  .input-group label {
    font-size: 13px;
    color: #9ca3af;
    display: block;
    margin-bottom: 6px;
  }

  .input-group input {
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid #374151;
    background: #111827;
    color: white;
    outline: none;
  }

  .input-group input:focus {
    border-color: #a78bfa;
  }

  .file-upload {
    display: block;
    border: 1px dashed #374151;
    padding: 12px;
    border-radius: 6px;
    text-align: center;
    cursor: pointer;
    margin-bottom: 14px;
  }

  .file-upload:hover {
    border-color: #a78bfa;
  }

  .sign {
    width: 100%;
    background: #a78bfa;
    border: none;
    padding: 12px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
  }
`;
