import React from 'react';
import styled from 'styled-components/native';
import DynamicTopLeftImage from '../../components/DynamicTopLeftImage';

const PlanoCliente = () => {
  return (
    <Container>
        <DynamicTopLeftImage isLogo={false} />
        <ProfileContainer>
            <Image source={require('./../../assets/client-photo.png')} />
            <Name>Peterson Santos da Silva</Name>
        </ProfileContainer>

        <BottomContainer>
            <Carteirinha source={require('./../../assets/carteirinha.png')} />
        </BottomContainer>
    </Container>
  );
};

const Container = styled.View`
    flex: 1;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
    background-color: #0066ff;
`;

const ProfileContainer = styled.View`
    justify-content: center;
    align-items: center;
    margin-top: 85px;
`;

const BottomContainer = styled.View`
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 25px;
`;

const Image = styled.Image`
    width: 150px;
    height: 150px;
    resize-mode: contain;
`;

const Carteirinha = styled.Image`
    width: 100%;
    height: 200px;
    resize-mode: contain;
    margin-bottom: 75px;
`;

const Name = styled.Text`
    font-size: 32px;
    text-align: center;
    font-weight: 700;
    color: white;
    width: 240px;
`;

export default PlanoCliente;