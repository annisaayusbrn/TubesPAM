import serverApi from '../../api/server';

export const getNews = () => async (dispatch) => {
  try {
    const res = await serverApi.get('api.php?apicall=list_news');

    dispatch({ type: 'NEWS_LIST', payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
