import serverApi from '../../api/server';

export const addBookmark = (payload) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append('user_id', payload.user_id);
    formData.append('news_id', payload.news_id);
    const res = await serverApi.post('api.php?apicall=add_bookmark', formData);

    if (res.data.error) {
      return { error: true, message: res.data.message };
    } else {
      const formData1 = new FormData();
      formData1.append('user_id', payload.user_id);
      const res1 = await serverApi.get(
        'api.php?apicall=list_bookmark',
        formData1
      );
      dispatch({ type: 'BOOKMARK_LIST', payload: res1.data });
      return { error: false, message: res.data.message };
    }
  } catch (err) {
    return { error: true, message: err.message };
  }
};

export const getBookmark = (payload) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append('user_id', payload.user_id);
    const res = await serverApi.post('api.php?apicall=list_bookmark', formData);
    dispatch({ type: 'BOOKMARK_LIST', payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteBookmark = (payload) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append('id', payload.id);
    const res = await serverApi.post(
      'api.php?apicall=delete_bookmark',
      formData
    );

    if (res.data.error) {
      return { error: true, message: res.data.message };
    } else {
      const formData1 = new FormData();
      formData1.append('user_id', payload.user_id);
      const res1 = await serverApi.post(
        'api.php?apicall=list_bookmark',
        formData1
      );
      dispatch({ type: 'BOOKMARK_LIST', payload: res1.data });
      return { error: false, message: res.data.message };
    }
  } catch (err) {
    return { error: true, message: err.message };
  }
};
