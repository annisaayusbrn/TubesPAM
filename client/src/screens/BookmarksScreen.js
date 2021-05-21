import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Button,
  Alert,
} from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getBookmark, deleteBookmark } from '../store/actions/bookmarkAction';

const BookmarksScreen = () => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { bookmarks } = useSelector((state) => state.bookmark);

  useEffect(() => {
    const listBookmarks = async () => {
      await dispatch(getBookmark({ user_id: user.id }));
    };
    listBookmarks();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(getBookmark({ user_id: user.id }));
      setRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  }, [refreshing]);

  const handleDeleteBookmark = async (id) => {
    try {
      const user_id = user.id;
      const res = await dispatch(deleteBookmark({ user_id, id }));
      if (res.error) {
        return Alert.alert('Error', res.message);
      } else {
        return Alert.alert('Success', res.message, [
          {
            text: 'OK',
          },
        ]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ margin: 20 }}>
          <Text style={{ fontSize: 30 }}>Bookmark</Text>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {bookmarks && bookmarks.length > 0 ? (
            bookmarks.map((data) => {
              return (
                <Card key={data.id}>
                  <Card.Title>{data.title}</Card.Title>
                  <Card.Image source={{ uri: data.image }} />
                  <Text style={{ marginTop: 10, textAlign: 'justify' }}>
                    {data.body}
                  </Text>
                  <View style={{ marginTop: 10 }}>
                    <Button
                      onPress={() => handleDeleteBookmark(data.id)}
                      title="Hapus Bookmark"
                    ></Button>
                  </View>
                </Card>
              );
            })
          ) : (
            <View style={{ margin: 20 }}>
              <Text>Bookmark tidak ada</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default BookmarksScreen;
