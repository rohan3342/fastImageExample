import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [imageUri, setImageUri] = useState(
    'https://source.unsplash.com/random/3840x2160/?cars'
  );
  const [errorMessage, setErrorMessage] = useState(null);

  function onLoadStart() {
    setLoading(true);
    setErrorMessage(false);
  }

  function onLoadEnd() {
    // using setTimeout to increase the image load time
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  function onError() {
    // using setTimeout to increase the image load time
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    setErrorMessage(true);
  }

  function toggleImageUrl() {
    setImageUri('https://source.unsplash.com/random/3840x2160');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fastImageContainer}>
        <FastImage
          fallback={true}
          onError={onError}
          onLoadEnd={onLoadEnd}
          onLoadStart={onLoadStart}
          style={styles.fastImageStyle}
          source={{
            uri: imageUri,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
          defaultSource={require('../assets/defaultImage.jpeg')}
        />
        {isLoading && (
          <ActivityIndicator style={styles.loaderStyle} size={'large'} />
        )}
      </View>
      <Text style={styles.textStyle}>
        {isLoading
          ? 'Image Loading...'
          : errorMessage
          ? 'Error Occur, Showing Default Image'
          : 'Image Loaded'}
      </Text>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={toggleImageUrl}
        style={styles.buttonStyle}
      >
        <Text style={styles.textStyle}>Toggle Image URL</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fastImageContainer: {
    width: '80%',
    height: '40%',
    borderRadius: 6,
    marginBottom: 20,
    overflow: 'hidden',
  },
  fastImageStyle: {
    width: '100%',
    height: '100%',
  },
  loaderStyle: {
    zIndex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'white',
  },
  textStyle: {
    fontSize: 16,
  },
  buttonStyle: {
    padding: 10,
    marginTop: 30,
    borderRadius: 8,
    shadowRadius: 10,
    shadowOpacity: 0.1,
    shadowColor: '#000',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowOffset: { width: 2, height: 2 },
  },
});
