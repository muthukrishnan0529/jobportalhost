// import { useState } from "react";
// import { postJob } from "../api/jobApi";

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

// function PostJobPage() {
//   const [title, setTitle] = useState("");
//   const [company, setCompany] = useState("");
//   const [location, setLocation] = useState("");
//   const [salary, setSalary] = useState("");
//   const [description, setDescription] = useState("");

//   const [formError, setFormError] = useState("");
//   const [snack, setSnack] = useState(false);

//   const handlePost = async () => {
//     if (!title || !company || !location || !salary || !description) {
//       setFormError("Please fill all required fields");
//       return;
//     }

//     setFormError("");

//     const token = localStorage.getItem("access");

//     await postJob(
//       {
//         title,
//         company,
//         location,
//         salary,
//         description,
//       },
//       token,
//     );

//     setSnack(true);

//     setTitle("");
//     setCompany("");
//     setLocation("");
//     setSalary("");
//     setDescription("");
//   };

//   return (
//     <Container maxWidth="xs" sx={{ mt: { xs: 2, sm: 6 }, mb: 8 }}>
//       <Card
//         sx={{
//           p: { xs: 2, sm: 4 },
//           borderRadius: 3,
//           boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
//         }}
//       >
//         <Typography
//           variant="h5"
//           fontWeight={800}
//           mb={2}
//           textAlign= "center"
//           sx={{ textTransform: "uppercase" }}
//         >
//           Post New Job
//         </Typography>

//         {formError && (
//           <Alert severity="error" sx={{ mb: 2 }}>
//             {formError}
//           </Alert>
//         )}

//         <Stack spacing={{ xs: 1.6, sm: 2.3 }}>
//           <TextField
//             label="Job Title"
//             fullWidth
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           <TextField
//             label="Company Name"
//             fullWidth
//             value={company}
//             onChange={(e) => setCompany(e.target.value)}
//           />

//           <TextField
//             label="Location"
//             fullWidth
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           />

//           <TextField
//             label="Salary"
//             fullWidth
//             value={salary}
//             onChange={(e) => setSalary(e.target.value)}
//           />

//           <TextField
//             label="Job Description"
//             fullWidth
//             multiline
//             minRows={3}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />

//           <Button
//             variant="contained"
//             fullWidth
//             sx={{
//               height: 46,
//               fontWeight: 700,
//               borderRadius: 2,
//             }}
//             onClick={handlePost}
//           >
//             Post Job
//           </Button>
//         </Stack>
//       </Card>

//       <Snackbar
//         open={snack}
//         anchorOrigin={{
//           vertical: "top",
//           horizontal: "center",
//         }}
//         autoHideDuration={1500}
//         onClose={() => setSnack(false)}
//       >
//         <Alert severity="success">Job Posted Successfully 🎉</Alert>
//       </Snackbar>
//     </Container>
//   );
// }

// export default PostJobPage;

import { useState } from "react";
import { postJob } from "../api/jobApi";

import {
  Container,
  Card,
  Typography,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

function PostJobPage() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  const [formError, setFormError] = useState("");
  const [snack, setSnack] = useState(false);
  const [posting, setPosting] = useState(false);

  const handlePost = async () => {
    if (!title || !company || !location || !salary || !description) {
      setFormError("Please fill all required fields");
      return;
    }

    setFormError("");
    setPosting(true);

    try {
      const token = localStorage.getItem("access");

      await postJob(
        {
          title,
          company,
          location,
          salary,
          description,
        },
        token,
      );

      setSnack(true);

      setTitle("");
      setCompany("");
      setLocation("");
      setSalary("");
      setDescription("");
    } finally {
      setPosting(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: { xs: 2, sm: 6 }, mb: 8 }}>
      <Card
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={800}
          mb={2}
          textAlign="center"
          sx={{ textTransform: "uppercase" }}
        >
          Post New Job
        </Typography>

        {formError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formError}
          </Alert>
        )}

        <Stack spacing={{ xs: 1.6, sm: 2.3 }}>
          <TextField
            label="Job Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Company Name"
            fullWidth
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <TextField
            label="Location"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <TextField
            label="Salary"
            fullWidth
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />

          <TextField
            sx={{ whiteSpace: "pre-line", lineHeight: 1.7 }}
            label="Job Description"
            fullWidth
            multiline
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            disabled={posting}
            sx={{
              height: 46,
              fontWeight: 700,
              borderRadius: 2,
            }}
            onClick={handlePost}
          >
            {posting ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Post Job"
            )}
          </Button>
        </Stack>
      </Card>

      <Snackbar
        open={snack}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        autoHideDuration={1500}
        onClose={() => setSnack(false)}
      >
        <Alert severity="success">Job Posted Successfully 🎉</Alert>
      </Snackbar>
    </Container>
  );
}

export default PostJobPage;
