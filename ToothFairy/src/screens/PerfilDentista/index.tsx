import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, TextInput, View } from 'react-native';
import styled from 'styled-components/native';
import DynamicTopLeftImage from '../../components/DynamicTopLeftImage';
import CustomButton from '../../components/CustomButton';
import { auth, database } from '../../../firebaseConfig';
import { ref, get, set, push, remove, update } from 'firebase/database';

const PerfilDentista = ({ navigation }: any) => {
  const [dentistName, setDentistName] = useState('');
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [novoPacienteEmail, setNovoPacienteEmail] = useState('');
  const [comentario, setComentario] = useState('');
  const [tratamento, setTratamento] = useState('');
  const [dataConsulta, setDataConsulta] = useState('');
  const [editandoPacienteId, setEditandoPacienteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = ref(database, 'users/' + user.uid);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setDentistName(snapshot.val().nome);
        }

        await carregarPacientes(user.uid);
      }
    };

    fetchData();
  }, []);

  const carregarPacientes = async (dentistaId: string) => {
    const pacientesRef = ref(database, `users/${dentistaId}/pacientes`);
    const pacientesSnapshot = await get(pacientesRef);
    
    if (pacientesSnapshot.exists()) {
      const pacientesData = pacientesSnapshot.val();
      const pacientesArray = Object.keys(pacientesData).map(key => ({
        id: key,
        ...pacientesData[key],
        nome: 'Carregando...'
      }));
      
      setPacientes(pacientesArray);

      for (let paciente of pacientesArray) {
        const pacienteRef = ref(database, `users/${paciente.id}`);
        const pacienteSnapshot = await get(pacienteRef);
        if (pacienteSnapshot.exists() && pacienteSnapshot.val().nome) {
          setPacientes(prev => prev.map(p => 
            p.id === paciente.id ? {...p, nome: pacienteSnapshot.val().nome} : p
          ));
        }
      }
    } else {
      setPacientes([]);
    }
  };

  const adicionarPaciente = async () => {
    if (!novoPacienteEmail.trim()) {
      Alert.alert('Erro', 'Por favor, insira o email do paciente');
      return;
    }
  
    const dentistaId = auth.currentUser?.uid;
    if (!dentistaId) {
      Alert.alert('Erro', 'Usuário não autenticado');
      return;
    }
  
    try {
      const dentistaRef = ref(database, `users/${dentistaId}/userType`);
      const dentistaSnapshot = await get(dentistaRef);
      
      if (dentistaSnapshot.val() !== 'dentista') {
        Alert.alert('Erro', 'Apenas dentistas podem adicionar pacientes');
        return;
      }
  
      const usersRef = ref(database, 'users');
      const snapshot = await get(usersRef);
      
      if (snapshot.exists()) {
        const users = snapshot.val();
        const pacienteEntry = Object.entries(users).find(
          ([_, user]: any) => 
            user.email === novoPacienteEmail.toLowerCase().trim() && 
            user.userType === 'cliente'
        );
  
        if (pacienteEntry) {
          const [pacienteId, _] = pacienteEntry;
          
          const pacienteExistenteRef = ref(database, `users/${dentistaId}/pacientes/${pacienteId}`);
          const pacienteExistenteSnapshot = await get(pacienteExistenteRef);
          
          if (pacienteExistenteSnapshot.exists()) {
            Alert.alert('Aviso', 'Este paciente já está na sua lista');
            return;
          }
  
          await set(pacienteExistenteRef, {
            dataConsulta: new Date().toISOString().split('T')[0],
            comentario: '',
            tratamento: ''
          });
          
          Alert.alert('Sucesso', 'Paciente adicionado com sucesso');
          setNovoPacienteEmail('');
          await carregarPacientes(dentistaId);
        } else {
          Alert.alert('Erro', 'Nenhum cliente encontrado com este email');
        }
      }
    } catch (error) {
      console.error("Erro detalhado:", error);
      Alert.alert('Erro', `Falha ao adicionar paciente: ${error.message}`);
    }
  };

  const iniciarEdicao = (paciente: any) => {
    setEditandoPacienteId(paciente.id);
    setDataConsulta(paciente.dataConsulta);
    setTratamento(paciente.tratamento);
    setComentario(paciente.comentario);
  };

  const cancelarEdicao = () => {
    setEditandoPacienteId(null);
    setDataConsulta('');
    setTratamento('');
    setComentario('');
  };

  const atualizarPaciente = async () => {
    if (!editandoPacienteId) return;
    
    if (!dataConsulta.trim() || !tratamento.trim()) {
      Alert.alert('Erro', 'Data e tratamento são obrigatórios');
      return;
    }

    try {
      const dentistaId = auth.currentUser?.uid;
      if (dentistaId) {
        const pacienteRef = ref(database, `users/${dentistaId}/pacientes/${editandoPacienteId}`);
        await update(pacienteRef, {
          dataConsulta,
          tratamento,
          comentario: comentario || ''
        });
        
        Alert.alert('Sucesso', 'Dados atualizados com sucesso');
        cancelarEdicao();
        await carregarPacientes(dentistaId);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao atualizar os dados');
    }
  };

  const removerPaciente = async (pacienteId: string) => {
    Alert.alert(
      'Confirmar',
      'Tem certeza que deseja remover este paciente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Remover', 
          style: 'destructive',
          onPress: async () => {
            try {
              const dentistaId = auth.currentUser?.uid;
              if (dentistaId) {
                const pacienteRef = ref(database, `users/${dentistaId}/pacientes/${pacienteId}`);
                await remove(pacienteRef);
                Alert.alert('Sucesso', 'Paciente removido com sucesso');
                await carregarPacientes(dentistaId);
              }
            } catch (error) {
              console.error(error);
              Alert.alert('Erro', 'Falha ao remover paciente');
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#0066ff' }}>
      <Container>
        <DynamicTopLeftImage isLogo={false} />
        <Image source={require('./../../assets/dentist-photo.png')} />
        <Name>{dentistName}</Name>
        
        <Section>
          <SectionTitle>Adicionar Paciente</SectionTitle>
          <Input
            placeholder="Email do paciente"
            value={novoPacienteEmail}
            onChangeText={setNovoPacienteEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <CustomButton 
            title="Adicionar Paciente" 
            onPress={adicionarPaciente}
          />
        </Section>

        <Section>
          <SectionTitle>Meus Pacientes</SectionTitle>
          
          {pacientes.length === 0 ? (
            <EmptyText>Nenhum paciente cadastrado</EmptyText>
          ) : (
            pacientes.map(paciente => (
              <PacienteContainer key={paciente.id}>
                <PacienteNome>{paciente.nome}</PacienteNome>
                
                {editandoPacienteId === paciente.id ? (
                  <>
                    <Input
                      placeholder="Data da consulta (YYYY-MM-DD)"
                      value={dataConsulta}
                      onChangeText={setDataConsulta}
                    />
                    
                    <Input
                      placeholder="Tratamento realizado"
                      value={tratamento}
                      onChangeText={setTratamento}
                      multiline
                    />
                    
                    <Input
                      placeholder="Comentários"
                      value={comentario}
                      onChangeText={setComentario}
                      multiline
                    />
                    
                    <ButtonsContainer>
                      <CustomButton 
                        title="Salvar" 
                        onPress={atualizarPaciente}
                        style={{ flex: 1, marginRight: 5 }}
                      />
                      <CustomButton 
                        title="Cancelar" 
                        onPress={cancelarEdicao}
                        style={{ flex: 1, marginLeft: 5, backgroundColor: '#666' }}
                      />
                    </ButtonsContainer>
                  </>
                ) : (
                  <>
                    <PacienteInfo>
                      <InfoLabel>Última consulta:</InfoLabel>
                      <InfoText>{paciente.dataConsulta}</InfoText>
                    </PacienteInfo>
                    
                    <PacienteInfo>
                      <InfoLabel>Tratamento:</InfoLabel>
                      <InfoText>{paciente.tratamento || 'Não informado'}</InfoText>
                    </PacienteInfo>
                    
                    {paciente.comentario && (
                      <PacienteInfo>
                        <InfoLabel>Comentários:</InfoLabel>
                        <InfoText>{paciente.comentario}</InfoText>
                      </PacienteInfo>
                    )}
                    
                    <ButtonsContainer>
                      <CustomButton 
                        title="Editar" 
                        onPress={() => iniciarEdicao(paciente)}
                        style={{ flex: 1, marginRight: 5 }}
                      />
                      <CustomButton 
                        title="Remover" 
                        onPress={() => removerPaciente(paciente.id)}
                        style={{ flex: 1, marginLeft: 5, backgroundColor: '#ff4444' }}
                      />
                    </ButtonsContainer>
                  </>
                )}
              </PacienteContainer>
            ))
          )}
        </Section>
      </Container>
    </ScrollView>
  );
};

const Container = styled.View`
  padding: 20px;
  padding-bottom: 50px;
`;

const Image = styled.Image`
  width: 150px;
  height: 150px;
  resize-mode: contain;
  align-self: center;
  margin-bottom: 20px;
`;

const Name = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`;

const Section = styled.View`
  margin-bottom: 30px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
`;

const SectionTitle = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const Input = styled.TextInput`
  background-color: white;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 16px;
`;

const PacienteContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.15);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const PacienteNome = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const PacienteInfo = styled.View`
  margin-bottom: 8px;
`;

const InfoLabel = styled.Text`
  color: #6AE9FF;
  font-weight: bold;
  font-size: 14px;
`;

const InfoText = styled.Text`
  color: white;
  font-size: 16px;
`;

const EmptyText = styled.Text`
  color: white;
  text-align: center;
  font-style: italic;
  padding: 20px;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export default PerfilDentista;