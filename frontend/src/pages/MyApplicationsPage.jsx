// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   Typography,
//   Box,
//   Stack,
//   Button,
//   CircularProgress,
//   Avatar,
//   Chip,
//   IconButton,
//   Menu,
//   MenuItem,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";

// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import CheckIcon from "@mui/icons-material/Check";
// import CloseIcon from "@mui/icons-material/Close";
// import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import ScheduleIcon from "@mui/icons-material/Schedule";
// import DescriptionIcon from "@mui/icons-material/Description";
// import PersonIcon from "@mui/icons-material/Person";

// import { getMyApplications, updateApplicationStatus } from "../api/jobApi";
// import { BASE_URL } from "../config";

// function MyApplicationsPage() {
//   const [apps, setApps] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedId, setSelectedId] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchApps();
//   }, []);

//   // const fetchApps = async () => {
//   //   const token = localStorage.getItem("access");
//   //   const res = await getMyApplications(token);
//   //   setApps(res.data.data);
//   //   setLoading(false);
//   // };

//   const fetchApps = async () => {
//     try {
//       const token = localStorage.getItem("access");

//       const res = await getMyApplications(token);

//       setApps(res.data.data);
//     } catch (err) {
//       if (err.response?.status === 401) {
//         localStorage.removeItem("access");
//         localStorage.removeItem("refresh");

//         navigate("/");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const changeStatus = async (id, value) => {
//     const token = localStorage.getItem("access");
//     await updateApplicationStatus(id, value, token);
//     fetchApps();
//   };

//   const openMenu = (e, id) => {
//     setAnchorEl(e.currentTarget);
//     setSelectedId(id);
//   };

//   const closeMenu = () => {
//     setAnchorEl(null);
//   };

//   if (loading)
//     return (
//       <Box textAlign="center" mt={10}>
//         <CircularProgress />
//       </Box>
//     );

//   return (
//     <Box sx={{ width: "100%", overflowX: "hidden", py: 2 }}>
//       {/* ⭐ CENTER CONTENT WRAPPER */}
//       <Box
//         sx={{
//           width: "100%",
//           maxWidth: {
//             xs: "100%",
//             sm: 720,
//             md: 900,
//             lg: 1100, // ⭐ desktop bigger
//           },
//           mx: "auto",
//           px: { xs: 2, md: 3 },
//           boxSizing: "border-box",
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
//           Applicants
//         </Typography>

//         <Stack spacing={2}>
//           {apps.map((a) => (
//             <Box
//               key={a.id}
//               sx={{
//                 width: "100%",
//                 minWidth: 0,
//                 border: "1px solid #e5e7eb",
//                 borderRadius: 3,
//                 p: 2,
//                 background: "#fff",
//                 boxSizing: "border-box",
//               }}
//             >
//               {/* TOP ROW */}
//               <Stack direction="row" spacing={1.5} alignItems="center">
//                 <Avatar sx={{ width: 42, height: 42 }}>
//                   {a.candidate_name?.charAt(0)}
//                 </Avatar>

//                 <Box flex={1} minWidth={0}>
//                   <Typography fontWeight={700} fontSize={15} noWrap>
//                     {a.candidate_name}
//                   </Typography>

//                   <Typography fontSize={12} color="text.secondary" noWrap>
//                     {a.email}
//                   </Typography>

//                   <Typography fontSize={12} color="text.secondary" noWrap>
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
//                   // sx={{ textTransform: "capitalize", fontSize: 11 }}
//                   sx={{
//                     textTransform: "capitalize",
//                     fontSize: 11,
//                     borderRadius: 1,
//                   }}
//                 />

//                 <IconButton size="small" onClick={(e) => openMenu(e, a.id)}>
//                   <MoreVertIcon fontSize="small" />
//                 </IconButton>
//               </Stack>

//               {/* BUTTON ROW */}
//               {/* <Stack direction="row" spacing={1} mt={2}> */}
//               <Stack
//                 direction="row"
//                 spacing={1}
//                 mt={2}
//                 justifyContent={{ xs: "stretch", md: "flex-start" }}
//               >
//                 {/* <Button
//                   fullWidth
//                   variant="contained"
//                   size="small"
//                   sx={{ fontSize: 12, height: 32, textTransform: "none" }}
//                   href={`${BASE_URL}${a.resume}`}
//                   target="_blank"
//                 >
//                   Resume
//                 </Button> */}
//                 <Button
//                   variant="contained"
//                   size="small"
//                   startIcon={<DescriptionIcon />}
//                   sx={{
//                     fontSize: 12,
//                     height: 32,
//                     textTransform: "none",
//                     width: { xs: "100%", md: 250 }, // ⭐ magic
//                   }}
//                   href={`${BASE_URL}${a.resume}`}
//                   target="_blank"
//                 >
//                   Resume
//                 </Button>

//                 {/* <Button
//                   fullWidth
//                   variant="outlined"
//                   size="small"
//                   sx={{ fontSize: 12, height: 32, textTransform: "none" }}
//                   onClick={() => navigate(`/candidate/${a.candidate_id}`)}
//                 >
//                   Profile
//                 </Button> */}
//                 <Button
//                   variant="outlined"
//                   size="small"
//                   startIcon={<PersonIcon />}
//                   sx={{
//                     fontSize: 12,
//                     height: 32,
//                     textTransform: "none",
//                     width: { xs: "100%", md: 250 },
//                   }}
//                   onClick={() => navigate(`/candidate/${a.candidate_id}`)}
//                 >
//                   Profile
//                 </Button>
//               </Stack>
//             </Box>
//           ))}
//         </Stack>

//         {/* ⭐ FIXED MOBILE SAFE MENU */}
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={closeMenu}
//           anchorOrigin={{
//             vertical: "bottom",
//             horizontal: "right",
//           }}
//           transformOrigin={{
//             vertical: "top",
//             horizontal: "right",
//           }}
//           disableScrollLock
//           keepMounted
//         >
//           <MenuItem
//             onClick={() => {
//               changeStatus(selectedId, "pending");
//               closeMenu();
//             }}
//           >
//             <ListItemIcon>
//               <HourglassEmptyIcon fontSize="small" />
//             </ListItemIcon>
//             <ListItemText>Pending</ListItemText>
//           </MenuItem>

//           <MenuItem
//             onClick={() => {
//               changeStatus(selectedId, "shortlisted");
//               closeMenu();
//             }}
//           >
//             <ListItemIcon>
//               <CheckIcon fontSize="small" />
//             </ListItemIcon>
//             <ListItemText>Shortlist</ListItemText>
//           </MenuItem>

//           <MenuItem
//             onClick={() => {
//               changeStatus(selectedId, "rejected");
//               closeMenu();
//             }}
//           >
//             <ListItemIcon>
//               <CloseIcon fontSize="small" />
//             </ListItemIcon>
//             <ListItemText>Reject</ListItemText>
//           </MenuItem>
//         </Menu>
//       </Box>
//     </Box>
//   );
// }

// export default MyApplicationsPage;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Typography,
  Box,
  Stack,
  Button,
  CircularProgress,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";

import { getMyApplications, updateApplicationStatus } from "../api/jobApi";
import { BASE_URL } from "../config";

function MyApplicationsPage() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const token = localStorage.getItem("access");
      const res = await getMyApplications(token);
      setApps(res.data.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (id, value) => {
    const token = localStorage.getItem("access");
    await updateApplicationStatus(id, value, token);
    fetchApps();
  };

  const openMenu = (e, id) => {
    setAnchorEl(e.currentTarget);
    setSelectedId(id);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  if (loading)
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ width: "100%", overflowX: "hidden", py: 2 }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: {
            xs: "100%",
            sm: 720,
            md: 900,
            lg: 1100,
          },
          mx: "auto",
          px: { xs: 2, md: 3 },
          boxSizing: "border-box",
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
          Applicants
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
              When candidates apply for your job, they will appear here.
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2}>
            {apps.map((a) => (
              <Box
                key={a.id}
                sx={{
                  width: "100%",
                  minWidth: 0,
                  border: "1px solid #e5e7eb",
                  borderRadius: 3,
                  p: 2,
                  background: "#fff",
                  boxSizing: "border-box",
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Avatar sx={{ width: 42, height: 42 }}>
                    {a.candidate_name?.charAt(0)}
                  </Avatar>

                  <Box flex={1} minWidth={0}>
                    <Typography fontWeight={700} fontSize={15} noWrap>
                      {a.candidate_name}
                    </Typography>

                    <Typography fontSize={12} color="text.secondary" noWrap>
                      {a.email}
                    </Typography>

                    <Typography fontSize={12} color="text.secondary" noWrap>
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
                      fontSize: 11,
                      borderRadius: 1,
                    }}
                  />

                  <IconButton size="small" onClick={(e) => openMenu(e, a.id)}>
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Stack>

                <Stack
                  direction="row"
                  spacing={1}
                  mt={2}
                  justifyContent={{ xs: "stretch", md: "flex-start" }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<DescriptionIcon />}
                    sx={{
                      fontSize: 12,
                      height: 32,
                      textTransform: "none",
                      width: { xs: "100%", md: 250 },
                    }}
                    href={`${BASE_URL}${a.resume}`}
                    target="_blank"
                  >
                    Resume
                  </Button>

                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<PersonIcon />}
                    sx={{
                      fontSize: 12,
                      height: 32,
                      textTransform: "none",
                      width: { xs: "100%", md: 250 },
                    }}
                    onClick={() => navigate(`/candidate/${a.candidate_id}`)}
                  >
                    Profile
                  </Button>
                </Stack>
              </Box>
            ))}
          </Stack>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          disableScrollLock
          keepMounted
        >
          <MenuItem
            onClick={() => {
              changeStatus(selectedId, "pending");
              closeMenu();
            }}
          >
            <ListItemIcon>
              <HourglassEmptyIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Pending</ListItemText>
          </MenuItem>

          <MenuItem
            onClick={() => {
              changeStatus(selectedId, "shortlisted");
              closeMenu();
            }}
          >
            <ListItemIcon>
              <CheckIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Shortlist</ListItemText>
          </MenuItem>

          <MenuItem
            onClick={() => {
              changeStatus(selectedId, "rejected");
              closeMenu();
            }}
          >
            <ListItemIcon>
              <CloseIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Reject</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

export default MyApplicationsPage;