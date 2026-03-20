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
//   CircularProgress,
// } from "@mui/material";

// function LoginPage() {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const [loading, setLoading] = useState(false);

//   const [snack, setSnack] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const handleLogin = async () => {
//     if (!username.trim() || !password.trim()) {
//       setSnack({
//         open: true,
//         message: "Enter username and password",
//         severity: "warning",
//       });
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await axios.post("http://127.0.0.1:8000/api/users/login/", {
//         username,
//         password,
//       });

//       const {
//         access,
//         refresh,
//         role,
//         username: name,
//         is_profile_completed,
//       } = res.data;

//       // ⭐ STORE
//       localStorage.setItem("access", access);
//       localStorage.setItem("refresh", refresh);
//       localStorage.setItem("role", role);
//       localStorage.setItem("username", name);

//       setSnack({
//         open: true,
//         message: "Login Success 🎉",
//         severity: "success",
//       });

//       // ⭐ VERY IMPORTANT — DELAY NAVIGATION
//       setTimeout(() => {
//         if (!is_profile_completed) {
//           navigate("/setup-profile");
//         } else {
//           navigate("/jobs");
//         }
//       }, 700);
//     } catch {
//       setSnack({
//         open: true,
//         message: "Invalid Credentials",
//         severity: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <Container maxWidth="xs" sx={{ mt: { xs: 6, md: 10 } }}>
//       <Card
//         sx={{
//           p: { xs: 3, md: 4 },
//           borderRadius: 3,
//           boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
//         }}
//       >
//         <Typography variant="h5" fontWeight={800} mb={3} textAlign="center">
//           Login
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

//           <Button
//             variant="contained"
//             fullWidth
//             disabled={loading}
//             sx={{ height: 46, fontWeight: 700 }}
//             onClick={handleLogin}
//           >
//             {loading ? <CircularProgress size={22} /> : "Login"}
//           </Button>
//         </Stack>
//       </Card>
//       <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate("/register")}>
//         New User? Register
//       </Button>

//       <Snackbar
//         open={snack.open}
//         autoHideDuration={3000}
//         onClose={() => setSnack({ ...snack, open: false })}
//         anchorOrigin={{
//           vertical: "top",
//           horizontal: "center",
//         }}
//       >
//         <Alert severity={snack.severity}>{snack.message}</Alert>
//       </Snackbar>
//     </Container>
//   );
// }

// export default LoginPage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Snackbar, Alert, CircularProgress } from "@mui/material";

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setSnack({
        open: true,
        message: "Enter username and password",
        severity: "warning",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://127.0.0.1:8000/api/users/login/", {
        username,
        password,
      });

      const {
        access,
        refresh,
        role,
        username: name,
        is_profile_completed,
      } = res.data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("role", role);
      localStorage.setItem("username", name);

      setSnack({
        open: true,
        message: "Login Success 🎉",
        severity: "success",
      });

      setTimeout(() => {
        if (!is_profile_completed) {
          navigate("/setup-profile");
        } else {
          navigate("/jobs");
        }
      }, 700);
    } catch {
      setSnack({
        open: true,
        message: "Invalid Credentials",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <div className="page-center">
        <div className="form-container">
          <p className="title">Login</p>

          <form className="form" onSubmit={handleLogin}>
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
              {/* <div className="forgot">
                <span>Forgot Password ?</span>
              </div> */}
            </div>

            <button className="sign" disabled={loading}>
              {loading ? <CircularProgress size={20} /> : "Login"}
            </button>
          </form>

          <p className="signup">
            Don't have an account?{" "}
            <span className="link" onClick={() => navigate("/register")}>
              Register
            </span>
          </p>
        </div>
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

export default LoginPage;

const StyledWrapper = styled.div`
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #020617, #111827);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;

  .page-center {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .form-container {
    width: 100%;
    max-width: 380px;
    border-radius: 12px;
    background-color: rgba(17, 24, 39, 1);
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
    margin-top: 24px;
  }

  .input-group {
    margin-bottom: 14px;
  }

  .input-group label {
    display: block;
    font-size: 13px;
    margin-bottom: 6px;
    color: #9ca3af;
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

  .forgot {
    text-align: right;
    font-size: 12px;
    margin-top: 6px;
    color: #9ca3af;
  }

  .sign {
    margin-top: 10px;
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

  .link:hover {
    text-decoration: underline;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #111827 inset !important;
    -webkit-text-fill-color: white !important;
    transition: background-color 5000s ease-in-out 0s;
  }
`;
