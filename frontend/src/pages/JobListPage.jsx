// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// import {
//   Typography,
//   Button,
//   Container,
//   Card,
//   TextField,
//   Snackbar,
//   Alert,
//   Box,
//   Stack,
//   CircularProgress,
// } from "@mui/material";

// import { getJobs, searchJobs } from "../api/jobApi";

// function JobListPage() {
//   const navigate = useNavigate();

//   const [jobs, setJobs] = useState([]);
//   const [keyword, setKeyword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [nextPage, setNextPage] = useState(null);
//   const [prevPage, setPrevPage] = useState(null);

//   const [snack, setSnack] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async (url = null) => {
//     setLoading(true);

//     let res;

//     if (url) {
//       const r = await fetch(url);
//       res = await r.json();
//     } else {
//       const r = await getJobs();
//       res = r.data;
//     }

//     setJobs(res.results);
//     setNextPage(res.next);
//     setPrevPage(res.previous);

//     setLoading(false);
//   };

//   const handleSearch = async () => {
//     if (!keyword.trim()) {
//       setSnack({
//         open: true,
//         message: "Enter keyword",
//         severity: "warning",
//       });
//       return;
//     }

//     setLoading(true);

//     const res = await searchJobs(keyword);

//     setJobs(res.data.results || res.data);

//     setLoading(false);
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       {/* SEARCH */}
//       {/* <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={4}>
//         <TextField
//           fullWidth
//           label="Search Jobs"
//           value={keyword}
//           onChange={(e) => setKeyword(e.target.value)}
//         />

//         <Button variant="contained" onClick={handleSearch}>
//           Search
//         </Button>
//       </Stack> */}
//       <Stack direction="row" spacing={1} mb={4} alignItems="center">
//         <TextField
//           fullWidth
//           size="small"
//           label="Search Jobs"
//           value={keyword}
//           onChange={(e) => setKeyword(e.target.value)}
//         />

//         <Button
//           variant="contained"
//           size="small"
//           sx={{
//             minWidth: { xs: 70, sm: 100 }, // mobile small
//             height: { xs: 40, sm: 40 }, // compact height
//           }}
//           onClick={handleSearch}
//         >
//           Search
//         </Button>
//       </Stack>

//       {/* JOB COUNT + HELPER */}
//       <Box mb={3}>
//         <Typography fontWeight={500}>Showing {jobs.length} jobs</Typography>

//         <Typography color="text.secondary" fontSize={14}>
//           Click a job card to view full details and apply
//         </Typography>
//       </Box>

//       {/* LOADING */}
//       {loading && (
//         <Box textAlign="center" mt={5}>
//           <CircularProgress />
//         </Box>
//       )}

//       {/* JOB GRID */}
//       {!loading && (
//         <Box
//           display="grid"
//           gridTemplateColumns={{
//             xs: "1fr",
//             sm: "1fr 1fr",
//             md: "1fr 1fr 1fr",
//           }}
//           gap={3}
//         >
//           {jobs.map((job) => (
//             <Card
//               key={job.id}
//               onClick={() => navigate(`/job-detail/${job.id}`)}
//               sx={{
//                 p: 3,
//                 cursor: "pointer",
//                 borderRadius: 2,
//                 border: "1px solid #eee",
//                 boxShadow: "none",
//                 transition: "all .25s ease",
//                 "&:hover": {
//                   borderColor: "#1976d2",
//                   background: "#f8fbff",
//                   transform: "translateY(-6px)",
//                   boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
//                 },
//               }}
//             >
//               <Typography variant="h6" fontWeight={600}>
//                 {job.title}
//               </Typography>

//               <Typography
//                 color="text.secondary"
//                 mt={0.5}
//                 sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
//               >
//                 <WorkOutlineIcon sx={{ fontSize: 18 }} />
//                 {job.company}
//               </Typography>

//               <Typography
//                 color="text.secondary"
//                 sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
//               >
//                 <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />
//                 {job.location}
//               </Typography>

//               <Typography mt={1} fontWeight="bold">
//                 ₹ {job.salary}
//               </Typography>

//               <Typography
//                 mt={1}
//                 sx={{
//                   color: "gray",
//                   fontSize: 14,
//                   display: "-webkit-box",
//                   WebkitLineClamp: 2,
//                   WebkitBoxOrient: "vertical",
//                   overflow: "hidden",
//                 }}
//               >
//                 {job.description}
//               </Typography>

//               <Typography
//                 mt={2}
//                 sx={{
//                   color: "#1976d2",
//                   fontWeight: 600,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 0.5,
//                 }}
//               >
//                 View Details
//                 <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
//               </Typography>
//             </Card>
//           ))}
//         </Box>
//       )}

//       {/* PAGINATION */}
//       <Stack direction="row" spacing={2} justifyContent="center" mt={5} mb={5}>
//         {prevPage && (
//           <Button variant="contained" onClick={() => fetchJobs(prevPage)}>
//             Previous
//           </Button>
//         )}

//         {nextPage && (
//           <Button variant="contained" onClick={() => fetchJobs(nextPage)}>
//             Next
//           </Button>
//         )}
//       </Stack>

//       <Snackbar
//         open={snack.open}
//         autoHideDuration={3000}
//         onClose={() => setSnack({ ...snack, open: false })}
//       >
//         <Alert severity={snack.severity}>{snack.message}</Alert>
//       </Snackbar>
//     </Container>
//   );
// }

// export default JobListPage;

// -----------------------------------------

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import {
  Typography,
  Button,
  Container,
  Card,
  TextField,
  Snackbar,
  Alert,
  Box,
  Stack,
  CircularProgress,
} from "@mui/material";

import { getJobs, searchJobs } from "../api/jobApi";

function JobListPage() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchJobs();
  }, []);
  useEffect(() => {
    if (!keyword.trim()) {
      fetchJobs();
    }
  }, [keyword]);

  const fetchJobs = async (url = null) => {
    setLoading(true);

    let res;

    if (url) {
      const r = await fetch(url);
      res = await r.json();
    } else {
      const r = await getJobs();
      res = r.data;
    }

    setJobs(res.results);
    setNextPage(res.next);
    setPrevPage(res.previous);

    setLoading(false);
  };

  const handleSearch = async () => {
    if (!keyword.trim()) {
      setSnack({
        open: true,
        message: "Enter keyword",
        severity: "warning",
      });
      return;
    }

    setLoading(true);

    const res = await searchJobs(keyword);

    const data = res.data;

    // ⭐ important
    setJobs(data.results || data);

    setNextPage(data.next || null);
    setPrevPage(data.previous || null);

    setLoading(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* SEARCH */}
      {/* <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={4}>
        <TextField
          fullWidth
          label="Search Jobs"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Stack> */}
      <Stack direction="row" spacing={1} mb={4} alignItems="center">
        <TextField
          fullWidth
          size="small"
          label="Search Jobs"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <Button
          variant="contained"
          size="small"
          sx={{
            minWidth: { xs: 70, sm: 100 }, // mobile small
            height: { xs: 40, sm: 40 }, // compact height
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Stack>

      {/* JOB COUNT + HELPER */}
      <Box mb={3}>
        <Typography fontWeight={500}>Showing {jobs.length} jobs</Typography>

        <Typography color="text.secondary" fontSize={14}>
          Click a job card to view full details and apply
        </Typography>
      </Box>

      {/* LOADING */}
      {loading && (
        <Box textAlign="center" mt={5}>
          <CircularProgress />
        </Box>
      )}

      {/* JOB GRID */}
      {!loading && (
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
          }}
          gap={3}
        >
          {jobs.map((job) => (
            <Card
              key={job.id}
              onClick={() => navigate(`/job-detail/${job.id}`)}
              sx={{
                p: 3,
                cursor: "pointer",
                borderRadius: 2,
                border: "1px solid #eee",
                boxShadow: "none",
                transition: "all .25s ease",
                "&:hover": {
                  borderColor: "#1976d2",
                  background: "#f8fbff",
                  transform: "translateY(-6px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                },
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                {job.title}
              </Typography>

              <Typography
                color="text.secondary"
                mt={0.5}
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <WorkOutlineIcon sx={{ fontSize: 18 }} />
                {job.company}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />
                {job.location}
              </Typography>

              <Typography mt={1} fontWeight="bold">
                ₹ {job.salary}
              </Typography>

              <Typography
                mt={1}
                sx={{
                  color: "gray",
                  fontSize: 14,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {job.description}
              </Typography>

              <Typography
                mt={2}
                sx={{
                  color: "#1976d2",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                View Details
                <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
              </Typography>
            </Card>
          ))}
        </Box>
      )}

      {/* PAGINATION */}
      <Stack direction="row" spacing={2} justifyContent="center" mt={5} mb={5}>
        {prevPage && (
          <Button variant="contained" onClick={() => fetchJobs(prevPage)}>
            Previous
          </Button>
        )}

        {nextPage && (
          <Button variant="contained" onClick={() => fetchJobs(nextPage)}>
            Next
          </Button>
        )}
      </Stack>

      <Snackbar
        open={snack.open}
        autoHideDuration={1500}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity={snack.severity}>{snack.message}</Alert>
      </Snackbar>
    </Container>
  );
}

export default JobListPage;
