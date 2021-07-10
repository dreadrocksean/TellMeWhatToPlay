import { AsyncStorage } from "react-native";

export const saveStorage = async models => {
  if (!models) return;
  try {
    await AsyncStorage.setItem(Object.keys(models)[0], JSON.stringify(models));
    return Promise.resolve({ success: true });
  } catch (err) {
    return Promise.reject(err);
  }
};

export const loadStorage = async model => {
  try {
    const modelJson = await AsyncStorage.getItem(model);
    const data = modelJson && JSON.parse(modelJson)[model];
    return Promise.resolve(data);
  } catch (err) {
    console.log(`Error getting storage ${model}: `, err.message);
    return Promise.reject({ error: err });
  }
};
