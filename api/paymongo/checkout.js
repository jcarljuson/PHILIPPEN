/**
 * PayMongo Checkout API Handler
 * Creates PayMongo Checkout Session for GCash, Maya, Cards, and GrabPay donations.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, donorName, donorEmail, donorPhone, paymentMethod = 'all' } = req.body || {};

    const numericAmount = parseFloat(amount);
    if (!numericAmount || numericAmount <= 0) {
      return res.status(400).json({ error: 'Please enter a donation amount greater than ₱0.' });
    }

    // PayMongo gateway processing minimum for online checkout sessions
    if (secretKey && secretKey.startsWith('sk_') && numericAmount < 20) {
      return res.status(400).json({
        error: 'PayMongo gateway processing requires at least ₱20.00 for payment links. For smaller contributions, direct GCash/bank transfer is available.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (donorEmail && donorEmail.trim() && !emailRegex.test(donorEmail.trim())) {
      return res.status(400).json({ error: 'Please provide a valid email format for your receipt.' });
    }

    const resolvedName = (donorName && typeof donorName === 'string' && donorName.trim()) ? donorName.trim() : 'Anonymous Supporter';
    const resolvedEmail = (donorEmail && typeof donorEmail === 'string' && emailRegex.test(donorEmail.trim())) ? donorEmail.trim() : 'donor@philippen.org';
    const resolvedPhone = (donorPhone && typeof donorPhone === 'string' && donorPhone.trim()) ? donorPhone.trim() : '09000000000';

    const secretKey = process.env.PAYMONGO_SECRET_KEY;

    // Convert PHP to cents for PayMongo (₱100 = 10000)
    const amountInCents = Math.round(numericAmount * 100);

    // Map payment method types
    let paymentMethodTypes = ['gcash', 'paymaya', 'card', 'grab_pay'];
    if (paymentMethod === 'gcash') paymentMethodTypes = ['gcash'];
    else if (paymentMethod === 'paymaya' || paymentMethod === 'maya') paymentMethodTypes = ['paymaya'];
    else if (paymentMethod === 'card') paymentMethodTypes = ['card'];
    else if (paymentMethod === 'grab_pay') paymentMethodTypes = ['grab_pay'];

    const origin = req.headers.origin || 'http://localhost:5173';

    // If PayMongo Secret Key is configured, make real API call
    if (secretKey && secretKey.startsWith('sk_')) {
      const authHeader = 'Basic ' + Buffer.from(secretKey + ':').toString('base64');

      const paymongoPayload = {
        data: {
          attributes: {
            billing: {
              name: resolvedName,
              email: resolvedEmail,
              phone: resolvedPhone,
            },
            send_email_receipt: !!(donorEmail && donorEmail.trim()),
            show_description: true,
            show_line_items: true,
            description: `Philippen Donation - ${resolvedName}`,
            line_items: [
              {
                currency: 'PHP',
                amount: amountInCents,
                name: 'Philippen Indigenous Agricultural Livelihood Support',
                quantity: 1,
                description: 'Direct agricultural support for indigenous farming communities',
              },
            ],
            payment_method_types: paymentMethodTypes,
            success_url: `${origin}/?donation=success&amt=${numericAmount}`,
            cancel_url: `${origin}/?donation=cancelled`,
          },
        },
      };

      const response = await fetch('https://api.paymongo.com/v1/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify(paymongoPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('[PayMongo API Error]', data);
        const errMsg = data?.errors?.[0]?.detail || 'Failed to initialize PayMongo checkout.';
        return res.status(response.status).json({ error: errMsg });
      }

      const checkoutUrl = data?.data?.attributes?.checkout_url;
      return res.status(200).json({
        success: true,
        checkoutUrl,
        mode: 'live',
        sessionId: data?.data?.id,
      });
    }

    // Demo / Sandbox Fallback when PAYMONGO_SECRET_KEY is not yet in .env
    console.log('[PayMongo Demo Simulation - Key not set]', {
      amount: numericAmount,
      donorName,
      donorEmail,
      donorPhone,
      paymentMethod,
    });

    return res.status(200).json({
      success: true,
      mode: 'demo',
      message: 'PayMongo gateway ready! Add PAYMONGO_SECRET_KEY in .env to enable real payments.',
      demoDetails: {
        amount: numericAmount,
        donorName,
        paymentMethod,
      },
    });
  } catch (error) {
    console.error('[PayMongo Handler Error]', error);
    return res.status(500).json({ error: 'Server error processing PayMongo donation request.' });
  }
}
