type LocalStorageHelper = (
  action: 'get' | 'set',
  key: string,
  value?: any
) => {} | undefined;

const localStorageHelper: LocalStorageHelper = (action, key, value) => {
  switch (action) {
    case 'get':
      return {
        data: JSON.parse(localStorage.getItem(key)!),
      };
    case 'set':
      localStorage.setItem(key, JSON.stringify(value));
      return;
    default:
      throw new Error('Invalid action provided');
  }
};

export default localStorageHelper;
