import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import {
  Container,
  Card,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
  Stack,
  Divider
} from "@mui/material";

import { applyJob, getSingleJob } from "../api/jobApi";

function JobDetailPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const [loadingApply, setLoadingApply] = useState(false);

  const [snack, setSnack] = useState({
    open: false,
    msg: "",
    type: "success"
  });

  useEffect(() => {

    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await getSingleJob(id, token);

        setJob(res.data);

        if (res.data.already_applied) {
          setApplied(true);
        }

      } catch (err) {
        console.log(err);
      }
    };

    fetchJob();

  }, [id]);

  const handleApply = async () => {

    try {

      setLoadingApply(true);

      const token = localStorage.getItem("access");

      const formData = new FormData();
      formData.append("job", id);   // ⭐ only job send

      await applyJob(formData, token);

      setApplied(true);

      setSnack({
        open: true,
        msg: "Applied Successfully 🎉",
        type: "success"
      });

    } catch {

      setSnack({
        open: true,
        msg: "Already Applied ❗",
        type: "error"
      });

    } finally {
      setLoadingApply(false);
    }

  };

  if (!job)
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress />
      </Box>
    );

  return (
    <Container maxWidth="md" sx={{ mt: { xs: 3, sm: 6 }, mb: 8 }}>

      <Card
        sx={{
          p: { xs: 2.2, sm: 4 },
          borderRadius: 3,
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)"
        }}
      >

        {/* TITLE */}
        <Typography
          fontWeight={700}
          sx={{
            fontSize: { xs: 26, sm: 34 },
            lineHeight: 1.3
          }}
        >
          {job.title}
        </Typography>

        {/* META */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 3 }}
          mt={2}
        >

          <Typography sx={{ display: "flex", alignItems: "center", gap: .7 }}>
            <WorkOutlineIcon fontSize="small" />
            {job.company}
          </Typography>

          <Typography sx={{ display: "flex", alignItems: "center", gap: .7 }}>
            <LocationOnOutlinedIcon fontSize="small" />
            {job.location}
          </Typography>

          <Typography>
            ₹ {job.salary}
          </Typography>

        </Stack>

        <Divider sx={{ my: { xs: 2, sm: 3 } }} />

        {/* DESCRIPTION */}
        <Typography fontWeight={600} mb={1}>
          Job Description
        </Typography>

        <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
          {job.description}
        </Typography>

        {/* APPLY */}
        <Button
          fullWidth
          sx={{
            mt: 4,
            height: { xs: 44, sm: 52 },
            fontWeight: 600
          }}
          variant="contained"
          disabled={applied || loadingApply}
          onClick={handleApply}
        >

          {loadingApply
            ? <CircularProgress size={22} color="inherit" />
            : applied
              ? "✅ Applied"
              : "Easy Apply"
          }

        </Button>

        {/* BACK */}
        <Button
          fullWidth
          sx={{ mt: 1.5 }}
          variant="text"
          onClick={() => navigate(-1)}
        >
          ← Back to Jobs
        </Button>

      </Card>

      {/* SNACKBAR */}
      <Snackbar
        open={snack.open}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.type}>
          {snack.msg}
        </Alert>
      </Snackbar>

    </Container>
  );
}

export default JobDetailPage;