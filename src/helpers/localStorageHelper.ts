type LocalStorageHelper = (
  action: 'get' | 'set',
  key: string,
  value?: any
) => { data: any } | undefined;

const localStorageHelper: LocalStorageHelper = (action, key, value) => {
  switch (action) {
    case 'get':
      return {
        data:
          localStorage.getItem(key) !== 'undefined'
            ? JSON.parse(localStorage.getItem(key)!)
            : '',
      };
    case 'set':
      localStorage.setItem(key, JSON.stringify(value));
      return;
    default:
      throw new Error('Invalid action provided');
  }
};

export default localStorageHelper;
