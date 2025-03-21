import React from 'react';
import styled from 'styled-components/native';
import CustomButton from '../../components/CustomButton';

const PerfilCliente = ({ navigation }: any) => {
  return (
    <Container>
        <ProfileContainer>
            <Image source={require('./../../assets/client-photo.png')} />
            <Name>Peterson Santos da Silva</Name>
        </ProfileContainer>

        <ButtonContainer>
            <CustomButton 
                title="Veja seu plano"
                clientProfile={true}
                hasQuizIcon={true}
                onPress={() => navigation.navigate('PlanoCliente')}
            />
            <CustomButton 
                title="Quiz"
                clientProfile={true}
                onPress={() => navigation.navigate('Quiz')}
            />
        </ButtonContainer>
    </Container>
  );
};

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 30px;
    background-color: #0066ff;
    gap: 200px;
`;

const ProfileContainer = styled.View`
    justify-content: center;
    align-items: center;
`;

const ButtonContainer = styled.View`
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 100%;
`;

const Image = styled.Image`
    width: 150px;
    height: 150px;
    resize-mode: contain;
`;

const Name = styled.Text`
    font-size: 32px;
    text-align: center;
    font-weight: 700;
    color: white;
    width: 240px;
`;

export default PerfilCliente;