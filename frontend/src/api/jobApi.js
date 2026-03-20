import API from "./axios";

export const getJobs = () => {
  return API.get("jobs/list/");
};

export const applyJob = (data, token) => {
  return API.post("applications/apply/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getMyApplications = (token) => {
  return API.get("applications/my/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const searchJobs = (keyword) => {
  return API.get(`jobs/search/?keyword=${keyword}`);
};

export const postJob = (data, token) => {
  return API.post("jobs/post/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSingleJob = (id, token) => {
  return API.get(`jobs/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getRecruiterApplications = (token) => {
  return API.get("applications/recruiter/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateApplicationStatus = (id, statusValue, token) => {
  return API.patch(
    `applications/status/${id}/`,
    { status: statusValue },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
