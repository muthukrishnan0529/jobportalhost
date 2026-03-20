// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   Typography,
//   Box,
//   Stack,
//   Button,
//   CircularProgress,
//   Chip,
// } from "@mui/material";

// import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

// import { getMyApplications } from "../api/jobApi";

// function CandidateMyApplicationsPage() {
//   const [apps, setApps] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchApps();
//   }, []);

//   const fetchApps = async () => {
//     const token = localStorage.getItem("access");
//     const res = await getMyApplications(token);
//     setApps(res.data.data);
//     setLoading(false);
//   };

//   if (loading)
//     return (
//       <Box textAlign="center" mt={10}>
//         <CircularProgress />
//       </Box>
//     );

//   return (
//     <Box sx={{ width: "100%", py: 2 }}>
//       <Box
//         sx={{
//           maxWidth: { xs: "100%", sm: 700, md: 900, lg: 1100 },
//           mx: "auto",
//           px: 2,
//         }}
//       >
//         <Typography
//           fontWeight={800}
//           mb={3}
//           textAlign={{ xs: "center", md: "left" }}
//           sx={{
//             textTransform: "uppercase",
//             letterSpacing: 1,
//             fontSize: {
//               xs: 22, // ⭐ mobile size
//               sm: 26,
//               md: 28,
//               lg: 30, // ⭐ desktop big
//             },
//           }}
//         >
//           My Applications
//         </Typography>

//         <Stack spacing={2}>
//           {apps.map((a) => (
//             <Box
//               key={a.id}
//               sx={{
//                 border: "1px solid #e5e7eb",
//                 borderRadius: 1, // ⭐ small radius
//                 p: 3,
//                 background: "#fff",
//               }}
//             >
//               {/* ⭐ TOP ROW */}
//               <Stack direction="row" alignItems="center">
//                 <Box flex={1}>
//                   <Typography fontWeight={700} fontSize={18}>
//                     {a.job_title}
//                   </Typography>
//                 </Box>

//                 <Chip
//                   label={a.status}
//                   size="small"
//                   color={
//                     a.status === "shortlisted"
//                       ? "success"
//                       : a.status === "rejected"
//                         ? "error"
//                         : "warning"
//                   }
//                   sx={{
//                     textTransform: "capitalize",
//                     borderRadius: 1,
//                     fontWeight: 600,
//                   }}
//                 />
//               </Stack>

//               {/* COMPANY */}
//               <Stack direction="row" spacing={1} mt={1} alignItems="center">
//                 <WorkOutlineIcon sx={{ fontSize: 16, color: "gray" }} />
//                 <Typography fontSize={14} color="text.secondary">
//                   {a.company}
//                 </Typography>
//               </Stack>

//               {/* DATE */}
//               <Stack direction="row" spacing={1} alignItems="center">
//                 <CalendarTodayIcon sx={{ fontSize: 14, color: "gray" }} />
//                 <Typography fontSize={13} color="text.secondary">
//                   Applied on {new Date(a.applied_at).toLocaleDateString()}
//                 </Typography>
//               </Stack>

//               {/* BUTTON */}
//               <Stack mt={2}>
//                 <Button
//                   variant="contained"
//                   size="small"
//                   sx={{
//                     width: { xs: "100%", md: 200 },
//                     textTransform: "none",
//                   }}
//                   onClick={() => navigate(`/job-detail/${a.job}`)}
//                 >
//                   View Job
//                 </Button>
//               </Stack>
//             </Box>
//           ))}
//         </Stack>
//       </Box>
//     </Box>
//   );
// }

// export default CandidateMyApplicationsPage;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Typography,
  Box,
  Stack,
  Button,
  CircularProgress,
  Chip,
} from "@mui/material";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DescriptionIcon from "@mui/icons-material/Description";

import { getMyApplications } from "../api/jobApi";

function CandidateMyApplicationsPage() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    const token = localStorage.getItem("access");
    const res = await getMyApplications(token);
    setApps(res.data.data);
    setLoading(false);
  };

  if (loading)
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ width: "100%", py: 2 }}>
      <Box
        sx={{
          maxWidth: { xs: "100%", sm: 700, md: 900, lg: 1100 },
          mx: "auto",
          px: 2,
        }}
      >
        <Typography
          fontWeight={800}
          mb={3}
          textAlign={{ xs: "center", md: "left" }}
          sx={{
            textTransform: "uppercase",
            letterSpacing: 1,
            fontSize: {
              xs: 22,
              sm: 26,
              md: 28,
              lg: 30,
            },
          }}
        >
          My Applications
        </Typography>

        {apps.length === 0 ? (
          <Box
            textAlign="center"
            mt={8}
            sx={{
              border: "1px dashed #ddd",
              borderRadius: 3,
              p: 5,
              background: "#fafafa",
            }}
          >
            <DescriptionIcon sx={{ fontSize: 60, color: "#bbb", mb: 2 }} />

            <Typography fontWeight={700} fontSize={20}>
              No Applications Yet
            </Typography>

            <Typography color="text.secondary" mt={1}>
              Start applying for jobs and track your application status here.
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2}>
            {apps.map((a) => (
              <Box
                key={a.id}
                sx={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 1,
                  p: 3,
                  background: "#fff",
                }}
              >
                <Stack direction="row" alignItems="center">
                  <Box flex={1}>
                    <Typography fontWeight={700} fontSize={18}>
                      {a.job_title}
                    </Typography>
                  </Box>

                  <Chip
                    label={a.status}
                    size="small"
                    color={
                      a.status === "shortlisted"
                        ? "success"
                        : a.status === "rejected"
                        ? "error"
                        : "warning"
                    }
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: 1,
                      fontWeight: 600,
                    }}
                  />
                </Stack>

                <Stack direction="row" spacing={1} mt={1} alignItems="center">
                  <WorkOutlineIcon sx={{ fontSize: 16, color: "gray" }} />
                  <Typography fontSize={14} color="text.secondary">
                    {a.company}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <CalendarTodayIcon sx={{ fontSize: 14, color: "gray" }} />
                  <Typography fontSize={13} color="text.secondary">
                    Applied on{" "}
                    {new Date(a.applied_at).toLocaleDateString()}
                  </Typography>
                </Stack>

                <Stack mt={2}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      width: { xs: "100%", md: 200 },
                      textTransform: "none",
                    }}
                    onClick={() => navigate(`/job-detail/${a.job}`)}
                  >
                    View Job
                  </Button>
                </Stack>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default CandidateMyApplicationsPage;