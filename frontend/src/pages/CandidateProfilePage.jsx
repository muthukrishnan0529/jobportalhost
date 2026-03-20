import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Stack,
  Card,
  CardContent,
  Avatar,
  Divider,
} from "@mui/material";

function CandidateProfilePage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access");

    axios
      .get(`http://127.0.0.1:8000/api/users/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data);
      });
  }, [id]);

  if (!data) {
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: { xs: 3, md: 7 },
        mb: 6,
      }}
    >
      <Card
        sx={{
          borderRadius: { xs: 4, md: 6 },
          boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent
          sx={{
            p: { xs: 2.5, md: 5 },
          }}
        >
          <Stack spacing={{ xs: 2.5, md: 4 }} alignItems="center">
            {/* Avatar */}
            <Avatar
              sx={{
                width: { xs: 60, md: 100 },
                height: { xs: 60, md: 100 },
                fontSize: { xs: 26, md: 40 },
                bgcolor: "primary.main",
              }}
            >
              {data.username?.[0]?.toUpperCase()}
            </Avatar>

            {/* Name */}
            <Typography
              variant="h5"
              fontWeight={700}
              textAlign="center"
              sx={{
                fontSize: { xs: 22, md: 32 },
              }}
            >
              {data.username}
            </Typography>

            <Divider sx={{ width: "100%" }} />

            {/* Info Blocks */}
            <Stack width="100%" spacing={1.5}>
              <Box
                sx={{
                  background: "#f8fafc",
                  p: { xs: 1.5, md: 2 },
                  borderRadius: 3,
                }}
              >
                <Typography fontSize={12} color="text.secondary">
                  Email Address
                </Typography>

                <Typography fontWeight={600} fontSize={{ xs: 14, md: 16 }}>
                  {data.email || "Not Provided"}
                </Typography>
              </Box>

              <Box
                sx={{
                  background: "#f8fafc",
                  p: { xs: 1.5, md: 2 },
                  borderRadius: 3,
                }}
              >
                <Typography fontSize={12} color="text.secondary">
                  Phone Number
                </Typography>

                <Typography fontWeight={600} fontSize={{ xs: 14, md: 16 }}>
                  {data.phone || "Not Provided"}
                </Typography>
              </Box>
            </Stack>

            {/* Resume */}
            {data.resume && (
              <Button
                variant="contained"
                fullWidth
                size="large"
                href={`http://127.0.0.1:8000${data.resume}`}
                target="_blank"
                sx={{
                  height: { xs: 42, md: 52 },
                  fontWeight: 700,
                  borderRadius: 3,
                  mt: 1,
                }}
              >
                View Resume
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

export default CandidateProfilePage;
