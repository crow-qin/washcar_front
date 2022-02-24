export const getResponseData =
  (res) => {
    if (res && res.data) {
      if ( res.data.code === 0 ) {
        return res.data && res.data.data;
      } else {
        throw (res.data.msg || res.data.message);
      }
    }
    console.error('返回的参数中data不存在');
  };
