import { reactive } from 'vue';
import axios from 'axios';

interface DataProps<T> {
  result: T | null;
  loading: boolean;
  loaded: boolean;
  error: null;
}

const useURLLoader = <T>(url: string) => {
  const data = reactive<DataProps<T>>({
    result: null,
    loading: true,
    loaded: false,
    error: null
  });
  axios
    .get(url)
    .then(response => {
      data.result = response.data;
      data.loaded = true;
    })
    .catch(err => {
      data.error = err;
    })
    .finally(() => {
      data.loading = false;
    });
  return data;
};

export default useURLLoader;
