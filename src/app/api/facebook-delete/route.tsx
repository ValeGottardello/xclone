import crypto from 'crypto';

export async function POST(req) {
  const formData = await req.formData();
  const signedRequest = formData.get('signed_request');

  const APP_SECRET = process.env.FACEBOOK_APP_SECRET; // asegúrate de tener esta env var

  function base64UrlDecode(str) {
    return Buffer.from(str.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
  }

  function parseSignedRequest(signedRequest, secret) {
    const [encodedSig, payload] = signedRequest.split('.');
    const sig = base64UrlDecode(encodedSig);
    const data = JSON.parse(base64UrlDecode(payload).toString('utf8'));

    const expectedSig = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest();

    const isValid = crypto.timingSafeEqual(sig, expectedSig);

    if (!isValid) {
      console.error('Invalid signature');
      return null;
    }

    return data;
  }

  const data = parseSignedRequest(signedRequest, APP_SECRET);

  if (!data) {
    return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 403 });
  }

  const userId = data.user_id;
  const confirmationCode = crypto.randomUUID();
  const statusUrl = `https://yourdomain.com/deletion?id=${confirmationCode}`;

  // Aquí deberías borrar datos en Supabase si corresponde
  console.log(`Delete Facebook data for user_id: ${userId}`);

  return new Response(
    JSON.stringify({
      url: statusUrl,
      confirmation_code: confirmationCode,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
