import { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Typography,
  Stack,
  Button,
  TextField,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Avatar,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";

function ProfilePage() {
  const role = localStorage.getItem("role");

  const [data, setData] = useState(null);

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const [snack, setSnack] = useState({
    open: false,
    msg: "",
    type: "success",
  });

  useEffect(() => {
    const token = localStorage.getItem("access");

    axios
      .get("http://127.0.0.1:8000/api/users/me/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data);
        setPhone(res.data.phone || "");
        setEmail(res.data.email || "");
      });
  }, []);

  const updateProfile = async () => {
    try {
      setSaving(true);

      const token = localStorage.getItem("access");

      const form = new FormData();
      form.append("phone", phone);
      form.append("email", email);

      if (role === "candidate" && resume) {
        form.append("resume", resume);
      }

      await axios.put("http://127.0.0.1:8000/api/users/update/", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSaving(false);
      setEditMode(false);
      setResume(null);

      setSnack({
        open: true,
        msg: "Profile Updated",
        type: "success",
      });
    } catch {
      setSaving(false);
    }
  };

  if (!data) {
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xs" sx={{ mt: { xs: 2, md: 8 }, mb: 8 }}>
      <Card sx={{ borderRadius: 4, boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }}>
        <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
          <Stack spacing={2} alignItems="center">
            <Avatar
              sx={{
                width: 70,
                height: 70,
                fontSize: 30,
                bgcolor: "primary.main",
              }}
            >
              {data.username?.[0]?.toUpperCase()}
            </Avatar>

            <Typography fontWeight={700} fontSize={22}>
              {data.username}
            </Typography>

            <Divider sx={{ width: "100%" }} />

            {/* EMAIL */}

            <Box width="100%">
              <Typography fontSize={13} color="text.secondary">
                Email
              </Typography>

              {editMode ? (
                <TextField
                  size="small"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <Typography fontWeight={600}>{email || "Not Added"}</Typography>
              )}
            </Box>

            {/* PHONE */}

            <Box width="100%">
              <Typography fontSize={13} color="text.secondary">
                Phone
              </Typography>

              {editMode ? (
                <TextField
                  size="small"
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              ) : (
                <Typography fontWeight={600}>{phone || "Not Added"}</Typography>
              )}
            </Box>

            {/* ⭐ RESUME FIXED SLOT */}

            {role === "candidate" && (data.resume || editMode) && (
              <Box width="100%">
                {/* VIEW MODE */}
                {!editMode && data.resume && (
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ height: 42, fontWeight: 600 }}
                    href={`http://127.0.0.1:8000${data.resume}`}
                    target="_blank"
                  >
                    View Resume
                  </Button>
                )}

                {/* EDIT MODE */}
                {editMode && (
                  <Stack spacing={0.5}>
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      sx={{ height: 42, fontWeight: 600 }}
                    >
                      Upload New Resume
                      <input
                        hidden
                        type="file"
                        onChange={(e) => setResume(e.target.files[0])}
                      />
                    </Button>

                    {/* ⭐ FILE NAME PREVIEW SLOT */}
                    <Box
                      sx={{
                        height: 18,
                        textAlign: "center",
                        fontSize: 12,
                        color: "text.secondary",
                      }}
                    >
                      {resume ? resume.name : ""}
                    </Box>
                  </Stack>
                )}
              </Box>
            )}

            {/* ACTION BUTTON */}

            <Box width="100%">
              {editMode ? (
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={saving}
                    sx={{
                      height: 44,
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                    onClick={updateProfile}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>

                  <Button
                    fullWidth
                    sx={{ height: 44 }}
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </Button>
                </Stack>
              ) : (
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ height: 44, fontWeight: 700 }}
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </Button>
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Snackbar
        open={snack.open}
        autoHideDuration={1500}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snack.type}>{snack.msg}</Alert>
      </Snackbar>
    </Container>
  );
}

export default ProfilePage;
