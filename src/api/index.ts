const url = '/api';
const apis = {
  login: '/login',
};
type ApiKeys = keyof typeof apis;
const getApi = () => {
  const Api = {} as Record<ApiKeys, string>;
  Object.keys(apis).forEach((item) => {
    Api[item as ApiKeys] = `${url}${apis[item as ApiKeys]}`;
  });
  return Api;
};

export default getApi();
