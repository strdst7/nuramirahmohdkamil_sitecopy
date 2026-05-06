import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Link,
  Hr,
} from "@react-email/components";

export interface LeadNotificationEmailProps {
  project_name: string;
  email?: string | null;
  whatsapp?: string | null;
  intent: string;
  submitted_at: string;
}

export function LeadNotificationEmail({
  project_name,
  email,
  whatsapp,
  intent,
  submitted_at,
}: LeadNotificationEmailProps) {
  const supabaseUrl = process.env.SUPABASE_URL;

  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <title>New Lead — The Alchemist&apos;s Terminal</title>
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
                fontSize: "22px",
                fontWeight: 700,
                marginTop: 0,
              }}
            >
              New Lead — The Alchemist&apos;s Terminal
            </Heading>
          </Section>

          <Section style={{ marginBottom: "16px" }}>
            <Text style={{ fontSize: "16px", margin: "8px 0" }}>
              <strong>Project Name:</strong> {project_name}
            </Text>
            <Text style={{ fontSize: "16px", margin: "8px 0" }}>
              <strong>Email:</strong> {email || "Not provided"}
            </Text>
            <Text style={{ fontSize: "16px", margin: "8px 0" }}>
              <strong>WhatsApp:</strong> {whatsapp || "Not provided"}
            </Text>
            <Text style={{ fontSize: "16px", margin: "8px 0" }}>
              <strong>Intent:</strong> {intent}
            </Text>
            <Text style={{ fontSize: "16px", margin: "8px 0" }}>
              <strong>Submitted:</strong>{" "}
              {new Date(submitted_at).toLocaleString("en-US", {
                dateStyle: "full",
                timeStyle: "short",
              })}
            </Text>
          </Section>

          <Hr style={{ borderColor: "#504535", margin: "24px 0" }} />

          {supabaseUrl && (
            <Section style={{ marginBottom: "16px" }}>
              <Link
                href={supabaseUrl}
                style={{ color: "#ffc66b", textDecoration: "underline" }}
              >
                View in Supabase
              </Link>
            </Section>
          )}

          <Section>
            <Text
              style={{
                color: "#9d8e7c",
                fontSize: "13px",
                marginTop: "24px",
              }}
            >
              NUR AMIRAH MOHD KAMIL — Portfolio & AI Playground
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default LeadNotificationEmail;
