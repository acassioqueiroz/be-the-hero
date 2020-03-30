import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import * as MailComposer from 'expo-mail-composer';


import logoImg from '../../assets/logo.png';
import { } from 'react-native-gesture-handler';

export default function Details() {
    const navigation = useNavigation();
    const message = 'Estou entrando em contato.';

    function sendMail() {
        MailComposer.composeAsync({
            subject: 'Mataru o cacchorro',
            recipients: ['acassio@gmail.com'],
            body: message
        })
    }

    function sendWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=557190000000&text=${message}`);
    }

    function navigationBack() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity  onPress={navigationBack} style={styles.headerText}>
                    <Feather name='arrow-left' size={28} color='#E82041' />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>APAD</Text>
                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>Cachorro morreu</Text>
                <Text style={styles.incidentProperty}>Valor:</Text>
                <Text style={styles.incidentValue}>R$ 120,00</Text>                
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia</Text>
                <Text style={styles.heroTitle}>Seja o herói desde caso.</Text>
                <Text style={styles.heroDescription}>Entre em contato:</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}