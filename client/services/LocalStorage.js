import { AsyncStorage } from 'react-native';

export const saveStorage = async models => {
  // console.log('saveStorage models', models);
  if (!models) { return; }
  const setStorage = async obj => {
    // console.log('setStorage', obj);
    return await AsyncStorage
      .setItem(Object.keys(obj)[0], JSON.stringify(obj));
  };
  if (Array.isArray(models)) {
    models.forEach(obj => {
      if (obj) { setStorage(obj); }
    });
  } else { setStorage(models); }

  const test = await loadStorage('user');
  console.log('test', test);
};

export const loadStorage = async model => {
  try {
    // AsyncStorage.clear();
    const userJson = await AsyncStorage.getItem(model);
    // console.log('loadStorage', model, userJson);
    if (!userJson) { throw('userJson is null')}
    return JSON.parse(userJson)[model];
  } catch(e) {
    console.log(`Error getting storage ${model}: `, e);
    return null;
  }
};