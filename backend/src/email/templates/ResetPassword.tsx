import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface Props {
  url: string;
  appName?: string;
}

export default function ResetPassword({ url, appName = 'Flavor-fit' }: Props) {
  return (
    <Html>
      <Head />
      <Preview>{`${appName} - Password Verification`}</Preview>
      <Body style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
        <Container style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
          <Section>
            <Text style={{ fontSize: '18px', marginBottom: '10px' }}>
              Hello!,
            </Text>
            <Text style={{ fontSize: '16px', marginBottom: '20px' }}>
              We received a request to reset your password for your {appName}{' '}
              account. If this was you, please click the button below to verify
              your request.
            </Text>
            <Button
              href={url}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '10px 20px',
                textDecoration: 'none',
                borderRadius: '5px',
                fontSize: '16px',
              }}
            >
              Verify Password
            </Button>
            <Text style={{ fontSize: '14px', marginTop: '20px' }}>
              If you did not request a password reset, please ignore this email.
            </Text>
            <Text style={{ fontSize: '14px', color: '#888' }}>
              If you have any issues, feel free to contact our support team.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
