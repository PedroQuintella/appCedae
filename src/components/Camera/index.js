import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import React, { useState, useEffect, useRef } from 'react';
import { Image, Modal, StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { style } from '../../styles';
import * as FileSystem from 'expo-file-system';
import { Camera } from 'expo-camera';

export default function CameraComponent(props) {
    
  const ref = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [captured, setCaptured] = useState(null);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    (async () => {
        const { statusLoc } = await Location.requestForegroundPermissionsAsync();
        if (statusLoc !== 'granted') {
            setErrorMsg('Permissão de obter Localização negada.');
      }
    })();
  }, []);
  if (hasPermission === null) {
      return <View />;
  }
  if (hasPermission === false) {
      return <Text>É necessário permitir o uso da câmera.</Text>;
  }
  async function getLocation() {
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location);
      }
  }
  async function take() {
      if (ref) {
        const opt = {
          quality: 0.8,
          base64: true,
          flexOrientation: true,
          forceUpOrientation: true,
        }
        getLocation();
        const data = await ref.current.takePictureAsync(opt);
        setCaptured(data.uri)
        setOpen(true)
        await MediaLibrary.saveToLibraryAsync(data.uri);
        console.log('Localização: ', location)
        console.log('Local: ', data.uri)
        console.log(`Dados do usuário: ${props.cidade}_${props.bairro}_${props.rua}_${props.numero}_${props.descricao}`)
      }
  }
  return (
      <SafeAreaView style={styles.container}>
        <Camera style={styles.camera} type={type} ref={ref}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonFlip}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
                <Text>Virar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonTake}
              onPress={take}>
              <Text>Foto</Text>
            </TouchableOpacity>
          </View>
        </Camera>
        <Modal transparent={true} visible={open} >
          <View style={styles.contentPhoto}>
            <TouchableOpacity style={styles.buttonClose} onPress={() => setOpen(false)}>
              <Text>Fechar</Text>
            </TouchableOpacity>
            <Image style={styles.img} source={{uri: captured}} />
          </View>
        </Modal>
      </SafeAreaView>
  );
}