import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'local-api-handler',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/paymongo/checkout' && req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', async () => {
                try {
                  const parsedBody = body ? JSON.parse(body) : {};
                  const secretKey = env.PAYMONGO_SECRET_KEY || process.env.PAYMONGO_SECRET_KEY;
                  const { amount, donorName, donorEmail, donorPhone, paymentMethod = 'all' } = parsedBody;

                  const numericAmount = parseFloat(amount);
                  if (!numericAmount || numericAmount < 20) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    return res.end(JSON.stringify({ error: 'Minimum donation amount is ₱20.' }));
                  }

                  const amountInCents = Math.round(numericAmount * 100);
                  let paymentMethodTypes = ['gcash', 'paymaya', 'card', 'grab_pay'];
                  if (paymentMethod === 'gcash') paymentMethodTypes = ['gcash'];
                  else if (paymentMethod === 'paymaya' || paymentMethod === 'maya') paymentMethodTypes = ['paymaya'];
                  else if (paymentMethod === 'card') paymentMethodTypes = ['card'];
                  else if (paymentMethod === 'grab_pay') paymentMethodTypes = ['grab_pay'];

                  if (secretKey && secretKey.startsWith('sk_')) {
                    const authHeader = 'Basic ' + Buffer.from(secretKey + ':').toString('base64');
                    const paymongoRes = await fetch('https://api.paymongo.com/v1/checkout_sessions', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: authHeader,
                      },
                      body: JSON.stringify({
                        data: {
                          attributes: {
                            billing: {
                              name: (donorName || 'Philippen Donor').trim(),
                              email: (donorEmail || 'donor@philippen.org').trim(),
                              phone: donorPhone || '09000000000',
                            },
                            send_email_receipt: true,
                            show_description: true,
                            show_line_items: true,
                            description: `Philippen Donation - ${donorName || 'Supporter'}`,
                            line_items: [
                              {
                                currency: 'PHP',
                                amount: amountInCents,
                                name: 'Philippen Indigenous Agricultural Livelihood Support',
                                quantity: 1,
                              },
                            ],
                            payment_method_types: paymentMethodTypes,
                            success_url: `http://localhost:5173/?donation=success&amt=${numericAmount}`,
                            cancel_url: `http://localhost:5173/?donation=cancelled`,
                          },
                        },
                      }),
                    });

                    const paymongoData = await paymongoRes.json();
                    if (!paymongoRes.ok) {
                      res.statusCode = paymongoRes.status;
                      res.setHeader('Content-Type', 'application/json');
                      return res.end(JSON.stringify({ error: paymongoData?.errors?.[0]?.detail || 'PayMongo error' }));
                    }

                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.end(JSON.stringify({
                      success: true,
                      checkoutUrl: paymongoData?.data?.attributes?.checkout_url,
                      mode: 'live',
                    }));
                  }

                  // Simulated demo response when secret key is not set
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({
                    success: true,
                    mode: 'demo',
                    message: 'PayMongo gateway connected! Enter PAYMONGO_SECRET_KEY in .env for live checkout redirection.',
                    demoDetails: { amount: numericAmount, donorName, paymentMethod },
                  }));
                } catch (err) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: err.message }));
                }
              });
              return;
            }
            next();
          });
        },
      },
    ],
  };
});
