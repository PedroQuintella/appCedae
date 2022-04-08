import { View, Text, TextInput, TouchableOpacity, Keyboard, Alert, Modal } from "react-native";
import { useState } from "react";
import { Picker } from '@react-native-picker/picker';
import CameraComponent from "../Camera";

export default function Form() {
    
    const [cidade, setCidade] = useState(null)
    const [bairro, setBairro] = useState(null)
    const [rua, setRua] = useState(null)
    const [numero, setNumero] = useState(null)
    const [descricao, setDescricao] = useState(null)
    const [isVisible, setIsVisible] = useState(false)

    function validar() {
        if (cidade != 'selecione' && bairro != null && rua != null && numero != null && descricao != null){
            setIsVisible(true)
        }
        else {
            Alert.alert('Todos os campos são obrigatórios!')
    }
    
    return (
        <View style={style.formContext}>
            <View style={style.form} >
                <Text style={style.title}>Cidade</Text>
                <Picker selectedValue={cidade} onValueChange={(itemValue, itemIndex) => setCidade(itemValue)}>
                    <Picker.Item label="Selecione" value={"selecione"}/>
                    <Picker.Item label="Vassouras" value={"vassouras"} />
                    <Picker.Item label="Barra do Piraí" value={"barradopirai"} />
                    <Picker.Item label="Mendes" value={"mendes"} />
                    <Picker.Item label="Três Rios" value={"tresrios"} />
                    <Picker.Item label="Paraíba do Sul" value={"paraibadosul"} />
                    <Picker.Item label="Miguel Pereira" value={"miguelpereira"} />
                    <Picker.Item label="Valença" value={"valenca"} />
                    <Picker.Item label="Rio das Flores" value={"riodasflores"} />
                </Picker> 
                <TextInput style={style.formInput} onChangeText={setBairro} value={bairro} />
                <TextInput style={style.formInput} onChangeText={setRua} value={rua} />
                <TextInput style={style.formInput} onChangeText={setNumero} value={numero} />
                <TextInput style={style.formInput} onChangeText={setDescricao} value={descricao} />
                <TouchableOpacity style={style.button} onPress={() => validar()}>
                    <Text style={styles.buttonText}>Tirar foto</Text>
                </TouchableOpacity>
            </View>
            <Modal transparent={true} visible={isVisible}>
                <CameraComponent
                    cidade={cidade}
                    bairro={bairro}
                    rua={rua}
                    numero = {numero}
                    descricao = {descricao}
                />
            </Modal>
        </View>
      );
    }
}