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
//   ToggleButton,
//   ToggleButtonGroup,
//   Snackbar,
//   Alert,
// } from "@mui/material";

// function RegisterPage() {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("candidate");

//   const [snack, setSnack] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const handleRegister = async () => {
//     if (!username || !password) {
//       setSnack({
//         open: true,
//         message: "Fill all fields",
//         severity: "warning",
//       });
//       return;
//     }

//     try {
//       await axios.post("http://127.0.0.1:8000/api/users/register/", {
//         username,
//         password,
//         role,
//       });

//       setSnack({
//         open: true,
//         message: "Registered Successfully 🎉",
//         severity: "success",
//       });

//       setTimeout(() => {
//         navigate("/");
//       }, 1200);
//     } catch (err) {
//       let message = "Registration Failed";

//       if (err.response?.data) {
//         const data = err.response.data;

//         if (data.password) {
//           message = data.password[0];
//         } else if (data.username) {
//           message = data.username[0];
//         } else if (data.email) {
//           message = data.email[0];
//         }
//       }

//       setSnack({
//         open: true,
//         message,
//         severity: "error",
//       });
//     }
//   };

//   return (
//     <Container maxWidth="xs" sx={{ mt: 8 }}>
//       <Card sx={{ p: 4, borderRadius: 3 }}>
//         <Typography variant="h5" fontWeight={800} mb={3} textAlign="center">
//           Register
//         </Typography>

//         <Stack spacing={2}>
//           <TextField
//             label="Username"
//             fullWidth
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />

//           <TextField
//             label="Password"
//             type="password"
//             fullWidth
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <Typography fontSize={14}>I am a:</Typography>

//           <ToggleButtonGroup
//             fullWidth
//             value={role}
//             exclusive
//             onChange={(e, val) => val && setRole(val)}
//           >
//             <ToggleButton value="candidate">Candidate</ToggleButton>

//             <ToggleButton value="recruiter">Recruiter</ToggleButton>
//           </ToggleButtonGroup>

//           <Button
//             variant="contained"
//             fullWidth
//             sx={{ height: 46, fontWeight: 700 }}
//             onClick={handleRegister}
//           >
//             Register
//           </Button>

//           <Button fullWidth onClick={() => navigate("/")}>
//             Already have account? Login
//           </Button>
//         </Stack>
//       </Card>

//       <Snackbar
//         open={snack.open}
//         autoHideDuration={3000}
//         onClose={() => setSnack({ ...snack, open: false })}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity={snack.severity}>{snack.message}</Alert>
//       </Snackbar>
//     </Container>
//   );
// }

// export default RegisterPage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import styled from "styled-components";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import API from "../api/axios";

function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate");
  const [loading, setLoading] = useState(false);

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setSnack({
        open: true,
        message: "Fill all fields",
        severity: "warning",
      });
      return;
    }

    // try {
    //   setLoading(true);

    //   await axios.post("http://127.0.0.1:8000/api/users/register/", {
    //     username,
    //     password,
    //     role,
    //   });
    try {
      setLoading(true);

      await API.post("/users/register/", {
        username,
        password,
        role,
      });

      setSnack({
        open: true,
        message: "Registered Successfully 🎉",
        severity: "success",
      });

      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      let message = "Registration Failed";

      if (err.response?.data) {
        const data = err.response.data;

        if (data.password) message = data.password[0];
        else if (data.username) message = data.username[0];
      }

      setSnack({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <div className="form-container">
        <p className="title">Register</p>

        <form className="form" onSubmit={handleRegister} autoComplete="off">
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <label className="role-label">I am a:</label>

          {/* <div className="role-toggle">
            <button
              type="button"
              className={role === "candidate" ? "active" : ""}
              onClick={() => setRole("candidate")}
            >
              Candidate
            </button>

            <button
              type="button"
              className={role === "recruiter" ? "active" : ""}
              onClick={() => setRole("recruiter")}
            >
              Recruiter
            </button>
          </div> */}
          {/* <div className="role-switch">
            <div
              className={`switch-item ${role === "candidate" ? "selected" : ""}`}
              onClick={() => setRole("candidate")}
            >
              Candidate
            </div>

            <div
              className={`switch-item ${role === "recruiter" ? "selected" : ""}`}
              onClick={() => setRole("recruiter")}
            >
              Recruiter
            </div>
          </div> */}
          <div className="role-cards">
            <div
              className={`role-card ${role === "candidate" ? "active" : ""}`}
              onClick={() => setRole("candidate")}
            >
              <div className="role-icon">👤</div>
              <div className="role-title">Candidate</div>
              <div className="role-desc">Apply for jobs</div>
            </div>

            <div
              className={`role-card ${role === "recruiter" ? "active" : ""}`}
              onClick={() => setRole("recruiter")}
            >
              <div className="role-icon">🧑‍💼</div>
              <div className="role-title">Recruiter</div>
              <div className="role-desc">Post and manage jobs</div>
            </div>
          </div>

          <button className="sign" disabled={loading}>
            {loading ? <CircularProgress size={20} /> : "Register"}
          </button>
        </form>

        <p className="signup">
          Already have account?{" "}
          <span className="link" onClick={() => navigate("/")}>
            Login
          </span>
        </p>
      </div>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snack.severity}>{snack.message}</Alert>
      </Snackbar>
    </StyledWrapper>
  );
}

export default RegisterPage;

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
    border-radius: 12px;
    background: #111827;
    padding: 28px;
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
    margin-bottom: 6px;
    display: block;
  }

  .input-group input {
    width: 100%;
    box-sizing: border-box;
    border-radius: 6px;
    border: 1px solid #374151;
    background: #111827;
    padding: 12px;
    color: white;
    outline: none;
  }

  .input-group input:focus {
    border-color: #a78bfa;
  }

  .role-label {
    font-size: 13px;
    color: #9ca3af;
    margin-top: 6px;
    display: block;
  }

  .role-toggle {
    display: flex;
    gap: 10px;
    margin-top: 8px;
    margin-bottom: 14px;
  }

  .role-toggle button {
    flex: 1;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #374151;
    background: transparent;
    color: white;
    cursor: pointer;
  }

  .role-toggle .active {
    background: #a78bfa;
    color: black;
    border: none;
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

  .signup {
    text-align: center;
    font-size: 13px;
    margin-top: 18px;
    color: #9ca3af;
  }

  .link {
    color: white;
    cursor: pointer;
    font-weight: 600;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #111827 inset !important;
    -webkit-text-fill-color: white !important;
  }

  .role-cards {
    display: flex;
    gap: 12px;
    margin: 12px 0 18px 0;
  }

  .role-card {
    flex: 1;
    background: #0f172a;
    border: 1px solid #374151;
    border-radius: 10px;
    padding: 14px;
    cursor: pointer;
    transition: 0.25s;
    text-align: center;
  }

  .role-card:hover {
    border-color: #a78bfa;
  }

  .role-card.active {
    background: #a78bfa;
    color: black;
    border: none;
  }

  .role-icon {
    font-size: 22px;
    margin-bottom: 6px;
  }

  .role-title {
    font-weight: 600;
  }

  .role-desc {
    font-size: 12px;
    opacity: 0.7;
  }
`;
