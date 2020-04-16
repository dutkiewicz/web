import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Container, Notification, Ok, Warning } from '../../components';
import { hideNotification } from '../../store/actions/nativeData';
import Header from '../../components/Header/Header';
import { BottomNavigation } from '../../components/BottomNavigation';
import './Home.scss';
import hasBadge from '../../utills/badge';
import { Badge } from '../../components/Badge';

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { triageLevel } = useSelector(state => state.triage);
  const { name: userName } = useSelector(state => state.user);
  const { notification } = useSelector(state => state.nativeData);
  const riskTest = useSelector(state => state.riskTest);

  const onHideNotification = () => {
    dispatch(hideNotification());
  };

  const renderBadge = (() => {
    if (hasBadge(Object.keys(riskTest))) {
      return <Badge />;
    }
    return null;
  })();

  const renderRiskLevel = (() => {
    switch (triageLevel) {
      case 'no_risk': {
        return <Ok color="blue" />;
      }
      case 'self_monitoring': {
        return <Ok color="blue" />;
      }
      case 'quarantine': {
        return <Warning color="yellow" />;
      }
      case 'isolation_call': {
        return <Warning color="orange" />;
      }
      case 'isolation_ambulance': {
        return <Warning color="red" />;
      }
      default: {
        return null;
      }
    }
  })();

  const renderRiskInfo = (() => {
    switch (triageLevel) {
      case 'no_risk': {
        return (
          <>
            <p className="text-level-1">PRZESTRZEGAJ PROFILAKTYKI</p>
          </>
        );
      }
      case 'self_monitoring': {
        return (
          <>
            <p className="text-level-2">
              SAMOOBSERWACJA - POZOSTAŃ W DOMU I MONITORUJ STAN ZDROWIA
            </p>
          </>
        );
      }
      case 'quarantine': {
        return (
          <>
            <p>ODOSOBNIENIE DOMOWE. UNIKAJ KONTAKTU Z DOMOWNIKAMI.</p>
            <p>OBSERWUJ SWÓJ STAN ZDROWIA</p>
          </>
        );
      }
      case 'isolation_call': {
        return (
          <>
            <p>IZOLACJA DOMOWA. UNIKAJ KONTAKTU Z DOMOWNIKAMI.</p>
            <p>SKONTAKTUJ SIĘ Z NUMEREM ALARMOWYM</p>
          </>
        );
      }
      case 'isolation_ambulance': {
        return (
          <>
            <p className="text-error">BEZWZGLĘDNIE NIE OPUSZCZAJ DOMU.</p>
            <p>ZABRONIONY KONTAKT Z INNYMI LUDŹMI/DOMOWNIKAMI.</p>
            <p className="text-error">
              OBOWIĄZKOWY KONTAKT Z NUMEREM ALARMOWYM
            </p>
          </>
        );
      }
      default: {
        return null;
      }
    }
  })();

  const goToRiskInformation = () =>
    history.push(`/risk-information/${triageLevel}`);

  const renderNotification = (() => {
    if (notification) {
      const { isVisible, title, content, status } = notification;
      if (isVisible) {
        return (
          <Notification
            title={title}
            content={content}
            status={status}
            onClick={onHideNotification}
          />
        );
      }
    }
    return null;
  })();

  return (
    <div className="view view__home">
      <Header hideBackButton />
      <Container>
        {renderBadge}
        <div className="header">
          {renderRiskLevel}
          <h3 className="primary-2">{userName}</h3>
          <p>
            przeanalizowaliśmy Twoje odpowiedzi na podstawie wytycznych WHO, w
            tym momencie jesteś w grupie:
          </p>
        </div>
        <div className="content">{renderRiskInfo}</div>
        {renderNotification}
        <Button
          onClick={goToRiskInformation}
          type="primary"
          text="Co mam zrobić?"
        />
      </Container>
      <BottomNavigation />
    </div>
  );
};

export default Home;
