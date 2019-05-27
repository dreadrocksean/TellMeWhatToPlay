import { AsyncStorage } from "react-native";

export const saveStorage = async models => {
  // console.log('saveStorage models', models);
  if (!models) {
    return;
  }
  const setStorage = async obj => {
    return await AsyncStorage.setItem(Object.keys(obj)[0], JSON.stringify(obj));
  };
  if (Array.isArray(models)) {
    const tuples = models.map(m => {
      const key = m.keys[0];
      return [key, m[key]];
    });
    return multiSet(tuples);
    // models.forEach(obj => {
    //   if (obj) { setStorage(obj); }
    // });
  } else {
    return setStorage(models);
  }
};

export const loadStorage = async model => {
  try {
    AsyncStorage.clear();
    const userJson = await AsyncStorage.getItem(model);
    // console.log('loadStorage', model, userJson);
    if (!userJson) {
      return null;
    }
    return JSON.parse(userJson)[model];
  } catch (e) {
    console.log(`Error getting storage ${model}: `, e);
  }
};
