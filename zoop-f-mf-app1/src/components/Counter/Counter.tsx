import React, { useEffect, Profiler } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useCounter } from '../../hooks/useCounterStore';
import { useTranslation } from 'react-i18next';

export default function Counter() {
  const { increment, count, fetch } = useCounter();
  const { t, i18n } = useTranslation(['counter']);

  const handleChangeLanguage = () => {
    if (i18n.language === 'de') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('de');
    }
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <Profiler id="Counter" onRender={console.log}>
      <div>
        <Button onClick={handleChangeLanguage} className="mb-3">
          {t('counter:button')}
        </Button>
        <Form.Group>
          <Form.Label>Counter value: {count}</Form.Label>
          <InputGroup>
            <Form.Control type="text" placeholder="" readOnly value={count} />
            <InputGroup.Append>
              <Button variant="primary" onClick={increment}>
                {t('counter:increment')}
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <Form.Text className="text-muted">
            This value is initialized from server.
            <br />
            By clicking on increment button it will:
            <ol>
              <li>Send an increment request to the server</li>
              <li>Once request response received, value will be updated with response value</li>
              <li>An event is thrown so that other microfrontends can be refreshed with new value</li>
            </ol>
          </Form.Text>
        </Form.Group>
      </div>
    </Profiler>
  );
}
