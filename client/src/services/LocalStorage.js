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
    // AsyncStorage.clear();
    const modelJson = await AsyncStorage.getItem(model);
    console.log("loadStorage", model, JSON.parse(modelJson)[model]);
    return Promise.resolve(JSON.parse(modelJson)[model]);
  } catch (err) {
    console.log(`Error getting storage ${model}: `, e);
    return Promise.reject(err);
  }
};
