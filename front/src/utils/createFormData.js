export default function createFormData(payload) {
  const { img, data } = payload;
  const formData = new FormData();
  formData.append('file', img);

  const keys = Object.keys(data);
  const values = Object.values(data);
  for (let i = 0; i < keys.length; i += 1) {
    formData.append(keys[i], values[i]);
  }
  return formData;
}
