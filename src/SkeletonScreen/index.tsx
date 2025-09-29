import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function SkeletonScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();

      const withImages = json.slice(0, 10).map((item, index) => ({
        ...item,
        image: `https://picsum.photos/200/200?random=${index + 1}`,
      }));

      setTimeout(() => {
        setData(withImages);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const renderSkeleton = () => {
    return (
      <FlatList
        data={Array(16).fill(0)}
        keyExtractor={(_, i) => i.toString()}
        renderItem={() => (
          <SkeletonPlaceholder>
            <View style={styles.item}>
              <View style={styles.skeletonImage} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <View style={styles.skeletonTitle} />
                <View style={styles.skeletonDesc} />
                <View style={styles.skeletonDescSmall} />
              </View>
            </View>
          </SkeletonPlaceholder>
        )}
      />
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.description}>
          {item.body}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        renderSkeleton()
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  item: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  image: { width: 60, height: 60, borderRadius: 10 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  description: { fontSize: 14, color: '#555' },

  // Skeleton styles
  skeletonImage: { width: 60, height: 60, borderRadius: 10 },
  skeletonTitle: { width: '60%', height: 20, borderRadius: 4 },
  skeletonDesc: { marginTop: 6, width: '80%', height: 15, borderRadius: 4 },
  skeletonDescSmall: {
    marginTop: 6,
    width: '40%',
    height: 15,
    borderRadius: 4,
  },
});
