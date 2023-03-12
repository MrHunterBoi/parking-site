import axios from "axios";

export async function getDb () {
  return await axios.get('http://localhost:3001/api/')
    .then(res => {
      return res.data;
    });
}

export async function updateDb (data) {
  return await axios.put('http://localhost:3001/api/', data)
    .then(() => {
      return "Ваше місце було успішно заброньовано!";
    })
    .catch(() => {
      return "Упс! Виникла помилка під час бронювання місця! :(";
    });
}