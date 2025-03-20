import React from 'react';
import { ScrollView } from 'react-native';
import DynamicTopLeftImage from '../../components/DynamicTopLeftImage';
import styled from 'styled-components/native';

const PerfilDentista = () => {
  return (
    <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: '#0066ff' }}
        style={{ backgroundColor: '#0066ff' }}
    >
        <Container>
            <Image source={require('./../../assets/dentist-photo.png')} />
            <Name>Abigail Souza</Name>
    
            <PatientsContainer>
                <DownPatients>
                    <PatientsText>Seus pacientes</PatientsText>
                    <PatientsArrow source={require('./../../assets/down-arrow.png')} />
                </DownPatients>

                <Patients>
                    <Patient>
                        <PatienteProfile source={require('./../../assets/patient-photo-1.png')} />

                        <PatientName>Diego Santos</PatientName>

                        <PatientConsultation>
                            <PatientConsultationText>Consulta feita em 2 de Fevereiro de 2024</PatientConsultationText>
                        </PatientConsultation>

                        <PatientTooths source={require('./../../assets/patient-1-tooths.png')} />
                        
                        <PatientConsultation>
                            <PatientConsultationText>Tratamento em 3 dentes inferiores rachados</PatientConsultationText>
                        </PatientConsultation>
                    </Patient>

                    <PatientDivision></PatientDivision>
                    
                    <Patient>
                        <PatienteProfile source={require('./../../assets/patient-photo-2.png')} />

                        <PatientName>Andreia Spadilla</PatientName>

                        <PatientConsultation>
                            <PatientConsultationText>Consulta feita em 26 de Julho de 2024</PatientConsultationText>
                        </PatientConsultation>

                        <PatientTooths source={require('./../../assets/patient-2-tooths.png')} />
                        
                        <PatientConsultation>
                            <PatientConsultationText>Tratamento de cárie em 3 dentes superiores</PatientConsultationText>
                        </PatientConsultation>
                    </Patient>
                </Patients>
                
            </PatientsContainer>
    
        </Container>
    </ScrollView>
  );
};

const Container = styled.View`
    justify-content: center;
    padding: 30px;
    background-color: #0066ff;
    top: 50px;
`;

const Image = styled.Image`
    width: 100%;
    height: 150px;
    resize-mode: contain;
`;

const Name = styled.Text`
    font-size: 32px;
    text-align: center;
    font-weight: 700;
    margin-bottom: 56px;
    color: white;
`;

const PatientsContainer = styled.View`
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 100%;
    padding-bottom: 50px;
`;

const DownPatients = styled.View`
    justify-content: center;
    align-items: center;
`;

const PatientsText = styled.Text`
    font-size: 24px;
    font-weight: 700;
    color: #FF6052;
`;

const PatientsArrow = styled.Image`
    margin-bottom: 100px;
`;

const Patients = styled.View`
    justify-content: center;
    align-items: center;
    gap: 100px;
    width: 100%;
`;

const Patient = styled.View`
    justify-content: center;
    align-items: center;
`;

const PatienteProfile = styled.Image`
    width: 70px;
    height: 70px;
`;

const PatientName = styled.Text`
    color: white;
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 20px;
`;

const PatientConsultation = styled.View`
    border-radius: 16px;
    background-color: #6AE9FF;
    padding: 10px 16px;
`;

const PatientConsultationText = styled.Text`
    font-weight: 500;
`;

const PatientTooths = styled.Image`
    margin: 30px 0;
`;

const PatientDivision = styled.View`
    height: 3px;
    width: 100%;
    border-radius: 20px;
    background-color: #6AE9FF;
`;

export default PerfilDentista;