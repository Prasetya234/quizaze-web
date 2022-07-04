/* eslint-disable no-unsafe-finally */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
import axios from 'axios';
import Swal from 'sweetalert2';
import config from '../../config/index';

export const getApi = async (id) => {
  let res = null;
  if (!navigator.onLine) {
    await offline();
    return;
  }
  try {
    res = await axios.get(config.api.connect + config.serializeQueryParams({ userId: id || '' })).then((be) => be.data.data);
    localStorage.setItem('auth', JSON.stringify(res));
  } finally {
    return res;
  }
};

export const updateProfile = async (payload) => {
  let res = null;
  if (!navigator.onLine) {
    await offline();
    return;
  }
  try {
    res = await axios.put(`${config.api.user}/${config.getAuthId()}`, payload, { headers: config.getAuthHeader() });
  } finally {
    return res;
  }
};

export const findSchool = async (school) => {
  let res = [];
  if (!navigator.onLine) {
    await offline();
    return;
  }
  try {
    res = await axios.get(`${config.api.school}/search${config.serializeQueryParams(school)}`, { headers: config.getAuthHeader() }).then((be) => be.data.data.content);
  } finally {
    return res;
  }
};

export const selectSchoolRandom = async () => {
  let res = null;
  if (!navigator.onLine) {
    await offline();
    return;
  }
  try {
    res = await axios.get(`${config.api.school}/random`, { headers: config.getAuthHeader() }).then((be) => be.data);
  } finally {
    return res;
  }
};

export const updateUserSchool = async (id) => {
  let res = null;
  if (!navigator.onLine) {
    await offline();
    return;
  }
  try {
    res = await axios.put(`${config.api.user}/${config.getAuthId()}/update-school/${id}`, {}, { headers: config.getAuthHeader() });
  } finally {
    return res;
  }
};

export const postAdminLogin = async (payload) => {
  let res = null;
  if (!navigator.onLine) {
    await offline();
    return;
  }
  try {
    res = await axios.post(`${config.api.login}`, payload).then((be) => be.data.data);
  } finally {
    return res;
  }
};

export const searchMateriUser = async (pyload) => {
  let res = [];
  if (!navigator.onLine) {
    await offline();
    return;
  }
  try {
    res = await axios.get(`${config.api.question}/materi${config.serializeQueryParams(pyload)}`, { headers: config.getAuthHeader() }).then((be) => be.data.data.content);
  } finally {
    return res;
  }
};

export const questionMateriUser = async (materiId) => {
  let res = null;
  if (!navigator.onLine) {
    await offline();
    return;
  }
  try {
    res = await axios.get(`${config.api.question}/${materiId}/user`, { headers: config.getAuthHeader() }).then(be => be.data.data);
  } finally {
    return res;
  }
};

export const answerQuestionUser = async (payload) => {
  let res = null;
  if (!navigator.onLine) {
    await offline();
    return;
  }
  try {
    res = await axios.post(`${config.api.question}/${payload.materiId}/answer`, payload.data, { headers: config.getAuthHeader() }).then(be => be.data.data);
  } finally {
    return res;
  }
};

export const updateSchoolInfo = async (payload) => {
  let res = null;
  if (!navigator.onLine) {
    await offline();
    return;
  }
  try {
    res = await axios.put(`${config.api.school}/${config.getAuthId()}/${payload.schoolId}`, payload.data, { headers: config.getAuthHeader() }).then(be => be.data.data);
  } finally {
    return res;
  }
};

export const getUserScore = async (materiId) => {
  let res = null;
  if (!navigator.onLine) {
    await offline();
    return;
  }
  try {
    res = await axios.get(`${config.api.userScore}/${config.getAuthId()}/${materiId}`, { headers: config.getAuthHeader() }).then(be => be.data.data);
  } finally {
    return res;
  }
};

export const getUserTrafficRecap = async (materiId) => {
  let res = null;
  if (!navigator.onLine) {
    await offline();
    return;
  }
  try {
    res = await axios.get(`${config.api.traffic}/perday`, { headers: config.getAuthHeader() }).then(be => be.data.data.content);
  } finally {
    return res;
  }
};

const offline = async () => {
  await Swal.fire(
    'Offline',
    'Sepertinya kamu sedang offline',
    'question',
  );
};
