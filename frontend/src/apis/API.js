import axios from "axios";

export async function getDb () {
  return await axios.get('http://localhost:3001/api/')
    .then(res => {
      return res.data;
    });
}

export async function updateDb (data) {
  return await axios.post('http://localhost:3001/api/', data)
    .then(() => {
      return "Ваше місце було успішно заброньовано!";
    })
    .catch(() => {
      return "Упс! Виникла помилка під час бронювання місця! :(";
    });
}

export async function createSlot (data) {
  return await axios.post('http://localhost:3001/api/slot', data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export async function deleteSlot (data) {
  return await axios.put('http://localhost:3001/api/slot', data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export async function changeClient (data) {
  return await axios.put('http://localhost:3001/api/client', data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export async function changeClientDate (data) {
  return await axios.put('http://localhost:3001/api/client/date', data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export async function getProfiles () {
  return await axios.get('http://localhost:3001/api/profiles')
    .then(res => {
      return res.data;
    });
}

export async function createProfile (data) {
  return await axios.post('http://localhost:3001/api/profiles', data)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
}

export async function editProfile (data) {
  return await axios.put('http://localhost:3001/api/profiles', data)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
}

export async function deleteProfileBooking (data) {
  return await axios.delete('http://localhost:3001/api/profiles', {data: data})
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
}

export function parseLocalProfile () {
  return JSON.parse(localStorage.getItem('profile'));
}

export function setLocalProfile (data) {
  localStorage.setItem('profile', JSON.stringify(data));
}