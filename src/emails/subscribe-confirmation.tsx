import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
} from "@react-email/components";

export interface SubscribeConfirmationEmailProps {
  email: string;
}

export function SubscribeConfirmationEmail({
  email,
}: SubscribeConfirmationEmailProps) {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <title>You&apos;re in the echo — Nur Amirah</title>
      </Head>
      <Body
        style={{
          backgroundColor: "#171305",
          color: "#ebe2c8",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "24px",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <Section
            style={{
              borderLeft: "4px solid #ffc66b",
              paddingLeft: "16px",
              marginBottom: "24px",
            }}
          >
            <Heading
              style={{
                color: "#ffc66b",
                fontSize: "28px",
                fontWeight: 700,
                marginTop: 0,
                marginBottom: "8px",
              }}
            >
              You&apos;re in the echo.
            </Heading>
          </Section>

          <Section style={{ marginBottom: "16px" }}>
            <Text style={{ fontSize: "16px", margin: "8px 0", lineHeight: "1.6" }}>
              Thank you for subscribing. You&apos;ll receive occasional
              transmissions from the boundary between artificial cognition and
              human dreaming.
            </Text>
            <Text
              style={{
                fontSize: "14px",
                margin: "16px 0",
                color: "#9d8e7c",
                fontStyle: "italic",
              }}
            >
              Subscribed as: {email}
            </Text>
            <Text style={{ fontSize: "14px", margin: "8px 0", lineHeight: "1.6" }}>
              If you ever wish to leave the echo, you can unsubscribe at any
              time.
            </Text>
          </Section>

          <Section>
            <Text
              style={{
                color: "#9d8e7c",
                fontSize: "13px",
                marginTop: "24px",
                paddingTop: "16px",
                borderTop: "1px solid #504535",
              }}
            >
              NUR AMIRAH MOHD KAMIL — Portfolio &amp; AI Playground
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default SubscribeConfirmationEmail;
